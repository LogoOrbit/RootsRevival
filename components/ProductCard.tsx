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
    /* On a phone the card is one short row, so three packs fit on a screen. */
    <article
      className={`group card relative flex flex-row overflow-hidden transition-shadow hover:shadow-[0_22px_60px_rgba(18,53,36,0.16)] sm:flex-col ${
        product.bestValue ? "ring-2 ring-gold" : ""
      }`}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block w-32 shrink-0 self-stretch sm:w-full"
      >
        <PackShot
          slug={product.slug}
          className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03] sm:aspect-square"
          sizes="(max-width: 640px) 128px, (max-width: 1024px) 45vw, 380px"
        />
        <span className="absolute start-2 top-2 rounded-full bg-band px-2 py-1 text-[0.62rem] font-semibold text-bandtext sm:start-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[0.72rem]">
          {copy.badge}
        </span>
        {product.gift ? (
          <span className="absolute end-4 top-4 hidden rounded-full bg-hibiscus px-3 py-1.5 text-[0.72rem] font-semibold text-white sm:block">
            {t.common.freeGift}
          </span>
        ) : hasSaving(product) ? (
          <span className="absolute end-4 top-4 hidden rounded-full bg-hibiscus px-3 py-1.5 text-[0.72rem] font-semibold text-white sm:block">
            {t.common.save} {formatPrice(savingOf(product))}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="font-display text-xl leading-tight sm:text-2xl">
          <Link href={`/product/${product.slug}`}>{copy.name}</Link>
        </h3>

        {/* What is actually in the box, at a size that can be read. */}
        <p className="spec mt-1 sm:mt-2">{copy.volume}</p>

        {/* The selling points belong on the roomier screens and the pack page. */}
        <ul className="mt-4 hidden flex-1 space-y-2 sm:block">
          {copy.highlights.map((point) => (
            <li key={point} className="flex gap-2 text-[0.95rem] leading-snug">
              <span className="mt-0.5 shrink-0 text-leaf">
                <CheckIcon className="h-4 w-4" />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-6">
          <span className="price price-lg">{formatPrice(product.price)}</span>
          {hasSaving(product) ? (
            <span className="price-was text-[0.95rem] sm:text-base">
              {formatPrice(product.compareAt!)}
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
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

        <div className="mt-4 space-y-3 sm:mt-6">
          <QuickAdd product={product} />
          <Link
            href={`/product/${product.slug}`}
            className="hidden text-center text-sm font-medium text-muted transition-colors hover:text-gold sm:block"
          >
            {t.common.viewDetails}
          </Link>
        </div>
      </div>
    </article>
  );
}
