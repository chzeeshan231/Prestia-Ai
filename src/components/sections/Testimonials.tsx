"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Stars } from "@/components/ui/Stars";
import { CheckCircle2, TrendingUp } from "lucide-react";

export function Testimonials() {
  const { t } = useLocale();

  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
  ];

  const metrics = [
    "+41% AOV Lift in 14 Days",
    "2.4x 1-Click Upsell Take Rate",
    "99.4% Arabic Checkout Match",
  ];

  return (
    <section className="bg-white py-20 lg:py-24 border-b border-ink-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <Card hover className="flex h-full flex-col justify-between p-7 border-ink-200/80 hover:border-brand-300 hover:shadow-lift transition-all">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-ink-100">
                    <Stars />
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <TrendingUp className="h-3 w-3" />
                      {metrics[i % metrics.length]}
                    </span>
                  </div>
                  <blockquote className="mt-4 leading-relaxed text-sm text-ink-700 italic">
                    “{item.quote}”
                  </blockquote>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatars[i % avatars.length]}
                      alt={item.name}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-200"
                    />
                    <div>
                      <p className="font-display font-bold text-sm text-ink-900">{item.name}</p>
                      <p className="text-xs text-ink-500">{item.role}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-ink-400">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    Verified
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
