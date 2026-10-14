import type { OrderBump } from "@/lib/types";

/**
 * The three configurable order bumps (SOW §7).
 * Copy lives in the i18n dictionaries keyed by bump id.
 *
 * NOTE (demo default, pending client confirmation — SOW §17 Q3):
 * offers and prices below are placeholders.
 */
export const ORDER_BUMPS: OrderBump[] = [
  { id: "prompt-vault", priceCents: 1900, billing: "one_time" },
  { id: "onboarding-call", priceCents: 4900, billing: "one_time" },
  { id: "bonus-credits", priceCents: 2900, billing: "one_time" },
];

export function getBump(id: string): OrderBump {
  return ORDER_BUMPS.find((b) => b.id === id) ?? ORDER_BUMPS[0];
}
