"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Check,
  Globe,
  GraduationCap,
  Repeat,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const ICONS: Record<string, LucideIcon> = {
  repeat: Repeat,
  "graduation-cap": GraduationCap,
  briefcase: Briefcase,
  globe: Globe,
};

const IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
];

const LIFT_STATS = [
  "+42% ARR Lift",
  "61% Upsell Take",
  "2.8x Order Value",
  "135+ Currencies",
];

export function SolutionsGrid({
  showHeading = true,
  compact = false,
}: {
  showHeading?: boolean;
  compact?: boolean;
}) {
  const { t } = useLocale();

  return (
    <div>
      {showHeading && (
        <SectionHeading
          eyebrow={t.solutions.eyebrow}
          title={t.solutions.title}
          subtitle={t.solutions.subtitle}
        />
      )}
      <div
        className={
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-4 " +
          (showHeading ? "mt-14" : "mt-0")
        }
      >
        {t.solutions.items.map((item, i) => {
          const Icon = ICONS[item.icon] ?? Globe;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <Card hover className="h-full overflow-hidden flex flex-col justify-between border-ink-200/80 hover:border-brand-300 hover:shadow-lift transition-all">
                <div>
                  <div className="relative h-40 overflow-hidden group">
                    <img
                      src={IMAGES[i % IMAGES.length]}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/20 to-transparent" />
                    <div className="absolute top-3 end-3 rounded-full bg-ink-900/80 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md border border-white/10">
                      {LIFT_STATS[i % LIFT_STATS.length]}
                    </div>
                    <div className="absolute bottom-3 start-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-brand-600 shadow-md">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-ink-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-600">{item.desc}</p>
                    <ul className="mt-4 space-y-2">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs font-medium text-ink-700">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-2 border-t border-ink-100 flex items-center justify-between text-xs font-bold text-brand-600">
                  <span>Explore funnel template</span>
                  <span>→</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
