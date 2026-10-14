import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FUNNEL_STEPS, getFunnelStep } from "@/data/funnel";
import { UpsellClient } from "@/components/funnel/UpsellClient";

export const metadata: Metadata = { title: "Special offer" };

export async function generateStaticParams() {
  return FUNNEL_STEPS.map((s) => ({ stepId: s.id }));
}

export default function UpsellPage({ params }: { params: { stepId: string } }) {
  const step = getFunnelStep(params.stepId);
  if (!step) notFound();
  return <UpsellClient stepId={params.stepId} />;
}
