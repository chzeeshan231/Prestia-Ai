"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check, CreditCard, ShoppingBag, Zap, Award } from "lucide-react";

const STEP_ICONS = [CreditCard, ShoppingBag, Zap, Award];

export function HowItWorks() {
  const { t } = useLocale();
  const { steps } = t.howItWorks;

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-950 px-6 py-16 sm:px-12 lg:px-16 lg:py-20 shadow-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50rem 25rem at 50% -10%, rgba(99,102,241,0.25), transparent 70%), radial-gradient(40rem 20rem at 80% 110%, rgba(14,165,233,0.15), transparent 60%)",
            }}
          />
          <div className="relative">
            <SectionHeading
              dark
              eyebrow={t.howItWorks.eyebrow}
              title={t.howItWorks.title}
              subtitle={t.howItWorks.subtitle}
            />
            <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {/* Connecting dashed line on lg */}
              <div
                aria-hidden
                className="absolute end-[12%] start-[12%] top-8 hidden border-t-2 border-dashed border-white/20 lg:block"
              />
              {steps.map((step, i) => {
                const Icon = STEP_ICONS[i % STEP_ICONS.length];
                return (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="relative group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-300 border border-white/15 shadow-sm group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-display text-4xl font-extrabold text-white/15 group-hover:text-white/30 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-300">{step.desc}</p>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
