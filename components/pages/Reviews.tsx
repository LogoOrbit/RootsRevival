"use client";

import Link from "next/link";
import { brand, waLink } from "@/lib/brand";
import { useT } from "@/components/Providers";
import { PageHero, Section, SectionHeading, Reveal } from "@/components/ui";
import { InstagramIcon, StarIcon, WhatsappIcon } from "@/components/Icons";

/**
 * Add real customer words here and the wall fills in automatically.
 * Example: { name: "Sana", city: "Lahore", stars: 5, weeks: "6 weeks", words: "..." }
 */
const reviews: {
  name: string;
  city: string;
  stars: number;
  weeks: string;
  words: string;
}[] = [];

export default function ReviewsPage() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t.reviewsPage.eyebrow}
        title={t.reviewsPage.title}
        intro={t.reviewsPage.intro}
      />

      <Section tone="bg">
        {reviews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure key={`${review.name}${review.city}`} className="card p-7">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: review.stars }).map((_, index) => (
                    <StarIcon key={index} />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted">
                  &ldquo;{review.words}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="font-display text-lg text-heading">{review.name}</p>
                  <p className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                    {review.city} ✦ {review.weeks}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="card mx-auto max-w-2xl p-8 text-center sm:p-10">
            <div className="flex justify-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} className="h-5 w-5" />
              ))}
            </div>
            <h2 className="mt-6 text-3xl">{t.reviewsPage.emptyTitle}</h2>
            <div className="gold-rule mx-auto mt-6 w-24" />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {t.reviewsPage.emptyBody1}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {t.reviewsPage.emptyBody2}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={waLink(
                  `Assalam o Alaikum ${brand.name} team, I would like to share my review of the herbal hair oil.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <WhatsappIcon className="h-5 w-5" />
                {t.reviewsPage.sendReview}
              </a>
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <InstagramIcon className="h-5 w-5" />
                {t.reviewsPage.seeInstagram}
              </a>
            </div>
          </div>
        )}
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow={t.reviewsPage.expectEyebrow}
          title={t.reviewsPage.expectTitle}
          intro={t.reviewsPage.expectIntro}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.expectations.map((item, index) => (
            <Reveal key={item.period} delay={index * 80}>
              <div className="card h-full p-7">
                <p className="eyebrow text-gold">{item.period}</p>
                <h3 className="mt-3 font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted">
          {t.reviewsPage.disclaimer}
        </p>
      </Section>

      <Section tone="band" className="text-center">
        <h2 className="text-3xl text-bandtext sm:text-4xl">{t.reviewsPage.tellTitle}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-bandtext/80">
          {t.reviewsPage.tellIntro}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(
              `Assalam o Alaikum ${brand.name} team, here is my review of the herbal hair oil.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsappIcon className="h-5 w-5" />
            {brand.contact.whatsappDisplay}
          </a>
          <Link href="/shop" className="btn btn-gold">
            {t.common.shopTheOil}
          </Link>
        </div>
      </Section>
    </>
  );
}
