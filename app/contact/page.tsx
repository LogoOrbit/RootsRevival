import type { Metadata } from "next";
import ContactPage from "@/components/pages/Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Talk to the Roots Revival team on WhatsApp at +92 311 3839767 or write to rootsrevivalpakistan@gmail.com.",
};

export default function Page() {
  return <ContactPage />;
}
