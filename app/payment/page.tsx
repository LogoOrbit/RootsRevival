import type { Metadata } from "next";
import PaymentPage from "@/components/pages/Payment";

export const metadata: Metadata = {
  title: "Payment Methods",
  description: "Pay for Roots Revival herbal hair oil with cash on delivery, or send an online transfer to our Meezan Bank account and share the receipt on WhatsApp.",
};

export default function Page() {
  return <PaymentPage />;
}
