"use client";

import { CreditCard } from "lucide-react";
import { useLocale } from "@/i18n/context";
import { cardBrand, cn } from "@/lib/utils";
import { Field, Input } from "@/components/ui/Input";

export interface MockCardValue {
  number: string;
  exp: string;
  cvc: string;
  name: string;
}

export type MockCardErrors = Partial<Record<"number" | "exp" | "cvc" | "name", string>>;

function formatNumber(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExp(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

export function MockCardElement({
  value,
  onChange,
  errors,
}: {
  value: MockCardValue;
  onChange: (v: MockCardValue) => void;
  errors: MockCardErrors;
}) {
  const { t } = useLocale();
  const brand = cardBrand(value.number);
  const detected = brand !== "Card";

  return (
    <div className="rounded-2xl border border-ink-200 bg-ink-50/60 p-4 sm:p-5">
      <div className="flex flex-col gap-4">
        <Field label={t.checkout.cardNumber} error={errors.number} htmlFor="card-number">
          <div className="relative">
            <Input
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              value={value.number}
              error={!!errors.number}
              onChange={(e) => onChange({ ...value, number: formatNumber(e.target.value) })}
              className={cn("pe-20 font-mono tracking-wide")}
            />
            <span className="pointer-events-none absolute end-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
              {detected ? (
                <span className="rounded-md bg-ink-900 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {brand}
                </span>
              ) : (
                <CreditCard className="h-5 w-5 text-ink-400" aria-hidden />
              )}
            </span>
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label={t.checkout.expiry} error={errors.exp} htmlFor="card-exp">
            <Input
              id="card-exp"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={value.exp}
              error={!!errors.exp}
              onChange={(e) => onChange({ ...value, exp: formatExp(e.target.value) })}
              className="font-mono"
            />
          </Field>
          <Field label={t.checkout.cvc} error={errors.cvc} htmlFor="card-cvc">
            <Input
              id="card-cvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              value={value.cvc}
              error={!!errors.cvc}
              onChange={(e) =>
                onChange({ ...value, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })
              }
              className="font-mono"
            />
          </Field>
        </div>

        <Field label={t.checkout.cardName} error={errors.name} htmlFor="card-name">
          <Input
            id="card-name"
            autoComplete="cc-name"
            placeholder={t.checkout.fullNamePlaceholder}
            value={value.name}
            error={!!errors.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
