// Shared domain types for the PRESTIA AI demo.
// In production these mirror the Supabase tables from the SOW (customers, plans,
// orders, order_items, subscriptions, funnel_steps, funnel_events, webhook_events).

export type BillingInterval = "monthly" | "yearly";
export type Locale = "en" | "ar";

export type PlanId = "starter" | "growth" | "enterprise";
export type BumpId = "prompt-vault" | "onboarding-call" | "bonus-credits";

export interface Plan {
  id: PlanId;
  monthlyCents: number;
  yearlyCents: number;
  /** Placeholder Stripe price IDs (test mode). Real IDs are mapped here in production. */
  stripePriceIds: Record<BillingInterval, string>;
  highlighted?: boolean;
}

export interface OrderBump {
  id: BumpId;
  priceCents: number;
  billing: "one_time";
}

export type FunnelStepKind = "upsell" | "downsell";

export interface FunnelStep {
  id: string;
  kind: FunnelStepKind;
  priceCents: number;
  billing: "one_time" | "recurring";
  /** Next step on accept; null ends the funnel at the Thank You page. */
  acceptNext: string | null;
  /** Next step on decline; null ends the funnel at the Thank You page. */
  declineNext: string | null;
}

export type OrderItemKind = "plan" | "bump" | "upsell";

export interface OrderItem {
  id: string;
  kind: OrderItemKind;
  refId: string;
  title: string;
  detail?: string;
  priceCents: number;
  billing: "one_time" | "recurring";
}

export type OrderStatus = "draft" | "processing" | "completed" | "failed";

export interface DemoOrder {
  id: string;
  customer: { email: string; name: string; country: string };
  planId: PlanId;
  interval: BillingInterval;
  bumpIds: BumpId[];
  items: OrderItem[];
  currency: "USD";
  totalCents: number;
  status: OrderStatus;
  stripeCustomerId: string;
  paymentMethodId: string;
  paymentIntentId: string;
  createdAt: string;
}

export interface DemoSubscription {
  id: string;
  orderId: string;
  planId: PlanId;
  interval: BillingInterval;
  status: "active" | "past_due" | "canceled";
  currentPeriodEnd: string;
}

export type FunnelEventKind = "shown" | "accepted" | "declined";

export interface FunnelEvent {
  id: string;
  orderId: string;
  stepId: string;
  kind: FunnelEventKind;
  amountCents?: number;
  idempotencyKey?: string;
  at: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  orderId?: string;
  status: "processed" | "ignored_duplicate";
  at: string;
  note: string;
}

export interface LegalPage {
  slug: string;
  updatedAt: string;
}
