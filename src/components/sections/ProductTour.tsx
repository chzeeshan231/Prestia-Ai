"use client";

import { motion } from "framer-motion";
import { Check, Play, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/i18n/context";
import { Modal } from "@/components/ui/Modal";

export function ProductTour({ videoSrc = "/videos/team-ideas.mp4" }: { videoSrc?: string }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-ink-50 py-20 lg:py-24 border-b border-ink-200">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Video Demo</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl lg:text-5xl">
            {t.tour.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-600">{t.tour.subtitle}</p>
          <ul className="mt-6 space-y-3.5">
            {t.tour.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 font-semibold text-ink-800 text-sm sm:text-base">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 shadow-xs">
                  <Check className="h-4 w-4 text-emerald-600" aria-hidden />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={() => setOpen(true)}
            aria-label={t.tour.play}
            className="group relative block w-full overflow-hidden rounded-3xl shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 border border-ink-200"
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
              alt={t.tour.title}
              loading="lazy"
              className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink-950/45 transition-colors group-hover:bg-ink-950/35" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-20 w-20 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-60 animate-ping" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-lift transition-transform group-hover:scale-110">
                  <Play className="h-8 w-8 fill-brand-600 text-brand-600 ms-1" aria-hidden />
                </span>
              </span>
            </span>
            <span className="absolute bottom-4 end-4 rounded-full bg-ink-950/80 px-3 py-1 text-xs font-bold text-white backdrop-blur border border-white/10">
              HD Video · {t.tour.duration}
            </span>
            <span className="absolute top-4 start-4 rounded-full bg-brand-600/90 px-3 py-1 text-[11px] font-bold text-white backdrop-blur shadow-sm">
              Live Walkthrough
            </span>
          </button>
        </motion.div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={t.tour.title} wide>
        <video
          key={String(open)}
          className="aspect-video w-full rounded-2xl bg-ink-950"
          src={videoSrc}
          poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
          controls
          autoPlay={open}
          preload="none"
          playsInline
        />
      </Modal>
    </section>
  );
}
