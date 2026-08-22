"use client";

import Link from "next/link";
import { brand, waLink } from "@/lib/brand";
import { useT } from "@/components/Providers";
import { PageHero, Section } from "@/components/ui";
import { WhatsappIcon } from "@/components/Icons";

export default function FaqPage() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t.faqPage.eyebrow}
        title={t.faqPage.title}
        intro={t.faqPage.intro}
      />

      <Section tone="bg">
        <div className="mx-auto max-w-3xl divide-y divide-border">
          {t.faqPage.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <span className="font-display text-lg leading-snug text-heading sm:text-xl">
                  {item.q}
                </span>
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section tone="soft" className="text-center">
        <h2 className="text-3xl">{t.faqPage.stillTitle}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
          {t.faqPage.stillIntro}
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
            {t.common.askOnWhatsapp}
          </a>
          <Link href="/contact" className="btn btn-outline">
            {t.faqPage.writeToUs}
          </Link>
        </div>
      </Section>
    </>
  );
}
