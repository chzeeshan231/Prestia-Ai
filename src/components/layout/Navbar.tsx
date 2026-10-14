"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/i18n/context";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

export function LocaleToggle({
  compact = false,
  dark = false,
}: {
  compact?: boolean;
  dark?: boolean;
}) {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center rounded-full p-0.5 text-xs font-bold transition-colors",
        dark
          ? "border border-white/20 bg-white/10 text-white"
          : "border border-ink-200 bg-white text-ink-900"
      )}
    >
      {(["en", "ar"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-full px-2.5 py-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            locale === l
              ? dark
                ? "bg-brand-600 text-white shadow-xs"
                : "bg-ink-900 text-white"
              : dark
              ? "text-white/70 hover:text-white"
              : "text-ink-500 hover:text-ink-900"
          )}
        >
          {l === "en" ? "EN" : "عربي"}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isDarkHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300",
        isDarkHero
          ? "border-white/10 bg-ink-950/80 text-white shadow-none"
          : scrolled
          ? "border-ink-200/70 bg-white/90 shadow-soft text-ink-900"
          : "border-transparent bg-white/85 text-ink-900"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <Link href="/" aria-label={t.meta.siteName}>
          <Logo dark={isDarkHero} />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                pathname === l.href
                  ? isDarkHero
                    ? "text-brand-300 bg-white/10"
                    : "text-brand-700 bg-brand-50"
                  : isDarkHero
                  ? "text-white/75 hover:bg-white/10 hover:text-white"
                  : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
              )}
            >
              {t.nav[l.key]}
            </Link>
          ))}
          <Link
            href="/#faq"
            className={cn(
              "rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              isDarkHero
                ? "text-white/75 hover:bg-white/10 hover:text-white"
                : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
            )}
          >
            {t.nav.faq}
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleToggle dark={isDarkHero} />
          <Link href="/pricing">
            <Button
              size="sm"
              icon={<ArrowRight className="h-4 w-4 rtl:rotate-180" />}
              className={cn(
                isDarkHero &&
                  "shadow-[0_0_20px_rgba(132,61,255,0.4)] hover:shadow-[0_0_25px_rgba(132,61,255,0.6)]"
              )}
            >
              {t.nav.getStarted}
            </Button>
          </Link>
        </div>

        <button
          className={cn(
            "rounded-lg p-2 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
            isDarkHero
              ? "text-white hover:bg-white/10"
              : "text-ink-700 hover:bg-ink-100"
          )}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className={cn(
              "overflow-hidden border-t md:hidden",
              isDarkHero
                ? "border-white/10 bg-ink-950 text-white"
                : "border-ink-200/60 bg-white text-ink-900"
            )}
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-semibold",
                    pathname === l.href
                      ? "bg-brand-500/20 text-brand-300"
                      : isDarkHero
                      ? "text-white/80 hover:bg-white/10"
                      : "text-ink-700 hover:bg-ink-100"
                  )}
                >
                  {t.nav[l.key]}
                </Link>
              ))}
              <Link
                href="/#faq"
                className={cn(
                  "block rounded-xl px-4 py-3 text-sm font-semibold",
                  isDarkHero
                    ? "text-white/80 hover:bg-white/10"
                    : "text-ink-700 hover:bg-ink-100"
                )}
              >
                {t.nav.faq}
              </Link>
              <div className="flex items-center justify-between px-4 pt-3">
                <LocaleToggle dark={isDarkHero} />
                <Link href="/pricing">
                  <Button size="sm">{t.nav.getStarted}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
