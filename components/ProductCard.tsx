import Link from "next/link";
import { formatPrice } from "@/lib/brand";
import type { Product } from "@/lib/products";
import { PackShot } from "./ProductArt";
import { QuickAdd } from "./AddToCart";
import { Pill } from "./ui";

export default function ProductCard({ product }: { product: Product }) {
  const saving = product.compareAt - product.price;
  const percent = Math.round((saving / product.compareAt) * 100);

  return (
    <article
      className={`card group relative flex flex-col overflow-hidden p-6 transition-shadow hover:shadow-[0_18px_50px_rgba(18,53,36,0.12)] ${
        product.bestValue ? "ring-1 ring-gold" : ""
      }`}
    >
      {product.badge ? (
        <span className="absolute left-6 top-6 z-10">
          <Pill tone={product.bestValue ? "gold" : "cream"}>{product.badge}</Pill>
        </span>
      ) : null}
      <span className="absolute right-6 top-6 z-10 rounded-full bg-hibiscus px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-white">
        {percent} percent off
      </span>

      <Link href={`/product/${product.slug}`} className="block">
        <div className="mt-6 flex h-56 items-end justify-center transition-transform duration-500 group-hover:scale-[1.03]">
          <PackShot bottles={product.bottles} className="h-full w-full" />
        </div>
      </Link>

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="font-display text-2xl">
          <Link href={`/product/${product.slug}`}>{product.shortName}</Link>
        </h3>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
          {product.volume}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{product.summary}</p>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-display text-3xl text-forest">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-muted line-through">
            {formatPrice(product.compareAt)}
          </span>
        </div>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-gold">
          You save {formatPrice(saving)}
          {product.freeDelivery ? " plus free delivery" : ""}
        </p>

        <div className="mt-6 space-y-3">
          <QuickAdd product={product} />
          <Link
            href={`/product/${product.slug}`}
            className="block text-center text-[0.72rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-gold"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
