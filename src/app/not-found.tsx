"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/context";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-8xl font-bold tracking-tight text-ink-900">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink-900">{t.notFound.title}</h1>
      <p className="mt-3 text-lg text-ink-600">{t.notFound.subtitle}</p>
      <Link href="/" className="mt-8">
        <Button size="lg">{t.notFound.cta}</Button>
      </Link>
    </main>
  );
}
