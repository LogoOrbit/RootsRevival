import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand, formatPrice } from "@/lib/brand";
import { benefits, getProduct, howToUse, ingredients, products } from "@/lib/products";
import { AddToCart } from "@/components/AddToCart";
import { BottleArt, BoxArt, PackShot } from "@/components/ProductArt";
import { Pill, Section, SectionHeading, TickList } from "@/components/ui";
import { LeafIcon, ShieldIcon, TruckIcon } from "@/components/Icons";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.shortName,
    description: `${product.summary} ${formatPrice(product.price)} instead of ${formatPrice(
      product.compareAt
    )}. Cash on delivery all over Pakistan.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const saving = product.compareAt - product.price;
  const others = products.filter((p) => p.slug !== product.slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    brand: { "@type": "Brand", name: brand.name },
    category: "Hair Oil",
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `${brand.site.url}/product/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="bg-cream-soft">
        <div className="mx-auto max-w-7xl px-4 py-4 text-[0.7rem] uppercase tracking-[0.16em] text-muted sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span className="px-2 text-gold">✦</span>
          <Link href="/shop" className="hover:text-gold">
            Shop
          </Link>
          <span className="px-2 text-gold">✦</span>
          <span className="text-forest">{product.shortName}</span>
        </div>
      </div>

      <Section tone="cream" className="pt-6">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <div className="card leaf-pattern flex h-[26rem] items-end justify-center p-8 sm:h-[32rem]">
              <PackShot bottles={product.bottles} className="h-full w-full" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="card flex h-28 items-center justify-center p-3">
                <BottleArt className="h-full" />
              </div>
              <div className="card flex h-28 items-center justify-center p-3">
                <BoxArt className="h-full" />
              </div>
              <div className="card flex h-28 flex-col items-center justify-center p-3 text-center">
                <LeafIcon className="h-6 w-6 text-gold" />
                <p className="mt-2 text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                  16 herbs inside
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {product.badge ? <Pill tone="gold">{product.badge}</Pill> : null}
              <Pill tone="hibiscus">{product.ribbon}</Pill>
            </div>

            <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">
              {product.shortName}
            </h1>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
              Roots Revival Herbal Hair Oil {product.volume}
            </p>

            <p className="mt-5 text-base leading-relaxed text-muted">
              {product.summary} Suitable for all hair types, for women and men.
            </p>

            <div className="mt-7 flex items-end gap-4">
              <span className="font-display text-5xl text-forest">
                {formatPrice(product.price)}
              </span>
              <span className="pb-2 text-base text-muted line-through">
                {formatPrice(product.compareAt)}
              </span>
              <span className="mb-2 rounded-full bg-hibiscus px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-white">
                Save {formatPrice(saving)}
              </span>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
              Price includes taxes.{" "}
              {product.freeDelivery
                ? "Delivery is free on this pack."
                : `Delivery ${formatPrice(brand.shipping.flatRate)}, free above ${formatPrice(
                    brand.shipping.freeAbove
                  )}.`}
            </p>

            <div className="mt-8">
              <AddToCart product={product} />
            </div>

            <div className="mt-8 space-y-3 rounded-2xl bg-cream-soft p-6">
              <TickList items={product.highlights} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: <TruckIcon className="h-5 w-5" />, label: brand.shipping.deliveryDays },
                { icon: <ShieldIcon className="h-5 w-5" />, label: "Cash on delivery" },
                { icon: <LeafIcon className="h-5 w-5" />, label: "100 percent natural" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted"
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
            <h2 className="text-3xl">What this oil does</h2>
            <div className="gold-rule mt-5 w-24" />
            <div className="mt-7 space-y-5">
              {benefits.map((benefit) => (
                <div key={benefit.title}>
                  <h3 className="font-display text-lg">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {benefit.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl">How to use</h2>
            <div className="gold-rule mt-5 w-24" />
            <ol className="mt-7 space-y-5">
              {howToUse.map((step, index) => (
                <li key={step.step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest font-display text-base text-cream">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg leading-snug text-forest">
                      {step.step}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.note}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="card mt-8 p-6">
              <h3 className="eyebrow text-gold">Storage</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Store in a cool and dry place. Keep away from direct sunlight. After
                opening, use within 12 months.
              </p>
              <h3 className="eyebrow mt-6 text-gold">Caution</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                For external use only. Do a patch test before use. Keep out of reach of
                children.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="Full ingredient list"
          title="Everything inside the bottle"
          intro="Straight from the label, in the same order it is printed."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((item) => (
            <div key={item.name} className="card p-5">
              <p className="font-display text-lg text-forest">{item.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{item.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="Other packs"
          title="You may also like"
          intro="Take a bigger pack and the price per bottle drops."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {others.map((other) => (
            <div key={other.slug} className="card flex items-center gap-6 p-6">
              <PackShot bottles={other.bottles} className="h-32 w-32 shrink-0" />
              <div>
                <h3 className="font-display text-2xl">{other.shortName}</h3>
                <p className="mt-1 text-sm text-muted">{other.volume}</p>
                <p className="mt-3 font-display text-2xl text-forest">
                  {formatPrice(other.price)}{" "}
                  <span className="text-sm text-muted line-through">
                    {formatPrice(other.compareAt)}
                  </span>
                </p>
                <Link href={`/product/${other.slug}`} className="btn btn-outline mt-4">
                  View Pack
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
