import type { FunnelStep } from "@/lib/types";

/**
 * Data-driven upsell / downsell engine configuration (SOW §8).
 * Each step declares its offer, price and the next step for accept and decline.
 * The chain can be reordered or extended to 10–15 steps without code changes —
 * add entries here and matching copy in the i18n dictionaries.
 *
 * NOTE (demo default, pending client confirmation — SOW §17 Q4/Q5):
 * offers, prices and ordering below are placeholders.
 */
export const FUNNEL_STEPS: FunnelStep[] = [
  {
    id: "u1-analytics-pro",
    kind: "upsell",
    priceCents: 3900,
    billing: "one_time",
    acceptNext: "u2-team-seats",
    declineNext: "d1-analytics-starter",
  },
  {
    id: "d1-analytics-starter",
    kind: "downsell",
    priceCents: 1900,
    billing: "one_time",
    acceptNext: "u2-team-seats",
    declineNext: "u2-team-seats",
  },
  {
    id: "u2-team-seats",
    kind: "upsell",
    priceCents: 2500,
    billing: "recurring",
    acceptNext: "u3-dfy-setup",
    declineNext: "u3-dfy-setup",
  },
  {
    id: "u3-dfy-setup",
    kind: "upsell",
    priceCents: 14900,
    billing: "one_time",
    acceptNext: null,
    declineNext: "d3-setup-workshop",
  },
  {
    id: "d3-setup-workshop",
    kind: "downsell",
    priceCents: 4900,
    billing: "one_time",
    acceptNext: null,
    declineNext: null,
  },
];

export const FUNNEL_ENTRY = "u1-analytics-pro";

export function getFunnelStep(id: string): FunnelStep | undefined {
  return FUNNEL_STEPS.find((s) => s.id === id);
}

/** Ordered list of step ids from entry to end, following accept-links (for progress UI). */
export function funnelAcceptPath(): string[] {
  const path: string[] = [];
  let cur: string | null = FUNNEL_ENTRY;
  const seen = new Set<string>();
  while (cur && !seen.has(cur)) {
    seen.add(cur);
    path.push(cur);
    cur = getFunnelStep(cur)?.acceptNext ?? null;
  }
  return path;
}
