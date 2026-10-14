import type { LegalPage } from "@/lib/types";

/**
 * Dynamic legal pages (SOW §5, Template 3).
 * One reusable template renders every page; content lives in the i18n
 * dictionaries keyed by slug, so new legal pages need no new code.
 */
export const LEGAL_PAGES: LegalPage[] = [
  { slug: "terms", updatedAt: "2026-09-01" },
  { slug: "privacy", updatedAt: "2026-09-01" },
  { slug: "refund", updatedAt: "2026-09-01" },
  { slug: "cookies", updatedAt: "2026-09-01" },
];

export function getLegalPage(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find((p) => p.slug === slug);
}
