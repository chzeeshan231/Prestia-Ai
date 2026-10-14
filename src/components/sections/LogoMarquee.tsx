"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

export function LogoMarquee() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink-950 py-9">
      {/* Edge gradient masks for seamless infinite loop */}
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />

      <p className="mx-auto mb-5 max-w-7xl px-6 text-center text-xs font-bold uppercase tracking-widest text-ink-400 sm:px-8">
        {t.logos.title}
      </p>
      <div className="overflow-hidden" aria-hidden>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex w-max items-center gap-16 pe-16"
        >
          {[...t.logos.names, ...t.logos.names].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-xl sm:text-2xl font-bold text-ink-300/70 hover:text-white transition-colors"
              style={{ opacity: 0.5 + (i % t.logos.names.length) * 0.08 }}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
