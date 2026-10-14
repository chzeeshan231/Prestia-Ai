import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
      ))}
    </div>
  );
}
