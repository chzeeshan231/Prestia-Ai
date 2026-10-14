"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Sparkles, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";
import { useLocale } from "@/i18n/context";
import { Button } from "@/components/ui/Button";

export function PricingCalculator() {
  const { locale } = useLocale();
  const [selectedPlanCost, setSelectedPlanCost] = useState<number>(79); // $79 Starter
  const [monthlyOrders, setMonthlyOrders] = useState<number>(150);

  // Average lift per order with Prestia is ~$38
  const avgUpsellValue = 38;
  const upsellConversionRate = 0.28; // 28% take rate
  const monthlyExtraRevenue = Math.round(monthlyOrders * upsellConversionRate * avgUpsellValue);
  const netMonthlyProfit = monthlyExtraRevenue - selectedPlanCost;
  const breakEvenOrdersNeeded = Math.ceil(selectedPlanCost / avgUpsellValue);
  const roiMultiplier = Math.max(1, Math.round(monthlyExtraRevenue / selectedPlanCost));

  return (
    <section className="bg-ink-50 py-20 lg:py-24 border-y border-ink-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1 text-xs font-bold text-brand-700 mb-3">
            <Calculator className="h-3.5 w-3.5" />
            <span>Payback Period Estimator</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl lg:text-5xl tracking-tight">
            How fast does Prestia{" "}
            <span className="text-brand-600">pay for itself?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed">
            Most software is an expense. A high-converting checkout engine is a profit center. See your break-even horizon below.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-center rounded-3xl border border-ink-200 bg-white p-6 sm:p-10 shadow-soft">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-ink-500 block mb-2">
                1. Select Target Prestia Plan
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "Starter", cost: 79 },
                  { name: "Growth", cost: 199 },
                  { name: "Enterprise", cost: 499 },
                ].map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setSelectedPlanCost(p.cost)}
                    className={`rounded-2xl border p-3.5 text-center transition-all ${
                      selectedPlanCost === p.cost
                        ? "border-brand-600 bg-brand-50/70 text-brand-700 shadow-xs ring-1 ring-brand-600"
                        : "border-ink-200 bg-ink-50/50 hover:bg-ink-100/60 text-ink-700"
                    }`}
                  >
                    <span className="block font-bold text-sm">{p.name}</span>
                    <span className="block font-display text-lg font-extrabold text-ink-950 mt-0.5">
                      ${p.cost}<span className="text-xs font-normal text-ink-500">/mo</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="orders-slider" className="text-sm font-bold text-ink-900">
                  2. Monthly Customer Orders
                </label>
                <span className="font-display text-2xl font-extrabold text-brand-600">
                  {monthlyOrders.toLocaleString()} <span className="text-xs font-normal text-ink-500">orders/mo</span>
                </span>
              </div>
              <input
                id="orders-slider"
                type="range"
                min={20}
                max={2000}
                step={10}
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="mt-3 w-full h-2.5 bg-ink-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <div className="flex justify-between text-xs text-ink-400 mt-1 font-medium">
                <span>20 orders</span>
                <span>500 orders</span>
                <span>2,000+ orders</span>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Immediate Break-Even Threshold</span>
              </div>
              <p className="mt-1 text-sm text-ink-700">
                You break even after just <strong className="text-emerald-700">{breakEvenOrdersNeeded} accepted upsells</strong> each month. Every subsequent conversion is pure profit.
              </p>
            </div>
          </div>

          {/* Results Display (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-ink-200 bg-ink-950 p-6 sm:p-7 text-white shadow-lift relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-400/30">
              <Sparkles className="h-3 w-3" />
              Estimated Monthly ROI
            </span>

            <div className="mt-4">
              <span className="text-xs uppercase font-semibold text-ink-400">Net Extra Profit</span>
              <p className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-1">
                +{formatMoney(netMonthlyProfit * 100, locale)}
                <span className="text-sm font-normal text-ink-400"> /mo</span>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-ink-400">ROI Multiplier</p>
                <p className="font-display text-2xl font-bold text-emerald-400">{roiMultiplier}x ROI</p>
              </div>
              <div className="text-end">
                <p className="text-xs text-ink-400">Annual Unlocked</p>
                <p className="font-display text-2xl font-bold text-white">
                  +{formatMoney(netMonthlyProfit * 12 * 100, locale)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/checkout">
                <Button size="lg" className="w-full shadow-lift" icon={<ArrowRight className="h-4 w-4" />}>
                  Start 14-day free trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
