"use client";

import { useLocale } from "@/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

export function Faq() {
  const { t } = useLocale();

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
        />
        <div className="mt-12">
          <Accordion items={t.faq.items} />
        </div>
      </div>
    </section>
  );
}
