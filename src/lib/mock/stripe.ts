// Simulated Stripe client (SOW §9).
// In production every function below is a server-side route handler or server
// action talking to the real Stripe API. Here the same *shapes* are reproduced
// in the browser so the full purchase journey can be demoed with zero backend.
//
// Test cards (documented in the checkout UI and README):
//   4242 4242 4242 4242  → succeeds
//   4000 0000 0000 0002  → declined
//   4000 0025 0000 3155  → requires 3-D Secure authentication

import { db } from "./db";
import { cardBrand, luhnValid, uid } from "@/lib/utils";

export interface MockPaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: string;
  expYear: string;
}

export interface CardInput {
  number: string;
  exp: string; // MM/YY
  cvc: string;
  name: string;
}

export type ChargeResult =
  | { ok: true; paymentIntentId: string; duplicate?: boolean }
  | { ok: false; code: "card_declined" | "validation_error" | "processing_error"; message: string }
  | { ok: false; code: "requires_action"; clientSecret: string; paymentIntentId: string };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function digits(n: string) {
  return n.replace(/\D/g, "");
}

export const mockStripe = {
  createCustomer(email: string, name: string) {
    return { id: uid("cus_test") };
  },

  createPaymentMethod(card: CardInput): { ok: true; method: MockPaymentMethod } | { ok: false; message: string } {
    const d = digits(card.number);
    if (!luhnValid(d)) return { ok: false, message: "invalid_card" };
    return {
      ok: true,
      method: {
        id: uid("pm_test"),
        brand: cardBrand(d),
        last4: d.slice(-4),
        expMonth: card.exp.slice(0, 2),
        expYear: card.exp.slice(3),
      },
    };
  },

  /** First charge at checkout (on-session). */
  async confirmPayment(opts: {
    amountCents: number;
    method: MockPaymentMethod;
    email: string;
  }): Promise<ChargeResult> {
    await wait(1100);
    const last4 = opts.method.last4;
    if (last4 === "0002") {
      return { ok: false, code: "card_declined", message: "Your card was declined." };
    }
    if (last4 === "3155") {
      const pi = uid("pi_test");
      return { ok: false, code: "requires_action", clientSecret: `${pi}_secret_test`, paymentIntentId: pi };
    }
    return { ok: true, paymentIntentId: uid("pi_test") };
  },

  /** Completes the simulated 3-D Secure challenge. */
  async complete3DS(paymentIntentId: string): Promise<ChargeResult> {
    await wait(900);
    return { ok: true, paymentIntentId };
  },

  /**
   * One-click upsell charge (off-session, SOW §8).
   * Idempotency keys make double charges impossible: a repeated key returns
   * the original result without charging again.
   */
  async chargeOffSession(opts: {
    amountCents: number;
    paymentMethodId: string;
    idempotencyKey: string;
    forceFail?: boolean;
  }): Promise<ChargeResult> {
    const seen = db.idempotency.get(opts.idempotencyKey);
    if (seen) {
      await wait(300);
      if (seen.result === "succeeded") {
        return { ok: true, paymentIntentId: seen.paymentIntentId!, duplicate: true };
      }
      return { ok: false, code: "processing_error", message: "Charge failed.", };
    }
    await wait(900);
    if (opts.forceFail) {
      db.idempotency.insert({
        id: opts.idempotencyKey,
        result: "failed",
        at: new Date().toISOString(),
      });
      return { ok: false, code: "processing_error", message: "Off-session charge failed." };
    }
    const pi = uid("pi_test");
    db.idempotency.insert({
      id: opts.idempotencyKey,
      result: "succeeded",
      paymentIntentId: pi,
      at: new Date().toISOString(),
    });
    return { ok: true, paymentIntentId: pi };
  },
};
