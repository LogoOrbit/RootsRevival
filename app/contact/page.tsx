import type { Metadata } from "next";
import Link from "next/link";
import { brand, mailLink, waLink } from "@/lib/brand";
import ContactForm from "@/components/ContactForm";
import { PageHero, Section } from "@/components/ui";
import { InstagramIcon, MailIcon, WhatsappIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to the Roots Revival team on WhatsApp at +92 311 3839767, write to rootsrevivalpakistan@gmail.com or send us a message from this page.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Say salam"
        title="We are one message away"
        intro="Questions about your hair, your order or wholesale rates all reach the same family. Choose whichever way is easiest for you."
      />

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            <a
              href={waLink(
                `Assalam o Alaikum ${brand.name} team, I have a question.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-start gap-4 p-6 transition-shadow hover:shadow-lg"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1faa54] text-white">
                <WhatsappIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-xl text-forest">WhatsApp</span>
                <span className="mt-1 block text-sm text-muted">
                  {brand.contact.whatsappDisplay}
                </span>
                <span className="mt-2 block text-xs uppercase tracking-[0.14em] text-gold">
                  Fastest way to reach us
                </span>
              </span>
            </a>

            <a
              href={mailLink}
              className="card flex items-start gap-4 p-6 transition-shadow hover:shadow-lg"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                <MailIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-xl text-forest">Email</span>
                <span className="mt-1 block break-all text-sm text-muted">
                  {brand.contact.email}
                </span>
                <span className="mt-2 block text-xs uppercase tracking-[0.14em] text-gold">
                  For orders and detailed questions
                </span>
              </span>
            </a>

            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-start gap-4 p-6 transition-shadow hover:shadow-lg"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                <InstagramIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-xl text-forest">Instagram</span>
                <span className="mt-1 block text-sm text-muted">
                  {brand.social.instagramHandle}
                </span>
                <span className="mt-2 block text-xs uppercase tracking-[0.14em] text-gold">
                  Batch days and customer results
                </span>
              </span>
            </a>

            <div className="card p-6">
              <h3 className="eyebrow text-gold">Working times</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {brand.contact.hours}. Messages that arrive at night are answered first
                thing the next morning.
              </p>
              <h3 className="eyebrow mt-6 text-gold">Where we are</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Handmade in {brand.contact.country}, delivered to every city through our
                courier partners. We are a home run brand, so we do not keep a walk in
                shop.
              </p>
              <Link href="/policies" className="btn btn-outline mt-6">
                Delivery And Returns
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>

      <Section tone="forest" className="text-center">
        <h2 className="text-3xl text-cream sm:text-4xl">Selling in your city?</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream-soft/80">
          We work with a small number of resellers and salons. Take six bottles or more
          and we will share our wholesale price list with you.
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
            Ask For Wholesale Rates
          </a>
          <a href={mailLink} className="btn btn-gold">
            Email Us
          </a>
        </div>
      </Section>
    </>
  );
}
