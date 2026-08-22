import type { Metadata } from "next";
import PoliciesPage from "@/components/pages/Policies";

export const metadata: Metadata = {
  title: "Delivery And Returns",
  description: "Delivery charges, delivery times and the return policy for Roots Revival orders across Pakistan.",
};

export default function Page() {
  return <PoliciesPage />;
}
