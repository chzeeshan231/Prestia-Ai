# Security — Prestia AI MVP

SOW §11 requires a security baseline: server-side payment processing, verified webhooks, strict
data access rules, and a summary of controls implemented plus remaining risks. This document is
that summary, split into what the **demo** enforces and what **production** must still add.

## 1. Controls implemented in this demo

These are real, working behaviors in the demo code — they model the production controls:

| Control (SOW §11) | Implementation |
| ----------------- | -------------- |
| **Input validation** | Checkout form validates email format, Luhn card number, MM/YY expiry (incl. past-date), 3–4 digit CVC and required fields client-side (`t.checkout.errors`); invalid input blocks submission. |
| **Prices never trusted from the browser** | `buildCheckoutItems()` (`src/lib/order.tsx`) recomputes line items and totals from plan id + bump ids + interval against the canonical data in `src/data/`. UI-submitted totals are ignored — the same rule the SOW requires of the server. |
| **Idempotent charges** | `chargeOffSession()` (`src/lib/mock/stripe.ts`) keys every off-session charge by `orderId:stepId` in the `idempotency_keys` table; a repeated key returns the original result (marked `duplicate`) and never charges again. Double-click accept is safe. |
| **Idempotent webhooks** | `deliverWebhook()` (`src/lib/mock/webhooks.ts`) stores every event id in `webhook_events`; redeliveries are logged as `ignored_duplicate` and apply no state change. "Replay last webhook" in the demo controls demonstrates this. |
| **State changes only from webhook data** | `applyEvent()` updates order/subscription status only from the (simulated) webhook payload — never from UI assertions. |
| **No secrets in the repo** | There are no API keys, webhook secrets, service-role keys or credentials anywhere in the code. Stripe price IDs are `price_test_*` placeholders. |
| **No sensitive data in logs/UI** | Simulated error messages never include card data; full card numbers are never stored (only brand + last4 in the payment-method mock). |
| **Protected funnel progression** | Upsell steps require an active order context and unused step tokens; deep-linking `/upsell/*` or `/thank-you` without an order redirects back to the start of the funnel. |

### Explicitly NOT real in the demo

- **Webhook signature verification is simulated.** `deliverWebhook()` marks events
  "Signature verified" by convention — no cryptographic check occurs. Production must implement
  real verification (see §2).
- **There is no server boundary.** All "server-side" logic runs in the browser, so a determined
  user could tamper with it. The demo's architecture *models* the boundary; production must
  *enforce* it.
- **No authentication / RLS.** The demo tracks one session order with no login (SOW §17 Q8 left
  to the client). There is no access control to evaluate — every table is effectively public in
  the browser.

## 2. Production requirements (remaining work)

Before any real money moves, the following must be implemented for real:

1. **Server-side enforcement.** Move all payment logic to Next.js route handlers or server
   actions. The browser must never compute totals, create charges, or hold secrets.
2. **Real webhook signature verification.** Verify `Stripe-Signature` against the raw request
   body with the webhook secret on every request; reject mismatches with 400 before any
   processing or logging of the payload.
3. **Supabase Row Level Security.** Enable RLS on all nine tables with per-table policies
   (customers read only their own rows; service-role key used server-side only, never shipped to
   the browser). Version-controlled SQL migrations for schema + policies.
4. **Rate limiting.** Throttle `/api/checkout` and `/api/upsell/*` endpoints (and the webhook
   endpoint) against card-testing and replay abuse.
5. **Secure headers + HTTPS only.** HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`, and
   HTTPS everywhere (Vercel provides this by default; verify headers in production).
6. **Dependency audit.** `npm audit` (and GitHub Dependabot / `next lint` build checks) clean of
   critical issues before delivery; keep Next.js 14 on its latest patched 14.x release per the
   SOW.
7. **Secret management.** All Stripe/Supabase keys in environment variables (Vercel project
   settings), never committed; credentials shared only through the client's approved secure
   process.
8. **Safe logging.** Log payment errors with correlation ids only — no card data, no secrets, no
   PII in logs or user-facing errors.
9. **XSS/CSRF/injection hygiene.** React escapes by default; add CSRF protection to
   state-changing routes, parameterized queries (Supabase client), and strict validation on every
   server input.

## 3. Risk register

| # | Risk | Likelihood | Impact | Status / mitigation |
| - | ---- | ---------- | ------ | ------------------- |
| R1 | Demo mistaken for production-ready payment code | Medium | High | This document + README demo-honesty note; all mock files are explicitly commented as simulated. |
| R2 | Price tampering in the browser | N/A in demo (no server) / High if shipped as-is | High | Production: totals computed server-side only; never accept client totals. |
| R3 | Forged webhook events | High if signature check skipped | High | Production: real `Stripe-Signature` verification (§2.2). |
| R4 | Double charging on retries / double-clicks | Medium | High | Demo models idempotency keys; production must use Stripe idempotency keys + `webhook_events` dedupe. |
| R5 | Secret leakage (service-role key, webhook secret) | Medium | High | Env-only storage; never in repo or bundle; least-privilege accounts (SOW §4). |
| R6 | Card data touching app servers/logs | Low | Critical | Stripe-only card handling; log scrubbing; never persist full PAN. |
| R7 | Unauthorized data access (no RLS yet) | High until RLS ships | High | RLS policies on all tables before launch; customers read only own records. |
| R8 | Card-testing / brute-force on checkout endpoints | Medium | Medium | Rate limiting + Stripe Radar; monitor failed-charge velocity. |
| R9 | Vulnerable dependencies | Medium | Medium | `npm audit` clean pre-delivery; patched Next.js 14.x; Dependabot on. |
| R10 | Scope creep into out-of-scope areas (SOW §18) expanding attack surface | Low | Medium | Change-request process for admin panels, portals, coupons, multi-currency. |
