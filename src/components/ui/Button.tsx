"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "light";
type Size = "sm" | "md" | "lg" | "xl";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-soft hover:bg-brand-700 focus-visible:ring-brand-500",
  secondary:
    "bg-ink-900 text-white hover:bg-ink-800 focus-visible:ring-ink-500",
  outline:
    "border border-ink-200 bg-white text-ink-900 hover:border-ink-300 hover:bg-ink-50 focus-visible:ring-brand-500",
  ghost: "text-ink-700 hover:bg-ink-100 focus-visible:ring-brand-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
  light: "bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:ring-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
  xl: "h-14 px-9 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : icon}
      {children}
    </button>
  );
}
