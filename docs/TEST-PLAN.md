# Test Plan — Prestia AI MVP demo

SOW §12 requires a test plan covering the full purchase journey: successful purchases per plan,
bump combinations, upsell paths, failure scenarios, duplicate delivery, double-click protection,
RTL and responsive checks, plus a defect list. This plan executes against the frontend demo; every
step is doable in the browser with the demo controls panel.

## How to run

1. `npm install && npm run dev` → open `http://localhost:3000`.
2. Open the floating **Demo controls** panel (bottom-right) — it provides language toggle, "fail
   next off-session charge", webhook replay, activity log link and demo reset.
3. Use the test cards below (simulated; no real charges):

   | Card | Result |
   | ---- | ------ |
   | `4242 4242 4242 4242` | succeeds |
   | `4000 0000 0000 0002` | declined |
   | `4000 0025 0000 3155` | requires 3-D Secure |

   Any future MM/YY expiry and any 3–4 digit CVC pass validation.
4. **Reset demo data** from the demo controls between test cases to start clean.
5. Record results in the defect log template at the end.

Note on "Direct API and database access tests" (SOW §12): there is no server or database in
this demo — security-rule verification is a production activity (see
[docs/SECURITY.md](SECURITY.md) §2). The equivalent demo coverage is the guard-redirect tests
(TP-12, TP-13) and the idempotency tests (TP-09, TP-10).

## Test matrix

