import type { Metadata } from "next";
import OffersPage from "@/components/pages/Offers";

export const metadata: Metadata = {
  title: "Deals And Offers",
  description: "Buy the Roots Revival duo pack and get a 60ml bottle of herbal hair oil free. Flat Rs 250 delivery and cash on delivery on every order.",
};

export default function Page() {
  return <OffersPage />;
}
