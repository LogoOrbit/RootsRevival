"use client";

import Link from "next/link";
import { brand, mailLink, waLink } from "@/lib/brand";
import { useT } from "@/components/Providers";
import ContactForm from "@/components/ContactForm";
import { PageHero, Section } from "@/components/ui";
import { InstagramIcon, MailIcon, WhatsappIcon } from "@/components/Icons";

export default function ContactPage() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t.contactPage.eyebrow}
        title={t.contactPage.title}
        intro={t.contactPage.intro}
      />

      <Section tone="bg">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <a
              href={waLink(`Assalam o Alaikum ${brand.name} team, I have a question.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-start gap-4 p-6 transition-shadow hover:shadow-lg"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1faa54] text-white">
                <WhatsappIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-xl text-heading">WhatsApp</span>
                <span className="mt-1 block text-sm text-muted">
                  {brand.contact.whatsappDisplay}
                </span>
                <span className="mt-2 block text-xs uppercase tracking-[0.12em] text-gold">
                  {t.contactPage.whatsappNote}
                </span>
              </span>
            </a>

            <a href={mailLink} className="card flex items-start gap-4 p-6 transition-shadow hover:shadow-lg">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-band text-bandtext">
                <MailIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-xl text-heading">
                  {t.contactPage.email}
                </span>
                <span className="mt-1 block break-all text-sm text-muted">
                  {brand.contact.email}
                </span>
                <span className="mt-2 block text-xs uppercase tracking-[0.12em] text-gold">
                  {t.contactPage.emailNote}
                </span>
              </span>
            </a>

            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-start gap-4 p-6 transition-shadow hover:shadow-lg"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-band text-bandtext">
                <InstagramIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-xl text-heading">Instagram</span>
                <span className="mt-1 block text-sm text-muted">
                  {brand.social.instagramHandle}
                </span>
                <span className="mt-2 block text-xs uppercase tracking-[0.12em] text-gold">
                  {t.contactPage.instaNote}
                </span>
              </span>
            </a>

            <div className="card p-6">
              <h3 className="eyebrow text-gold">{t.contactPage.hoursTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {brand.contact.hours}. {t.contactPage.hoursBody}
              </p>
              <h3 className="eyebrow mt-6 text-gold">{t.contactPage.whereTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t.contactPage.whereBody}
              </p>
              <Link href="/policies" className="btn btn-outline mt-6">
                {t.contactPage.deliveryReturns}
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>

      <Section tone="band" className="text-center">
        <h2 className="text-3xl text-bandtext sm:text-4xl">
          {t.contactPage.wholesaleTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-bandtext/80">
          {t.contactPage.wholesaleIntro}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(
              `Assalam o Alaikum ${brand.name} team, I am interested in wholesale rates.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsappIcon className="h-5 w-5" />
            {t.contactPage.wholesaleBtn}
          </a>
          <a href={mailLink} className="btn btn-gold">
            {t.contactPage.emailUs}
          </a>
        </div>
      </Section>
    </>
  );
}
