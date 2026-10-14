# Architecture — Prestia AI MVP

This document describes the **production architecture** the SOW calls for, and exactly how this
frontend demo **simulates** each piece. The demo reproduces the observable behavior and data shapes
of the production system with zero backend.

## 1. Payment flow (production)

Sequence for a subscription purchase with order bumps (SOW §6–§9):

```text
Browser ──(1) POST /api/checkout ─────────────► Next.js route handler (server)
                                                   │
                                                   ├─(2) validate input, recompute totals
                                                   │     from plan/bump ids (never trust UI)
                                                   ├─(3) Stripe: create Customer + PaymentMethod
                                                   ├─(4) Stripe: confirm PaymentIntent
                                                   │     (on-session, card entered by customer)
                                                   ├─(5) persist order + order_items +
                                                   │     subscription (status: pending) in Supabase
                                                   └─(6) return clientSecret / next step
Browser ──(7) follow funnel ──────────────────► upsell steps
                                                   ├─(8) POST /api/upsell/accept
                                                   │     (one-time step token + idempotency key)
                                                   ├─(9) Stripe: off-session PaymentIntent
                                                   │     on the saved payment method
                                                   └─(10) persist order_item + funnel_event
Stripe ──(11) webhooks ───────────────────────► POST /api/webhooks/stripe
                                                   ├─(12) verify signature (Stripe-Signature)
                                                   ├─(13) idempotency: skip seen event ids
                                                   └─(14) update orders/subscriptions FROM the
                                                        verified event payload only
```

Key invariants the SOW demands:

- Prices are **always computed on the server** from plan/bump ids — the browser never sends a
  total.
- Card data is handled **only by Stripe**; the app stores customer and payment-method *references*.
- Upsell charges are **idempotent**: a repeated request (double-click, retry, replay) returns the
  original result and never charges twice.
- Orders and subscription statuses are updated **only from verified webhook data**, so a browser
  that closes mid-flow still converges to the truth.

## 2. Webhook flow (production)

```
Stripe event delivered to POST /api/webhooks/stripe
        │
        ▼
1. Signature verification — reconstruct the expected signature from the raw body
   + the Stripe webhook secret; reject with 400 on mismatch (no processing).
        │
        ▼
2. Idempotency — look up the event id in `webhook_events`; if present,
   acknowledge 200 and do nothing (replayed deliveries are normal on Stripe).
        │
        ▼
3. Dispatch by type:
     checkout.session.completed  → mark order completed, activate subscription,
                                   record saved payment method
     payment_intent.succeeded    → (upsell) confirm order_item paid
     payment_intent.payment_failed → mark the charge failed; keep the order,
                                   surface the fallback to the customer
     invoice.paid / invoice.payment_failed → update subscription status
                                   (active / past_due) and period dates
     customer.subscription.updated / .deleted → sync plan/period/canceled state
        │
        ▼
4. Persist — all state changes derive from the verified event payload.
   Errors are logged without secrets or card data.
```

## 3. Data model (SOW §10)

Nine tables. In production these are Supabase/Postgres tables with migrations, RLS policies,
foreign keys and indexes; the demo backs the first six with `localStorage` (`src/lib/mock/db.ts`)
and treats the last three as static config/data.

| Table | Purpose | Key fields |
| ----- | ------- | ---------- |
| `customers` | Customer profile + Stripe link | id, email, name, `stripe_customer_id`, created_at |
| `plans` | Tiers, intervals, Stripe price mapping | id (`starter`/`growth`/`enterprise`), monthly_cents, yearly_cents, `stripe_price_ids{}` |
| `orders` | Order status, totals, currency, timestamps | id, customer_id, status (`pending`/`completed`), total_cents, currency, created_at |
| `order_items` | Plan, bumps and upsells per order | id, order_id, kind (`plan`/`bump`/`upsell`), ref_id, title, price_cents, billing (`one_time`/`recurring`) |
| `subscriptions` | Subscription status, period, plan | id, order_id, customer_id, plan_id, interval, status (`pending`/`active`/`past_due`/`canceled`), current_period_start/end |
| `funnel_steps` | Upsell/downsell config + next-step rules | id, kind (`upsell`/`downsell`), price_cents, billing, `accept_next`, `decline_next` |
| `funnel_events` | Offers shown, accepted, declined | id, order_id, step_id, kind (`shown`/`accepted`/`declined`), amount_cents, at |
| `webhook_events` | Processed Stripe event ids (idempotency) | id (Stripe event id), type, order_id, status (`processed`/`ignored_duplicate`), at |
| `legal_pages` | Dynamic legal page content | slug (`terms`/`privacy`/`refund`/`cookies`), updated_at |

Demo note: `plans`, `funnel_steps` and `legal_pages` are static config in the demo
(`src/data/plans.ts`, `src/data/funnel.ts`, `src/data/legal.ts` + i18n copy), matching the SOW's
"configuration table or file that a developer or admin edits". A seventh runtime table exists in
the demo only — `idempotency_keys` — backing off-session charge idempotency; in production the
same role is served by `webhook_events` plus Stripe's own idempotency keys.

