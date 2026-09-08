"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/brand";
import { hasSaving, savingOf, type Product } from "@/lib/products";
import { PackShot } from "./ProductArt";
import { QuickAdd } from "./AddToCart";
import { useT } from "./Providers";
import { CheckIcon } from "./Icons";

export default function ProductCard({ product }: { product: Product }) {
  const t = useT();
  const copy = t.products[product.slug];

  return (
    <article
      className={`group card relative flex flex-col overflow-hidden transition-shadow hover:shadow-[0_22px_60px_rgba(18,53,36,0.16)] ${
        product.bestValue ? "ring-2 ring-gold" : ""
      }`}
    >
      <Link href={`/product/${product.slug}`} className="relative block">
        <PackShot
          slug={product.slug}
          className="aspect-square w-full transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 92vw, 380px"
        />
        <span className="absolute start-4 top-4 rounded-full bg-band px-3 py-1.5 text-[0.72rem] font-semibold text-bandtext">
          {copy.badge}
        </span>
        {product.gift ? (
          <span className="absolute end-4 top-4 rounded-full bg-hibiscus px-3 py-1.5 text-[0.72rem] font-semibold text-white">
            {t.common.freeGift}
          </span>
        ) : hasSaving(product) ? (
          <span className="absolute end-4 top-4 rounded-full bg-hibiscus px-3 py-1.5 text-[0.72rem] font-semibold text-white">
            {t.common.save} {formatPrice(savingOf(product))}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl leading-tight">
          <Link href={`/product/${product.slug}`}>{copy.name}</Link>
        </h3>

        {/* What is actually in the box, at a size that can be read. */}
        <p className="spec mt-2">{copy.volume}</p>

        <ul className="mt-4 flex-1 space-y-2">
          {copy.highlights.map((point) => (
            <li key={point} className="flex gap-2 text-[0.95rem] leading-snug">
              <span className="mt-0.5 shrink-0 text-leaf">
                <CheckIcon className="h-4 w-4" />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="price price-lg">{formatPrice(product.price)}</span>
          {hasSaving(product) ? (
            <span className="price-was text-base">
              {formatPrice(product.compareAt!)}
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {product.gift ? (
            <span className="chip chip-gift">{t.common.freeGift}</span>
          ) : null}
          {hasSaving(product) ? (
            <span className="chip chip-save">
              {t.common.youSave} {formatPrice(savingOf(product))}
            </span>
          ) : null}
          <span className="chip chip-stock">{t.common.inStock}</span>
        </div>

        <div className="mt-6 space-y-3">
          <QuickAdd product={product} />
          <Link
            href={`/product/${product.slug}`}
            className="block text-center text-sm font-medium text-muted transition-colors hover:text-gold"
          >
            {t.common.viewDetails}
          </Link>
        </div>
      </div>
    </article>
  );
}
