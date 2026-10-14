"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({
  className,
  children,
  hover = false,
}: {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "rounded-3xl border border-ink-200/70 bg-white shadow-soft",
        hover && "transition-shadow hover:shadow-lift",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
