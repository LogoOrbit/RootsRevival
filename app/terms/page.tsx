import type { Metadata } from "next";
import LegalPage from "@/components/pages/Legal";

export const metadata: Metadata = {
  title: "Terms Of Service",
  description: "The simple terms that apply when you order Roots Revival herbal hair oil through this website.",
};

export default function Page() {
  return <LegalPage kind="terms" />;
}
