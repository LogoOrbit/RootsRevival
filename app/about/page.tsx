import type { Metadata } from "next";
import AboutPage from "@/components/pages/About";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Roots Revival is a handmade herbal hair oil cooked at home in small batches with 16 traditional herbs and oils. Read the story behind the brand and our purity promise.",
};

export default function Page() {
  return <AboutPage />;
}
