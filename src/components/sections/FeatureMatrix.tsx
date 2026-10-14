"use client";

import { Check, Minus, Sparkles, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface FeatureRow {
  name: string;
  starter: string | boolean;
  growth: string | boolean;
  enterprise: string | boolean;
}

const COMPARISON_CATEGORIES: { category: string; features: FeatureRow[] }[] = [
  {
    category: "Funnel & Upsell Capacity",
    features: [
      { name: "Active Funnels", starter: "1 Funnel", growth: "10 Funnels", enterprise: "Unlimited" },
      { name: "Order Bumps per Checkout", starter: "Up to 3", growth: "Unlimited", enterprise: "Unlimited" },
      { name: "Upsell / Downsell Steps", starter: "5 Steps", growth: "15 Steps", enterprise: "Unlimited" },
      { name: "Dynamic Downsell Fallbacks", starter: false, growth: true, enterprise: true },
      { name: "Multi-Language (RTL Arabic)", starter: true, growth: true, enterprise: true },
    ],
  },
  {
    category: "Conversion & Analytics",
    features: [
      { name: "Live Funnel Event Stream", starter: true, growth: true, enterprise: true },
      { name: "Step Drop-off Heatmaps", starter: false, growth: true, enterprise: true },
      { name: "AOV Cohort Attribution", starter: false, growth: true, enterprise: true },
      { name: "Custom Webhook Retries", starter: "Standard", growth: "Advanced", enterprise: "Dedicated Queue" },
    ],
  },
  {
    category: "Support & Infrastructure",
    features: [
      { name: "Stripe Tokenization Vault", starter: true, growth: true, enterprise: true },
      { name: "Support Channels", starter: "Email Support", growth: "Priority Chat", enterprise: "Dedicated Slack Channel" },
      { name: "Uptime SLA", starter: "99.9%", growth: "99.95%", enterprise: "99.99% Guaranteed" },
      { name: "White-Glove Migration", starter: false, growth: "Optional Add-on", enterprise: "Included Free" },
    ],
  },
];

export function FeatureMatrix() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-600 mb-2">
            Detailed Comparison
          </p>
          <h2 className="font-display text-3xl font-extrabold text-ink-950 sm:text-4xl lg:text-5xl tracking-tight">
            Compare plans & capabilities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed">
            Every plan includes the core 1-click tokenized upsell engine. Scale into multi-funnel routing and dedicated infrastructure as your volume multiplies.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-14 overflow-x-auto rounded-3xl border border-ink-200 bg-white shadow-soft">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50/70">
                <th className="p-5 text-start font-display text-base font-bold text-ink-950 w-2/5">
                  Plan Capabilities
                </th>
                <th className="p-5 text-center font-display text-base font-bold text-ink-950 w-1/5">
                  Starter <span className="block text-xs font-normal text-ink-500 mt-0.5">$79/mo</span>
                </th>
                <th className="p-5 text-center font-display text-base font-bold text-brand-700 bg-brand-50/60 w-1/5">
                  Growth <span className="block text-xs font-normal text-brand-600 mt-0.5">$199/mo</span>
                </th>
                <th className="p-5 text-center font-display text-base font-bold text-ink-950 w-1/5">
                  Enterprise <span className="block text-xs font-normal text-ink-500 mt-0.5">$499/mo</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 text-sm">
              {COMPARISON_CATEGORIES.map((cat) => (
                <tr key={cat.category} className="contents">
                  <tr className="bg-ink-100/50">
                    <td colSpan={4} className="px-5 py-3 font-bold text-xs uppercase tracking-wider text-ink-700">
                      {cat.category}
                    </td>
                  </tr>
                  {cat.features.map((f) => (
                    <tr key={f.name} className="hover:bg-ink-50/50 transition-colors">
                      <td className="p-5 font-semibold text-ink-900">{f.name}</td>
                      <td className="p-5 text-center text-ink-700">
                        {typeof f.starter === "boolean" ? (
                          f.starter ? (
                            <Check className="h-5 w-5 mx-auto text-emerald-600 font-bold" />
                          ) : (
                            <Minus className="h-4 w-4 mx-auto text-ink-300" />
                          )
                        ) : (
                          f.starter
                        )}
                      </td>
                      <td className="p-5 text-center font-semibold text-ink-900 bg-brand-50/30">
                        {typeof f.growth === "boolean" ? (
                          f.growth ? (
                            <Check className="h-5 w-5 mx-auto text-emerald-600 font-bold" />
                          ) : (
                            <Minus className="h-4 w-4 mx-auto text-ink-300" />
                          )
                        ) : (
                          f.growth
                        )}
                      </td>
                      <td className="p-5 text-center font-semibold text-ink-900">
                        {typeof f.enterprise === "boolean" ? (
                          f.enterprise ? (
                            <Check className="h-5 w-5 mx-auto text-emerald-600 font-bold" />
                          ) : (
                            <Minus className="h-4 w-4 mx-auto text-ink-300" />
                          )
                        ) : (
                          f.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* White-Glove Migration Banner with Specialist Online Avatar */}
        <div className="mt-14 rounded-3xl border border-brand-200 bg-gradient-to-r from-brand-50 via-white to-indigo-50 p-6 sm:p-10 shadow-soft flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              alt="Conversion Funnel Concierge"
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover shadow-soft shrink-0 border-2 border-brand-300"
            />
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                <Headphones className="h-3.5 w-3.5" />
                White-Glove Migration Service
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-950 mt-1">
                Moving from another checkout? We'll migrate you for free.
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 mt-1 max-w-xl">
                Our conversion engineers will rebuild your existing funnel, configure order bumps, and QA every webhook before launch.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link href="/checkout">
              <Button size="lg" className="w-full md:w-auto" icon={<ArrowRight className="h-4 w-4" />}>
                Claim Free Migration
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
