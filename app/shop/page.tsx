import type { Metadata } from "next";
import Link from "next/link";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { assurances, coupons, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { LeafIcon, ShieldIcon, TruckIcon, WhatsappIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Shop Herbal Hair Oil",
  description:
    "Buy Roots Revival herbal hair oil 250ml. Single bottle, duo pack and family pack with launch discounts, free delivery above Rs 3,000 and cash on delivery all over Pakistan.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="The shop"
        title="One oil, three ways to buy it"
        intro="Every pack holds the same handmade 250ml bottle of Roots Revival herbal hair oil. The more bottles you take, the less each one costs."
      />

      <Section tone="cream">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: <TruckIcon className="h-6 w-6" />,
              title: "Fast delivery",
              note: `Dispatched within one working day, delivered in ${brand.shipping.deliveryDays}.`,
            },
            {
              icon: <ShieldIcon className="h-6 w-6" />,
              title: "Pay your way",
              note: "Cash on delivery, or online transfer to Meezan Bank before dispatch.",
            },
            {
              icon: <LeafIcon className="h-6 w-6" />,
              title: "Fresh batches",
              note: "Bottled by hand after your order, never sitting in a warehouse.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-7">
              <span className="text-gold">{item.icon}</span>
              <h3 className="mt-4 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="Save even more"
          title="Working discount codes"
          intro="Enter the code in your cart or at checkout and the total updates straight away."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {coupons.map((coupon) => (
            <div key={coupon.code} className="card p-7 text-center">
              <p className="font-display text-3xl tracking-[0.14em] text-gold">
                {coupon.code}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{coupon.label}</p>
              <p className="mt-4 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                {coupon.minimum > 0
                  ? `Minimum order ${formatPrice(coupon.minimum)}`
                  : "No minimum order"}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs uppercase tracking-[0.16em] text-muted">
          One code per order
        </p>
      </Section>

      <Section tone="forest" className="text-center">
        <h2 className="text-3xl text-cream sm:text-4xl">Rather order by message?</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream-soft/80">
          Send us your name, address and the pack you want. We confirm the order,
          share the total and dispatch it the same day.
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
            Contact Page
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {assurances.map((item) => (
            <span
              key={item}
              className="text-[0.68rem] uppercase tracking-[0.18em] text-cream-soft/70"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
