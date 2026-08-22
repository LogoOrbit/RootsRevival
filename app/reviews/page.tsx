import type { Metadata } from "next";
import ReviewsPage from "@/components/pages/Reviews";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Real words from people using Roots Revival herbal hair oil and an honest week by week timeline of results.",
};

export default function Page() {
  return <ReviewsPage />;
}
