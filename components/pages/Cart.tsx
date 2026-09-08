"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useT } from "@/components/Providers";
import { PackShot } from "@/components/ProductArt";
import { PageHero, Section } from "@/components/ui";
import { formatPrice } from "@/lib/brand";

export default function CartPage() {
  const t = useT();
  return (
    <>
      <PageHero
        eyebrow={t.cartPage.eyebrow}
        title={t.cartPage.title}
        intro={t.cartPage.intro}
      />
      <Section tone="bg">
        <CartView />
      </Section>
    </>
  );
}

function CartView() {
  const { totals, setQty, remove, ready } = useCart();
  const t = useT();

  if (!ready) {
    return (
      <p className="py-20 text-center text-base text-muted">
        {t.common.loading}
      </p>
    );
  }

  if (totals.itemCount === 0) {
    return (
      <div className="card mx-auto max-w-xl p-10 text-center sm:p-12">
        <h2 className="text-3xl">{t.cartPage.emptyTitle}</h2>
        <div className="gold-rule mx-auto mt-6 w-24" />
        <p className="mt-6 text-base leading-relaxed">{t.cartPage.emptyBody}</p>
        <Link href="/shop" className="btn btn-gold mt-8">
          {t.cartPage.browsePacks}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-5">
        {totals.lines.map((line) => {
          const copy = t.products[line.product.slug];
          return (
            <div
              key={line.slug}
              className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6"
            >
              <Link href={`/product/${line.slug}`} className="shrink-0">
                <PackShot
                  slug={line.product.slug}
                  className="aspect-square w-full rounded-xl sm:w-28"
                  sizes="160px"
                />
              </Link>

              <div className="flex-1">
                <h3 className="font-display text-xl">
                  <Link href={`/product/${line.slug}`}>{copy.name}</Link>
                </h3>
                <p className="spec mt-1">{copy.volume}</p>
                <p className="mt-2 text-[0.95rem] text-muted">
                  {formatPrice(line.product.price)} {t.cartPage.each}
                </p>
                {line.product.gift ? (
                  <span className="chip chip-gift mt-3">{t.common.freeGift}</span>
                ) : null}
                <button
                  type="button"
                  onClick={() => remove(line.slug)}
                  className="mt-3 block text-sm font-semibold text-hibiscus"
                >
                  {t.common.remove}
                </button>
              </div>

              <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                <div className="flex items-center rounded-full border border-border bg-card">
                  <button
                    type="button"
                    aria-label="minus"
                    onClick={() => setQty(line.slug, line.qty - 1)}
                    className="h-10 w-10 text-lg text-heading"
                  >
                    −
                  </button>
                  <span className="price w-9 text-center text-base">{line.qty}</span>
                  <button
                    type="button"
                    aria-label="plus"
                    onClick={() => setQty(line.slug, line.qty + 1)}
                    className="h-10 w-10 text-lg text-heading"
                  >
                    +
                  </button>
                </div>
                <p className="price price-lg">{formatPrice(line.lineTotal)}</p>
              </div>
            </div>
          );
        })}

        <Link
          href="/shop"
          className="inline-block text-sm font-semibold text-muted transition-colors hover:text-gold"
        >
          {t.common.continueShopping}
        </Link>
      </div>

      <aside className="card h-fit p-6 sm:p-7">
        <h2 className="font-display text-2xl">{t.cartPage.summary}</h2>
        <div className="gold-rule mt-4 w-20" />

        <div className="mt-6 space-y-3 text-[0.95rem]">
          <Row
            label={`${t.common.items} (${totals.itemCount})`}
            value={formatPrice(totals.subtotal)}
          />
          {totals.bundleSaving > 0 ? (
            <Row
              label={t.cartPage.bundleSaving}
              value={`${formatPrice(totals.bundleSaving)}`}
              accent
            />
          ) : null}
          {totals.freeBottles > 0 ? (
            <Row
              label={t.cartPage.freeBottles}
              value={`${totals.freeBottles} x 60ml`}
              accent
            />
          ) : null}
          <Row
            label={t.common.delivery}
            value={formatPrice(totals.shipping)}
          />
        </div>


        <div className="mt-6 flex items-baseline justify-between border-t border-border pt-5">
          <span className="text-base font-semibold text-heading">{t.common.total}</span>
          <span className="price price-xl">{formatPrice(totals.total)}</span>
        </div>

        <Link href="/checkout" className="btn btn-gold mt-7 w-full">
          {t.common.checkout}
        </Link>
        <p className="mt-4 text-center text-sm text-muted">{t.cartPage.payNote}</p>
      </aside>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted">{label}</span>
      <span className={accent ? "font-semibold text-hibiscus" : "font-semibold text-heading"}>
        {value}
      </span>
    </div>
  );
}