## 4. Funnel engine config format

The upsell chain is **data, not code** (SOW §8): each step declares its offer, price and where
accept/decline route next. The chain supports up to 10–15 steps and can be reordered or extended
by editing `src/data/funnel.ts` plus copy in `src/i18n/*.ts` — no code changes. Example step:

```jsonc
{
  "id": "u1-analytics-pro",   // stable id; copy lives in i18n dicts under funnel[id]
  "kind": "upsell",           // "upsell" | "downsell" (downsell = fallback offer)
  "priceCents": 3900,         // charged off-session on accept
  "billing": "one_time",      // "one_time" | "recurring" (recurring = subscription add-on)
  "acceptNext": "u2-team-seats",   // next step id on accept (null = end of funnel)
  "declineNext": "d1-analytics-starter" // next step id on decline (downsell route)
}
```

Runtime behavior per step:

- **Shown** → recorded as a `funnel_events` row (`shown`), progress "Offer {current} of {total}".
- **Accept** → server (demo: `mockStripe.chargeOffSession`) charges the saved payment method with
  an idempotency key `orderId:stepId`; on success an `order_item` is appended and the event is
  recorded (`accepted`), then routing follows `acceptNext`. A one-time step token prevents
  re-accepting the same step by URL manipulation.
- **Decline** → recorded (`declined`), routing follows `declineNext`; declining the final step
  lands on `/thank-you`.
- **Failed charge** → the step shows a fallback ("your main order is safe"); the customer can
  continue without the upsell. The demo can force this path from the Demo controls panel.

The demo's default chain (placeholders, pending client confirmation):

```text
u1-analytics-pro ($39, one-time)
 ├─ accept → u2-team-seats ($25/mo, recurring)
 └─ decline → d1-analytics-starter ($19, one-time, downsell)
                  └─ (accept or decline) → u2-team-seats
u2-team-seats
 ├─ accept/decline → u3-dfy-setup ($149, one-time)
u3-dfy-setup ($149, one-time)
 ├─ accept → end → /thank-you
 └─ decline → d3-setup-workshop ($49, one-time, downsell)
                  └─ (accept or decline) → end → /thank-you
```

## 5. i18n / RTL approach

- One dictionary per locale: `src/i18n/en.ts` is the **shape contract**
  (`export type Dict = typeof en`); `src/i18n/ar.ts` mirrors it exactly — TypeScript enforces
  this (`ar: Dict`). Stable ids (plan ids, bump ids, funnel step ids, legal slugs) are keys and
  are never translated.
- `LocaleProvider` (`src/i18n/context.tsx`) exposes `{ t, locale, dir, setLocale }`, persists
  the choice in `localStorage`, and sets `document.dir` / `document.lang`.
- Styling uses **logical Tailwind properties only** (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`)
  — no physical left/right utilities — so LTR and RTL share one responsive layout.
- Typefaces: Sora (display, Latin), Inter (UI, Latin), Tajawal (Arabic). Numbers/prices format
  via `Intl` (`formatMoney` in `src/lib/utils.ts`), so Arabic locale renders `ar-SA` currency
  formatting automatically.

## 6. Demo simulation map

| Production piece (SOW) | How it is simulated in this demo |
| ---------------------- | -------------------------------- |
| Next.js route handlers / server actions | Client-side service layer: `src/lib/mock/stripe.ts`, `src/lib/mock/webhooks.ts`, `buildCheckoutItems` in `src/lib/order.tsx` |
| Stripe API (customers, payment methods, PaymentIntents) | `mockStripe`: same shapes, fixed test-card outcomes (`4242…` ok, `0002` declined, `3155` 3DS), artificial latency |
| Stripe webhooks + signature verification | `deliverWebhook()`: applies state changes, stores event ids, ignores redeliveries. Signature check is **not real** — noted as simulated in [SECURITY.md](SECURITY.md) |
| Supabase Postgres + RLS | `db` in `src/lib/mock/db.ts`: typed `localStorage` tables (`customers`, `orders`, `subscriptions`, `funnel_events`, `webhook_events`, `idempotency_keys`) |
| Server-side price calculation | `buildCheckoutItems()`: totals derived from plan/bump ids + interval; UI totals never trusted |
| Off-session charges + idempotency keys | `chargeOffSession()`: idempotency-keyed; repeat keys return the original result without re-charging |
| Webhook-driven subscription sync | `applyEvent()` updates order status → completed and subscription → active on `checkout.session.completed` |
| Transactional emails (receipt) | Not sent; thank-you page displays the receipt copy (SOW §17 Q9 pending) |
| Stripe Customer Portal (conditional) | Out of scope for MVP slice; not implemented |
| Admin / visual funnel builder | Out of scope per SOW §18; funnel is a config file (`src/data/funnel.ts`) |
| Legal CMS (Supabase/Markdown) | `src/data/legal.ts` + i18n copy keyed by slug; new pages need no new code |
