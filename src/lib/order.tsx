"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { db } from "@/lib/mock/db";
import { deliverWebhook } from "@/lib/mock/webhooks";
import { getBump } from "@/data/bumps";
import { getPlan } from "@/data/plans";
import { uid } from "@/lib/utils";
import type {
  BillingInterval,
  BumpId,
  DemoOrder,
  DemoSubscription,
  FunnelEventKind,
  OrderItem,
  PlanId,
} from "@/lib/types";

export interface DraftSelection {
  planId: PlanId;
  interval: BillingInterval;
  bumpIds: BumpId[];
}

export interface PlaceOrderInput {
  customer: { email: string; name: string; country: string };
  planId: PlanId;
  interval: BillingInterval;
  bumpIds: BumpId[];
  stripeCustomerId: string;
  paymentMethodId: string;
  paymentIntentId: string;
  items: OrderItem[];
  totalCents: number;
}

interface OrderValue {
  order: DemoOrder | null;
  subscription: DemoSubscription | null;
  draft: DraftSelection;
  setDraft: (d: Partial<DraftSelection>) => void;
  placeOrder: (input: PlaceOrderInput) => DemoOrder;
  appendUpsellItem: (item: OrderItem) => void;
  recordFunnelEvent: (stepId: string, kind: FunnelEventKind, amountCents?: number, key?: string) => void;
  stepDecided: (stepId: string) => boolean;
  refresh: () => void;
  resetDemo: () => void;
}

const OrderContext = createContext<OrderValue | null>(null);
const DRAFT_KEY = "prestia_demo_draft";

const DEFAULT_DRAFT: DraftSelection = { planId: "growth", interval: "yearly", bumpIds: [] };

function readDraft(): DraftSelection {
  if (typeof window === "undefined") return DEFAULT_DRAFT;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (raw) return { ...DEFAULT_DRAFT, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_DRAFT;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [subscription, setSubscription] = useState<DemoSubscription | null>(null);
  const [draft, setDraftState] = useState<DraftSelection>(DEFAULT_DRAFT);

  const refresh = useCallback(() => {
    const orders = db.orders.all();
    const latest = orders[orders.length - 1] ?? null;
    setOrder(latest);
    setSubscription(
      latest ? db.subscriptions.all().find((s) => s.orderId === latest.id) ?? null : null
    );
  }, []);

  useEffect(() => {
    setDraftState(readDraft());
    refresh();
  }, [refresh]);

  const setDraft = useCallback((d: Partial<DraftSelection>) => {
    setDraftState((prev) => {
      const next = { ...prev, ...d };
      try {
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const placeOrder = useCallback(
    (input: PlaceOrderInput) => {
      const now = new Date().toISOString();
      const periodEnd = new Date();
      if (input.interval === "monthly") periodEnd.setMonth(periodEnd.getMonth() + 1);
      else periodEnd.setFullYear(periodEnd.getFullYear() + 1);

      const customerId = uid("cus_rec");
      db.customers.insert({
        id: customerId,
        email: input.customer.email,
        name: input.customer.name,
        stripeCustomerId: input.stripeCustomerId,
        createdAt: now,
      });

      const newOrder: DemoOrder = {
        id: uid("ord_test"),
        customer: input.customer,
        planId: input.planId,
        interval: input.interval,
        bumpIds: input.bumpIds,
        items: input.items,
        currency: "USD",
        totalCents: input.totalCents,
        status: "processing",
        stripeCustomerId: input.stripeCustomerId,
        paymentMethodId: input.paymentMethodId,
        paymentIntentId: input.paymentIntentId,
        createdAt: now,
      };
      db.orders.insert(newOrder);

      const sub: DemoSubscription = {
        id: uid("sub_test"),
        orderId: newOrder.id,
        planId: input.planId,
        interval: input.interval,
        status: "active",
        currentPeriodEnd: periodEnd.toISOString(),
      };
      db.subscriptions.insert(sub);

      // Simulated webhook delivery (SOW §9): verified + idempotent.
      deliverWebhook("checkout.session.completed", newOrder.id, "Checkout completed; order confirmed.");
      deliverWebhook("payment_intent.succeeded", newOrder.id, "Initial payment captured.");

      refresh();
      return newOrder;
    },
    [refresh]
  );

  const appendUpsellItem = useCallback(
    (item: OrderItem) => {
      setOrder((prev) => {
        if (!prev) return prev;
        const next = {
          ...prev,
          items: [...prev.items, item],
          totalCents: prev.totalCents + item.priceCents,
        };
        db.orders.update(prev.id, { items: next.items, totalCents: next.totalCents });
        return next;
      });
    },
    []
  );

  const recordFunnelEvent = useCallback(
    (stepId: string, kind: FunnelEventKind, amountCents?: number, key?: string) => {
      setOrder((prev) => {
        const orderId = prev?.id ?? db.orders.all().slice(-1)[0]?.id;
        if (!orderId) return prev;
        // Guard: never double-record the same step decision.
        if (kind !== "shown") {
          const dup = db.funnelEvents
            .all()
            .some((e) => e.orderId === orderId && e.stepId === stepId && e.kind !== "shown");
          if (dup) return prev;
        }
        db.funnelEvents.insert({
          id: uid("fev"),
          orderId,
          stepId,
          kind,
          amountCents,
          idempotencyKey: key,
          at: new Date().toISOString(),
        });
        return prev;
      });
    },
    []
  );

  const stepDecided = useCallback(
    (stepId: string) => {
      const orderId = order?.id;
      if (!orderId) return false;
      return db.funnelEvents
        .all()
        .some((e) => e.orderId === orderId && e.stepId === stepId && e.kind !== "shown");
    },
    [order?.id]
  );

  const resetDemo = useCallback(() => {
    db.reset();
    setOrder(null);
    setSubscription(null);
    setDraftState(DEFAULT_DRAFT);
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {}
  }, []);

  const value = useMemo<OrderValue>(
    () => ({
      order,
      subscription,
      draft,
      setDraft,
      placeOrder,
      appendUpsellItem,
      recordFunnelEvent,
      stepDecided,
      refresh,
      resetDemo,
    }),
    [order, subscription, draft, setDraft, placeOrder, appendUpsellItem, recordFunnelEvent, stepDecided, refresh, resetDemo]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}

/** Build the checkout line items (plan + bumps) from a draft — totals computed here, never trusted from UI. */
export function buildCheckoutItems(
  planId: PlanId,
  interval: BillingInterval,
  bumpIds: BumpId[],
  t: {
    plans: Record<PlanId, { name: string }>;
    bumps: Record<BumpId, { name: string }>;
    checkout: { planRow: string };
  }
): { items: OrderItem[]; totalCents: number } {
  const plan = getPlan(planId);
  const price = interval === "monthly" ? plan.monthlyCents : plan.yearlyCents;
  const items: OrderItem[] = [
    {
      id: uid("li"),
      kind: "plan",
      refId: planId,
      title: t.plans[planId].name,
      detail: interval === "monthly" ? t.checkout.planRow + " · monthly" : t.checkout.planRow + " · yearly",
      priceCents: price,
      billing: "recurring",
    },
  ];
  for (const b of bumpIds) {
    const bump = getBump(b);
    items.push({
      id: uid("li"),
      kind: "bump",
      refId: b,
      title: t.bumps[b].name,
      priceCents: bump.priceCents,
      billing: "one_time",
    });
  }
  return { items, totalCents: items.reduce((s, i) => s + i.priceCents, 0) };
}
