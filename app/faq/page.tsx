import type { Metadata } from "next";
import Link from "next/link";
import { brand, waLink } from "@/lib/brand";
import { faqs } from "@/lib/content";
import { PageHero, Section } from "@/components/ui";
import { WhatsappIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Roots Revival herbal hair oil: what is inside it, how often to use it, when results show, delivery times across Pakistan and how to pay.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="Good questions"
        title="Everything you wanted to ask"
        intro="If your question is not here, send it to us on WhatsApp. A real person from our family replies, usually within the hour."
      />

      <Section tone="cream">
        <div className="mx-auto max-w-3xl divide-y divide-cream-deep">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <span className="font-display text-xl leading-snug text-forest">
                  {item.q}
                </span>
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section tone="soft" className="text-center">
        <h2 className="text-3xl">Still unsure about something?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Ask us anything about your hair type, your scalp or your order. We would
          rather answer ten questions than sell you the wrong thing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(
              `Assalam o Alaikum ${brand.name} team, I have a question about the herbal hair oil.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsappIcon className="h-5 w-5" />
            Ask On WhatsApp
          </a>
          <Link href="/contact" className="btn btn-outline">
            Write To Us
          </Link>
        </div>
      </Section>
    </>
  );
}
