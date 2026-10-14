"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/i18n/context";
import { formatMoney } from "@/lib/utils";
import { PLANS, planMonthlyEquivalent } from "@/data/plans";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function PricingTeaser() {
  const { t, locale } = useLocale();

  return (
    <section className="bg-ink-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          subtitle={t.pricing.subtitle}
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const copy = t.pricing.plans[plan.id as keyof typeof t.pricing.plans];
            const highlighted = plan.highlighted;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={cn(
                  "relative rounded-3xl border bg-white p-7 shadow-soft",
                  highlighted
                    ? "border-brand-600 ring-2 ring-brand-600/20"
                    : "border-ink-200/70"
                )}
              >
                {highlighted && (
                  <Badge
                    tone="brand"
                    className="absolute -top-3 start-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-600 text-white ring-brand-600 rtl:translate-x-1/2"
                  >
                    {t.common.mostPopular}
                  </Badge>
                )}
                <h3 className="font-display text-lg font-bold text-ink-950">
                  {copy.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{copy.tagline}</p>
                <p className="mt-5">
                  <span className="text-sm text-ink-500">from </span>
                  <span className="font-display text-3xl font-bold text-ink-950">
                    {formatMoney(planMonthlyEquivalent(plan, "monthly"), locale)}
                  </span>
                  <span className="text-sm text-ink-500">{t.pricing.perMonth}</span>
                </p>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-10 text-center"
        >
          <Link href="/pricing">
            <Button size="lg">{t.common.viewPricing}</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
