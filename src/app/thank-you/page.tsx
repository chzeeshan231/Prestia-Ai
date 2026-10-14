import type { Metadata } from "next";
import { ThankYouClient } from "@/components/funnel/ThankYouClient";

export const metadata: Metadata = { title: "Thank you" };

export default function ThankYouPage() {
  return <ThankYouClient />;
}
