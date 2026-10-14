"use client";

import { motion } from "framer-motion";
import { Globe2, ShieldCheck, Zap, Lock, CreditCard, Cpu } from "lucide-react";

const REGIONS = [
  { name: "North America (US-East)", latency: "18ms", status: "Operational", flag: "🇺🇸" },
  { name: "Europe (EU-Central)", latency: "24ms", status: "Operational", flag: "🇩🇪" },
  { name: "Middle East & Gulf (ME-South)", latency: "28ms", status: "Operational", flag: "🇦🇪" },
  { name: "Asia-Pacific (AP-Northeast)", latency: "31ms", status: "Operational", flag: "🇯🇵" },
];

const METHODS = [
  { name: "Apple Pay", badge: "1-Tap Mobile" },
  { name: "Google Pay", badge: "Universal" },
  { name: "Visa & Mastercard", badge: "3D-Secure 2.0" },
  { name: "Tabby & Tamara", badge: "BNPL MENA" },
  { name: "Mada & KNET", badge: "Local GCC Debit" },
  { name: "Stripe Tokenized", badge: "PCI Level 1" },
];

export function GlobalRails() {
  return (
    <section className="bg-ink-950 py-20 lg:py-24 text-white relative overflow-hidden">
      {/* Background radial gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-bold text-cyan-300 backdrop-blur-md mb-3">
            <Globe2 className="h-3.5 w-3.5" />
            <span>Global Payment Infrastructure</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight">
            Sub-30ms execution on{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-brand-300 bg-clip-text text-transparent">
              global payment rails
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-300 leading-relaxed">
            Whether your buyers are in Silicon Valley, London, or Riyadh, off-session tokenized transactions resolve instantaneously across 135+ currencies.
          </p>
        </div>

        {/* Global Latency & Infrastructure Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-center">
          {/* Edge Latency Cards (7 cols) */}
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {REGIONS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl" role="img" aria-label={r.name}>{r.flag}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {r.status}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-white text-sm">{r.name}</h3>
                <div className="mt-2 flex items-baseline justify-between border-t border-white/10 pt-2">
                  <span className="text-xs text-ink-400">Gateway Latency:</span>
                  <span className="font-display text-lg font-extrabold text-cyan-300">{r.latency}</span>
                </div>
              </motion.div>
            ))}

            {/* Payment Methods Badges Row */}
            <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
              <p className="text-xs uppercase font-bold tracking-wider text-ink-400 mb-3">
                Supported Native Payment Rails
              </p>
              <div className="flex flex-wrap gap-2.5">
                {METHODS.map((m) => (
                  <span
                    key={m.name}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-ink-900/80 px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
                  >
                    <CreditCard className="h-3.5 w-3.5 text-brand-400" />
                    <span>{m.name}</span>
                    <span className="rounded bg-white/10 px-1 py-0.2 text-[9px] font-bold text-ink-300">
                      {m.badge}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Infrastructure Imagery Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80"
                alt="Global Financial Network Infrastructure"
                className="h-80 w-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span>PCI-DSS Level 1 & Zero Card Storage</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  Bank-grade encryption meets ultra-low latency
                </h3>
                <p className="mt-1 text-xs text-ink-300">
                  Every card is tokenized off-session directly on Stripe vault servers. Double charges are impossible by idempotent design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
