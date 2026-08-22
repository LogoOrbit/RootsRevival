"use client";

import Link from "next/link";
import { brand, waLink } from "@/lib/brand";
import { useT } from "@/components/Providers";
import { PageHero, Section, SectionHeading, TickList, Reveal } from "@/components/ui";
import { ShieldIcon, TruckIcon, WhatsappIcon } from "@/components/Icons";

export default function PaymentPage() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t.paymentPage.eyebrow}
        title={t.paymentPage.title}
        intro={t.paymentPage.intro}
      />

      <Section tone="bg">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card p-8 sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-band text-bandtext">
              <TruckIcon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-3xl">{t.paymentPage.codTitle}</h2>
            <div className="gold-rule mt-5 w-24" />
            <p className="mt-5 text-sm leading-relaxed text-muted">{t.paymentPage.codBody}</p>
            <div className="mt-6">
              <TickList items={t.paymentPage.codPoints} />
            </div>
            <Link href="/shop" className="btn btn-outline mt-7">
              {t.paymentPage.codBtn}
            </Link>
          </div>

          <div className="card overflow-hidden">
            <div className="bg-band p-8 text-bandtext sm:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bandtext text-band">
                <ShieldIcon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-3xl text-bandtext">{t.paymentPage.bankTitle}</h2>
              <div className="gold-rule mt-5 w-24" />
              <p className="mt-5 text-sm leading-relaxed text-bandtext/85">
                {t.paymentPage.bankBody}
              </p>

              <dl className="mt-7 space-y-4 rounded-2xl border border-bandtext/20 p-6 text-sm">
                <Row label={t.checkoutPage.bank} value={brand.bank.bankName} />
                <Row label={t.checkoutPage.accountTitle} value={brand.bank.accountTitle} />
                <Row
                  label={t.checkoutPage.accountNumber}
                  value={brand.bank.accountNumber}
                  gold
                />
                <Row
                  label={t.checkoutPage.sendReceiptTo}
                  value={brand.contact.whatsappDisplay}
                  last
                />
              </dl>

              <a
                href={waLink(
                  `Assalam o Alaikum ${brand.name} team, I have transferred the payment for my order. Here is the receipt.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-7 w-full"
              >
                <WhatsappIcon className="h-5 w-5" />
                {t.paymentPage.sendReceipt}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow={t.paymentPage.stepsEyebrow}
          title={t.paymentPage.stepsTitle}
          intro={t.paymentPage.stepsIntro}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.paymentPage.steps.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="card h-full p-7">
                <span className="font-display text-3xl text-gold/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="card mx-auto mt-12 max-w-3xl p-8">
          <h3 className="font-display text-xl">{t.paymentPage.safetyTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {t.paymentPage.safetyBody}
          </p>
          <p className="mt-4 text-sm text-heading">
            {brand.bank.bankName} ✦ {brand.bank.accountTitle} ✦{" "}
            <span dir="ltr">{brand.bank.accountNumber}</span> ✦{" "}
            <span dir="ltr">{brand.contact.whatsappDisplay}</span>
          </p>
        </div>
      </Section>
    </>
  );
}

function Row({
  label,
  value,
  gold,
  last,
}: {
  label: string;
  value: string;
  gold?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap justify-between gap-3 ${
        last ? "" : "border-b border-bandtext/15 pb-4"
      }`}
    >
      <dt className="text-bandtext/70">{label}</dt>
      <dd className={`font-medium ${gold ? "tracking-[0.1em] text-goldlight" : ""}`} dir="ltr">
        {value}
      </dd>
    </div>
  );
}
