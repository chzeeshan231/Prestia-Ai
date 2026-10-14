"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/i18n/context";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  const { t } = useLocale();

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950 px-6 py-16 text-center sm:px-12 lg:px-16 lg:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(36rem 18rem at 50% -30%, rgba(255,255,255,0.14), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-100">
              {t.cta.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-white text-ink-950 hover:bg-ink-100 focus-visible:ring-white"
                >
                  {t.cta.ctaPrimary}
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="light">
                  {t.cta.ctaSecondary}
                </Button>
              </Link>
            </div>
            <p className="mt-5 text-sm text-brand-200/80">{t.cta.note}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
