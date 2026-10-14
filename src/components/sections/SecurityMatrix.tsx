"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Server, Key, FileCheck, CheckCircle2 } from "lucide-react";

const COMPLIANCE_ITEMS = [
  {
    icon: Lock,
    title: "Zero Card Storage",
    desc: "Card numbers never touch your application servers. Tokenization and vaulted storage are handled entirely on Stripe's PCI Level 1 infrastructure.",
    badge: "PCI-DSS Level 1",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 Type II Certified",
    desc: "Audited controls for security, availability, and confidential data processing with strict role-based access controls across all production clusters.",
    badge: "Independent Audit",
  },
  {
    icon: Server,
    title: "99.99% Uptime SLA",
    desc: "Multi-region fallback routing across redundant cloud data centers ensures zero lost checkouts during high-traffic product launches.",
    badge: "Enterprise SLA",
  },
  {
    icon: Key,
    title: "Idempotent Webhooks",
    desc: "Every transaction generates unique cryptographic idempotency keys, guaranteeing that duplicate webhook deliveries can never cause double billing.",
    badge: "Duplicate Safe",
  },
];

export function SecurityMatrix() {
  return (
    <section className="bg-white py-20 lg:py-24 border-b border-ink-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1 text-xs font-bold text-brand-700 mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Bank-Grade Security & Trust</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl lg:text-5xl tracking-tight">
            Engineered for zero-risk{" "}
            <span className="text-brand-600">payment reliability</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed">
            Your revenue flow is the lifeblood of your company. We enforce the strictest security, compliance, and encryption standards in the payments industry.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-center">
          {/* Left Cards (7 cols) */}
          <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
            {COMPLIANCE_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-3xl border border-ink-200 bg-ink-50/60 p-6 hover:border-brand-300 hover:bg-white transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-soft">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-ink-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Online Infrastructure Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl border border-ink-200 shadow-lift group">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
                alt="Cloud Server Infrastructure Security"
                className="h-96 w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Real-time Monitoring
                </span>
                <h3 className="font-display text-lg font-bold mt-1">
                  Continuous vulnerability scanning & end-to-end TLS 1.3
                </h3>
                <p className="mt-1 text-xs text-ink-300">
                  Strict content security policies, automated token rotation, and zero third-party script injection on payment forms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
