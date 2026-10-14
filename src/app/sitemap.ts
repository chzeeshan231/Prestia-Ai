import { LEGAL_PAGES } from "@/data/legal";
import { FUNNEL_STEPS } from "@/data/funnel";

export default function sitemap() {
  const base = "https://prestia.ai";
  const routes = [
    "",
    "/solutions",
    "/pricing",
    "/checkout",
    "/thank-you",
    "/demo/activity",
    ...FUNNEL_STEPS.map((s) => `/upsell/${s.id}`),
    ...LEGAL_PAGES.map((p) => `/legal/${p.slug}`),
  ];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
  }));
}
