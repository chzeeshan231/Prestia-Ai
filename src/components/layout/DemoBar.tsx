"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, RotateCcw, Activity, X, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/i18n/context";
import { useOrder } from "@/lib/order";
import { useToast } from "@/components/ui/Toast";
import { getFlags, setFlags } from "@/lib/mock/db";
import { Button } from "@/components/ui/Button";
import { LocaleToggle } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

export function DemoBar() {
  const { t, dir } = useLocale();
  const { resetDemo } = useOrder();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [failNext, setFailNext] = useState(() => getFlags().failNextOffSession);

  const toggleFail = () => {
    const next = !failNext;
    setFailNext(next);
    setFlags({ failNextOffSession: next });
  };

  const doReset = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 4000);
      return;
    }
    resetDemo();
    setConfirming(false);
    setOpen(false);
    toast(t.demo.resetDone, "success");
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(true)}
        aria-label={t.demo.title}
        className="fixed bottom-6 end-6 z-[60] flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-ink-950 p-3.5 text-white shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        <FlaskConical className="h-5 w-5" />
        <span className="absolute -top-1.5 -end-1.5 rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold leading-none">
          {t.common.demoBadge}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-ink-950/40 backdrop-blur-[2px]"
            />
            <motion.aside
              initial={{ x: dir === "rtl" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: dir === "rtl" ? "-100%" : "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed bottom-0 end-0 top-0 z-[61] flex w-full max-w-sm flex-col bg-white shadow-lift"
              role="dialog"
              aria-label={t.demo.title}
            >
              <div className="flex items-start justify-between gap-4 border-b border-ink-100 p-5">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink-950">{t.demo.title}</h2>
                  <p className="mt-1 text-sm text-ink-500">{t.demo.subtitle}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t.common.close}
                  className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto p-5">
                <div className="flex items-center justify-between rounded-2xl bg-ink-50 p-4">
                  <span className="text-sm font-semibold text-ink-700">{t.demo.language}</span>
                  <LocaleToggle />
                </div>

                <button
                  onClick={toggleFail}
                  aria-pressed={failNext}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                    failNext ? "border-amber-300 bg-amber-50" : "border-ink-200 bg-white hover:bg-ink-50"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <AlertTriangle className={cn("h-5 w-5", failNext ? "text-amber-600" : "text-ink-400")} />
                    <span>
                      <span className="block text-sm font-bold text-ink-900">{t.demo.failNext}</span>
                      <span className={cn("block text-xs font-medium", failNext ? "text-amber-700" : "text-ink-500")}>
                        {failNext ? t.demo.failNextOn : t.demo.failNextOff}
                      </span>
                    </span>
                  </span>
                  <span
                    className={cn(
                      "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                      failNext ? "bg-amber-500" : "bg-ink-200"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                        failNext ? "end-0.5" : "start-0.5"
                      )}
                    />
                  </span>
                </button>

                <Link href="/demo/activity" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full" icon={<Activity className="h-4 w-4" />}>
                    {t.demo.viewActivity}
                  </Button>
                </Link>

                <div className="rounded-2xl border border-ink-200 p-4">
                  <Button
                    variant={confirming ? "danger" : "ghost"}
                    className="w-full"
                    icon={<RotateCcw className="h-4 w-4" />}
                    onClick={doReset}
                  >
                    {confirming ? t.common.retry + "?" : t.demo.reset}
                  </Button>
                  {confirming && (
                    <p className="mt-2 text-center text-xs font-medium text-red-600">
                      {t.demo.reset}?
                    </p>
                  )}
                </div>

                <p className="text-xs leading-relaxed text-ink-400">{t.demo.replayNote}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
