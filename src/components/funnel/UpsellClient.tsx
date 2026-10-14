"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, CreditCard, Loader2, ShieldCheck, Zap } from "lucide-react";
import { useLocale } from "@/i18n/context";
import { useOrder } from "@/lib/order";
import { mockStripe } from "@/lib/mock/stripe";
import { db, getFlags, setFlags } from "@/lib/mock/db";
import { deliverWebhook } from "@/lib/mock/webhooks";
import { funnelAcceptPath, getFunnelStep } from "@/data/funnel";
import { formatMoney, uid } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

export function UpsellClient({ stepId }: { stepId: string }) {
  const { t, locale } = useLocale();
  const { order, appendUpsellItem, recordFunnelEvent, refresh } = useOrder();
  const router = useRouter();
  const push = useToast();

  const step = getFunnelStep(stepId);
  const [processing, setProcessing] = useState(false);
  const [chargeError, setChargeError] = useState<string | null>(null);
  const shownRef = useRef(false);

  // Funnel routing on mount: redirect away if no order, skip if already decided.
  useEffect(() => {
    if (shownRef.current) return;
    shownRef.current = true;
    if (!step) return;
    refresh();
    const latest = db.orders.all().slice(-1)[0];
    if (!latest) {
      router.replace("/pricing");
      return;
    }
    const decided = db.funnelEvents
      .all()
      .some((e) => e.orderId === latest.id && e.stepId === stepId && e.kind !== "shown");
    if (decided) {
      const evs = db.funnelEvents
        .all()
        .filter((e) => e.orderId === latest.id && e.stepId === stepId && e.kind !== "shown");
      const last = evs[evs.length - 1];
      const next = last?.kind === "accepted" ? step.acceptNext : step.declineNext;
      router.replace(next ? `/upsell/${next}` : "/thank-you");
    } else {
      recordFunnelEvent(stepId, "shown", step.priceCents);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId]);

  if (!step) return null;

  const copy = (
    t.funnel as Record<string, { title: string; subtitle: string; bullets: string[]; valueNote: string }>
  )[stepId];

  const path = funnelAcceptPath();
  const idx = path.indexOf(stepId);
  const current = idx === -1 ? path.length : idx + 1;
  const progressLabel = t.upsell.progressLabel
    .replace("{current}", String(current))
    .replace("{total}", String(path.length));

  const isUpsell = step.kind === "upsell";
  const amount = formatMoney(step.priceCents, locale);
  const acceptLabel =
    step.billing === "recurring"
      ? t.upsell.acceptRecurring.replace("{amount}", amount)
      : t.upsell.accept.replace("{amount}", amount);

  let last4 = "••••";
  try {
    const saved = window.localStorage.getItem("prestia_demo_last4");
    if (saved) last4 = saved;
  } catch {}
  const savedCardNote = t.upsell.savedCardNote.replace("{last4}", last4);

  const go = (next: string | null) =>
    router.push(next ? `/upsell/${next}` : "/thank-you");

  const onAccept = async () => {
    const currentOrder = order ?? db.orders.all().slice(-1)[0];
    if (!currentOrder) {
      router.replace("/pricing");
      return;
    }
    setProcessing(true);
    setChargeError(null);

    const key = `${currentOrder.id}:${stepId}:accept`;
    const flags = getFlags();
    setFlags({ failNextOffSession: false });

    const res = await mockStripe.chargeOffSession({
      amountCents: step.priceCents,
      paymentMethodId: currentOrder.paymentMethodId,
      idempotencyKey: key,
      forceFail: flags.failNextOffSession,
    });

    if (res.ok) {
      appendUpsellItem({
        id: uid("li"),
        kind: "upsell",
        refId: stepId,
        title: copy.title,
        priceCents: step.priceCents,
        billing: step.billing,
      });
      recordFunnelEvent(stepId, "accepted", step.priceCents, key);
      deliverWebhook("payment_intent.succeeded", currentOrder.id, "1-click upsell accepted.");
      push(t.upsell.addedToast, "success");
      go(step.acceptNext);
    } else {
      setChargeError(t.upsell.chargeFailed);
      setProcessing(false);
    }
  };

  const onDecline = () => {
    recordFunnelEvent(stepId, "declined");
    push(t.upsell.declinedNote, "info");
    go(step.declineNext);
  };

  return (
    <section className="mx-auto max-w-2xl px-4 pb-24 pt-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-ink-400">
          {progressLabel}
        </p>
        <div className="mt-3 flex justify-center">
          <Badge tone={isUpsell ? "brand" : "amber"}>
            {isUpsell ? t.upsell.badgeUpsell : t.upsell.badgeDownsell}
          </Badge>
        </div>

        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-lg text-ink-600">{copy.subtitle}</p>

        <Card className="mt-8 p-6 text-start sm:p-8">
          <ul className="flex flex-col gap-3">
            {copy.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-ink-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="flex items-start gap-2 text-sm font-semibold text-amber-800">
              <Zap className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {copy.valueNote}
            </p>
          </div>

          <div className="mt-6 flex items-baseline justify-center gap-1.5">
            <span className="font-display text-5xl font-bold tracking-tight text-ink-950">
              {amount}
            </span>
            {step.billing === "recurring" && (
              <span className="text-sm font-medium text-ink-500">{t.upsell.perMonth}</span>
            )}
          </div>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-500">
            <CreditCard className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {savedCardNote}
          </p>

          <AnimatePresence>
            {chargeError && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-start text-sm text-red-700"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {chargeError}
              </motion.p>
            )}
          </AnimatePresence>

          {processing ? (
            <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-ink-50 p-5 text-sm font-semibold text-ink-700">
              <Loader2 className="h-5 w-5 animate-spin text-brand-600" aria-hidden />
              {t.upsell.processing}
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-3">
              <Button size="lg" className="w-full" onClick={onAccept}>
                {acceptLabel}
              </Button>
              <Button variant="ghost" className="w-full" onClick={onDecline}>
                {t.upsell.decline}
              </Button>
            </div>
          )}
        </Card>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden />
          {t.upsell.guarantee}
        </p>
      </motion.div>
    </section>
  );
}
