"use client";

import Link from "next/link";
import { brand, waLink } from "@/lib/brand";
import { useT } from "@/components/Providers";
import { PageHero, Section, SectionHeading, TickList, Reveal } from "@/components/ui";
import { WhatsappIcon } from "@/components/Icons";

export default function PoliciesPage() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t.policiesPage.eyebrow}
        title={t.policiesPage.title}
        intro={t.policiesPage.intro}
      />

      <Section tone="bg">
        <div className="grid gap-6 md:grid-cols-3">
          {t.policiesPage.cards.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="card h-full p-8">
                <h2 className="font-display text-2xl">{item.title}</h2>
                <div className="gold-rule mt-4 w-16" />
                <p className="mt-4 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">{t.policiesPage.returnsTitle}</h2>
            <div className="gold-rule mt-5 w-24" />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {t.policiesPage.returnsIntro}
            </p>
            <div className="mt-7">
              <TickList items={t.policiesPage.returnsPoints} />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {t.policiesPage.refundNote}
            </p>
          </div>

          <div className="space-y-6">
            {t.policiesPage.extra.map((item) => (
              <div key={item.title} className="card p-8">
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="band" className="text-center">
        <SectionHeading
          title={t.policiesPage.helpTitle}
          intro={t.policiesPage.helpIntro}
          tone="light"
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(`Assalam o Alaikum ${brand.name} team, I need help with my order.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsappIcon className="h-5 w-5" />
            {brand.contact.whatsappDisplay}
          </a>
          <Link href="/contact" className="btn btn-gold">
            {t.common.contactPage}
          </Link>
        </div>
      </Section>
    </>
  );
}
