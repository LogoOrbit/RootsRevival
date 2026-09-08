"use client";

import Image from "next/image";
import Link from "next/link";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { hasSaving, products, savingOf } from "@/lib/products";
import { deliveryZones, lowestFee, highestFee } from "@/lib/delivery";
import { useT } from "@/components/Providers";
import { artwork, PackShot } from "@/components/ProductArt";
import { PageHero, Section, SectionHeading, Reveal } from "@/components/ui";
import { GiftIcon, ShieldIcon, TruckIcon, WhatsappIcon } from "@/components/Icons";

export default function OffersPage() {
  const t = useT();

  return (
    <>
      <PageHero eyebrow={t.offers.eyebrow} title={t.offers.title} intro={t.offers.intro} />

      {/* The one offer we run: a free 60ml bottle with the duo pack. */}
      <Section tone="bg" className="pt-0">
        <div className="card grid overflow-hidden lg:grid-cols-2">
          <div className="gift-shine order-2 p-8 sm:p-12 lg:order-1">
            <span className="chip chip-gift">
              <span className="gift-pop">
                <GiftIcon className="h-4 w-4" />
              </span>
              {t.offers.headlineBadge}
            </span>
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
              {t.offers.headlineTitle1}{" "}
              <span className="text-gold">{t.offers.headlineTitle2}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed">{t.offers.headlineBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/product/duo" className="btn btn-gold">
                {t.offers.grabDuo}
              </Link>
              <Link href="/shop" className="btn btn-outline">
                {t.offers.comparePacks}
              </Link>
            </div>
          </div>
          <div className="relative order-1 h-72 w-full lg:order-2 lg:h-full lg:min-h-[26rem]">
            <Image
              src={artwork.hero}
              alt={t.offers.headlineTitle1}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Every pack, listed on its own. */}
      <Section tone="soft">
        <SectionHeading
          eyebrow={t.offers.tableEyebrow}
          title={t.offers.tableTitle}
          intro={t.offers.tableIntro}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.map((product, index) => {
            const copy = t.products[product.slug];
            return (
              <Reveal key={product.slug} delay={index * 90}>
                <div
                  className={`card flex h-full flex-col overflow-hidden ${
                    product.bestValue ? "ring-2 ring-gold" : ""
                  }`}
                >
                  <PackShot slug={product.slug} className="aspect-square w-full" />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-gold">{copy.badge}</p>
                    <h3 className="mt-2 font-display text-2xl">{copy.name}</h3>
                    <p className="spec mt-2">{copy.volume}</p>

                    <ul className="mt-4 flex-1 space-y-2 text-[0.95rem] leading-snug">
                      {copy.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap items-baseline gap-3">
                      <span className="price price-lg">{formatPrice(product.price)}</span>
                      {hasSaving(product) ? (
                        <span className="price-was text-base">
                          {formatPrice(product.compareAt!)}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.gift ? (
                        <span className="chip chip-gift">{t.common.freeGift}</span>
                      ) : null}
                      {hasSaving(product) ? (
                        <span className="chip chip-save">
                          {t.common.youSave} {formatPrice(savingOf(product))}
                        </span>
                      ) : null}
                    </div>

                    <Link
                      href={`/product/${product.slug}`}
                      className="btn btn-primary mt-6 w-full"
                    >
                      {t.common.viewPack}
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Delivery inside Karachi. */}
      <Section tone="bg">
        <SectionHeading
          eyebrow={t.delivery.eyebrow}
          title={t.delivery.title}
          intro={t.delivery.intro}
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[520px] overflow-hidden rounded-2xl bg-card">
            <thead>
              <tr className="bg-band text-bandtext">
                {t.delivery.tableHeads.map((heading) => (
                  <th key={heading} className="px-5 py-4 text-start text-sm font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deliveryZones.map((zone) => (
                <tr key={zone.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-display text-lg text-heading">
                    {t.delivery.zones[zone.id].label}
                  </td>
                  <td className="px-5 py-4 text-[0.95rem] leading-relaxed">
                    {t.delivery.zones[zone.id].areas}
                  </td>
                  <td className="px-5 py-4">
                    <span className="price price-md">{formatPrice(zone.fee)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-center text-[0.95rem] text-muted">
          {t.delivery.note} {formatPrice(lowestFee)} to {formatPrice(highestFee)}.
        </p>
      </Section>

      <Section tone="band">
        <SectionHeading
          eyebrow={t.offers.standingEyebrow}
          title={t.offers.standingTitle}
          tone="light"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            <GiftIcon key="a" className="h-6 w-6" />,
            <ShieldIcon key="b" className="h-6 w-6" />,
            <TruckIcon key="c" className="h-6 w-6" />,
          ].map((icon, index) => (
            <Reveal key={t.offers.standing[index].title} delay={index * 90}>
              <div className="h-full rounded-2xl border border-bandtext/15 p-7">
                <span className="text-goldlight">{icon}</span>
                <h3 className="mt-4 font-display text-xl text-bandtext">
                  {t.offers.standing[index].title}
                </h3>
                <p className="mt-2 text-base text-goldlight">
                  {t.offers.standing[index].line}
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-bandtext/80">
                  {t.offers.standing[index].note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href={waLink(
              `Assalam o Alaikum ${brand.name} team, I would like to order the herbal hair oil.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsappIcon className="h-5 w-5" />
            {t.common.orderOnWhatsapp}
          </a>
        </div>
      </Section>
    </>
  );
}
