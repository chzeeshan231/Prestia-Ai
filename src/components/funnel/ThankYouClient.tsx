"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Package } from "lucide-react";
import { useLocale } from "@/i18n/context";
import { useOrder } from "@/lib/order";
import { formatDateTime, formatMoney } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/Feedback";

export function ThankYouClient() {
  const { t, locale } = useLocale();
  const { order, subscription, resetDemo } = useOrder();
  const router = useRouter();

  if (!order) {
    return (
      <section className="mx-auto max-w-2xl px-4 pb-24 pt-16">
        <EmptyState
          icon={<Package className="h-6 w-6" aria-hidden />}
          title={t.thankyou.noOrder}
          subtitle=""
          action={
            <Button variant="outline" onClick={() => router.push("/pricing")}>
              {t.thankyou.buttons.home}
            </Button>
          }
        />
      </section>
    );
  }

  const planName = t.pricing.plans[order.planId].name;
  const intervalLabel = order.interval === "monthly" ? t.common.monthly : t.common.yearly;

  return (
    <section className="mx-auto max-w-3xl px-4 pb-24 pt-12 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-lift"
      >
        <Check className="h-10 w-10 text-white" aria-hidden />
      </motion.div>

      <div className="mt-5 flex justify-center">
        <Badge tone="green">{t.thankyou.badge}</Badge>
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
        {t.thankyou.title}
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-ink-600">
        {t.thankyou.subtitle.replace("{email}", order.customer.email)}
      </p>

      <p className="mt-5 text-sm text-ink-500">
        {t.thankyou.orderNumber}{" "}
        <code className="rounded-md bg-ink-100 px-2 py-1 font-mono text-xs text-ink-800">
          {order.id}
        </code>
      </p>

      <Card className="mt-8 p-6 text-start sm:p-8">
        <h2 className="font-display text-lg font-bold text-ink-950">
          {t.thankyou.summaryTitle}
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink-900">{item.title}</p>
                <p className="mt-0.5 text-xs capitalize text-ink-500">{item.kind}</p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-ink-900">
                {formatMoney(item.priceCents, locale)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
          <span className="font-display text-base font-bold text-ink-950">
            {t.thankyou.totalPaid}
          </span>
          <span className="font-display text-2xl font-bold text-ink-950">
            {formatMoney(order.totalCents, locale)}
          </span>
        </div>
      </Card>

      <Card className="mt-6 p-6 text-start sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-ink-950">
            {t.thankyou.subscriptionTitle}
          </h2>
          <Badge tone="green">{t.thankyou.statusActive}</Badge>
        </div>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
              {t.thankyou.planLabel}
            </dt>
            <dd className="mt-1 font-semibold text-ink-900">{planName}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
              {t.thankyou.billingLabel}
            </dt>
            <dd className="mt-1 font-semibold capitalize text-ink-900">{intervalLabel}</dd>
          </div>
          {subscription && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                {t.thankyou.itemsLabel}
              </dt>
              <dd className="mt-1 text-ink-700">
                {formatDateTime(subscription.currentPeriodEnd, locale)}
              </dd>
            </div>
          )}
        </dl>
      </Card>

      <div className="mt-8 text-start">
        <h2 className="font-display text-lg font-bold text-ink-950">
          {t.thankyou.nextStepsTitle}
        </h2>
        <ol className="mt-4 flex flex-col gap-3">
          {t.thankyou.nextSteps.map((s, i) => (
            <li key={s} className="flex items-start gap-3 text-sm text-ink-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={() => router.push("/")}>{t.thankyou.buttons.home}</Button>
        <Button variant="outline" onClick={() => router.push("/demo/activity")}>
          {t.thankyou.buttons.activity}
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            resetDemo();
            router.push("/pricing");
          }}
        >
          {t.thankyou.buttons.newOrder}
        </Button>
      </div>
    </section>
  );
}
