import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
        <rect width="34" height="34" rx="10" fill="#7C3AED" />
        <path
          d="M11.5 25.5V8.5H19c3.9 0 6.4 2.5 6.4 5.9s-2.5 5.9-6.4 5.9h-4.2v5.2h-3.3zm3.3-8.3h4c2 0 3.2-1.2 3.2-2.8s-1.2-2.8-3.2-2.8h-4v5.6z"
          fill="white"
        />
        <circle cx="25.5" cy="8.5" r="3" fill="#A78BFA" />
      </svg>
      <span
        className={cn(
          "font-display text-xl font-bold tracking-tight",
          dark ? "text-white" : "text-ink-950"
        )}
      >
        Prestia <span className="text-brand-500">AI</span>
      </span>
    </span>
  );
}
