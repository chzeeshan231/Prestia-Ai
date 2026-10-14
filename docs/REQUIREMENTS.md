# PRESTIA AI MVP — Requirements Checklist (from SOW, adapted to frontend-only demo)

Source: `workspace/user/files/PRESTIA_AI_MVP_Scope_of_Work_Dev_Team.pdf`
Build target: Next.js 14 (App Router) + TypeScript + Tailwind, **static export** (frontend-only demo).
All backend pieces (Supabase, Stripe, webhooks) are SIMULATED with mock data + localStorage.
"DEMO DEFAULT" = placeholder value pending client confirmation (SOW §17 questions).

## Template 1 — Landing & Solutions (P0)
- [ ] Home page: hero, features, solutions, social proof, FAQ, CTA
- [ ] Solutions page (consistent design)
- [ ] Clear nav linking into pricing
- [ ] SEO: titles, meta descriptions, OG tags, sitemap
- [ ] Reusable sections

## Template 2 — Sales Funnel (P0)
- [ ] Pricing page: 3 plans (Starter/Growth/Enterprise), monthly/yearly toggle, USD
- [ ] Checkout page: email + billing details, 3 order bumps, live total, loading/error/payment-failure states
- [ ] Upsell & downsell step pages (config-driven chain, one-click accept, decline routing)
- [ ] Thank You page: order confirmation, full order summary, next steps

## Template 3 — Dynamic Legal Pages (P0)
- [ ] One reusable template for Terms, Privacy, Refund (+ Cookies)
- [ ] Content stored as data (no new code per page)

## RTL & Responsiveness (P0)
- [ ] Single responsive layout mobile → desktop
- [ ] Full RTL support (logical properties, locale direction toggle EN/AR)
- [ ] All templates verified in LTR and RTL

## Plans & Subscriptions (P0)
- [ ] 3 tiers, monthly + yearly billing, USD — DEMO DEFAULT prices:
      Starter $29/mo · $290/yr | Growth $79/mo · $790/yr | Enterprise $199/mo · $1,990/yr
- [ ] Plan data from one source (config file)
- [ ] Billing summary at checkout, yearly-discount display
- [ ] Mock subscription statuses (active/past_due/canceled) via simulated webhooks

## Checkout & Order Bumps (P0)
- [ ] Simulated secure checkout flow (mock Stripe: test card scenarios)
- [ ] 3 configurable order bumps, selectable, total updates immediately — DEMO DEFAULT:
      1. AI Prompt Vault Pro — $19 one-time
      2. 1:1 Onboarding Call — $49 one-time
      3. 100K Bonus AI Credits — $29 one-time
- [ ] Bumps recorded as order line items; totals "calculated" in mock service layer

## 1-Click Upsell/Downsell Engine (P0 — core differentiator)
- [ ] Reuse saved payment method (mock token) — no re-entering card
- [ ] Data-driven funnel: offer, price, acceptNext, declineNext (supports 10–15 steps; demo chain = 5 steps)
- [ ] One-click accept charges (simulated) and advances; decline routes to downsell/next
- [ ] Idempotency keys + one-time step tokens (double-click protection)
- [ ] Failed/auth-required payment fallback (3DS simulation)
- [ ] One-time offers AND subscription add-ons — DEMO DEFAULT chain:
      U1 Analytics Pro $39 one-time → D1 Analytics Starter $19 → U2 Team Seats ×5 $25/mo → U3 Done-For-You Setup $149 → D3 Setup Workshop $49 → Thank You
- [ ] Record shown/accepted/declined events (viewable in demo activity log)

## Payments & Webhooks (P0 — simulated)
- [ ] Mock Stripe service: customers, payment methods, payment intents, test cards
- [ ] Simulated webhook delivery with idempotency (duplicate delivery ignored)
- [ ] Order/subscription state updates driven by "verified" mock events
- [ ] Documented test-card procedure in README

## Data (mock Supabase schema, P0)
Tables simulated in localStorage: customers, plans, orders, order_items, subscriptions,
funnel_steps, funnel_events, webhook_events, legal_pages.

## Security (P0 — demo notes)
- [ ] Input validation on all forms; totals computed in mock service (never trusted from UI state alone)
- [ ] docs/SECURITY.md: controls implemented in demo + remaining risks for production

## Testing (P0)
- [ ] docs/TEST-PLAN.md: full purchase journey, bump combos, upsell paths, failed cards, duplicate webhooks, RTL/mobile/desktop
- [ ] QA pass on the running app before delivery

## Docs (P1)
- [ ] README.md (setup, env, architecture, funnel config, deployment, testing, demo credentials)
- [ ] docs/ARCHITECTURE.md (payment flow, webhook flow, data model — production path vs demo simulation)

## Deliverables
- [ ] Source code, ZIP archive (no node_modules), demo walkthrough video, Google Drive upload + share link

## Explicitly OUT of scope (SOW §18)
SaaS dashboard/AI features, customer portal, multi-currency/tax, visual funnel builder, A/B testing,
affiliate/coupons, admin panel, native apps, email/CRM automation, branding/content writing.
