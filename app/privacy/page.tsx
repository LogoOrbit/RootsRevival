import type { Metadata } from "next";
import LegalPage from "@/components/pages/Legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Roots Revival collects, uses and protects the details you share when you place an order.",
};

export default function Page() {
  return <LegalPage kind="privacy" />;
}
