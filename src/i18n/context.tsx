"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Dict } from "./en";
import { ar } from "./ar";
import type { Locale } from "@/lib/types";

interface LocaleValue {
  locale: Locale;
  t: Dict;
  dir: "ltr" | "rtl";
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleValue>({
  locale: "en",
  t: en,
  dir: "ltr",
  setLocale: () => {},
});

const KEY = "prestia_demo_locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "ar" || saved === "en") setLocaleState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(KEY, locale);
    } catch {}
  }, [locale]);

  const value = useMemo<LocaleValue>(
    () => ({
      locale,
      t: locale === "ar" ? ar : en,
      dir: locale === "ar" ? "rtl" : "ltr",
      setLocale: setLocaleState,
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
