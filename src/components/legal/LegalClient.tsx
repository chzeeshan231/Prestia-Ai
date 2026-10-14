"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/i18n/context";
import { LEGAL_PAGES, getLegalPage } from "@/data/legal";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

/** Slugs of the legal pages (see LEGAL_PAGES in "@/data/legal"). */
type LegalPageKey = "terms" | "privacy" | "refund" | "cookies";

export default function LegalClient({ slug }: { slug: string }) {
  const { t, locale } = useLocale();
  const meta = getLegalPage(slug);
  const key = slug as LegalPageKey;
  const page = t.legal[key];

  const updated = meta
    ? new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", { dateStyle: "long" }).format(
        new Date(meta.updatedAt + "T00:00:00")
      )
    : "";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Sidebar: other legal pages */}
        <aside className="order-2 lg:order-1">
          <Card className="lg:sticky lg:top-24 p-3">
            <nav aria-label="Legal pages" className="flex flex-col gap-1">
              {LEGAL_PAGES.map((p) => {
                const label = t.legal[p.slug as LegalPageKey].title;
                const active = p.slug === slug;
                return (
                  <Link
                    key={p.slug}
                    href={`/legal/${p.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200"
                        : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </Card>
        </aside>

        {/* Main content */}
        <article className="order-1 lg:order-2 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-ink-900"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
            {t.legal.backToHome}
          </Link>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink-900">
            {page.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">{page.intro}</p>
          {updated && (
            <p className="mt-3 text-sm text-ink-400">
              {t.legal.updated.replace("{date}", updated)}
            </p>
          )}

          <div className="mt-10 flex flex-col gap-8">
            {page.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-xl font-bold text-ink-900">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-ink-600">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
