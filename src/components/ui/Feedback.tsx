import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-ink-100", className)} aria-hidden />;
}

export function EmptyState({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-100 text-ink-500">
        {icon}
      </div>
      <h3 className="font-display text-lg font-bold text-ink-900">{title}</h3>
      <p className="max-w-sm text-sm text-ink-500">{subtitle}</p>
      {action}
    </div>
  );
}
