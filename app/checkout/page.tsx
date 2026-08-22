import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Place your Roots Revival order with cash on delivery or an online transfer to Meezan Bank. Delivery all over Pakistan.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Secure checkout"
        title="Place your order"
        intro="Fill in your delivery details and choose how you would like to pay. We confirm every order personally on WhatsApp before dispatch."
      />
      <Section tone="cream">
        <CheckoutForm />
      </Section>
    </>
  );
}
