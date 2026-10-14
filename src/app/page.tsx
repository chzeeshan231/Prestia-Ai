import type { Metadata } from "next";
import { en } from "@/i18n/en";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { RevenueCalculator } from "@/components/sections/RevenueCalculator";
import { Features } from "@/components/sections/Features";
import { FunnelVisualizer } from "@/components/sections/FunnelVisualizer";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GlobalRails } from "@/components/sections/GlobalRails";
import { ProductTour } from "@/components/sections/ProductTour";
import { Testimonials } from "@/components/sections/Testimonials";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: `Prestia AI — ${en.hero.titleAccent}`,
  description: en.meta.description,
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <LogoMarquee />
      <RevenueCalculator />
      <Features />
      <FunnelVisualizer />
      <section className="bg-ink-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SolutionsGrid compact />
        </div>
      </section>
      <HowItWorks />
      <GlobalRails />
      <ProductTour />
      <Testimonials />
      <PricingTeaser />
      <Faq />
      <CtaBand />
    </main>
  );
}
