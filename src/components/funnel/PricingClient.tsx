"use client";

import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/i18n/context";
import { useOrder } from "@/lib/order";
import { PLANS } from "@/data/plans";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlanCard } from "@/components/funnel/PlanCard";
import type { BillingInterval } from "@/lib/types";

export function PricingClient() {
  const { t } = useLocale();
  const { draft, setDraft } = useOrder();
  const router = useRouter();

  const interval: BillingInterval = draft.interval;

  const selectInterval = (iv: BillingInterval) => setDraft({ interval: iv });

  const selectPlan = (planId: (typeof PLANS)[number]["id"]) => {
    setDraft({ planId, interval });
    router.push("/checkout");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-16">
      <SectionHeading
        eyebrow={t.pricing.eyebrow}
        title={t.pricing.title}
        subtitle={t.pricing.subtitle}
      />

      <div className="mt-8 flex justify-center">
        <div
          role="group"
          aria-label="Billing interval"
          className="inline-flex rounded-2xl border border-ink-200 bg-white p-1.5 shadow-soft"
        >
          {(["monthly", "yearly"] as const).map((iv) => {
            const active = interval === iv;
            return (
              <button
                key={iv}
                type="button"
                onClick={() => selectInterval(iv)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  active ? "bg-ink-900 text-white shadow-soft" : "text-ink-600 hover:text-ink-900"
                )}
              >
                {iv === "monthly" ? t.pricing.monthly : t.pricing.yearly}
                {iv === "yearly" && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-bold",
                      active ? "bg-brand-500 text-white" : "bg-brand-100 text-brand-700"
                    )}
                  >
                    {t.pricing.saveBadge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            interval={interval}
            onSelect={() => selectPlan(plan.id)}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-semibold text-ink-700">
          <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden />
          {t.pricing.guarantee}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-ink-400">
          {t.pricing.footnote}
        </p>
      </div>
    </section>
  );
}
