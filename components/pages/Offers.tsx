"use client";

import Image from "next/image";
import Link from "next/link";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { hasSaving, products, savingOf } from "@/lib/products";
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
                  className={`card flex h-full flex-row overflow-hidden sm:flex-col ${
                    product.bestValue ? "ring-2 ring-gold" : ""
                  }`}
                >
                  <PackShot
                    slug={product.slug}
                    className="w-32 shrink-0 self-stretch sm:aspect-square sm:w-full"
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 45vw, 380px"
                  />
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <p className="eyebrow text-gold">{copy.badge}</p>
                    <h3 className="mt-1 font-display text-xl sm:mt-2 sm:text-2xl">
                      {copy.name}
                    </h3>
                    <p className="spec mt-1 sm:mt-2">{copy.volume}</p>

                    <ul className="mt-4 hidden flex-1 space-y-2 text-[0.95rem] leading-snug sm:block">
                      {copy.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                    <div className="mt-3 flex flex-wrap items-baseline gap-3 sm:mt-5">
                      <span className="price price-lg">{formatPrice(product.price)}</span>
                      {hasSaving(product) ? (
                        <span className="price-was text-base">
                          {formatPrice(product.compareAt!)}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
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
                      className="btn btn-primary mt-4 w-full sm:mt-6"
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

      {/* One flat delivery charge for every order. */}
      <Section tone="bg">
        <SectionHeading
          eyebrow={t.delivery.eyebrow}
          title={t.delivery.title}
          intro={t.delivery.intro}
        />
        <div className="mx-auto mt-10 max-w-md">
          <div className="card gift-shine p-8 text-center">
            <span className="text-gold">
              <TruckIcon className="mx-auto h-8 w-8" />
            </span>
            <p className="price price-xl mt-4">
              {formatPrice(brand.shipping.flatRate)}
            </p>
            <p className="mt-2 text-base font-semibold text-heading">
              {t.delivery.flatLabel}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed">{t.delivery.note}</p>
          </div>
        </div>
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
