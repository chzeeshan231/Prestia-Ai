"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Check, Zap, ArrowRight, ShieldCheck, ShoppingCart, Sparkles, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface StepData {
  id: string;
  number: string;
  title: string;
  badge: string;
  description: string;
  conversionStat: string;
  conversionLabel: string;
  psychology: string;
  image: string;
}

const STEPS: StepData[] = [
  {
    id: "step-1",
    number: "01",
    title: "Frictionless Checkout",
    badge: "Initial Conversion",
    description: "Ultra-lean single-column checkout with smart auto-fill and 1-second card tokenization. No friction, zero unnecessary fields.",
    conversionStat: "8.4%",
    conversionLabel: "Checkout conversion rate (vs 2.8% industry avg)",
    psychology: "Low cognitive load: Card tokens securely saved off-session so future steps require zero re-typing.",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "step-2",
    number: "02",
    title: "Dynamic Order Bumps",
    badge: "+$19 Impulse Offer",
    description: "Up to 3 high-margin companion offers embedded directly above the payment button. Totals recalculate with one tap.",
    conversionStat: "41.6%",
    conversionLabel: "Average customer attach rate at checkout",
    psychology: "Micro-commitments: Customers already have wallet in hand; adding priority setup or a template library is an instant yes.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "step-3",
    number: "03",
    title: "1-Click Upsell Engine",
    badge: "+$39 Flagship Add-on",
    description: "Shown immediately post-purchase. Charged to the saved tokenized card with exactly ONE click. No second CVV prompt.",
    conversionStat: "64.2%",
    conversionLabel: "Take-rate on first post-purchase offer",
    psychology: "Peak endorphin window: The order is already confirmed; offering an accelerator tool captures maximum willingness to pay.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "step-4",
    number: "04",
    title: "Downsell Safety Net",
    badge: "+$19 Downsell Recovery",
    description: "If a customer declines the primary upsell, the engine automatically pivots to a lighter, lower-cost alternative.",
    conversionStat: "29.4%",
    conversionLabel: "Revenue saved from declined offers",
    psychology: "Price-anchoring: After turning down $39, a $19 mini-offer feels like a no-brainer steal.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "step-5",
    number: "05",
    title: "Instant Fulfillment",
    badge: "Receipt & Webhook Sync",
    description: "Unified order summary sent instantly via signed webhook to your CRM, LMS, or membership platform with zero delay.",
    conversionStat: "99.99%",
    conversionLabel: "Webhook delivery idempotency rate",
    psychology: "Delightful onboarding: Full transparent itemization with customer portal login links provided on screen.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
];

export function FunnelVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = STEPS[activeStep];

  return (
    <section className="bg-white py-20 lg:py-24 border-b border-ink-100 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-600 mb-2">
            Funnel Architecture
          </p>
          <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl lg:text-5xl tracking-tight">
            The 15-step conditional{" "}
            <span className="text-brand-600">conversion journey</span>
          </h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            Every step is configured as dynamic data with automatic accept/decline routing. Explore how each phase is engineered to lift Average Order Value.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="mt-12 flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-bold whitespace-nowrap transition-all border ${
                activeStep === idx
                  ? "bg-brand-600 border-brand-600 text-white shadow-soft scale-102"
                  : "bg-ink-50 border-ink-200 text-ink-600 hover:bg-ink-100 hover:text-ink-900"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-extrabold ${
                  activeStep === idx ? "bg-white/20 text-white" : "bg-ink-200 text-ink-700"
                }`}
              >
                {s.number}
              </span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Display Card */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center rounded-3xl border border-ink-200 bg-ink-50/70 p-6 sm:p-10 shadow-soft">
          {/* Left Details (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{current.badge}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink-950">
              {current.title}
            </h3>

            <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed">
              {current.description}
            </p>

            <div className="mt-6 rounded-2xl border border-ink-200/80 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-bold text-ink-400">
                  Performance Metric
                </span>
                <span className="font-display text-2xl font-extrabold text-emerald-600">
                  {current.conversionStat}
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-ink-700">{current.conversionLabel}</p>
            </div>

            <div className="mt-5 flex items-start gap-3 text-xs sm:text-sm text-ink-600">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                ✓
              </span>
              <p><strong className="text-ink-900">Why it converts:</strong> {current.psychology}</p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/pricing">
                <Button size="md" icon={<ArrowRight className="h-4 w-4" />}>
                  Build this funnel
                </Button>
              </Link>
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
                className="text-xs font-bold text-ink-600 hover:text-brand-600 flex items-center gap-1.5 transition-colors"
              >
                <span>Next step</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Image Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-2xl border border-ink-200 shadow-lift group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="aspect-4/3 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-300">
                    Live Funnel Preview
                  </p>
                  <p className="font-display text-base font-bold">{current.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
