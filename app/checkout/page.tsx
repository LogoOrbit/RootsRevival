import type { Metadata } from "next";
import CheckoutPage from "@/components/pages/Checkout";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Place your Roots Revival order with cash on delivery or an online transfer to Meezan Bank. Delivery all over Pakistan.",
  robots: { index: false },
};

export default function Page() {
  return <CheckoutPage />;
}
