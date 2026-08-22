import Link from "next/link";
import type { Metadata } from "next";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { assurances, benefits, howToUse, ingredients, products } from "@/lib/products";
import { expectations, storyStats } from "@/lib/content";
import { PackShot } from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import { Section, SectionHeading, Pill, Stat } from "@/components/ui";
import { HandIcon, InstagramIcon, LeafIcon, ShieldIcon, TruckIcon, WhatsappIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Roots Revival | Handmade Herbal Hair Oil in Pakistan",
  description:
    "Handmade herbal hair oil with 16 traditional herbs and oils. Reduces hair fall, controls dandruff and nourishes the scalp. Free delivery above Rs 3,000, cash on delivery all over Pakistan.",
};

const hero = products[0];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="leaf-pattern relative overflow-hidden bg-cream-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:py-24">
          <div className="fade-up">
            <Pill tone="gold">Handmade in Pakistan, in small batches</Pill>
            <h1 className="mt-6 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Revive Your Roots,
              <br />
              <span className="text-gold">Reveal Your Beauty</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              A carefully crafted blend of traditional herbs and nutrient rich oils,
              slow infused at home by hand. Sixteen ingredients, zero chemicals,
              made to strengthen your hair from the roots.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl text-forest">
                  {formatPrice(hero.price)}
                </span>
                <span className="text-sm text-muted line-through">
                  {formatPrice(hero.compareAt)}
                </span>
              </div>
              <span className="rounded-full bg-hibiscus px-3 py-1 text-[0.7rem] uppercase tracking-[0.14em] text-white">
                Launch offer
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-gold">
                Shop The Oil
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
                Order On WhatsApp
              </a>
            </div>

            <ul className="mt-10 grid gap-4 text-sm text-muted sm:grid-cols-3">
              {[
                { icon: <TruckIcon className="h-5 w-5" />, text: "Free delivery above Rs 3,000" },
                { icon: <ShieldIcon className="h-5 w-5" />, text: "Cash on delivery" },
                { icon: <HandIcon className="h-5 w-5" />, text: "Made fresh by hand" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  <span className="text-gold">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
            <PackShot className="floaty relative mx-auto h-[26rem] w-full max-w-xl sm:h-[32rem]" />
            <div className="card absolute left-0 top-4 hidden px-4 py-3 text-center shadow-lg sm:block">
              <p className="font-display text-2xl text-gold">16</p>
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                Herbs and oils
              </p>
            </div>
            <div className="card absolute bottom-8 right-0 hidden px-4 py-3 text-center shadow-lg sm:block">
              <p className="font-display text-2xl text-gold">250ml</p>
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                Full size bottle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Assurance strip */}
      <div className="border-y border-cream-deep bg-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-6 sm:px-6 lg:px-8">
          {assurances.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted"
            >
              <LeafIcon className="h-4 w-4 text-gold" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Offers */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Deals of the season"
          title="Save more when you take the full course"
          intro="Hair care works with consistency. Our bundle prices are built so a complete course costs less than buying one bottle at a time."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.slug} className="card flex flex-col p-7 text-center">
              <p className="eyebrow text-gold">{product.badge}</p>
              <h3 className="mt-3 font-display text-2xl">{product.shortName}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                {product.volume}
              </p>
              <p className="mt-5 font-display text-4xl text-forest">
                {formatPrice(product.price)}
              </p>
              <p className="mt-1 text-sm text-muted line-through">
                {formatPrice(product.compareAt)}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-hibiscus">
                {product.ribbon}
              </p>
              <Link
                href={`/product/${product.slug}`}
                className="btn btn-outline mt-6 w-full"
              >
                View Pack
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-forest px-6 py-6 text-center text-cream">
          <p className="text-sm tracking-[0.05em]">
            Extra discount code for first orders:{" "}
            <span className="rounded-md bg-gold px-3 py-1 font-semibold text-forest-deep">
              REVIVE10
            </span>{" "}
            for 10 percent off
          </p>
          <Link href="/offers" className="btn btn-gold">
            See All Offers
          </Link>
        </div>
      </Section>

      {/* Benefits */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Why it works"
          title="Seven reasons your hair will thank you"
          intro="Every herb in the bottle earns its place. Together they treat the scalp, the root and the length."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={benefit.title} className="card p-7">
              <span className="font-display text-3xl text-gold/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Story */}
      <Section tone="forest">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold-light">Our story</p>
            <h2 className="mt-4 text-3xl text-cream sm:text-4xl">
              Cooked at home, on a low flame, by hands that care
            </h2>
            <div className="gold-rule mt-6 w-24" />
            <p className="mt-6 text-base leading-relaxed text-cream-soft/85">
              {brand.name} did not begin in a factory. It began in a family kitchen,
              with a recipe passed down through generations and a daughter who was
              tired of watching her hair thin out. The herbs are washed by hand, sun
              dried, and slow infused in mustard, coconut and castor oil until the oil
              turns deep and fragrant.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream-soft/85">
              Nothing is mass produced. Every bottle is filled, sealed and packed at
              home, which is how we can promise you that what the label says is exactly
              what is inside.
            </p>
            <Link href="/about" className="btn btn-gold mt-8">
              Read The Full Story
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 rounded-2xl border border-cream/15 p-8">
            {storyStats.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </Section>

      {/* Ingredients */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="With goodness of"
          title="Sixteen herbs and oils, nothing else"
          intro="No paraben, no silicone, no mineral oil, no sulphate. Read the label and you will recognise every single name on it."
        />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {ingredients.map((item) => (
            <span
              key={item.name}
              className="rounded-full border border-cream-deep bg-white px-5 py-2.5 text-sm text-forest transition-colors hover:border-gold hover:text-gold"
            >
              {item.name}
            </span>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/ingredients" className="btn btn-outline">
            What Each Herb Does
          </Link>
        </div>
      </Section>

      {/* How to use */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Simple ritual"
          title="How to use it in six easy steps"
          intro="Two to three times a week is all it takes. Ten minutes of massage does more for your hair than any expensive treatment."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {howToUse.map((step, index) => (
            <li key={step.step} className="card flex gap-4 p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest font-display text-lg text-cream">
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-lg leading-snug">{step.step}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Link href="/usage" className="btn btn-outline">
            Full Usage Guide
          </Link>
        </div>
      </Section>

      {/* Shop */}
      <Section tone="cream" id="shop">
        <SectionHeading
          eyebrow="Choose your pack"
          title="Order your bottle today"
          intro="Cash on delivery all over Pakistan, or pay online through Meezan Bank. Orders leave us within one working day."
        />
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      {/* Expectations */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Your hair journey"
          title="What to expect, week by week"
          intro="Natural care is honest care. Here is a realistic picture of how the oil works over time when used two to three times a week."
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
      </Section>

      {/* Instagram */}
      <Section tone="cream">
        <div className="card flex flex-col items-center gap-6 p-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-cream">
            <InstagramIcon className="h-7 w-7" />
          </span>
          <div>
            <h2 className="text-3xl">Follow the journey on Instagram</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Batch days, herb close ups, honest customer results and the occasional
              hair care tip. Come say salam at {brand.social.instagramHandle}.
            </p>
          </div>
          <a
            href={brand.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <InstagramIcon className="h-5 w-5" />
            Visit Our Instagram
          </a>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="forest" className="text-center">
        <p className="eyebrow text-gold-light">Ready when you are</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl text-cream sm:text-4xl">
          Give your roots six weeks and watch what happens
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream-soft/80">
          Place your order on the website or send us a message on WhatsApp. We reply
          personally, every day, {brand.contact.hours.toLowerCase()}.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-gold">
            Shop Now
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
