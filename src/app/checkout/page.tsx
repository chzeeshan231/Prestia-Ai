import type { Metadata } from "next";
import { CheckoutClient } from "@/components/funnel/CheckoutClient";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <CheckoutClient />;
}
