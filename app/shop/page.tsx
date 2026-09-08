import type { Metadata } from "next";
import ShopPage from "@/components/pages/Shop";

export const metadata: Metadata = {
  title: "Shop Herbal Hair Oil",
  description:
    "Buy Roots Revival herbal hair oil 250ml. Single bottle, duo pack with a free 60ml bottle, and family pack. Flat Rs 250 delivery and cash on delivery.",
};

export default function Page() {
  return <ShopPage />;
}
