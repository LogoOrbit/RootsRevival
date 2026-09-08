import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/pages/ProductDetail";
import { brand, formatPrice } from "@/lib/brand";
import { getProduct, products } from "@/lib/products";
import { en } from "@/lib/i18n/en";

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
  const copy = en.products[product.slug];
  return {
    title: copy.name,
    description: `${copy.summary} ${formatPrice(
      product.price
    )}. Flat Rs 250 delivery, cash on delivery.`,
  };
}

/** The photograph search engines show for each pack. */
const packImage: Record<string, string> = {
  starter: "/art/pack-single.jpg",
  duo: "/art/pack-duo.jpg",
  family: "/art/pack-family.jpg",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const copy = en.products[product.slug];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brand.name} ${en.common.category}, ${copy.name}`,
    description: copy.summary,
    brand: { "@type": "Brand", name: brand.name },
    image: `${brand.site.url}${packImage[product.slug]}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProductDetail slug={slug} />
    </>
  );
}
