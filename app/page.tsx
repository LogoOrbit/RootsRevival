import type { Metadata } from "next";
import HomePage from "@/components/pages/Home";

export const metadata: Metadata = {
  title: "Roots Revival | Handmade Herbal Hair Oil in Pakistan",
  description:
    "Handmade herbal hair oil with 16 traditional herbs and oils. Reduces hair fall, controls dandruff and nourishes the scalp. Buy 2 bottles and get a 60ml bottle free. Flat Rs 250 delivery, cash on delivery.",
};

export default function Page() {
  return <HomePage />;
}
