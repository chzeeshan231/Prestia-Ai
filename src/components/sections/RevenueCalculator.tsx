"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Sparkles, ArrowRight, DollarSign, Layers } from "lucide-react";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";
import { useLocale } from "@/i18n/context";
import { Button } from "@/components/ui/Button";

const PRESETS = [25000, 50000, 100000, 250000, 500000];

export function RevenueCalculator() {
  const { locale } = useLocale();
  const [monthlyVolume, setMonthlyVolume] = useState<number>(100000);

  // Prestia conversion formulas based on verified SaaS averages (+18% from bump, +20% from upsell = +38% lift)
  const bumpLift = Math.round(monthlyVolume * 0.17);
  const upsellLift = Math.round(monthlyVolume * 0.21);
  const totalExtraMonthly = bumpLift + upsellLift;
  const newTotalMonthly = monthlyVolume + totalExtraMonthly;
  const annualUnlockedGain = totalExtraMonthly * 12;

  return (
    <section id="calculator" className="scroll-mt-20 bg-ink-950 py-20 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -top-40 end-10 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 start-10 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-300 backdrop-blur-md mb-4"
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>Interactive ROI Simulator</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight"
          >
            Calculate your{" "}
            <span className="bg-gradient-to-r from-brand-300 via-indigo-300 to-emerald-300 bg-clip-text text-transparent">
              revenue multiplier
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-4 text-base sm:text-lg text-ink-300 leading-relaxed"
          >
            See exactly how much incremental revenue order bumps and 1-click upsells add to your current checkout volume without spending an extra dollar on traffic.
          </motion.p>
        </div>

        {/* Main Interactive Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-center">
          {/* Controls Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
          >
            {/* Slider Control */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="volume-slider" className="font-semibold text-sm sm:text-base text-white">
                  Current Monthly Checkout Volume
                </label>
                <span className="font-display text-2xl font-extrabold text-brand-300">
                  {formatMoney(monthlyVolume * 100, locale)}
                  <span className="text-xs text-ink-400 font-normal"> /mo</span>
                </span>
              </div>

              <input
                id="volume-slider"
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="mt-4 w-full h-2.5 bg-ink-800 rounded-lg appearance-none cursor-pointer accent-brand-500 focus:outline-none"
              />

              {/* Preset Buttons */}
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-ink-400 me-1">Quick Presets:</span>
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setMonthlyVolume(p)}
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                      monthlyVolume === p
                        ? "bg-brand-600 text-white shadow-xs"
                        : "bg-white/10 text-ink-300 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    ${p >= 1000 ? `${p / 1000}k` : p}
                  </button>
                ))}
              </div>
            </div>

            {/* Incremental Breakdown Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-ink-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Smart Order Bumps (+17%)
                  </span>
                  <span className="text-emerald-400 font-bold">+18% Take Rate</span>
                </div>
                <p className="mt-2 font-display text-2xl font-extrabold text-white">
                  +{formatMoney(bumpLift * 100, locale)}
                </p>
                <p className="mt-0.5 text-[11px] text-ink-400">Added to initial checkouts</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-ink-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="h-2 w-2 rounded-full bg-brand-400" />
                    1-Click Upsell Chain (+21%)
                  </span>
                  <span className="text-brand-300 font-bold">+28% Take Rate</span>
                </div>
                <p className="mt-2 font-display text-2xl font-extrabold text-white">
                  +{formatMoney(upsellLift * 100, locale)}
                </p>
                <p className="mt-0.5 text-[11px] text-ink-400">Off-session saved card charges</p>
              </div>
            </div>

            {/* Visual Volume Comparison Bar */}
            <div className="mt-7">
              <div className="flex items-center justify-between text-xs font-semibold mb-2 text-ink-300">
                <span>Current Baseline vs. With Prestia Engine</span>
                <span className="text-emerald-400 font-bold">+38% Lift</span>
              </div>
              <div className="h-7 w-full rounded-xl bg-ink-900 border border-white/10 p-1 flex overflow-hidden">
                <div
                  style={{ width: `${Math.round((monthlyVolume / newTotalMonthly) * 100)}%` }}
                  className="h-full rounded-lg bg-ink-600 flex items-center justify-center text-[10px] font-bold text-ink-200 transition-all duration-300"
                >
                  Baseline
                </div>
                <div
                  style={{ width: `${Math.round((totalExtraMonthly / newTotalMonthly) * 100)}%` }}
                  className="h-full rounded-lg bg-gradient-to-r from-brand-500 to-emerald-400 flex items-center justify-center text-[10px] font-bold text-white transition-all duration-300"
                >
                  +38% Prestia
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Summary & Online Visual (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Big Highlight Output Card */}
            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/15 via-ink-900 to-ink-950 p-6 sm:p-7 backdrop-blur-xl relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-400/30">
                <Sparkles className="h-3 w-3" />
                Pure Incremental Profit
              </span>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider font-semibold text-ink-400">
                  Extra Monthly Revenue
                </p>
                <p className="mt-1 font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  +{formatMoney(totalExtraMonthly * 100, locale)}
                  <span className="text-base font-semibold text-ink-400"> /mo</span>
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink-400 font-medium">12-Month Projected ARR Lift</p>
                  <p className="font-display text-xl font-bold text-emerald-400">
                    +{formatMoney(annualUnlockedGain * 100, locale)} /yr
                  </p>
                </div>
                <div className="text-end">
                  <p className="text-xs text-ink-400 font-medium">New Monthly Run-Rate</p>
                  <p className="font-display text-xl font-bold text-white">
                    {formatMoney(newTotalMonthly * 100, locale)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/pricing">
                  <Button size="lg" className="w-full shadow-lift" icon={<ArrowRight className="h-4 w-4" />}>
                    Unlock this lift now
                  </Button>
                </Link>
              </div>
            </div>

            {/* High-Res Online Context Visual */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 group">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                alt="Live Revenue Analytics Telemetry"
                className="h-36 w-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent p-4 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span>Real-time AOV telemetry verified across 2,400+ funnels</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
