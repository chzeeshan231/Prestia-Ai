"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  error,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold text-ink-800"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-ink-500">{hint}</p>
      ) : null}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 text-[15px] text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(function Input({ error, className, ...rest }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        inputBase,
        "h-12",
        error
          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
          : "border-ink-200 focus:border-brand-500 focus:ring-brand-200",
        className
      )}
      {...rest}
    />
  );
});

export function Select({
  error,
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <div className="relative">
      <select
        className={cn(
          inputBase,
          "h-12 appearance-none pe-10",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
            : "border-ink-200 focus:border-brand-500 focus:ring-brand-200",
          className
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
        aria-hidden
      />
    </div>
  );
}
