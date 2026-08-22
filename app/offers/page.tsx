import type { Metadata } from "next";
import Link from "next/link";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { coupons, products } from "@/lib/products";
import { PageHero, Section, SectionHeading, Pill } from "@/components/ui";
import { PackShot } from "@/components/ProductArt";
import { InstagramIcon, TruckIcon, WhatsappIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Deals And Offers",
  description:
    "Launch offers on Roots Revival herbal hair oil. Save up to Rs 2,500 on bundle packs, use code REVIVE10 for 10 percent off, free delivery above Rs 3,000 and wholesale rates for resellers.",
};

const dealCards = [
  {
    title: "Free delivery",
    line: `On every order above ${formatPrice(brand.shipping.freeAbove)}`,
    note: "The duo pack and the family pack already qualify, so delivery is on us.",
  },
  {
    title: "Cash on delivery",
    line: "Pay when the parcel reaches your door",
    note: "Available in every city of Pakistan, with no advance payment needed.",
  },
  {
    title: "Wholesale rates",
    line: "For 6 bottles and above",
    note: "Salons, resellers and gift orders get a separate price. Message us on WhatsApp.",
  },
];

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Deals and discounts"
        title="Real savings on real herbal care"
        intro="We keep the price honest instead of marking it up and calling it a sale. These are the offers running right now on every Roots Revival pack."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-gold">
            Shop The Deals
          </Link>
          <a
            href={waLink(
              `Assalam o Alaikum ${brand.name} team, I would like to know about the current offers.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Ask On WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Headline offer */}
      <Section tone="cream">
        <div className="card leaf-pattern grid items-center gap-10 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <Pill tone="hibiscus">Launch offer</Pill>
            <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
              Up to 35 percent off
              <br />
              <span className="text-gold">the full course</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              Hair repairs itself slowly, so we price the bigger packs the way a course
              should be priced. Take three bottles and the saving reaches
              {" "}
              {formatPrice(2500)} against buying them one at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/product/family" className="btn btn-gold">
                Grab The Family Pack
              </Link>
              <Link href="/shop" className="btn btn-outline">
                Compare All Packs
              </Link>
            </div>
            <p className="mt-6 text-[0.7rem] uppercase tracking-[0.16em] text-muted">
              Offer runs while this batch lasts
            </p>
          </div>
          <PackShot bottles={3} className="h-72 w-full sm:h-96" />
        </div>
      </Section>

      {/* Pack pricing */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Bundle pricing"
          title="Price per bottle drops with every pack"
          intro="Same handmade oil, same 250ml bottle, simply a better price when you take more."
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-2xl bg-white">
            <thead>
              <tr className="bg-forest text-cream">
                {["Pack", "Bottles", "Regular price", "Your price", "You save", "Price per bottle"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-left text-[0.68rem] uppercase tracking-[0.16em] font-medium"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.slug} className="border-b border-cream-deep">
                  <td className="px-5 py-4">
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-display text-lg text-forest hover:text-gold"
                    >
                      {product.shortName}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">{product.bottles}</td>
                  <td className="px-5 py-4 text-sm text-muted line-through">
                    {formatPrice(product.compareAt)}
                  </td>
                  <td className="px-5 py-4 font-display text-xl text-forest">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-5 py-4 text-sm text-hibiscus">
                    {formatPrice(product.compareAt - product.price)}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">
                    {formatPrice(Math.round(product.price / product.bottles))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Coupons */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Discount codes"
          title="Add a code, watch the total drop"
          intro="Enter your code in the cart or on the checkout page. One code per order."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {coupons.map((coupon) => (
            <div key={coupon.code} className="card overflow-hidden text-center">
              <div className="bg-forest px-6 py-7">
                <p className="font-display text-3xl tracking-[0.16em] text-gold-light">
                  {coupon.code}
                </p>
              </div>
              <div className="px-6 py-7">
                <p className="text-sm leading-relaxed text-muted">{coupon.label}</p>
                <p className="mt-4 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  {coupon.minimum > 0
                    ? `Minimum order ${formatPrice(coupon.minimum)}`
                    : "No minimum order"}
                </p>
                <Link href="/shop" className="btn btn-outline mt-6 w-full">
                  Use This Code
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Standing offers */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Always on"
          title="Standing offers for every order"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {dealCards.map((deal) => (
            <div key={deal.title} className="card p-8">
              <TruckIcon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-2xl">{deal.title}</h3>
              <p className="mt-2 text-sm font-medium text-forest">{deal.line}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{deal.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Referral and Instagram */}
      <Section tone="forest">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-cream/15 p-8">
            <p className="eyebrow text-gold-light">Refer a friend</p>
            <h3 className="mt-4 text-2xl text-cream">
              Share the oil, share the discount
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-cream-soft/80">
              Send your order number to a friend. Their first order gets 10 percent off
              with the code REVIVE10, and your next order ships free. Simply mention the
              order number when you message us.
            </p>
            <a
              href={waLink(
                "Assalam o Alaikum, I want to refer a friend to Roots Revival. My order number is "
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp mt-7"
            >
              <WhatsappIcon className="h-5 w-5" />
              Send Referral
            </a>
          </div>

          <div className="rounded-2xl border border-cream/15 p-8">
            <p className="eyebrow text-gold-light">Instagram family</p>
            <h3 className="mt-4 text-2xl text-cream">
              Follow us for surprise batch offers
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-cream-soft/80">
              Fresh batch announcements, giveaway days and offers we only share with our
              followers at {brand.social.instagramHandle}. Send us a screenshot of your
              follow and we will share the running code with you.
            </p>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold mt-7"
            >
              <InstagramIcon className="h-5 w-5" />
              Follow On Instagram
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
