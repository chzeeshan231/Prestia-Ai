"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start"
      )}
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-600">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-ink-300" : "text-ink-600")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
