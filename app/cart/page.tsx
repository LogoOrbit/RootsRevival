import type { Metadata } from "next";
import CartView from "@/components/CartView";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your Roots Revival herbal hair oil order, apply a discount code and move to checkout.",
};

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Almost there"
        title="Your cart"
        intro="Check your packs, add a discount code, then place the order. We confirm every order on WhatsApp before it is dispatched."
      />
      <Section tone="cream">
        <CartView />
      </Section>
    </>
  );
}
