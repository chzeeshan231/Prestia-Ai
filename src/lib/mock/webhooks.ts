// Simulated Stripe webhook delivery (SOW §9).
// Production: a Next.js route handler verifies the Stripe signature on every
// request, stores the event id for idempotency, and updates orders /
// subscriptions only from verified event data. This module reproduces the
// observable behavior — verified delivery + duplicate suppression — so the
// demo can show data staying consistent.

import { db } from "./db";
import { uid } from "@/lib/utils";
import type { WebhookEvent } from "@/lib/types";

function applyEvent(type: WebhookEvent["type"], orderId?: string) {
  if (!orderId) return;
  const order = db.orders.get(orderId);
  if (type === "checkout.session.completed" && order && order.status !== "completed") {
    db.orders.update(orderId, { status: "completed" });
    const sub = db.subscriptions.all().find((s) => s.orderId === orderId);
    if (sub) db.subscriptions.update(sub.id, { status: "active" });
  }
  if (type === "invoice.payment_failed" && order) {
    const sub = db.subscriptions.all().find((s) => s.orderId === orderId);
    if (sub) db.subscriptions.update(sub.id, { status: "past_due" });
  }
}

/**
 * Deliver a webhook event. Signature verification always passes in the demo
 * (documented); pass `eventId` to simulate a redelivery — the duplicate is
 * ignored and logged as such.
 */
export function deliverWebhook(
  type: string,
  orderId?: string,
  note?: string,
  eventId?: string
): WebhookEvent {
  const id = eventId ?? uid("evt_test");
  const duplicate = db.webhookEvents.all().some((e) => e.id === id);
  const evt: WebhookEvent = {
    id,
    type,
    orderId,
    status: duplicate ? "ignored_duplicate" : "processed",
    at: new Date().toISOString(),
    note: note ?? (duplicate ? "Duplicate delivery ignored (idempotency)." : "Signature verified; state updated."),
  };
  db.webhookEvents.insert(evt);
  if (!duplicate) applyEvent(type, orderId);
  return evt;
}

/** Re-delivers the most recent webhook with the same id → ignored duplicate. */
export function replayLastWebhook(): WebhookEvent | null {
  const all = db.webhookEvents.all().filter((e) => e.status === "processed");
  const last = all[all.length - 1];
  if (!last) return null;
  return deliverWebhook(last.type, last.orderId, "Manual replay from demo controls.", last.id);
}
