import type { Metadata } from "next";
import UsagePage from "@/components/pages/Usage";

export const metadata: Metadata = {
  title: "How To Use",
  description: "How to use Roots Revival herbal hair oil: shake well, massage into the scalp for 5 to 10 minutes, leave for 2 to 4 hours or overnight, 2 to 3 times a week.",
};

export default function Page() {
  return <UsagePage />;
}
