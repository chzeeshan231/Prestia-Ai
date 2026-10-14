"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle, ArrowRight, Zap, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function JourneyComparison() {
  return (
    <section className="bg-white py-20 lg:py-24 border-b border-ink-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-600 mb-2">
            The Conversion Difference
          </p>
          <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl lg:text-5xl tracking-tight">
            Stop losing customers to{" "}
            <span className="text-brand-600">checkout fatigue</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed">
            Standard checkouts treat every offer like a brand-new transaction. Prestia turns the checkout into an intelligent off-session revenue pipeline.
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Left: Traditional Broken Checkout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-red-200 bg-red-50/40 p-6 sm:p-8 relative"
          >
            <div className="flex items-center justify-between pb-6 border-b border-red-200">
              <div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                  Legacy Flow
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink-950">
                  Standard Multi-Step Checkout
                </h3>
              </div>
              <span className="font-display text-2xl font-extrabold text-red-600">
                -68% Loss
              </span>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-ink-700">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                <span>
                  <strong>Full card re-entry on upsell:</strong> Buyer is forced to pull out their physical card, type 16 digits, expiry, and CVC for a second time.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                <span>
                  <strong>Repetitive 3D-Secure prompts:</strong> Multiple bank auth popups cause intense buyer friction and massive drop-off rates.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                <span>
                  <strong>Static order totals:</strong> No dynamic order bumps; items must be added prior to checkout inside a clunky cart drawer.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                <span>
                  <strong>Zero downsell safety net:</strong> If an upsell is declined, the customer is dumped to an empty receipt page.
                </span>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl bg-white p-4 border border-red-200/80">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Average Result</p>
              <p className="font-display text-lg font-bold text-ink-900 mt-1">
                Average Order Value stalled at $79.00 baseline
              </p>
            </div>
          </motion.div>

          {/* Right: Prestia AI Revenue Engine */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-emerald-300 bg-emerald-50/50 p-6 sm:p-8 relative shadow-soft"
          >
            <div className="flex items-center justify-between pb-6 border-b border-emerald-200">
              <div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Prestia Engine
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink-950">
                  1-Click Tokenized Funnel
                </h3>
              </div>
              <span className="font-display text-2xl font-extrabold text-emerald-600">
                +38% Lift
              </span>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-ink-800">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  <strong>Zero card re-entry:</strong> Payment token is securely vaulted during the initial checkout and charged off-session with one click.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  <strong>One-tap order bumps:</strong> Up to 3 companion offers right above the pay button with instant animated total calculation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  <strong>Dynamic conditional downsells:</strong> Declining the flagship upsell automatically triggers an affordable alternative offer.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  <strong>Idempotent charge handling:</strong> Double charges are physically impossible by cryptographic key design.
                </span>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl bg-white p-4 border border-emerald-300">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Average Result</p>
              <p className="font-display text-lg font-bold text-ink-900 mt-1">
                Average Order Value jumps from $79.00 to $137.00 (+73% max)
              </p>
            </div>
          </motion.div>
        </div>

        {/* Online Imagery Proof Strip */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 items-center rounded-3xl border border-ink-200 bg-ink-50 p-6 sm:p-8">
          <div className="relative overflow-hidden rounded-2xl shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80"
              alt="High Converting Checkout Customer"
              className="h-60 w-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Real-World Conversion Benchmark
            </span>
            <h3 className="font-display text-2xl font-bold text-ink-950">
              Customers buy more when you remove the friction
            </h3>
            <p className="text-sm text-ink-600 leading-relaxed">
              When a buyer does not have to re-type their credit card numbers, the conversion rate on your secondary offer exceeds 64%.
            </p>
            <div>
              <Link href="/pricing">
                <Button size="md" icon={<ArrowRight className="h-4 w-4" />}>
                  Upgrade your checkout today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
