import type { Metadata } from "next";
import HomePage from "@/components/pages/Home";

export const metadata: Metadata = {
  title: "Roots Revival | Handmade Herbal Hair Oil in Pakistan",
  description:
    "Handmade herbal hair oil with 16 traditional herbs and oils. Reduces hair fall, controls dandruff and nourishes the scalp. Free delivery above Rs 3,000, cash on delivery all over Pakistan.",
};

export default function Page() {
  return <HomePage />;
}
