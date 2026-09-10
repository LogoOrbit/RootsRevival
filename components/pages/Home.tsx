"use client";

import Image from "next/image";
import Link from "next/link";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { hasSaving, heroProduct, products, savingOf } from "@/lib/products";
import { useT } from "@/components/Providers";
import { artwork, ArtPanel, boxSides, PackShot } from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import { HerbIcon, BenefitIcon } from "@/components/HerbIcons";
import { Section, SectionHeading, Pill, Stat, Reveal } from "@/components/ui";
import {
  GiftIcon,
  HandIcon,
  InstagramIcon,
  LeafIcon,
  ShieldIcon,
  TruckIcon,
  WhatsappIcon,
} from "@/components/Icons";


export default function HomePage() {
  const t = useT();

  return (
    <>
      {/* Hero */}
      <section className="leaf-pattern relative overflow-hidden bg-bgsoft">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-20">
          <div className="fade-up order-2 lg:order-1">
            <Pill tone="gold">{t.home.heroBadge}</Pill>
            <h1 className="mt-5 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
              {t.home.heroTitle1}
              <br />
              <span className="text-gold">{t.home.heroTitle2}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t.home.heroIntro}
            </p>

            <div className="gift-shine mt-7 rounded-2xl border-2 border-gold/50 bg-gold/12 p-5">
              <div className="flex items-start gap-4">
                <span className="gift-pop mt-0.5 shrink-0 text-gold">
                  <GiftIcon className="h-8 w-8" />
                </span>
                <div>
                  <p className="font-display text-2xl leading-tight text-heading sm:text-3xl">
                    {t.home.giftTitle}
                  </p>
                  <p className="mt-2 text-base leading-relaxed">{t.home.giftBody}</p>
                  <div className="mt-4 flex flex-wrap items-baseline gap-3">
                    <span className="price price-lg">{formatPrice(heroProduct.price)}</span>
                    <span className="chip chip-gift">{t.common.freeGift}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/product/duo" className="btn btn-gold">
                {t.common.claimFreeBottle}
              </Link>
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

            <ul className="mt-9 grid gap-4 text-sm text-muted sm:grid-cols-3">
              {[
                <TruckIcon key="a" className="h-5 w-5" />,
                <ShieldIcon key="b" className="h-5 w-5" />,
                <HandIcon key="c" className="h-5 w-5" />,
              ].map((icon, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-gold">{icon}</span>
                  {t.home.trust[index]}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-6 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-[0_30px_80px_rgba(18,53,36,0.22)]">
              <Image
                src={artwork.hero}
                alt="Roots Revival herbal hair oil with its printed boxes and herbs"
                width={1600}
                height={1066}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="card floaty absolute -bottom-5 start-2 hidden px-4 py-3 text-center shadow-lg sm:block">
              <p className="font-display text-2xl text-gold">16</p>
              <p className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                {t.home.herbCount}
              </p>
            </div>
            <div className="card absolute -top-4 end-2 hidden px-4 py-3 text-center shadow-lg sm:block">
              <p className="font-display text-2xl text-gold">250ml</p>
              <p className="text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                {t.home.bottleSize}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Assurance strip */}
      <div className="border-y border-border bg-bg">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-3 px-4 py-5 sm:px-6 lg:px-8">
          {t.assurances.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.14em] text-muted"
            >
              <LeafIcon className="h-4 w-4 text-gold" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Deals */}
      <Section tone="bg">
        <SectionHeading
          eyebrow={t.home.dealsEyebrow}
          title={t.home.dealsTitle}
          intro={t.home.dealsIntro}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.map((product, index) => {
            const copy = t.products[product.slug];
            return (
              <Reveal key={product.slug} delay={index * 90}>
                <Link
                  href={`/product/${product.slug}`}
                  className="card group flex h-full flex-row overflow-hidden text-start transition-shadow hover:shadow-[0_20px_50px_rgba(18,53,36,0.16)] sm:flex-col sm:text-center"
                >
                  <span className="relative block w-32 shrink-0 self-stretch sm:aspect-square sm:w-full">
                    <PackShot
                      slug={product.slug}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 128px, (max-width: 1024px) 45vw, 380px"
                    />
                    {(product.gift || hasSaving(product)) && (
                      <span className="absolute end-3 top-3 hidden rounded-full bg-hibiscus px-3 py-1.5 text-[0.72rem] font-semibold text-white sm:block">
                        {product.gift
                          ? t.common.freeGift
                          : `${t.common.save} ${formatPrice(savingOf(product))}`}
                      </span>
                    )}
                  </span>
                  <span className="flex flex-1 flex-col p-4 sm:p-6">
                    <span className="eyebrow text-gold">{copy.badge}</span>
                    <span className="mt-1 font-display text-xl text-heading sm:mt-2 sm:text-2xl">
                      {copy.name}
                    </span>
                    <span className="spec mt-1 sm:mt-2">{copy.volume}</span>
                    <span className="mt-3 flex flex-wrap items-baseline gap-3 sm:mt-4 sm:justify-center">
                      <span className="price price-lg">{formatPrice(product.price)}</span>
                      {hasSaving(product) ? (
                        <span className="price-was text-base">
                          {formatPrice(product.compareAt!)}
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:justify-center sm:gap-2">
                      {product.gift ? (
                        <span className="chip chip-gift">{t.common.freeGift}</span>
                      ) : null}
                      {hasSaving(product) ? (
                        <span className="chip chip-save">
                          {t.common.youSave} {formatPrice(savingOf(product))}
                        </span>
                      ) : null}
                      <span className="chip chip-stock">{t.common.inStock}</span>
                    </span>
                    <span className="btn btn-outline mt-4 w-full sm:mt-5">
                      {t.common.viewPack}
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="gift-shine mt-10 overflow-hidden rounded-3xl bg-band">
          <div className="grid items-center gap-8 p-8 lg:grid-cols-[auto_1fr_auto] lg:p-10">
            <span className="gift-pop flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-goldlight text-band">
              <GiftIcon className="h-10 w-10" />
            </span>
            <div>
              <p className="eyebrow text-goldlight">{t.offers.headlineBadge}</p>
              <h3 className="mt-3 text-3xl text-bandtext sm:text-4xl">
                {t.home.giftBannerTitle}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-bandtext/85">
                {t.home.giftBannerBody}
              </p>
            </div>
            <Link href="/product/duo" className="btn btn-gold shrink-0">
              {t.common.claimFreeBottle}
            </Link>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="soft">
        <SectionHeading
          eyebrow={t.home.benefitsEyebrow}
          title={t.home.benefitsTitle}
          intro={t.home.benefitsIntro}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 60}>
              <div className="card h-full p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-band text-goldlight">
                  <BenefitIcon index={index} className="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-display text-xl">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Story */}
      <Section tone="band">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-goldlight">{t.home.storyEyebrow}</p>
            <h2 className="mt-4 text-3xl text-bandtext sm:text-4xl">
              {t.home.storyTitle}
            </h2>
            <div className="gold-rule mt-6 w-24" />
            <p className="mt-6 text-base leading-relaxed text-bandtext/85">
              {t.home.storyBody1}
            </p>
            <p className="mt-4 text-base leading-relaxed text-bandtext/85">
              {t.home.storyBody2}
            </p>
            <Link href="/about" className="btn btn-gold mt-8">
              {t.common.readFullStory}
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[2rem] border border-bandtext/15">
              <Image
                src={artwork.boxAbout}
                alt="The about panel on the Roots Revival box"
                width={1600}
                height={1067}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 rounded-2xl border border-bandtext/15 p-6 sm:grid-cols-4 lg:grid-cols-2">
              {t.storyStats.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Ingredients with custom art */}
      <Section tone="bg">
        <SectionHeading
          eyebrow={t.home.ingredientsEyebrow}
          title={t.home.ingredientsTitle}
          intro={t.home.ingredientsIntro}
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {t.ingredients.map((item, index) => (
            <Reveal key={item.name} delay={index * 35}>
              <div className="card group flex h-full flex-col items-center p-5 text-center transition-colors hover:border-gold">
                <span className="text-gold transition-transform duration-500 group-hover:scale-110">
                  <HerbIcon index={index} className="h-10 w-10" />
                </span>
                <span className="mt-3 font-display text-lg leading-tight text-heading">
                  {item.name}
                </span>
                <span className="mt-1 text-xs leading-relaxed text-muted">
                  {item.note}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/ingredients" className="btn btn-outline">
            {t.common.whatEachHerbDoes}
          </Link>
        </div>
      </Section>

      {/* Packaging */}
      <Section tone="soft">
        <SectionHeading
          eyebrow={t.home.packagingEyebrow}
          title={t.home.packagingTitle}
          intro={t.home.packagingIntro}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {boxSides.map((src, index) => (
            <Reveal key={src} delay={index * 90}>
              <div className="card h-full overflow-hidden p-4">
                <ArtPanel
                  src={src}
                  alt={t.home.packaging[index].title}
                  className="h-72 w-full rounded-xl"
                  sizes="(max-width: 768px) 90vw, 320px"
                />
                <h3 className="mt-4 text-center font-display text-xl">
                  {t.home.packaging[index].title}
                </h3>
                <p className="mt-1 text-center text-sm leading-relaxed text-muted">
                  {t.home.packaging[index].note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How to use */}
      <Section tone="bg">
        <SectionHeading
          eyebrow={t.home.usageEyebrow}
          title={t.home.usageTitle}
          intro={t.home.usageIntro}
        />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.howToUse.map((step, index) => (
            <Reveal key={step.step} delay={index * 60}>
              <li className="card flex h-full gap-4 p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-band font-display text-lg text-bandtext">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg leading-snug">{step.step}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.note}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <Image
            src={artwork.banner}
            alt={t.home.usageTitle}
            width={2000}
            height={640}
            className="w-full object-cover"
          />
        </div>
        <div className="mt-8 text-center">
          <Link href="/usage" className="btn btn-outline">
            {t.common.fullUsageGuide}
          </Link>
        </div>
      </Section>

      {/* Shop */}
      <Section tone="soft" id="shop">
        <SectionHeading
          eyebrow={t.home.shopEyebrow}
          title={t.home.shopTitle}
          intro={t.home.shopIntro}
        />
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 90}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Journey */}
      <Section tone="bg">
        <SectionHeading
          eyebrow={t.home.journeyEyebrow}
          title={t.home.journeyTitle}
          intro={t.home.journeyIntro}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.expectations.map((item, index) => (
            <Reveal key={item.period} delay={index * 80}>
              <div className="card h-full p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-goldlight font-display text-lg text-band">
                  {index + 1}
                </span>
                <p className="eyebrow mt-4 text-gold">{item.period}</p>
                <h3 className="mt-2 font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Instagram */}
      <Section tone="soft">
        <div className="card grid items-center gap-8 overflow-hidden p-8 lg:grid-cols-[1fr_1.1fr] lg:p-10">
          <div className="text-center lg:text-start">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-band text-bandtext lg:mx-0">
              <InstagramIcon className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-3xl">{t.home.instagramTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t.home.instagramIntro} {brand.social.instagramHandle}
            </p>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6"
            >
              <InstagramIcon className="h-5 w-5" />
              {t.home.instagramBtn}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[artwork.hero, artwork.boxFront, artwork.boxIngredients, artwork.boxAbout].map(
              (src, index) => (
                <ArtPanel
                  key={src}
                  src={src}
                  alt={brand.name}
                  fit="cover"
                  className={`h-36 w-full rounded-xl sm:h-44 ${
                    index % 3 === 0 ? "row-span-1" : ""
                  }`}
                  sizes="(max-width: 768px) 45vw, 260px"
                />
              )
            )}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="band" className="text-center">
        <p className="eyebrow text-goldlight">{t.home.finalEyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl text-bandtext sm:text-4xl">
          {t.home.finalTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-bandtext/80">
          {t.home.finalIntro}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-gold">
            {t.common.shopNow}
          </Link>
          <a
            href={waLink(
              `Assalam o Alaikum ${brand.name} team, I would like to place an order.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsappIcon className="h-5 w-5" />
            {brand.contact.whatsappDisplay}
          </a>
        </div>
      </Section>
    </>
  );
}
