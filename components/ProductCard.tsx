"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/brand";
import { percentOff, savingOf, type Product } from "@/lib/products";
import { PackShot } from "./ProductArt";
import { QuickAdd } from "./AddToCart";
import { useT } from "./Providers";

export default function ProductCard({ product }: { product: Product }) {
  const t = useT();
  const copy = t.products[product.slug];
  const saving = savingOf(product);

  return (
    <article
      className={`group card relative flex flex-col overflow-hidden transition-shadow hover:shadow-[0_22px_60px_rgba(18,53,36,0.16)] ${
        product.bestValue ? "ring-1 ring-gold" : ""
      }`}
    >
      <Link href={`/product/${product.slug}`} className="relative block bg-[#0d1710]">
        <PackShot
          slug={product.slug}
          className="h-72 w-full transition-transform duration-700 group-hover:scale-[1.03] sm:h-80"
          sizes="(max-width: 768px) 92vw, 380px"
        />
        <span className="absolute start-4 top-4 rounded-full bg-bandtext/90 px-3 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-band">
          {copy.badge}
        </span>
        <span className="absolute end-4 top-4 rounded-full bg-hibiscus px-3 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-white">
          {percentOff(product)} {t.common.percentOff}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl">
          <Link href={`/product/${product.slug}`}>{copy.name}</Link>
        </h3>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
          {copy.volume}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{copy.summary}</p>

        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-3xl text-heading">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-muted line-through">
            {formatPrice(product.compareAt)}
          </span>
        </div>
        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gold">
          {t.common.youSave} {formatPrice(saving)}
          {product.freeDelivery ? ` ${t.common.plusFreeDelivery}` : ""}
        </p>

        <div className="mt-6 space-y-3">
          <QuickAdd product={product} />
          <Link
            href={`/product/${product.slug}`}
            className="block text-center text-[0.72rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-gold"
          >
            {t.common.viewDetails}
          </Link>
        </div>
      </div>
    </article>
  );
}