| ID | Scenario | Steps in the demo | Expected result |
| -- | -------- | ----------------- | --------------- |
| TP-01 | Purchase Starter, monthly | `/pricing` → Monthly → Starter → `/checkout`: add no bumps, pay `4242…` → walk the funnel declining everything → `/thank-you` | Order shows Starter $29/mo; subscription Active; receipt email note; order + subscription + funnel events in activity log |
| TP-02 | Purchase Growth, yearly | `/pricing` → Yearly → Growth → checkout (no bumps) → `4242…` → decline all → `/thank-you` | Order shows Growth $790/yr (billed yearly, ~$65.83/mo equivalent); subscription Active |
| TP-03 | Purchase Enterprise, monthly | `/pricing` → Monthly → Enterprise → checkout (no bumps) → `4242…` → decline all → `/thank-you` | Order shows Enterprise $199/mo; subscription Active |
| TP-04 | Purchase Enterprise, yearly | `/pricing` → Yearly → Enterprise → checkout (no bumps) → `4242…` → accept all → `/thank-you` | Order shows Enterprise $1990/yr; all 5 funnel offers appear as order items; total = plan + accepted offers |
| TP-05 | Bump combo: none | Checkout with all three bumps unticked → pay `4242…` | Order items = plan only; total = plan price |
| TP-06 | Bump combo: some (1–2) | Tick 1 bump (e.g. AI Prompt Vault Pro $19) → pay | Total = plan + $19; the bump appears as a line item; unticked bumps absent |
| TP-07 | Bump combo: all three | Tick all bumps → pay `4242…` | Total = plan + $19 + $49 + $29 = plan + $97; three bump line items; order summary matches on thank-you page |
| TP-08 | Upsell path: accept all | From checkout success, click "Yes, add it" on u1, u2, u3 | All accepted; order items include Analytics Pro $39, Team Seats $25/mo, DFY Setup $149; progress "Offer n of 5" advances; lands on `/thank-you` |
| TP-09 | Upsell path: decline all → downsell route | Decline u1 → lands on d1 (Analytics Starter $19); decline through to end | Downsell offered after decline; declining everything still lands on `/thank-you` with only the plan (+bumps) charged |
| TP-10 | Upsell path: mixed | Accept u1, decline u2, accept u3; separately: decline u3 → d3 workshop offered | Routing follows `acceptNext`/`declineNext` per `src/data/funnel.ts`; accepted items charged once; declined items never charged |
| TP-11 | Failed card at checkout | Checkout → pay `4000 0000 0000 0002` | "Payment failed — card declined" state; no order created; retry allowed with `4242…` |
| TP-12 | 3-D Secure card at checkout | Checkout → pay `4000 0025 0000 3155` | "Authentication required" modal; "Complete authentication" (simulated) → payment succeeds → funnel starts |
| TP-13 | Failed off-session charge | Demo controls → enable "Fail next off-session charge" → accept an upsell | Upsell shows the failure fallback ("your main order is safe"); funnel continues; the item is not added; the event is recorded |
| TP-14 | Duplicate webhook delivery | Complete a purchase → demo controls → "Replay last webhook" → check `/demo/activity` → Webhooks tab | Second delivery logged as "Ignored (duplicate)"; order/subscription state unchanged (no double-apply) |
| TP-15 | Double-click accept (idempotency) | On an upsell step, double-click "Yes, add it" quickly | Exactly one charge and one order item for the step; the second request returns the original result (duplicate) — totals unchanged |
| TP-16 | Direct `/upsell/*` without an order | Reset demo → visit `/upsell/u1-analytics-pro` directly | Redirected to the start of the funnel (pricing/checkout) — no step renders without an order |
| TP-17 | Direct `/thank-you` without an order | Reset demo → visit `/thank-you` directly | "No completed order found" empty state with CTA back to pricing |
| TP-18 | Direct `/checkout` without a plan | Fresh session → visit `/checkout` directly | "Choose a plan first" notice / redirect to pricing (per `t.checkout.noOrderRedirect`) |
| TP-19 | RTL toggle — all templates | Demo controls → Language → العربية; visit `/`, `/solutions`, `/pricing`, `/checkout`, an upsell step, `/thank-you`, `/legal/terms` | Full RTL mirror: no horizontal overflow, no overlapping elements, logical spacing intact, Arabic copy everywhere, `dir="rtl"` on `<html>` |
| TP-20 | LTR toggle back | Switch back to English | Layout returns to LTR; locale persists across reloads (localStorage) |
| TP-21 | Responsive: mobile | 390×844 viewport: full funnel + legal + activity log | No horizontal scroll; cards stack; nav collapses to menu; CTAs reachable; sticky demo controls don't cover actions |
| TP-22 | Responsive: desktop | 1440×900 viewport: same pages | Multi-column layouts (pricing grid, legal sidebar, activity tabs) render as designed; no orphaned whitespace |
| TP-23 | Reset demo | Complete a purchase → demo controls → "Reset demo data" (confirm) | All tables cleared; activity log empty; draft cleared; toast "Demo data cleared. Starting fresh."; new purchase starts clean |
| TP-24 | Legal pages + 404 | Visit `/legal/terms`, `/legal/privacy`, `/legal/refund`, `/legal/cookies`; visit `/nope` | Each legal page renders its title/sections, correct `<title>` metadata, active sidebar highlight, localized "last updated"; `/nope` shows the localized 404 with home CTA |
| TP-25 | SEO basics | View page source of `/` and a legal page | Title, meta description, Open Graph tags present; `/sitemap.xml` lists routes |

## Release readiness checklist

- [ ] All TP cases pass on desktop Chrome and one mobile viewport.
- [ ] TP-19/TP-20 pass: RTL verified on every template, no layout breakage.
- [ ] No console errors during the happy path (TP-01) or failure paths (TP-11–TP-13).
- [ ] `npm run build` succeeds (static export, no build errors).
- [ ] `npm run typecheck` (`tsc --noEmit`) clean.
- [ ] README demo-honesty note and demo-defaults table reviewed against SOW §17.
- [ ] Defect log below is empty of open P0/P1 items.

## Defect log template

| ID | Date | Test (TP-#) | Severity (P0–P3) | Summary | Steps to reproduce | Expected / Actual | Status |
| -- | ---- | ----------- | ---------------- | ------- | ------------------ | ----------------- | ------ |
| D-01 | YYYY-MM-DD | | | | | | Open |
