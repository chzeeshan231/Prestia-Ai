"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, Quote, CheckCircle } from "lucide-react";

const CASE_STUDIES = [
  {
    name: "Maya Chen",
    role: "Head of Growth, Northloop",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    metric: "+48%",
    metricLabel: "Average lift in AOV",
    quote: "We added 2 order bumps and a 3-step upsell flow. Revenue per order went from $79 to $117 overnight with zero customer friction.",
    badge: "SaaS Subscription",
  },
  {
    name: "Marcus Vance",
    role: "Founder, Apex Academy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    metric: "62.4%",
    metricLabel: "1-Click Upsell Take Rate",
    quote: "Because buyers never re-type their card, our coaching call upsell converts at over 60%. It doubled the profitability of our paid ad spend.",
    badge: "Courses & Coaching",
  },
  {
    name: "Layla Haddad",
    role: "CMO, Lumeno MENA",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    metric: "$1.4M",
    metricLabel: "Annual Incremental ARR",
    quote: "Prestia's native RTL Arabic checkout and tokenized upsells unlocked the entire GCC market for us. Seamless integration with Stripe.",
    badge: "Global & RTL Enterprise",
  },
];

export function SolutionsRoi() {
  return (
    <section className="bg-ink-50 py-20 lg:py-24 border-b border-ink-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-3">
            <Award className="h-3.5 w-3.5" />
            <span>Verified Customer Results</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl lg:text-5xl tracking-tight">
            Real funnels, real revenue{" "}
            <span className="text-brand-600">multipliers</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed">
            See how modern high-growth subscription, coaching, and productized service teams scale their Average Order Value with Prestia AI.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study, idx) => (
            <motion.div
              key={study.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-3xl border border-ink-200 bg-white p-7 shadow-soft flex flex-col justify-between hover:shadow-lift transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-ink-100">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700">
                    {study.badge}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="font-display text-4xl font-extrabold text-ink-950 block">
                    {study.metric}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mt-1 block">
                    {study.metricLabel}
                  </span>
                </div>

                <blockquote className="mt-5 text-sm leading-relaxed text-ink-600 italic">
                  "{study.quote}"
                </blockquote>
              </div>

              <div className="mt-8 pt-5 border-t border-ink-100 flex items-center gap-3.5">
                <img
                  src={study.image}
                  alt={study.name}
                  className="h-12 w-12 rounded-full object-cover shadow-xs border border-ink-200"
                />
                <div>
                  <p className="font-display text-sm font-bold text-ink-950">{study.name}</p>
                  <p className="text-xs text-ink-500">{study.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
