import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { en } from "@/i18n/en";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { JourneyComparison } from "@/components/sections/JourneyComparison";
import { SolutionsIntegrations } from "@/components/sections/SolutionsIntegrations";
import { SolutionsRoi } from "@/components/sections/SolutionsRoi";
import { ProductTour } from "@/components/sections/ProductTour";
import { CtaBand } from "@/components/sections/CtaBand";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Solutions — Prestia AI",
  description: en.solutions.pageSubtitle,
};

export default function SolutionsPage() {
  const s = en.solutions;

  return (
    <main className="bg-white">
      {/* Page hero */}
      <section className="pt-16 pb-12 lg:pt-20">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-600">
            {s.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            {s.pageTitle}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">{s.pageSubtitle}</p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="bg-ink-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SolutionsGrid showHeading={false} />
        </div>
      </section>

      {/* 1. New Section: Journey Comparison */}
      <JourneyComparison />

      {/* 2. New Section: Ecosystem Integrations */}
      <SolutionsIntegrations />

      {/* 3. New Section: Verified Customer Case Studies & ROI */}
      <SolutionsRoi />

      {/* Funnel-fit CTA card */}
      <section className="bg-ink-50 py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <Card className="p-8 text-center sm:p-10">
            <h2 className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">
              {s.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-600">
              {s.ctaSubtitle}
            </p>
            <div className="mt-7">
              <Link href="/pricing">
                <Button size="lg" icon={<ArrowRight className="h-5 w-5" aria-hidden />}>
                  {s.ctaButton}
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <ProductTour videoSrc="/videos/team-meeting.mp4" />

      <CtaBand />
    </main>
  );
}
