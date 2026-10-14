"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, ArrowRight, Zap, RefreshCw, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface IntegrationItem {
  name: string;
  category: "all" | "payments" | "ecommerce" | "crm" | "automations";
  description: string;
  badge: string;
  latency: string;
  iconBg: string;
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    name: "Stripe Connect & Billing",
    category: "payments",
    description: "Deep native webhook integration. Idempotent charges, subscription synchronization, and automated proration.",
    badge: "Official Verified Partner",
    latency: "< 24ms",
    iconBg: "bg-indigo-600",
  },
  {
    name: "Shopify & Shopify Plus",
    category: "ecommerce",
    description: "Inject 1-click post-purchase upsells and order bumps right into your Shopify theme with zero theme code edits.",
    badge: "1-Click Sync",
    latency: "< 40ms",
    iconBg: "bg-emerald-600",
  },
  {
    name: "WooCommerce & WordPress",
    category: "ecommerce",
    description: "Replace clunky multi-step WordPress checkouts with a blazingly fast Prestia-powered conversion funnel.",
    badge: "REST API v3",
    latency: "< 55ms",
    iconBg: "bg-purple-600",
  },
  {
    name: "HubSpot CRM & Sales Hub",
    category: "crm",
    description: "Every accepted bump and upsell instantly updates customer deals, lifecycle stages, and sales notifications.",
    badge: "Full Two-Way Sync",
    latency: "< 30ms",
    iconBg: "bg-orange-600",
  },
  {
    name: "Segment & Mixpanel",
    category: "automations",
    description: "Stream raw conversion event telemetry, funnel drop-off metrics, and revenue attribution to your data warehouse.",
    badge: "Real-time Telemetry",
    latency: "< 15ms",
    iconBg: "bg-emerald-500",
  },
  {
    name: "Zapier & Make.com",
    category: "automations",
    description: "Trigger multi-app automations on offer acceptance: grant Discord roles, issue API keys, and alert Slack channels.",
    badge: "5,000+ Apps",
    latency: "< 50ms",
    iconBg: "bg-amber-600",
  },
];

export function SolutionsIntegrations() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? INTEGRATIONS : INTEGRATIONS.filter((i) => i.category === filter);

  return (
    <section className="bg-ink-950 py-20 lg:py-24 text-white relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3.5 py-1 text-xs font-bold text-brand-300 backdrop-blur-md mb-3">
            <Layers className="h-3.5 w-3.5" />
            <span>Seamless Stack Ecosystem</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight">
            Connects with your existing{" "}
            <span className="bg-gradient-to-r from-brand-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              tools in minutes
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-300 leading-relaxed">
            Prestia works alongside your tech stack. No ripping and replacing your billing system or redesigning your website from scratch.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: "all", label: "All Integrations" },
              { id: "payments", label: "Payments & Billing" },
              { id: "ecommerce", label: "E-Commerce" },
              { id: "crm", label: "CRM & Sales" },
              { id: "automations", label: "Webhooks & Automations" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  filter === f.id
                    ? "bg-brand-600 text-white shadow-soft"
                    : "bg-white/10 text-ink-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Integration Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl hover:border-brand-400/40 hover:bg-white/[0.07] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconBg} text-white font-bold shadow-soft`}>
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-ink-300">
                    {item.latency}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {item.badge}
                </span>
                <span className="text-brand-300 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* High-Res Online Integration Showcase Banner */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-white/15 relative">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            alt="Webhook API Telemetry"
            className="h-48 sm:h-64 w-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent p-6 sm:p-10 flex flex-col justify-center max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Developer-First Architecture
            </span>
            <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-white">
              Instant signed webhooks with zero payload loss
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-ink-300">
              Every checkout event is signed with cryptographic secrets and retried automatically with exponential backoff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
