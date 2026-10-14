import { notFound } from "next/navigation";
import { LEGAL_PAGES, getLegalPage } from "@/data/legal";
import { en } from "@/i18n/en";
import LegalClient from "@/components/legal/LegalClient";

export async function generateStaticParams() {
  return LEGAL_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const known = getLegalPage(params.slug);
  if (!known) {
    return { title: `Page not found | ${en.meta.siteName}` };
  }
  // getLegalPage guards the slug, so it is one of the legal page keys.
  const key = params.slug as "terms" | "privacy" | "refund" | "cookies";
  return { title: `${en.legal[key].title} | ${en.meta.siteName}` };
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const page = getLegalPage(params.slug);
  if (!page) notFound();
  return <LegalClient slug={params.slug} />;
}
