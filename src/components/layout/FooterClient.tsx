"use client";

import { useLocale } from "@/i18n/context";
import { Footer } from "@/components/layout/Footer";

export function FooterClient() {
  const { t } = useLocale();
  return <Footer t={t} />;
}
