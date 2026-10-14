import type { Metadata } from "next";
import { en } from "@/i18n/en";
import { PricingClient } from "@/components/funnel/PricingClient";
import { PricingCalculator } from "@/components/sections/PricingCalculator";
import { FeatureMatrix } from "@/components/sections/FeatureMatrix";
import { SecurityMatrix } from "@/components/sections/SecurityMatrix";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = { title: en.pricing.title };

export default function PricingPage() {
  return (
    <main>
      <PricingClient />
      <PricingCalculator />
      <FeatureMatrix />
      <SecurityMatrix />
      <Faq />
      <CtaBand />
    </main>
  );
}
