import type { Metadata } from "next";
import OffersPage from "@/components/pages/Offers";

export const metadata: Metadata = {
  title: "Deals And Offers",
  description: "Launch offers on Roots Revival herbal hair oil. Save up to Rs 2,500 on bundle packs, use code REVIVE10 for 10 percent off and free delivery above Rs 3,000.",
};

export default function Page() {
  return <OffersPage />;
}
