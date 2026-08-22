import type { Metadata } from "next";
import { Suspense } from "react";
import ThankYou from "@/components/ThankYou";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Order Placed",
  description: "Your Roots Revival order has been placed.",
  robots: { index: false },
};

export default function Page() {
  return (
    <Section tone="bg">
      <Suspense fallback={<p className="py-20 text-center text-sm uppercase tracking-[0.2em] text-muted">Loading</p>}>
        <ThankYou />
      </Suspense>
    </Section>
  );
}
