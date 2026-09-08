"use client";

import Link from "next/link";
import { useState } from "react";
import { brand, formatPrice } from "@/lib/brand";
import { getProduct, hasSaving, percentOff, products, savingOf } from "@/lib/products";
import { useT } from "@/components/Providers";
import { AddToCart } from "@/components/AddToCart";
import { ArtPanel, boxSides, PackShot } from "@/components/ProductArt";
import Countdown from "@/components/Countdown";
import { HerbIcon } from "@/components/HerbIcons";
import { Breadcrumb, Pill, Section, SectionHeading, TickList, Reveal } from "@/components/ui";
import { LeafIcon, ShieldIcon, TruckIcon } from "@/components/Icons";

export default function ProductDetail({ slug }: { slug: string }) {
  const t = useT();
  const product = getProduct(slug);
  const [shot, setShot] = useState(0);

  if (!product) return null;
  const copy = t.products[product.slug];
  const others = products.filter((p) => p.slug !== product.slug);

  /* The pack itself, then the three sides of the box, the same on every pack. */
  const gallery = [
    { kind: "pack" as const, src: "", label: copy.name },
    ...boxSides.map((src, index) => ({
      kind: "art" as const,
      src,
      label: t.product.gallerySides[index],
    })),
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { href: "/", label: t.common.home },
          { href: "/shop", label: t.common.shop },
          { label: copy.name },
        ]}
      />

      <Section tone="bg" className="pt-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="card overflow-hidden bg-[#0d1710] p-0">
              {gallery[shot].kind === "pack" ? (
                <PackShot
                  slug={product.slug}
                  className="h-[22rem] w-full sm:h-[30rem]"
                  priority
                  sizes="(max-width: 1024px) 92vw, 560px"
                />
              ) : (
                <ArtPanel
                  src={gallery[shot].src}
                  alt={gallery[shot].label}
                  className="h-[22rem] w-full sm:h-[30rem]"
                  sizes="(max-width: 1024px) 92vw, 560px"
                />
              )}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setShot(index)}
                  className={`card h-20 overflow-hidden p-0 transition-all sm:h-24 ${
                    shot === index ? "ring-2 ring-gold" : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={item.label}
                >
                  {item.kind === "pack" ? (
                    <PackShot slug={product.slug} className="h-full w-full" sizes="120px" />
                  ) : (
                    <ArtPanel
                      src={item.src}
                      alt={item.label}
                      className="h-full w-full"
                      sizes="120px"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <Pill tone="gold">{copy.badge}</Pill>
              {product.gift && <Pill tone="hibiscus">{t.common.freeGift}</Pill>}
              {hasSaving(product) && (
                <Pill tone="hibiscus">
                  {t.common.save} {formatPrice(savingOf(product))}
                </Pill>
              )}
            </div>

            <h1 className="mt-5 text-3xl leading-tight sm:text-5xl">{copy.name}</h1>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
              {brand.name} {t.common.category} {copy.volume}
            </p>

            <p className="mt-5 text-base leading-relaxed text-muted">
              {copy.summary} {t.common.forAllHairTypes}.
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="font-display text-4xl text-heading sm:text-5xl">
                {formatPrice(product.price)}
              </span>
              {hasSaving(product) && (
                <>
                  <span className="pb-2 text-base text-muted line-through">
                    {formatPrice(product.compareAt!)}
                  </span>
                  <span className="mb-2 rounded-full bg-hibiscus px-3 py-1 text-[0.66rem] uppercase tracking-[0.12em] text-white">
                    {percentOff(product)} {t.common.percentOff}
                  </span>
                </>
              )}
              <span className="pb-2 text-base text-muted">
                {formatPrice(Math.round(product.price / product.bottles))}{" "}
                {t.common.perBottle}
              </span>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted">
              {t.common.priceIncludesTaxes}{" "}
              {product.freeDelivery
                ? t.product.deliveryFreeOnPack
                : t.product.deliveryFlat}
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-bgsoft p-4">
              <Countdown />
            </div>

            <div className="mt-7">
              <AddToCart product={product} />
            </div>

            <div className="mt-8 rounded-2xl bg-bgsoft p-6">
              <TickList items={copy.highlights} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: <TruckIcon className="h-5 w-5" />, label: brand.shipping.deliveryDays },
                { icon: <ShieldIcon className="h-5 w-5" />, label: t.common.cashOnDelivery },
                { icon: <LeafIcon className="h-5 w-5" />, label: t.assurances[0] },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-muted"
                >
                  <span className="text-gold">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">{t.product.whatItDoes}</h2>
            <div className="gold-rule mt-5 w-24" />
            <div className="mt-7 space-y-5">
              {t.benefits.map((benefit) => (
                <div key={benefit.title}>
                  <h3 className="font-display text-lg">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{benefit.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl">{t.product.howToUse}</h2>
            <div className="gold-rule mt-5 w-24" />
            <ol className="mt-7 space-y-5">
              {t.howToUse.map((step, index) => (
                <li key={step.step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-band font-display text-base text-bandtext">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg leading-snug text-heading">
                      {step.step}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.note}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="card mt-8 p-6">
              <h3 className="eyebrow text-gold">{t.product.storage}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t.product.storageBody}
              </p>
              <h3 className="eyebrow mt-6 text-gold">{t.product.caution}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t.product.cautionBody}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="bg">
        <SectionHeading
          eyebrow={t.product.fullListEyebrow}
          title={t.product.fullListTitle}
          intro={t.product.fullListIntro}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.ingredients.map((item, index) => (
            <Reveal key={item.name} delay={index * 30}>
              <div className="card flex h-full items-start gap-3 p-5">
                <span className="text-gold">
                  <HerbIcon index={index} className="h-8 w-8" />
                </span>
                <span>
                  <span className="block font-display text-lg text-heading">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                    {item.note}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow={t.product.otherPacksEyebrow}
          title={t.product.otherPacksTitle}
          intro={t.product.otherPacksIntro}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {others.map((other) => {
            const otherCopy = t.products[other.slug];
            return (
              <Link
                key={other.slug}
                href={`/product/${other.slug}`}
                className="card group flex items-center gap-5 overflow-hidden p-4 transition-shadow hover:shadow-lg"
              >
                <PackShot
                  slug={other.slug}
                  className="h-32 w-28 shrink-0 rounded-xl bg-[#0d1710] transition-transform duration-500 group-hover:scale-105"
                  sizes="140px"
                />
                <span>
                  <span className="block font-display text-2xl text-heading">
                    {otherCopy.name}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{otherCopy.volume}</span>
                  <span className="mt-2 block font-display text-2xl text-heading">
                    {formatPrice(other.price)}{" "}
                    <span className="text-sm text-muted">
                      {formatPrice(Math.round(other.price / other.bottles))}{" "}
                      {t.common.perBottle}
                    </span>
                  </span>
                  <span className="mt-3 inline-block text-[0.7rem] uppercase tracking-[0.14em] text-gold">
                    {t.common.viewPack}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
