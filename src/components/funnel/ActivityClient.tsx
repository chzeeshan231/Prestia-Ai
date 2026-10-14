"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, RotateCcw, Trash2 } from "lucide-react";
import { useLocale } from "@/i18n/context";
import { db } from "@/lib/mock/db";
import { replayLastWebhook } from "@/lib/mock/webhooks";
import { formatDateTime, formatMoney, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/Feedback";
import { useToast } from "@/components/ui/Toast";
import type { DemoOrder, FunnelEvent, WebhookEvent } from "@/lib/types";

type Tab = "funnel" | "webhooks" | "order";

const EVENT_TONE: Record<FunnelEvent["kind"], "ink" | "green" | "amber"> = {
  shown: "ink",
  accepted: "green",
  declined: "amber",
};

export function ActivityClient() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const push = useToast();

  const [tab, setTab] = useState<Tab>("funnel");
  const [funnelEvents, setFunnelEvents] = useState<FunnelEvent[]>([]);
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  const [orders, setOrders] = useState<DemoOrder[]>([]);

  const reload = () => {
    setFunnelEvents(db.funnelEvents.all().slice().reverse());
    setWebhookEvents(db.webhookEvents.all().slice().reverse());
    setOrders(db.orders.all().slice().reverse());
  };

  useEffect(() => {
    reload();
  }, []);

  const latestOrder = orders[0];

  const onReplay = () => {
    const result = replayLastWebhook();
    push(result ? t.activity.replayed : t.activity.noWebhooks, "info");
    reload();
  };

  const onClear = () => {
    db.funnelEvents.clear();
    db.webhookEvents.clear();
    reload();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink-950">
            {t.activity.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">
            {t.activity.subtitle}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear} icon={<Trash2 className="h-4 w-4" />}>
          {t.activity.clearEvents}
        </Button>
      </div>

      <div
        role="tablist"
        aria-label={t.activity.title}
        className="mt-6 inline-flex rounded-2xl border border-ink-200 bg-white p-1.5 shadow-soft"
      >
        {(["funnel", "webhooks", "order"] as const).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              "rounded-xl px-5 py-2.5 text-sm font-semibold transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              tab === key ? "bg-ink-900 text-white shadow-soft" : "text-ink-600 hover:text-ink-900"
            )}
          >
            {t.activity.tabs[key]}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "funnel" &&
          (funnelEvents.length === 0 ? (
            <EmptyState
              icon={<Package className="h-6 w-6" aria-hidden />}
              title={t.activity.empty}
              subtitle=""
              action={
                <Button variant="outline" onClick={() => router.push("/pricing")}>
                  {t.activity.emptyCta}
                </Button>
              }
            />
          ) : (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b border-ink-100 text-start text-xs uppercase tracking-widest text-ink-400">
                      <th className="px-5 py-3 text-start font-semibold">{t.activity.columns.time}</th>
                      <th className="px-5 py-3 text-start font-semibold">{t.activity.columns.event}</th>
                      <th className="px-5 py-3 text-start font-semibold">{t.activity.columns.step}</th>
                      <th className="px-5 py-3 text-start font-semibold">{t.activity.columns.detail}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funnelEvents.map((e) => (
                      <tr key={e.id} className="border-b border-ink-50 last:border-0">
                        <td className="whitespace-nowrap px-5 py-3 text-ink-600">
                          {formatDateTime(e.at, locale)}
                        </td>
                        <td className="px-5 py-3">
                          <Badge tone={EVENT_TONE[e.kind]}>{t.activity[e.kind]}</Badge>
                        </td>
                        <td className="px-5 py-3">
                          <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-xs text-ink-800">
                            {e.stepId}
                          </code>
                        </td>
                        <td className="px-5 py-3 text-ink-600">
                          {e.amountCents != null ? (
                            formatMoney(e.amountCents, locale)
                          ) : e.idempotencyKey ? (
                            <code className="font-mono text-xs">{e.idempotencyKey}</code>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}

        {tab === "webhooks" && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={onReplay} icon={<RotateCcw className="h-4 w-4" />}>
                {t.activity.replay}
              </Button>
            </div>
            {webhookEvents.length === 0 ? (
              <EmptyState
                icon={<Package className="h-6 w-6" aria-hidden />}
                title={t.activity.noWebhooks}
                subtitle=""
              />
            ) : (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead>
                      <tr className="border-b border-ink-100 text-xs uppercase tracking-widest text-ink-400">
                        <th className="px-5 py-3 text-start font-semibold">{t.activity.columns.time}</th>
                        <th className="px-5 py-3 text-start font-semibold">{t.activity.columns.type}</th>
                        <th className="px-5 py-3 text-start font-semibold">{t.activity.columns.status}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {webhookEvents.map((e) => (
                        <tr key={e.id} className="border-b border-ink-50 last:border-0">
                          <td className="whitespace-nowrap px-5 py-3 text-ink-600">
                            {formatDateTime(e.at, locale)}
                          </td>
                          <td className="px-5 py-3">
                            <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-xs text-ink-800">
                              {e.type}
                            </code>
                            <p className="mt-1 text-xs text-ink-400">{e.note}</p>
                          </td>
                          <td className="px-5 py-3">
                            <Badge tone={e.status === "processed" ? "green" : "amber"}>
                              {e.status === "processed" ? t.activity.processed : t.activity.ignored}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        )}

        {tab === "order" &&
          (!latestOrder ? (
            <EmptyState
              icon={<Package className="h-6 w-6" aria-hidden />}
              title={t.activity.noOrder}
              subtitle=""
              action={
                <Button variant="outline" onClick={() => router.push("/pricing")}>
                  {t.activity.emptyCta}
                </Button>
              }
            />
          ) : (
            <Card className="p-6">
              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                    {t.thankyou.orderNumber}
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-ink-800">{latestOrder.id}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                    {t.checkout.email}
                  </dt>
                  <dd className="mt-1 font-semibold text-ink-900">{latestOrder.customer.email}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                    {t.thankyou.itemsLabel}
                  </dt>
                  <dd className="mt-1 font-semibold text-ink-900">{latestOrder.items.length}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                    {t.thankyou.totalPaid}
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-ink-950">
                    {formatMoney(latestOrder.totalCents, locale)}
                  </dd>
                </div>
              </dl>
            </Card>
          ))}
      </div>
    </section>
  );
}
