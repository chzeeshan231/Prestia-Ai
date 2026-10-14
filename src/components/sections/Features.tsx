"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  GitBranch,
  Languages,
  ShieldCheck,
  ShoppingCart,
  Zap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  "shopping-cart": ShoppingCart,
  "shield-check": ShieldCheck,
  languages: Languages,
  "git-branch": GitBranch,
  "bar-chart-3": BarChart3,
};

const BADGES = [
  "⚡ 1-Click Vault",
  "🛒 3 Bumps / Cart",
  "🛡️ Zero Card Storage",
  "🌐 RTL & Global",
  "🔀 15 Conditional Steps",
  "📊 Real-time Stream",
];

export function Features() {
  const { t } = useLocale();

  return (
    <section id="features" className="scroll-mt-24 bg-white py-20 lg:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          subtitle={t.features.subtitle}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Zap;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <Card hover className="h-full p-7 flex flex-col justify-between border-ink-200/80 hover:border-brand-300 hover:shadow-lift transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 shadow-xs group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <span className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-bold text-ink-600 border border-ink-200">
                        {BADGES[i % BADGES.length]}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-ink-950">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-sm text-ink-600">{item.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between text-xs font-bold text-brand-600">
                    <span>Learn capability</span>
                    <span>→</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
