# Prestia AI — MVP Frontend Demo

A complete, interactive, **frontend-only demo** of the PRESTIA AI MVP sales funnel — built from the
Scope of Work (`PRESTIA_AI_MVP_Scope_of_Work_Dev_Team.pdf`, SOW). It demonstrates the marketing site,
the pricing → checkout → upsell → thank-you funnel, and the data-driven 1-click upsell engine,
entirely in the browser.

## Demo honesty note

This repository contains **no backend**. There is no server, no database connection, no real Stripe
account and no real charges. Payments, webhooks, the Supabase data model and the 1-click upsell
charges are all **simulated in the browser** with realistic mock services
(`src/lib/mock/`) and `localStorage`-backed tables. Any "charge", "webhook" or "customer record" you
see is demo state only. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the production
architecture this demo stands in for, and [docs/SECURITY.md](docs/SECURITY.md) for what is —
and is not — real here.

## Features implemented

- **Template 1 — Landing & Solutions** (`/`, `/solutions`): hero with checkout mockup, social-proof
  logos, feature grid, solutions cards, how-it-works steps, testimonials, pricing teaser, FAQ
  accordion, CTA band — all animated with Framer Motion.
- **Template 2 — Sales funnel**: pricing page (`/pricing`) with monthly/yearly toggle; checkout
  (`/checkout`) with plan summary, customer details, card form with validation, and **3 order
  bumps** with live totals; dynamic upsell/downsell steps (`/upsell/[stepId]`) with progress,
  1-click accept / decline routing, downsell fallbacks and simulated 3DS/off-session charge states;
  thank-you page (`/thank-you`) with order confirmation, subscription status and next steps.
- **Template 3 — Dynamic legal pages** (`/legal/terms`, `/legal/privacy`, `/legal/refund`,
  `/legal/cookies`): one reusable template, content from data keyed by slug, sticky sidebar
  navigation, SEO titles, `generateStaticParams` for all pages, locale-aware "last updated" date.
- **404 page**: localized, branded, with a home CTA.
- **Order bump engine**: three configurable bumps (`src/data/bumps.ts`); totals recomputed in the
  service layer, recorded as line items on the order.
