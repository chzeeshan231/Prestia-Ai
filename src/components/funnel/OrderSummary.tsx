"use client";

import { Lock, ShieldCheck } from "lucide-react";
import { useLocale } from "@/i18n/context";
import { formatMoney } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import type { BillingInterval, OrderItem } from "@/lib/types";

export function OrderSummary({
  items,
  interval,
}: {
  items: OrderItem[];
  interval: BillingInterval;
}) {
  const { t, locale } = useLocale();

  const subtotal = items.reduce((s, i) => s + i.priceCents, 0);
  const recurring = items
    .filter((i) => i.billing === "recurring")
    .reduce((s, i) => s + i.priceCents, 0);
  const recurringNote = (
    interval === "yearly" ? t.checkout.thenRecurringYearly : t.checkout.thenRecurring
  ).replace("{amount}", formatMoney(recurring, locale));

  return (
    <Card className="p-6">
      <h3 className="font-display text-lg font-bold text-ink-950">
        {t.checkout.orderSummary}
      </h3>

      <div className="mt-5 flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink-900">{item.title}</p>
              {item.detail && (
                <p className="mt-0.5 text-xs capitalize text-ink-500">{item.detail}</p>
              )}
            </div>
            <p className="shrink-0 text-sm font-semibold text-ink-900">
              {formatMoney(item.priceCents, locale)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-ink-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-500">{t.checkout.subtotal}</span>
          <span className="font-semibold text-ink-900">{formatMoney(subtotal, locale)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-display text-base font-bold text-ink-950">
          {t.checkout.dueToday}
        </span>
        <span className="font-display text-2xl font-bold text-ink-950">
          {formatMoney(subtotal, locale)}
        </span>
      </div>
      <p className="mt-1 text-end text-xs text-ink-500">{recurringNote}</p>

      <div className="mt-6 flex flex-col gap-2.5 border-t border-ink-100 pt-4">
        <p className="flex items-center gap-2 text-xs text-ink-500">
          <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {t.checkout.secureNote}
        </p>
        <p className="flex items-center gap-2 text-xs text-ink-500">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
          {t.checkout.guarantee}
        </p>
      </div>
    </Card>
  );
}
