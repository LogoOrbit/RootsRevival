import type { Metadata } from "next";
import CartPage from "@/components/pages/Cart";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your Roots Revival herbal hair oil order, apply a discount code and move to checkout.",
};

export default function Page() {
  return <CartPage />;
}
