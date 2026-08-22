import type { Metadata } from "next";
import ShopPage from "@/components/pages/Shop";

export const metadata: Metadata = {
  title: "Shop Herbal Hair Oil",
  description:
    "Buy Roots Revival herbal hair oil 250ml. Single bottle, duo pack and family pack with launch discounts, free delivery above Rs 3,000 and cash on delivery all over Pakistan.",
};

export default function Page() {
  return <ShopPage />;
}
