"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale } from "@/i18n/context";
import { formatMoney, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { BumpId, Locale, OrderBump } from "@/lib/types";

/**
 * Bump display copy. The i18n dictionaries do not ship bump names/descriptions,
 * so they live here per locale (mirrored shape for en/ar).
 */
export const BUMP_COPY: Record<Locale, Record<BumpId, { name: string; desc: string }>> = {
  en: {
    "prompt-vault": {
      name: "AI Prompt Vault Pro",
      desc: "500+ conversion-ready prompts for your funnel copy, emails and ads.",
    },
    "onboarding-call": {
      name: "1:1 Onboarding Call",
      desc: "A 45-minute working session with a conversion specialist to launch faster.",
    },
    "bonus-credits": {
      name: "Bonus AI Credits",
      desc: "Extra AI generation credits for prompts, copy tests and mockups.",
    },
  },
  ar: {
    "prompt-vault": {
      name: "مكتبة البرومبتات الاحترافية",
      desc: "أكثر من 500 برومبت جاهز للتحويل لنصوص مسارك التسويقي ورسائلك وإعلاناتك.",
    },
    "onboarding-call": {
      name: "مكالمة تأهيل فردية",
      desc: "جلسة عمل لمدة 45 دقيقة مع أخصائي تحويل لمساعدتك على الإطلاق بسرعة.",
    },
    "bonus-credits": {
      name: "رصيد إضافي للذكاء الاصطناعي",
      desc: "رصيد إضافي لتوليد البرومبتات واختبار النصوص وإنشاء النماذج.",
    },
  },
};

export function BumpCard({
  bump,
  selected,
  onToggle,
}: {
  bump: OrderBump;
  selected: boolean;
  onToggle: () => void;
}) {
  const { t, locale } = useLocale();
  const copy = BUMP_COPY[locale][bump.id];

  return (
    <motion.div
      layout
      role="checkbox"
      aria-checked={selected}
      aria-label={copy.name}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        selected
          ? "border-brand-500 bg-brand-50/70"
          : "border-ink-200 bg-white hover:border-ink-300"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
          selected ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300 bg-white"
        )}
      >
        {selected && <Check className="h-4 w-4" />}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-ink-900">{copy.name}</span>
          <Badge tone="brand">{t.checkout.bumpBadge}</Badge>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-ink-500">{copy.desc}</p>
      </div>

      <span className="shrink-0 text-sm font-bold text-ink-950">
        +{formatMoney(bump.priceCents, locale)}
      </span>
    </motion.div>
  );
}
