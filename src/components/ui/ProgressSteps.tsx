"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProgressSteps({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Checkout progress">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-3">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
                done && "bg-emerald-500 text-white",
                active && "bg-brand-600 text-white",
                !done && !active && "bg-ink-100 text-ink-500"
              )}
              aria-current={active ? "step" : undefined}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden text-sm font-semibold sm:block",
                active ? "text-ink-900" : "text-ink-500"
              )}
            >
              {label}
            </span>
            {i < steps.length - 1 && <span className="h-px w-6 bg-ink-200 sm:w-10" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}
