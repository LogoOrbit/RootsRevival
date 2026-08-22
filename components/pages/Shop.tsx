"use client";

import Link from "next/link";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { coupons, products } from "@/lib/products";
import { useT } from "@/components/Providers";
import ProductCard from "@/components/ProductCard";
import Countdown from "@/components/Countdown";
import { PageHero, Section, SectionHeading, Reveal } from "@/components/ui";
import { LeafIcon, ShieldIcon, TruckIcon, WhatsappIcon } from "@/components/Icons";

export default function ShopPage() {
  const t = useT();
  const perkIcons = [
    <TruckIcon key="a" className="h-6 w-6" />,
    <ShieldIcon key="b" className="h-6 w-6" />,
    <LeafIcon key="c" className="h-6 w-6" />,
  ];

  return (
    <>
      <PageHero eyebrow={t.shop.eyebrow} title={t.shop.title} intro={t.shop.intro}>
        <div className="inline-flex rounded-2xl border border-border bg-card px-5 py-3">
          <Countdown />
        </div>
      </PageHero>

      <Section tone="bg">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 90}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {t.shop.perks.map((perk, index) => (
            <div key={perk.title} className="card p-7">
              <span className="text-gold">{perkIcons[index]}</span>
              <h3 className="mt-4 font-display text-xl">{perk.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{perk.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow={t.shop.codesEyebrow}
          title={t.shop.codesTitle}
          intro={t.shop.codesIntro}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {coupons.map((coupon, index) => (
            <Reveal key={coupon.code} delay={index * 80}>
              <div className="card h-full p-7 text-center">
                <p className="font-display text-3xl tracking-[0.14em] text-gold">
                  {coupon.code}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t.coupons[coupon.code]}
                </p>
                <p className="mt-4 text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  {coupon.minimum > 0
                    ? `${t.common.minimumOrder} ${formatPrice(coupon.minimum)}`
                    : t.common.noMinimum}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs uppercase tracking-[0.14em] text-muted">
          {t.common.oneCodePerOrder}
        </p>
      </Section>

      <Section tone="band" className="text-center">
        <h2 className="text-3xl text-bandtext sm:text-4xl">{t.shop.messageTitle}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-bandtext/80">
          {t.shop.messageIntro}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(
              `Assalam o Alaikum ${brand.name} team, I would like to order the herbal hair oil.`
            )}
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
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {t.assurances.map((item) => (
            <span
              key={item}
              className="text-[0.66rem] uppercase tracking-[0.16em] text-bandtext/70"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
