"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/brand";
import { getProduct, hasSaving, products, savingOf } from "@/lib/products";
import { useT } from "@/components/Providers";
import { AddToCart } from "@/components/AddToCart";
import { ArtPanel, boxSides, PackShot } from "@/components/ProductArt";
import { HerbIcon } from "@/components/HerbIcons";
import { Breadcrumb, Pill, Section, SectionHeading, TickList, Reveal } from "@/components/ui";
import { LeafIcon, ShieldIcon, TruckIcon } from "@/components/Icons";
import { lowestFee, highestFee } from "@/lib/delivery";

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
            <div className="card overflow-hidden bg-[#e7e2d6] p-0">
              {gallery[shot].kind === "pack" ? (
                <PackShot
                  slug={product.slug}
                  className="aspect-square w-full"
                  priority
                  sizes="(max-width: 1024px) 92vw, 560px"
                />
              ) : (
                <ArtPanel
                  src={gallery[shot].src}
                  alt={gallery[shot].label}
                  className="aspect-square w-full"
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
                  className={`card aspect-square overflow-hidden bg-[#e7e2d6] p-0 transition-all ${
                    shot === index ? "ring-2 ring-gold" : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={item.label}
                >
                  {item.kind === "pack" ? (
                    <PackShot slug={product.slug} className="aspect-square w-full" sizes="140px" />
                  ) : (
                    <ArtPanel
                      src={item.src}
                      alt={item.label}
                      className="aspect-square w-full"
                      sizes="140px"
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
            <p className="spec mt-3">{copy.volume}</p>

            <p className="mt-5 text-base leading-relaxed">
              {copy.summary} {t.common.forAllHairTypes}.
            </p>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="price price-xl sm:text-5xl">
                {formatPrice(product.price)}
              </span>
              {hasSaving(product) && (
                <span className="price-was text-xl">
                  {formatPrice(product.compareAt!)}
                </span>
              )}
              <span className="chip chip-stock">{t.common.inStock}</span>
            </div>

            {product.gift || hasSaving(product) ? (
              <div className="mt-4 rounded-2xl border border-gold/40 bg-gold/10 p-4">
                <p className="text-base font-semibold text-heading">
                  {product.gift ? t.product.giftHeadline : t.product.saveHeadline}
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  {product.gift ? t.product.giftBody : t.product.saveBody}
                </p>
              </div>
            ) : null}

            <p className="mt-4 text-sm leading-relaxed text-muted">
              {t.common.priceIncludesTaxes} {t.product.deliveryNote}{" "}
              {formatPrice(lowestFee)} to {formatPrice(highestFee)}.
            </p>

            <div className="mt-7">
              <AddToCart product={product} />
            </div>

            <div className="mt-8 rounded-2xl bg-bgsoft p-6">
              <TickList items={copy.highlights} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: <TruckIcon className="h-5 w-5" />, label: t.product.deliveryDays },
                { icon: <ShieldIcon className="h-5 w-5" />, label: t.common.cashOnDelivery },
                { icon: <LeafIcon className="h-5 w-5" />, label: t.assurances[0] },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-sm"
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
                  className="aspect-square w-28 shrink-0 rounded-xl transition-transform duration-500 group-hover:scale-105"
                  sizes="140px"
                />
                <span>
                  <span className="block font-display text-2xl text-heading">
                    {otherCopy.name}
                  </span>
                  <span className="spec mt-1 block">{otherCopy.volume}</span>
                  <span className="mt-3 flex flex-wrap items-baseline gap-2">
                    <span className="price price-md">{formatPrice(other.price)}</span>
                    {other.compareAt ? (
                      <span className="price-was text-sm">
                        {formatPrice(other.compareAt)}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-3 inline-block text-sm font-semibold text-gold">
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
