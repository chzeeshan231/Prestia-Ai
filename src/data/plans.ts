import type { Plan } from "@/lib/types";

/**
 * Single source of truth for plan data (SOW §6).
 * Copy lives in the i18n dictionaries keyed by plan id; prices and Stripe
 * price-ID mapping live here so changes are made in one place.
 *
 * NOTE (demo default, pending client confirmation — SOW §17 Q2):
 * prices below are placeholders.
 */
export const PLANS: Plan[] = [
  {
    id: "starter",
    monthlyCents: 2900,
    yearlyCents: 29000,
    stripePriceIds: {
      monthly: "price_test_starter_monthly",
      yearly: "price_test_starter_yearly",
    },
  },
  {
    id: "growth",
    monthlyCents: 7900,
    yearlyCents: 79000,
    stripePriceIds: {
      monthly: "price_test_growth_monthly",
      yearly: "price_test_growth_yearly",
    },
    highlighted: true,
  },
  {
    id: "enterprise",
    monthlyCents: 19900,
    yearlyCents: 199000,
    stripePriceIds: {
      monthly: "price_test_enterprise_monthly",
      yearly: "price_test_enterprise_yearly",
    },
  },
];

export function getPlan(id: string): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}

export function planPrice(plan: Plan, interval: "monthly" | "yearly") {
  return interval === "monthly" ? plan.monthlyCents : plan.yearlyCents;
}

/** Effective monthly price, used for the "per month, billed yearly" display. */
export function planMonthlyEquivalent(plan: Plan, interval: "monthly" | "yearly") {
  return interval === "monthly" ? plan.monthlyCents : Math.round(plan.yearlyCents / 12);
}
