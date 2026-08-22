import type { Metadata } from "next";
import FaqPage from "@/components/pages/Faq";
import { en } from "@/lib/i18n/en";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Roots Revival herbal hair oil: what is inside it, how often to use it, when results show, delivery times across Pakistan and how to pay.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: en.faqPage.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqPage />
    </>
  );
}