- **1-click upsell engine**: data-driven funnel config (`src/data/funnel.ts`) — each step declares
  offer, price, billing type and accept/decline next-steps; off-session charges are simulated with
  **idempotency keys** (double-accept can't double-charge) and one-time step tokens; failed
  off-session charges and 3-D Secure flows have visible fallbacks.
- **Full RTL + Arabic**: English (LTR) and Arabic (RTL, ar-SA) dictionaries (`src/i18n/`); the
  layout uses logical Tailwind properties throughout, `dir` flips per locale, and Tajawal renders
  Arabic. Every template is RTL-verified.
- **Demo activity log** (`/demo/activity`): three tabs — funnel events (shown/accepted/declined),
  simulated webhooks (processed / ignored-duplicate), and the current order.
- **Demo controls panel** (floating, bottom-right): reset all demo data, toggle "fail next
  off-session charge", replay the last webhook (demonstrates idempotency), switch language, jump
  to the activity log.

## Tech stack

- **Next.js 14.2** (App Router) — statically exported (`output: "export"`), no server runtime
- **TypeScript** (strict) — fully typed mock data, services and components
- **Tailwind CSS 3.4** + logical properties for RTL
- **Framer Motion** — page transitions, modals, card/accordion microinteractions
- **Lucide React** — icons (no emojis anywhere)
- Fonts: Sora (display), Inter (Latin UI), Tajawal (Arabic)

## Prerequisites

- **Node.js 18+** (LTS recommended)
- npm (bundled with Node)

## Install, develop, build

```bash
npm install        # install dependencies
npm run dev        # start dev server → http://localhost:3000
npm run build      # production build → static export in out/
npm run typecheck  # tsc --noEmit
npm start          # serve the built site locally (npx serve out)
```

No environment variables, no secrets, no external accounts are required — the demo runs
fully offline in the browser.

## Demo walkthrough

The happy path: **/pricing → /checkout → /upsell/[step]… → /thank-you**

1. Open `/pricing`, toggle **Monthly / Yearly**, pick a plan (Growth is highlighted as most popular).
2. On `/checkout`, fill the demo details (email, name, country), optionally tick order bumps —
   watch the order summary update live. Use a test card below.
3. Pay with `4242 4242 4242 4242` (any future expiry + any CVC). A success webhook is
   "delivered", the subscription flips to Active, and the upsell chain starts.
4. On each `/upsell/[stepId]` page: **Yes, add it** charges the saved card off-session in one
   click (no re-entry); **No thanks** routes to the downsell or next step as configured.
5. Land on `/thank-you`: order summary, subscription status, receipt note, next steps.
6. Open **Demo controls** (bottom-right) → **View activity log** to see funnel events and
   webhooks, or replay the last webhook to watch idempotency ignore the duplicate.

### Test cards (simulated)

| Card number         | Outcome                          |
| ------------------- | -------------------------------- |
| `4242 4242 4242 4242` | Payment succeeds                 |
| `4000 0000 0000 0002` | Card declined                    |
| `4000 0025 0000 3155` | Requires 3-D Secure (simulated) |

Any future expiry (MM/YY) and any 3–4 digit CVC pass validation; card numbers must pass the
Luhn check.

### Demo controls panel

Open the floating **Demo controls** (bottom-right of every page):

- **Language** — toggle English (LTR) / Arabic (RTL) live.
- **Fail next off-session charge** — the next 1-click upsell charge will fail, demonstrating the
  fallback path.
- **Replay last webhook** — re-delivers the most recent webhook with the same event id; it is
  logged as "Ignored (duplicate)" by idempotency.
- **View activity log** — jump to `/demo/activity`.
- **Reset demo data** — clears all localStorage tables and starts fresh.

## Demo defaults — pending client confirmation

The SOW (§17) left several decisions to the client. The demo uses placeholder values below;
**all are marked as pending client confirmation** and live in one place each, so they can be
swapped without code changes.

| SOW §17 question | Demo default (placeholder) | Where |
| ---------------- | -------------------------- | ----- |
| Q2 — plan prices (monthly / yearly, USD) | Starter $29 / $290 · Growth $79 / $790 · Enterprise $199 / $1990 | `src/data/plans.ts` |
| Q3 — the three order bumps + prices | AI Prompt Vault Pro $19 · 1:1 Onboarding Call $49 · Bonus AI Credits $29 (all one-time) | `src/data/bumps.ts`, copy in `src/components/funnel/BumpCard.tsx` |
| Q4 — upsell/downsell offers and order | 1. Analytics Pro $39 → 2. Team Seats $25/mo → 3. DFY Funnel Setup $149; decline #1 → Analytics Starter $19; decline #3 → Setup Workshop $49 | `src/data/funnel.ts` (`acceptNext` / `declineNext` links) |
| Q5 — one-time vs subscription add-ons | Mixed: u1/d1/u3/d3 are one-time; u2 Team Seats is a recurring $25/mo add-on | `src/data/funnel.ts` (`billing` per step) |
| Q6 — languages, which are RTL | English (LTR) + Arabic (RTL, `ar-SA`); Tajawal typeface; USD pricing in both | `src/i18n/en.ts`, `src/i18n/ar.ts` |

Other placeholders: Stripe price IDs are `price_test_*` strings (`src/data/plans.ts`); legal page
content and the "last updated" date (2026-09-01) are sample copy; testimonials and customer logos
are fictional.

## Project structure

```text
prestia-ai-demo/
├── docs/
│   ├── ARCHITECTURE.md   # production architecture vs demo simulation
│   ├── SECURITY.md       # SOW §11 — controls, remaining risks, risk register
│   └── TEST-PLAN.md      # SOW §12 — test matrix, how to run, defect template
├── src/
│   ├── app/              # App Router: page.tsx, solutions/, pricing/, checkout/,
│   │                     #   upsell/[stepId]/, thank-you/, demo/activity/,
│   │                     #   legal/[slug]/, not-found.tsx, sitemap.ts
│   ├── components/
│   │   ├── funnel/       # PricingClient, CheckoutClient, BumpCard, UpsellClient,
│   │   │                 #   ThankYouClient, ActivityClient, OrderSummary, …
│   │   ├── layout/       # Providers, Navbar, FooterClient, DemoBar (demo controls)
│   │   ├── legal/        # LegalClient (shared legal template renderer)
│   │   └── ui/           # Card, Button, Badge, Input, Modal, Toast, Accordion, …
│   ├── data/             # plans.ts, bumps.ts, funnel.ts, legal.ts, site.ts
│   ├── i18n/             # en.ts (shape contract), ar.ts (full Arabic), context.tsx
│   └── lib/
│       ├── mock/         # db.ts (localStorage tables), stripe.ts, webhooks.ts
│       ├── order.tsx     # order context, totals service (never trusts the UI)
│       ├── types.ts      # shared TypeScript types
│       └── utils.ts      # cn(), formatMoney(), luhn, uid, …
├── next.config.mjs       # static export (output: "export")
├── tailwind.config.ts    # brand/ink palette, display font, soft shadows
└── package.json
```

## Mock behavior & limitations

- **No real charges.** `mockStripe` (`src/lib/mock/stripe.ts`) returns the same *shapes* as the
  Stripe API (customers, payment methods, PaymentIntents, off-session charges) with fixed test-card
  behavior and artificial latency.
- **Totals are computed in the service layer.** `buildCheckoutItems` (`src/lib/order.tsx`)
  derives line items and totals from plan/bump ids and the selected interval; UI input is never
  trusted for pricing — mirroring the SOW's "prices calculated on the server" rule.
- **localStorage tables.** `db` (`src/lib/mock/db.ts`) simulates the Supabase tables from SOW §10:
  `customers`, `orders`, `subscriptions`, `funnel_events`, `webhook_events`, `idempotency_keys`.
  Data survives page reloads; "Reset demo data" wipes it.
- **Simulated webhooks.** `deliverWebhook` (`src/lib/mock/webhooks.ts`) stores event ids and
  ignores redeliveries; signature verification always "passes" here — it is **not** real
  verification (see [docs/SECURITY.md](docs/SECURITY.md)).
- **No authentication.** There is no login area or customer portal in this MVP slice (SOW §17 Q8
  was left to the client); the demo tracks one session order.
- **Emails are not sent.** The thank-you page says a receipt "was sent" — in production this is a
  transactional email (SOW §17 Q9 pending).
- Currency is USD everywhere; no tax/VAT automation (SOW §17 Q10 pending).
- **Stock photography** (`public/images/`) and **stock footage** (`public/videos/`) are bundled
  locally so the demo stays fully offline — no hotlinking. Sources: Vecteezy, Pinterest, Entrepreneur,
  Squarespace CDN, CreativePadMedia, UndesignLab, Pexels (team-ideas / team-meeting clips).

## Deployment

The project is a **static export** (`next.config.mjs` → `output: "export"`). `npm run build`
writes the site to `out/` — deploy it to Vercel (`vercel --prod`), Netlify, Cloudflare Pages, or
any static host by serving `out/`. No server functions, no environment variables, no build-time
secrets.

## Docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — payment flow, webhook flow, data model, funnel
  config format, i18n/RTL approach, and the demo simulation map.
- [docs/SECURITY.md](docs/SECURITY.md) — SOW §11 security controls implemented in the demo,
  remaining risks and production requirements, risk register.
- [docs/TEST-PLAN.md](docs/TEST-PLAN.md) — SOW §12 test matrix covering the full purchase
  journey, failure scenarios, idempotency, RTL and responsive checks, plus a defect log template.
