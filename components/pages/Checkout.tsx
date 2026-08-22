"use client";

import { useT } from "@/components/Providers";
import CheckoutForm from "@/components/CheckoutForm";
import { PageHero, Section } from "@/components/ui";

export default function CheckoutPage() {
  const t = useT();
  return (
    <>
      <PageHero
        eyebrow={t.checkoutPage.eyebrow}
        title={t.checkoutPage.title}
        intro={t.checkoutPage.intro}
      />
      <Section tone="bg">
        <CheckoutForm />
      </Section>
    </>
  );
}
