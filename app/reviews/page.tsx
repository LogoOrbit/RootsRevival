import type { Metadata } from "next";
import Link from "next/link";
import { brand, waLink } from "@/lib/brand";
import { expectations, reviews } from "@/lib/content";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { InstagramIcon, StarIcon, WhatsappIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Real words from people using Roots Revival herbal hair oil, an honest week by week timeline of results, and how to send us your own review.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer love"
        title="Honest words from real hair journeys"
        intro="We only publish reviews that were actually sent to us on WhatsApp or Instagram, in the words the customer used. Nothing invented, nothing bought."
      />

      <Section tone="cream">
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
                <figcaption className="mt-5 border-t border-cream-deep pt-4">
                  <p className="font-display text-lg text-forest">{review.name}</p>
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                    {review.city} ✦ {review.weeks}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="card mx-auto max-w-2xl p-10 text-center">
            <div className="flex justify-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} className="h-5 w-5" />
              ))}
            </div>
            <h2 className="mt-6 text-3xl">Our review wall is being built</h2>
            <div className="gold-rule mx-auto mt-6 w-24" />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Roots Revival is a young brand and we would rather show you nothing than
              show you words we wrote ourselves. Every review sent to us on WhatsApp or
              Instagram is collected here as our customers share them, with their
              permission and in their own words.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Already using the oil? Send us a message and become part of the wall.
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
                Send Your Review
              </a>
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <InstagramIcon className="h-5 w-5" />
                See Instagram
              </a>
            </div>
          </div>
        )}
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="Set the right expectation"
          title="What our customers usually notice, and when"
          intro="Natural care rewards patience. This is the pattern people report most often when they use the oil two to three times a week."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {expectations.map((item) => (
            <div key={item.period} className="card p-7">
              <p className="eyebrow text-gold">{item.period}</p>
              <h3 className="mt-3 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted">
          Results differ from person to person. Hair fall caused by illness, medication,
          deficiency or a medical scalp condition needs a doctor as well as good oil.
        </p>
      </Section>

      <Section tone="forest" className="text-center">
        <h2 className="text-3xl text-cream sm:text-4xl">
          Tell us how your hair is doing
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream-soft/80">
          Send a message, a photo or a voice note. If you are happy for us to share it,
          it goes up on this page and on our Instagram with a thank you from us.
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
            Shop The Oil
          </Link>
        </div>
      </Section>
    </>
  );
}
