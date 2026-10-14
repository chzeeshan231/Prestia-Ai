// English copy dictionary. `ar.ts` must mirror this exact shape (Dict = typeof en).
export const en = {
  meta: {
    siteName: "Prestia AI",
    tagline: "High-converting checkouts, order bumps and 1-click upsells — engineered for SaaS.",
    description:
      "Prestia AI is the high-converting SaaS platform with a dynamic checkout, order bumps and a 1-click upsell engine that lifts revenue per customer.",
  },
  common: {
    getStarted: "Get started",
    viewPricing: "View pricing",
    learnMore: "Learn more",
    back: "Back",
    backHome: "Back to home",
    continue: "Continue",
    cancel: "Cancel",
    close: "Close",
    save: "Save",
    retry: "Try again",
    loading: "Loading…",
    perMonth: "/mo",
    perYear: "/yr",
    oneTime: "one-time",
    monthly: "Monthly",
    yearly: "Yearly",
    billedYearly: "billed yearly",
    mostPopular: "Most popular",
    demoBadge: "Interactive demo",
    secure: "Secure",
  },
  nav: {
    home: "Home",
    solutions: "Solutions",
    pricing: "Pricing",
    faq: "FAQ",
    signIn: "Sign in",
    getStarted: "Get started",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    badge: "New · Dynamic upsell engine 2.0",
    title: "Turn every checkout into",
    titleAccent: "a revenue engine",
    subtitle:
      "Prestia AI pairs a friction-free checkout with order bumps and a 1-click upsell sequence — so each customer is worth more, without adding traffic.",
    ctaPrimary: "Start free trial",
    ctaSecondary: "See how it works",
    microcopy: "No credit card required · Cancel anytime",
    stats: [
      { value: "+38%", label: "average lift in revenue per order" },
      { value: "1-click", label: "upsells with saved payment methods" },
      { value: "15", label: "configurable funnel steps, no code" },
    ],
    mockup: {
      title: "Checkout",
      plan: "Growth plan",
      bump: "Order bump added",
      upsell: "1-click upsell accepted",
      total: "Order total",
    },
  },
  logos: {
    title: "Powering high-converting funnels for modern SaaS teams",
    names: ["Northloop", "Vantia", "Corely", "Brightstack", "Lumeno", "Hexaware"],
  },
  features: {
    eyebrow: "Platform",
    title: "Everything you need to sell more per customer",
    subtitle:
      "A complete conversion stack — from the first click to the final upsell — built on secure, server-side payment handling.",
    items: [
      {
        icon: "zap",
        title: "1-click upsell engine",
        desc: "Charge upsells and downsells off-session with the saved payment method. Up to 15 configurable steps, zero re-typing card details.",
      },
      {
        icon: "shopping-cart",
        title: "Smart order bumps",
        desc: "Three configurable bumps on the checkout page. Totals update instantly and every selection is recorded as a line item.",
      },
      {
        icon: "shield-check",
        title: "Secure by design",
        desc: "Server-side price calculation, verified webhooks, idempotent charges and strict data access rules. Card data never touches your servers.",
      },
      {
        icon: "languages",
        title: "RTL & global ready",
        desc: "One responsive layout with full right-to-left support via logical properties — every template verified in both directions.",
      },
      {
        icon: "git-branch",
        title: "Data-driven funnels",
        desc: "Define offers, prices and accept/decline routing as configuration. Reorder or extend the funnel without code changes.",
      },
      {
        icon: "bar-chart-3",
        title: "Full-funnel analytics",
        desc: "Every offer shown, accepted and declined is recorded — see exactly where revenue is won or lost in your sequence.",
      },
    ],
  },
  solutions: {
    eyebrow: "Solutions",
    title: "Built for teams that live on conversion",
    subtitle: "Whether you sell subscriptions, courses or services — Prestia adapts to your funnel.",
    pageTitle: "Solutions for every go-to-market motion",
    pageSubtitle:
      "Prestia AI molds to the way you sell: subscriptions, one-time offers, or a hybrid of both — with the same high-converting checkout underneath.",
    items: [
      {
        icon: "repeat",
        title: "SaaS subscriptions",
        desc: "Sell Starter, Growth and Enterprise tiers with monthly and yearly billing, proration-ready plans and dunning-safe renewals.",
        bullets: ["Monthly / yearly billing", "Plan upgrades & trials", "Failed-payment recovery"],
      },
      {
        icon: "graduation-cap",
        title: "Courses & coaching",
        desc: "Sell flagship programs with order bumps for workbooks and 1-click upsells for coaching — the classic high-ticket funnel, automated.",
        bullets: ["Bump-friendly checkout", "Coaching upsells", "Downsell safety net"],
      },
      {
        icon: "briefcase",
        title: "Agencies & services",
        desc: "Productize your services: sell audits up front, bump in priority delivery, and upsell monthly retainers in one flow.",
        bullets: ["Productized offers", "Retainer upsells", "Multi-step qualification"],
      },
      {
        icon: "globe",
        title: "Global & RTL markets",
        desc: "Launch in LTR and RTL locales from day one with a single responsive layout and localized checkout copy.",
        bullets: ["Full RTL support", "USD pricing built-in", "Localized templates"],
      },
    ],
    ctaTitle: "Not sure which funnel fits?",
    ctaSubtitle: "Start with a proven template and tune the offers as data comes in.",
    ctaButton: "Browse plans",
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "From click to customer in four steps",
    subtitle: "The funnel your visitors already expect — engineered to convert.",
    steps: [
      { title: "Pick a plan", desc: "Three transparent tiers with monthly or yearly billing. One source of plan data, everywhere." },
      { title: "Checkout with bumps", desc: "Email, billing details and three order bumps. Totals update live as bumps are added." },
      { title: "1-click upsells", desc: "A configurable sequence of upsells and downsells — charged to the saved card, no re-entry." },
      { title: "Thank you & onboard", desc: "Instant confirmation, full order summary and subscription status synced by webhook." },
    ],
  },
  tour: {
    eyebrow: "Product tour",
    title: "Watch Prestia in action",
    subtitle:
      "See how a visitor becomes a high-value customer — plan selection, order bumps and 1-click upsells in under two minutes.",
    play: "Play video",
    duration: "0:22",
    bullets: [
      "Checkout with order bumps",
      "1-click upsells & downsells",
      "Real-time funnel analytics",
    ],
  },
  testimonials: {
    eyebrow: "Social proof",
    title: "Teams feel the lift in week one",
    subtitle: "Real funnels, real numbers — from teams that switched their checkout to Prestia.",
    items: [
      {
        quote:
          "We added three order bumps and a four-step upsell chain in an afternoon. Revenue per order is up 41% and support tickets are down.",
        name: "Maya Chen",
        role: "Growth Lead, Northloop",
        initials: "MC",
      },
      {
        quote:
          "The 1-click upsells are the real deal. Customers never re-enter their card, so our take-rate on the second offer doubled overnight.",
        name: "Daniel Okafor",
        role: "Founder, Vantia",
        initials: "DO",
      },
      {
        quote:
          "RTL support out of the box saved us a month. Our Arabic checkout converts within a point of the English one.",
        name: "Layla Haddad",
        role: "CMO, Lumeno",
        initials: "LH",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple pricing that scales with you",
    subtitle: "Start small, upgrade when the funnel pays for itself. Every plan includes the full conversion engine.",
    monthly: "Monthly",
    yearly: "Yearly",
    saveBadge: "Save 17%",
    perMonth: "/month",
    perYear: "/year",
    billedYearlyNote: "Billed yearly",
    cta: "Choose plan",
    guarantee: "30-day money-back guarantee · Cancel anytime",
    footnote: "Prices in USD. Demo defaults — final pricing subject to client confirmation.",
    plans: {
      starter: {
        name: "Starter",
        tagline: "For solo founders validating their first funnel.",
        cta: "Start with Starter",
        features: [
          "1 active funnel",
          "3 order bumps",
          "5-step upsell chain",
          "Stripe checkout",
          "Email support",
        ],
      },
      growth: {
        name: "Growth",
        tagline: "For teams scaling winning funnels.",
        cta: "Start with Growth",
        features: [
          "10 active funnels",
          "Unlimited order bumps",
          "15-step upsell chain",
          "Downsell routing",
          "Funnel analytics",
          "Priority support",
        ],
      },
      enterprise: {
        name: "Enterprise",
        tagline: "For high-volume brands and agencies.",
        cta: "Talk to sales",
        features: [
          "Unlimited funnels",
          "Everything in Growth",
          "Dedicated success manager",
          "Custom data retention",
          "SSO & audit logs",
          "99.99% uptime SLA",
        ],
      },
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered",
    subtitle: "Everything you need to know before you launch your first funnel.",
    items: [
      {
        q: "Do customers have to re-enter their card for upsells?",
        a: "No. The payment method is securely saved at checkout (tokenized by Stripe) and upsells are charged off-session with one click — the core of the Prestia engine.",
      },
      {
        q: "How many upsell steps can I configure?",
        a: "Up to 15 steps per funnel. Each step defines its offer, price, and where accept or decline routes next — all as data, no code changes needed.",
      },
      {
        q: "Are order bumps really just checkboxes?",
        a: "They are one click on the checkout page, totals update instantly, and each selected bump is recorded as a line item on the order and sent to Stripe.",
      },
      {
        q: "What happens if a payment fails mid-funnel?",
        a: "Failed or authentication-required charges get a clear fallback: the customer can complete authentication or retry, and the funnel resumes without losing the order.",
      },
      {
        q: "Is my customers' card data safe?",
        a: "Card data is handled only by Stripe. Prices are calculated server-side, webhooks are signature-verified, and charges are idempotent — double charges are impossible by design.",
      },
      {
        q: "Does it work in right-to-left languages?",
        a: "Yes. Every template uses logical CSS properties with a per-locale direction setting, and all layouts are verified in both LTR and RTL modes.",
      },
    ],
  },
  cta: {
    title: "Your next customer is one funnel away",
    subtitle: "Launch a high-converting checkout with order bumps and 1-click upsells today.",
    ctaPrimary: "Start free trial",
    ctaSecondary: "View pricing",
    note: "Free 14-day trial · No credit card required",
  },
  footer: {
    tagline: "The high-converting SaaS platform with a dynamic checkout and 1-click upsell engine.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/#features" },
          { label: "Solutions", href: "/solutions" },
          { label: "Pricing", href: "/pricing" },
          { label: "Checkout demo", href: "/pricing" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/solutions" },
          { label: "Contact", href: "mailto:support@prestia.ai" },
          { label: "Activity log", href: "/demo/activity" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms of Service", href: "/legal/terms" },
          { label: "Privacy Policy", href: "/legal/privacy" },
          { label: "Refund Policy", href: "/legal/refund" },
          { label: "Cookie Policy", href: "/legal/cookies" },
        ],
      },
    ],
    bottom: "© 2026 Prestia AI. All rights reserved.",
    demoNote: "Frontend demo — payments are simulated, no real charges.",
  },
  checkout: {
    title: "Secure checkout",
    subtitle: "Complete your order below. This demo simulates payment — no real charge is made.",
    steps: ["Plan", "Details", "Payment"],
    planStep: "Your plan",
    changePlan: "Change",
    detailsTitle: "Your details",
    email: "Email address",
    emailPlaceholder: "you@company.com",
    fullName: "Full name",
    fullNamePlaceholder: "Alex Morgan",
    country: "Country",
    selectCountry: "Select country",
    paymentTitle: "Payment",
    cardNumber: "Card number",
    cardName: "Name on card",
    expiry: "Expiry",
    cvc: "CVC",
    payButton: "Pay",
    processing: "Processing payment…",
    bumpsTitle: "Boost your order",
    bumpsSubtitle: "Add these one-time offers with a single click.",
    bumpBadge: "One-time",
    added: "Added",
    orderSummary: "Order summary",
    planRow: "plan",
    subtotal: "Subtotal",
    dueToday: "Due today",
    thenRecurring: "then {amount}/mo",
    thenRecurringYearly: "then {amount}/yr",
    total: "Total",
    secureNote: "256-bit encrypted · Powered by Stripe (simulated)",
    guarantee: "30-day money-back guarantee",
    testCardsTitle: "Demo test cards",
    testCardsNote: "Use these card numbers to explore payment states:",
    testCards: [
      { number: "4242 4242 4242 4242", result: "Payment succeeds" },
      { number: "4000 0000 0000 0002", result: "Card declined" },
      { number: "4000 0025 0000 3155", result: "Requires 3-D Secure" },
    ],
    errors: {
      required: "This field is required",
      email: "Enter a valid email address",
      cardNumber: "Enter a valid card number",
      expiry: "Use MM/YY format",
      expiryPast: "Card is expired",
      cvc: "3–4 digits",
      cardName: "Enter the name on the card",
    },
    failedTitle: "Payment failed",
    failedDeclined: "Your card was declined. Try a different card or use 4242 4242 4242 4242 to simulate success.",
    failedGeneric: "Something went wrong processing your payment. Please try again.",
    authTitle: "Authentication required",
    authBody: "Your bank requires 3-D Secure authentication for this payment. Complete the check below to continue — this is simulated.",
    authButton: "Complete authentication",
    authProcessing: "Verifying…",
    noOrderRedirect: "Choose a plan first to start checkout.",
  },
  upsell: {
    badgeUpsell: "Special one-time offer",
    badgeDownsell: "Wait — how about this instead?",
    progressLabel: "Offer {current} of {total}",
    whyTitle: "Why customers add this",
    guarantee: "Covered by the 30-day money-back guarantee",
    accept: "Yes, add it — {amount}",
    acceptRecurring: "Yes, add it — {amount}/mo",
    decline: "No thanks, continue",
    processing: "Adding to your order…",
    addedToast: "Added to your order",
    declinedNote: "No problem — continuing…",
    noCard: "No saved payment method found. Please complete checkout first.",
    chargeFailed: "The extra charge failed. You can continue without it — your main order is safe.",
    savedCardNote: "Charged to your saved card ending in {last4} — no need to re-enter details.",
    perMonth: "/mo",
  },
  funnel: {
    "u1-analytics-pro": {
      title: "Prestia Analytics Pro",
      subtitle: "See exactly which step prints money.",
      bullets: [
        "Funnel drop-off map for every step",
        "Revenue attribution per offer",
        "Real-time conversion alerts",
      ],
      valueNote: "Normally $79 — today only $39.",
    },
    "d1-analytics-starter": {
      title: "Analytics Starter",
      subtitle: "The essentials, at a starter price.",
      bullets: ["Core conversion dashboard", "Offer take-rate tracking", "Weekly email digest"],
      valueNote: "A lighter cut of Analytics Pro — just $19.",
    },
    "u2-team-seats": {
      title: "5 Team Seats",
      subtitle: "Bring the whole growth team.",
      bullets: [
        "5 seats with role-based access",
        "Shared funnel workspaces",
        "Comment & approve flows",
      ],
      valueNote: "$25/mo, cancel anytime.",
    },
    "u3-dfy-setup": {
      title: "Done-For-You Funnel Setup",
      subtitle: "We build your first funnel for you.",
      bullets: [
        "Funnel built from a proven template",
        "Copy review by a conversion specialist",
        "Launch checklist & QA pass",
      ],
      valueNote: "Normally $299 — today $149.",
    },
    "d3-setup-workshop": {
      title: "Funnel Setup Workshop (recorded)",
      subtitle: "Build it yourself, guided step by step.",
      bullets: ["90-minute recorded workshop", "Templates & checklists included", "Lifetime access"],
      valueNote: "Just $49, yours to keep.",
    },
  },
  thankyou: {
    badge: "Payment successful",
    title: "You're in! Welcome to Prestia AI.",
    subtitle: "Your order is confirmed and your subscription is active. A receipt was sent to {email}.",
    orderNumber: "Order",
    summaryTitle: "Order summary",
    subscriptionTitle: "Subscription",
    statusActive: "Active",
    nextStepsTitle: "What happens next",
    nextSteps: [
      "Check your inbox for the receipt and login link.",
      "Your workspace is being provisioned — about 2 minutes.",
      "Join the onboarding call from your dashboard to launch faster.",
    ],
    buttons: {
      home: "Back to home",
      activity: "View activity log",
      newOrder: "Start a new demo order",
    },
    planLabel: "Plan",
    billingLabel: "Billing",
    itemsLabel: "Items",
    totalPaid: "Total paid",
    noOrder: "No completed order found. Start with a plan to see this page.",
  },
  legal: {
    updated: "Last updated: {date}",
    backToHome: "Back to home",
    terms: {
      title: "Terms of Service",
      intro: "These Terms govern your use of Prestia AI. By creating an account or completing a purchase, you agree to them.",
      sections: [
        {
          heading: "1. The service",
          body: [
            "Prestia AI provides a hosted SaaS platform for building high-converting checkouts, order bumps and upsell funnels. We may update features provided the core functionality described at purchase remains available.",
          ],
        },
        {
          heading: "2. Accounts & acceptable use",
          body: [
            "You must provide accurate account information and keep credentials confidential. You may not use the service for unlawful activity, to process payments for prohibited goods, or to attempt to disrupt the platform.",
          ],
        },
        {
          heading: "3. Subscriptions & billing",
          body: [
            "Plans are billed monthly or yearly in USD. Subscriptions renew automatically until canceled. You can cancel anytime; access continues until the end of the billing period. Prices are exclusive of applicable taxes.",
          ],
        },
        {
          heading: "4. Refunds",
          body: [
            "Purchases are covered by our 30-day money-back guarantee as described in the Refund Policy. One-time add-ons are refundable within 30 days of purchase.",
          ],
        },
        {
          heading: "5. Limitation of liability",
          body: [
            "To the maximum extent permitted by law, Prestia AI is not liable for indirect or consequential damages. Our total liability for any claim is limited to the fees you paid in the 12 months before the claim.",
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      intro: "We collect the minimum data needed to run your funnels and process payments securely.",
      sections: [
        {
          heading: "1. Data we collect",
          body: [
            "Account data (name, email), order data (plan, items, totals) and payment metadata (Stripe customer and payment-method references). Card numbers are handled only by Stripe and never touch our servers.",
          ],
        },
        {
          heading: "2. How we use it",
          body: [
            "To provide the service, process payments, prevent fraud, and — with consent — send product updates. We never sell personal data.",
          ],
        },
        {
          heading: "3. Data sharing",
          body: [
            "We share data only with processors required to operate the service: Stripe (payments) and our hosting provider. Each is bound by data-processing terms.",
          ],
        },
        {
          heading: "4. Your rights",
          body: [
            "You may request access, correction or deletion of your personal data at any time by contacting support@prestia.ai. We respond within 30 days.",
          ],
        },
        {
          heading: "5. Security",
          body: [
            "Data is encrypted in transit and at rest, access follows least-privilege principles, and payment webhooks are signature-verified before any state changes.",
          ],
        },
      ],
    },
    refund: {
      title: "Refund Policy",
      intro: "Simple and fair: if Prestia AI isn't for you, you get your money back.",
      sections: [
        {
          heading: "1. 30-day money-back guarantee",
          body: [
            "All plans and one-time offers are covered for 30 days from purchase. Contact support within the window for a full refund, no questions asked.",
          ],
        },
        {
          heading: "2. How refunds are issued",
          body: [
            "Refunds go to the original payment method within 5–10 business days. Yearly plans are refunded in full within the first 30 days, then prorated.",
          ],
        },
        {
          heading: "3. After 30 days",
          body: [
            "Subscriptions can be canceled anytime with access until the period ends. One-time purchases outside the window are assessed case by case.",
          ],
        },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      intro: "We use a small number of cookies to keep you signed in and understand usage.",
      sections: [
        {
          heading: "1. Essential cookies",
          body: [
            "Required for sign-in, checkout state and security (e.g. CSRF protection). The service cannot function without these.",
          ],
        },
        {
          heading: "2. Analytics cookies",
          body: [
            "Privacy-friendly analytics help us improve conversion templates. You can opt out in your account settings at any time.",
          ],
        },
        {
          heading: "3. Managing cookies",
          body: [
            "Most browsers let you block or delete cookies. Blocking essential cookies will prevent checkout from working.",
          ],
        },
      ],
    },
  },
  activity: {
    title: "Demo activity log",
    subtitle: "Every funnel event and simulated webhook for this demo session. In production this data lives in Supabase.",
    tabs: { funnel: "Funnel events", webhooks: "Webhooks", order: "Current order" },
    columns: { time: "Time", event: "Event", step: "Step", detail: "Detail", type: "Type", status: "Status" },
    empty: "No events yet. Complete a checkout to see the funnel engine in action.",
    emptyCta: "Go to pricing",
    shown: "Offer shown",
    accepted: "Offer accepted",
    declined: "Offer declined",
    processed: "Processed",
    ignored: "Ignored (duplicate)",
    replay: "Replay last webhook",
    replayed: "Webhook replayed — duplicate ignored by idempotency.",
    noWebhooks: "No webhooks delivered yet.",
    noOrder: "No order in this session yet.",
    clearEvents: "Clear log",
  },
  demo: {
    title: "Demo controls",
    subtitle: "This is a frontend-only demo. Payments, webhooks and the database are simulated in your browser.",
    reset: "Reset demo data",
    resetDone: "Demo data cleared. Starting fresh.",
    viewActivity: "View activity log",
    failNext: "Fail next off-session charge",
    failNextOn: "ON — the next 1-click upsell charge will fail",
    failNextOff: "OFF",
    replayNote: "Simulate duplicate webhook delivery to see idempotency in action.",
    language: "Language",
  },
  notFound: {
    title: "Page not found",
    subtitle: "The page you're looking for doesn't exist or was moved.",
    cta: "Back to home",
  },
};

export type Dict = typeof en;
