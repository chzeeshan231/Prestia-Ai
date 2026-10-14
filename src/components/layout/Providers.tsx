"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/i18n/context";
import { OrderProvider } from "@/lib/order";
import { ToastProvider } from "@/components/ui/Toast";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <OrderProvider>
        <ToastProvider>{children}</ToastProvider>
      </OrderProvider>
    </LocaleProvider>
  );
}
