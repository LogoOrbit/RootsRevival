import type { Metadata } from "next";
import IngredientsPage from "@/components/pages/Ingredients";

export const metadata: Metadata = {
  title: "Ingredients",
  description: "The complete ingredient list of Roots Revival herbal hair oil: mustard, coconut and castor oil infused with amla, hibiscus, kalonji, fenugreek, neem, reetha, shikakai, rose and rosemary.",
};

export default function Page() {
  return <IngredientsPage />;
}
