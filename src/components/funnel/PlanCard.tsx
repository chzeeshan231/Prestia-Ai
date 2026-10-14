"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale } from "@/i18n/context";
import { planMonthlyEquivalent } from "@/data/plans";
import { formatMoney } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { BillingInterval, Plan } from "@/lib/types";

export function PlanCard({
  plan,
  interval,
  onSelect,
}: {
  plan: Plan;
  interval: BillingInterval;
  onSelect: () => void;
}) {
  const { t, locale } = useLocale();
  const copy = t.pricing.plans[plan.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="h-full"
    >
      <Card
        className={cn(
          "relative flex h-full flex-col p-8",
          plan.highlighted && "border-brand-300 ring-2 ring-brand-600 lg:scale-105"
        )}
      >
        {plan.highlighted && (
          <Badge className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2">
            {t.common.mostPopular}
          </Badge>
        )}

        <h3 className="font-display text-xl font-bold text-ink-950">{copy.name}</h3>
        <p className="mt-2 min-h-10 text-sm leading-relaxed text-ink-500">{copy.tagline}</p>

        <div className="mt-6 flex items-baseline gap-1.5">
          <span className="font-display text-4xl font-bold tracking-tight text-ink-950">
            {formatMoney(planMonthlyEquivalent(plan, interval), locale)}
          </span>
          <span className="text-sm font-medium text-ink-500">{t.pricing.perMonth}</span>
        </div>
        {interval === "yearly" && (
          <p className="mt-1 text-xs font-medium text-ink-500">
            {formatMoney(plan.yearlyCents, locale)} · {t.pricing.billedYearlyNote}
          </p>
        )}

        <ul className="mt-8 flex flex-col gap-3">
          {copy.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={plan.highlighted ? "primary" : "outline"}
          className="mt-8 w-full"
          onClick={onSelect}
        >
          {copy.cta}
        </Button>
      </Card>
    </motion.div>
  );
}
