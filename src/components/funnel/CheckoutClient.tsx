"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CreditCard, Lock, Pencil } from "lucide-react";
import { useLocale } from "@/i18n/context";
import { buildCheckoutItems, useOrder } from "@/lib/order";
import { mockStripe, type MockPaymentMethod } from "@/lib/mock/stripe";
import { getPlan, planPrice } from "@/data/plans";
import { ORDER_BUMPS } from "@/data/bumps";
import { FUNNEL_ENTRY } from "@/data/funnel";
import { formatMoney, luhnValid } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { BumpCard, BUMP_COPY } from "@/components/funnel/BumpCard";
import { OrderSummary } from "@/components/funnel/OrderSummary";
import { MockCardElement, type MockCardValue } from "@/components/funnel/MockCardElement";
import type { BumpId } from "@/lib/types";

const COUNTRIES = [
  "US",
  "UK",
  "Canada",
  "Australia",
  "Germany",
  "UAE",
  "Saudi Arabia",
  "Pakistan",
  "India",
];

interface AuthState {
  open: boolean;
  piId: string;
  processing: boolean;
}

export function CheckoutClient() {
  const { t, locale } = useLocale();
  const { draft, placeOrder } = useOrder();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [bumpIds, setBumpIds] = useState<BumpId[]>(draft.bumpIds ?? []);
  const [card, setCard] = useState<MockCardValue>({ number: "", exp: "", cvc: "", name: "" });
  const [errors, setErrors] = useState<
    Partial<Record<"email" | "name" | "country" | "number" | "exp" | "cvc" | "cardName", string>>
  >({});
  const [processing, setProcessing] = useState(false);
  const [chargeError, setChargeError] = useState<string | null>(null);
  const [auth, setAuth] = useState<AuthState | null>(null);
  const pmRef = useRef<MockPaymentMethod | null>(null);

  const plan = getPlan(draft.planId);
  const itemsT = { plans: t.pricing.plans, bumps: BUMP_COPY[locale], checkout: t.checkout };

  const { items, totalCents } = useMemo(
    () => buildCheckoutItems(draft.planId, draft.interval, bumpIds, itemsT),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draft.planId, draft.interval, bumpIds, locale]
  );

  const toggleBump = (id: BumpId) =>
    setBumpIds((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));

  const validate = () => {
    const errs: Partial<
      Record<"email" | "name" | "country" | "number" | "exp" | "cvc" | "cardName", string>
    > = {};
    if (!email.trim()) errs.email = t.checkout.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = t.checkout.errors.email;
    if (!fullName.trim()) errs.name = t.checkout.errors.required;
    if (!country) errs.country = t.checkout.errors.required;

    if (!luhnValid(card.number)) errs.number = t.checkout.errors.cardNumber;

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.exp)) {
      errs.exp = t.checkout.errors.expiry;
    } else {
      const [mm, yy] = card.exp.split("/").map(Number);
      const endOfMonth = new Date(2000 + yy, mm);
      if (endOfMonth <= new Date()) errs.exp = t.checkout.errors.expiryPast;
    }

    if (!/^\d{3,4}$/.test(card.cvc)) errs.cvc = t.checkout.errors.cvc;
    if (!card.name.trim()) errs.cardName = t.checkout.errors.cardName;
    return errs;
  };

  const completeOrder = (paymentIntentId: string) => {
    const method = pmRef.current;
    if (!method) {
      setChargeError(t.checkout.failedGeneric);
      setProcessing(false);
      return;
    }
    const built = buildCheckoutItems(draft.planId, draft.interval, bumpIds, itemsT);
    const customer = mockStripe.createCustomer(email.trim(), fullName.trim());
    try {
      window.localStorage.setItem("prestia_demo_last4", method.last4);
    } catch {}
    placeOrder({
      customer: { email: email.trim(), name: fullName.trim(), country },
      planId: draft.planId,
      interval: draft.interval,
      bumpIds,
      stripeCustomerId: customer.id,
      paymentMethodId: method.id,
      paymentIntentId,
      items: built.items,
      totalCents: built.totalCents,
    });
    router.push(`/upsell/${FUNNEL_ENTRY}`);
  };

  const onPay = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setChargeError(null);
    setProcessing(true);

    const pm = mockStripe.createPaymentMethod({
      number: card.number,
      exp: card.exp,
      cvc: card.cvc,
      name: card.name,
    });
    if (!pm.ok) {
      setChargeError(t.checkout.failedGeneric);
      setProcessing(false);
      return;
    }
    pmRef.current = pm.method;

    const res = await mockStripe.confirmPayment({
      amountCents: totalCents,
      method: pm.method,
      email: email.trim(),
    });

    if (!res.ok && res.code === "requires_action") {
      setProcessing(false);
      setAuth({ open: true, piId: res.paymentIntentId, processing: false });
      return;
    }
    if (!res.ok) {
      setChargeError(
        res.code === "card_declined" ? t.checkout.failedDeclined : t.checkout.failedGeneric
      );
      setProcessing(false);
      return;
    }
    completeOrder(res.paymentIntentId);
  };

  const completeAuth = async () => {
    if (!auth) return;
    setAuth({ ...auth, processing: true });
    const res = await mockStripe.complete3DS(auth.piId);
    setAuth(null);
    if (res.ok) {
      setProcessing(true);
      completeOrder(res.paymentIntentId);
    } else {
      setChargeError(t.checkout.failedGeneric);
      setProcessing(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-10">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
          {t.checkout.title}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-500">
          {t.checkout.subtitle}
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <ProgressSteps steps={t.checkout.steps} current={processing ? 2 : 1} />
      </div>

      <AnimatePresence>
        {chargeError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            role="alert"
            className="mx-auto mb-6 flex max-w-3xl items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden />
            <div>
              <p className="text-sm font-bold text-red-800">{t.checkout.failedTitle}</p>
              <p className="mt-1 text-sm text-red-700">{chargeError}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex min-w-0 flex-col gap-6">
          {/* Plan */}
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-400">
                  {t.checkout.planStep}
                </p>
                <p className="mt-1.5 font-display text-lg font-bold text-ink-950">
                  {t.pricing.plans[draft.planId].name}
                  <span className="ms-2 text-sm font-medium capitalize text-ink-500">
                    · {draft.interval === "monthly" ? t.common.monthly : t.common.yearly}
                  </span>
                </p>
              </div>
              <div className="text-end">
                <p className="font-display text-xl font-bold text-ink-950">
                  {formatMoney(planPrice(plan, draft.interval), locale)}
                </p>
                <Link
                  href="/pricing"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden />
                  {t.checkout.changePlan}
                </Link>
              </div>
            </div>
          </Card>

          {/* Details */}
          <Card className="p-6">
            <h2 className="font-display text-lg font-bold text-ink-950">
              {t.checkout.detailsTitle}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label={t.checkout.email} error={errors.email} htmlFor="co-email">
                <Input
                  id="co-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t.checkout.emailPlaceholder}
                  value={email}
                  error={!!errors.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field label={t.checkout.fullName} error={errors.name} htmlFor="co-name">
                <Input
                  id="co-name"
                  autoComplete="name"
                  placeholder={t.checkout.fullNamePlaceholder}
                  value={fullName}
                  error={!!errors.name}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label={t.checkout.country} error={errors.country} htmlFor="co-country">
                  <Select
                    id="co-country"
                    value={country}
                    error={!!errors.country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="" disabled>
                      {t.checkout.selectCountry}
                    </option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            </div>
          </Card>

          {/* Order bumps */}
          <Card className="p-6">
            <h2 className="font-display text-lg font-bold text-ink-950">
              {t.checkout.bumpsTitle}
            </h2>
            <p className="mt-1 text-sm text-ink-500">{t.checkout.bumpsSubtitle}</p>
            <div className="mt-5 flex flex-col gap-3">
              {ORDER_BUMPS.map((bump) => (
                <BumpCard
                  key={bump.id}
                  bump={bump}
                  selected={bumpIds.includes(bump.id)}
                  onToggle={() => toggleBump(bump.id)}
                />
              ))}
            </div>
          </Card>

          {/* Payment */}
          <Card className="p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink-950">
              <CreditCard className="h-5 w-5 text-brand-600" aria-hidden />
              {t.checkout.paymentTitle}
            </h2>
            <div className="mt-5">
              <MockCardElement
                value={card}
                onChange={setCard}
                errors={{ number: errors.number, exp: errors.exp, cvc: errors.cvc, name: errors.cardName }}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-ink-500">
                {t.checkout.testCardsTitle}
              </p>
              <p className="mt-1 text-xs text-ink-500">{t.checkout.testCardsNote}</p>
              <ul className="mt-2.5 flex flex-col gap-1.5">
                {t.checkout.testCards.map((tc) => (
                  <li key={tc.number} className="flex flex-wrap items-center gap-x-3 text-xs">
                    <code className="rounded-md bg-ink-900 px-2 py-1 font-mono text-[11px] text-white">
                      {tc.number}
                    </code>
                    <span className="text-ink-600">{tc.result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary items={items} interval={draft.interval} />
          <Button
            size="lg"
            className="mt-4 w-full"
            loading={processing}
            disabled={processing}
            onClick={onPay}
          >
            <Lock className="h-4 w-4" aria-hidden />
            {t.checkout.payButton} · {formatMoney(totalCents, locale)}
          </Button>
          <p className="mt-3 text-center text-xs text-ink-400">{t.checkout.secureNote}</p>
        </div>
      </div>

      {/* 3-D Secure modal */}
      <Modal
        open={!!auth?.open}
        onClose={() => {
          if (!auth?.processing) setAuth(null);
        }}
        title={t.checkout.authTitle}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
            <Lock className="h-7 w-7" aria-hidden />
          </span>
          <p className="text-sm leading-relaxed text-ink-600">{t.checkout.authBody}</p>
          <Button
            className="w-full"
            loading={auth?.processing}
            disabled={auth?.processing}
            onClick={completeAuth}
          >
            {auth?.processing ? t.checkout.authProcessing : t.checkout.authButton}
          </Button>
        </div>
      </Modal>
    </section>
  );
}
