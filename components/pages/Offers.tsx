"use client";

import Image from "next/image";
import Link from "next/link";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { coupons, products, savingOf } from "@/lib/products";
import { useT } from "@/components/Providers";
import { artwork, PackShot } from "@/components/ProductArt";
import Countdown from "@/components/Countdown";
import { PageHero, Section, SectionHeading, Pill, Reveal } from "@/components/ui";
import { InstagramIcon, SparkIcon, TagIcon, TruckIcon, WhatsappIcon } from "@/components/Icons";

export default function OffersPage() {
  const t = useT();
  const dealIcons = [
    <TruckIcon key="a" className="h-6 w-6" />,
    <TagIcon key="b" className="h-6 w-6" />,
    <SparkIcon key="c" className="h-6 w-6" />,
  ];

  return (
    <>
      <PageHero eyebrow={t.offers.eyebrow} title={t.offers.title} intro={t.offers.intro}>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-gold">
            {t.offers.shopDeals}
          </Link>
          <a
            href={waLink(
              `Assalam o Alaikum ${brand.name} team, I would like to know about the current offers.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            {t.offers.askOffers}
          </a>
        </div>
      </PageHero>

      {/* Headline offer */}
      <Section tone="bg">
        <div className="card grid items-center gap-8 overflow-hidden p-0 lg:grid-cols-2">
          <div className="p-8 lg:p-12">
            <Pill tone="hibiscus">{t.offers.headlineBadge}</Pill>
            <h2 className="mt-5 text-3xl leading-tight sm:text-5xl">
              {t.offers.headlineTitle1}
              <br />
              <span className="text-gold">{t.offers.headlineTitle2}</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              {t.offers.headlineBody}
            </p>
            <div className="mt-7">
              <Countdown />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/product/family" className="btn btn-gold">
                {t.offers.grabFamily}
              </Link>
              <Link href="/shop" className="btn btn-outline">
                {t.offers.comparePacks}
              </Link>
            </div>
            <p className="mt-6 text-[0.68rem] uppercase tracking-[0.14em] text-muted">
              {t.offers.whileStock}
            </p>
          </div>
          <div className="relative h-72 w-full lg:h-full lg:min-h-[30rem]">
            <Image
              src={artwork.dealsWide}
              alt={t.offers.headlineTitle1}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Pack pricing */}
      <Section tone="soft">
        <SectionHeading
          eyebrow={t.offers.tableEyebrow}
          title={t.offers.tableTitle}
          intro={t.offers.tableIntro}
        />

        <div className="mt-10 grid gap-6 md:hidden">
          {products.map((product) => {
            const copy = t.products[product.slug];
            return (
              <div key={product.slug} className="card overflow-hidden">
                <PackShot slug={product.slug} className="h-40 w-full bg-[#0d1710]" />
                <div className="p-5">
                  <h3 className="font-display text-2xl">{copy.name}</h3>
                  <dl className="mt-3 space-y-2 text-sm">
                    <Row label={t.offers.tableHeads[2]} value={formatPrice(product.compareAt)} strike />
                    <Row label={t.offers.tableHeads[3]} value={formatPrice(product.price)} />
                    <Row label={t.offers.tableHeads[4]} value={formatPrice(savingOf(product))} accent />
                    <Row
                      label={t.offers.tableHeads[5]}
                      value={formatPrice(Math.round(product.price / product.bottles))}
                    />
                  </dl>
                  <Link href={`/product/${product.slug}`} className="btn btn-primary mt-5 w-full">
                    {t.common.viewPack}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[640px] overflow-hidden rounded-2xl bg-card">
            <thead>
              <tr className="bg-band text-bandtext">
                {t.offers.tableHeads.map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-start text-[0.68rem] font-medium uppercase tracking-[0.14em]"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const copy = t.products[product.slug];
                return (
                  <tr key={product.slug} className="border-b border-border">
                    <td className="px-5 py-4">
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-display text-lg text-heading hover:text-gold"
                      >
                        {copy.name}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted">{product.bottles}</td>
                    <td className="px-5 py-4 text-sm text-muted line-through">
                      {formatPrice(product.compareAt)}
                    </td>
                    <td className="px-5 py-4 font-display text-xl text-heading">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-5 py-4 text-sm text-hibiscus">
                      {formatPrice(savingOf(product))}
                    </td>
                    <td className="px-5 py-4 text-sm text-muted">
                      {formatPrice(Math.round(product.price / product.bottles))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Coupons */}
      <Section tone="bg">
        <SectionHeading
          eyebrow={t.offers.codesEyebrow}
          title={t.offers.codesTitle}
          intro={t.offers.codesIntro}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {coupons.map((coupon, index) => (
            <Reveal key={coupon.code} delay={index * 80}>
              <div className="card h-full overflow-hidden text-center">
                <div className="bg-band px-6 py-7">
                  <p className="font-display text-3xl tracking-[0.14em] text-goldlight">
                    {coupon.code}
                  </p>
                </div>
                <div className="px-6 py-7">
                  <p className="text-sm leading-relaxed text-muted">
                    {t.coupons[coupon.code]}
                  </p>
                  <p className="mt-4 text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                    {coupon.minimum > 0
                      ? `${t.common.minimumOrder} ${formatPrice(coupon.minimum)}`
                      : t.common.noMinimum}
                  </p>
                  <Link href="/shop" className="btn btn-outline mt-6 w-full">
                    {t.common.useThisCode}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Standing offers */}
      <Section tone="soft">
        <SectionHeading eyebrow={t.offers.standingEyebrow} title={t.offers.standingTitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.offers.standing.map((deal, index) => (
            <Reveal key={deal.title} delay={index * 80}>
              <div className="card h-full p-8">
                <span className="text-gold">{dealIcons[index]}</span>
                <h3 className="mt-4 font-display text-2xl">{deal.title}</h3>
                <p className="mt-2 text-sm font-medium text-heading">{deal.line}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{deal.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Referral and Instagram */}
      <Section tone="band">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-bandtext/15 p-8">
            <p className="eyebrow text-goldlight">{t.offers.referEyebrow}</p>
            <h3 className="mt-4 text-2xl text-bandtext">{t.offers.referTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-bandtext/80">
              {t.offers.referBody}
            </p>
            <a
              href={waLink(
                "Assalam o Alaikum, I want to refer a friend to Roots Revival. My order number is "
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp mt-7"
            >
              <WhatsappIcon className="h-5 w-5" />
              {t.offers.referBtn}
            </a>
          </div>

          <div className="rounded-2xl border border-bandtext/15 p-8">
            <p className="eyebrow text-goldlight">{t.offers.instaEyebrow}</p>
            <h3 className="mt-4 text-2xl text-bandtext">{t.offers.instaTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-bandtext/80">
              {t.offers.instaBody}
            </p>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold mt-7"
            >
              <InstagramIcon className="h-5 w-5" />
              {t.offers.instaBtn}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

function Row({
  label,
  value,
  strike,
  accent,
}: {
  label: string;
  value: string;
  strike?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd
        className={`${strike ? "text-muted line-through" : accent ? "text-hibiscus" : "text-heading"}`}
      >
        {value}
      </dd>
    </div>
  );
}
