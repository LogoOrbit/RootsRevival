"use client";

import Link from "next/link";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { products } from "@/lib/products";
import { deliveryZones, lowestFee, highestFee } from "@/lib/delivery";
import { useT } from "@/components/Providers";
import ProductCard from "@/components/ProductCard";
import { PageHero, Section, SectionHeading, Reveal } from "@/components/ui";
import { GiftIcon, LeafIcon, ShieldIcon, TruckIcon, WhatsappIcon } from "@/components/Icons";

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
        <div className="gift-shine inline-flex items-center gap-3 rounded-2xl border border-gold/50 bg-gold/12 px-5 py-3">
          <span className="gift-pop text-gold">
            <GiftIcon className="h-6 w-6" />
          </span>
          <span className="text-base font-semibold text-heading">
            {t.common.giftBanner}
          </span>
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
              <p className="mt-2 text-[0.95rem] leading-relaxed">{perk.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Delivery, so the buyer knows the charge before the checkout page. */}
      <Section tone="soft">
        <SectionHeading
          eyebrow={t.delivery.eyebrow}
          title={t.delivery.title}
          intro={t.delivery.intro}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deliveryZones.map((zone, index) => (
            <Reveal key={zone.id} delay={index * 70}>
              <div className="card h-full p-6">
                <p className="price price-lg">{formatPrice(zone.fee)}</p>
                <h3 className="mt-2 font-display text-xl">
                  {t.delivery.zones[zone.id].label}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed">
                  {t.delivery.zones[zone.id].areas}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-[0.95rem] text-muted">
          {t.delivery.note} {formatPrice(lowestFee)} to {formatPrice(highestFee)}.
        </p>
      </Section>

      <Section tone="band" className="text-center">
        <h2 className="text-3xl text-bandtext sm:text-4xl">{t.shop.messageTitle}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-bandtext/85">
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
            <span key={item} className="text-sm text-bandtext/80">
              {item}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
