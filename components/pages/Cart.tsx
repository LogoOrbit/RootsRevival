"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useT } from "@/components/Providers";
import { PackShot } from "@/components/ProductArt";
import { PageHero, Section } from "@/components/ui";
import { brand, formatPrice } from "@/lib/brand";

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
  const { totals, setQty, remove, applyCoupon, coupon, ready } = useCart();
  const t = useT();
  const [code, setCode] = useState(coupon);

  if (!ready) {
    return (
      <p className="py-20 text-center text-sm uppercase tracking-[0.18em] text-muted">
        {t.common.loading}
      </p>
    );
  }

  if (totals.itemCount === 0) {
    return (
      <div className="card mx-auto max-w-xl p-10 text-center sm:p-12">
        <h2 className="text-3xl">{t.cartPage.emptyTitle}</h2>
        <div className="gold-rule mx-auto mt-6 w-24" />
        <p className="mt-6 text-sm leading-relaxed text-muted">{t.cartPage.emptyBody}</p>
        <Link href="/shop" className="btn btn-gold mt-8">
          {t.cartPage.browsePacks}
        </Link>
      </div>
    );
  }

  const remaining = brand.shipping.freeAbove - (totals.subtotal - totals.discount);

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
                  className="h-28 w-full rounded-xl bg-[#0d1710] sm:w-32"
                  sizes="160px"
                />
              </Link>

              <div className="flex-1">
                <h3 className="font-display text-xl">
                  <Link href={`/product/${line.slug}`}>{copy.name}</Link>
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
                  {copy.volume}
                </p>
                <p className="mt-2 text-sm text-muted">
                  {formatPrice(line.product.price)} {t.cartPage.each}
                </p>
                <button
                  type="button"
                  onClick={() => remove(line.slug)}
                  className="mt-3 text-[0.7rem] uppercase tracking-[0.14em] text-hibiscus"
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
                  <span className="w-8 text-center text-sm">{line.qty}</span>
                  <button
                    type="button"
                    aria-label="plus"
                    onClick={() => setQty(line.slug, line.qty + 1)}
                    className="h-10 w-10 text-lg text-heading"
                  >
                    +
                  </button>
                </div>
                <p className="font-display text-2xl text-heading">
                  {formatPrice(line.lineTotal)}
                </p>
              </div>
            </div>
          );
        })}

        <Link
          href="/shop"
          className="inline-block text-[0.72rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-gold"
        >
          {t.common.continueShopping}
        </Link>
      </div>

      <aside className="card h-fit p-6 sm:p-7">
        <h2 className="font-display text-2xl">{t.cartPage.summary}</h2>
        <div className="gold-rule mt-4 w-20" />

        <div className="mt-6 space-y-3 text-sm">
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
          {totals.discount > 0 ? (
            <Row
              label={`${t.common.discountCode} ${totals.couponCode}`}
              value={`${formatPrice(totals.discount)}`}
              accent
            />
          ) : null}
          <Row
            label={t.common.delivery}
            value={totals.shipping === 0 ? t.common.free : formatPrice(totals.shipping)}
          />
        </div>

        <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
          <span className="text-sm uppercase tracking-[0.14em] text-muted">
            {t.common.total}
          </span>
          <span className="font-display text-3xl text-heading">
            {formatPrice(totals.total)}
          </span>
        </div>

        {!totals.freeShipping && remaining > 0 ? (
          <p className="mt-4 rounded-xl bg-bgsoft px-4 py-3 text-xs leading-relaxed text-muted">
            {t.cartPage.addMoreLead} {formatPrice(remaining)} {t.cartPage.addMore}
          </p>
        ) : null}

        <div className="mt-6">
          <label className="label" htmlFor="coupon">
            {t.common.discountCode}
          </label>
          <div className="flex gap-2">
            <input
              id="coupon"
              className="field"
              dir="ltr"
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="REVIVE10"
            />
            <button
              type="button"
              onClick={() => applyCoupon(code)}
              className="btn btn-primary shrink-0 px-5"
            >
              {t.common.apply}
            </button>
          </div>
          {totals.couponCode ? (
            <p className="mt-2 text-xs text-heading">
              {t.coupons[totals.couponCode as keyof typeof t.coupons]} {t.common.codeApplied}
            </p>
          ) : null}
          {totals.couponInvalid ? (
            <p className="mt-2 text-xs text-hibiscus">{t.common.codeInvalid}</p>
          ) : null}
        </div>

        <Link href="/checkout" className="btn btn-gold mt-7 w-full">
          {t.common.checkout}
        </Link>
        <p className="mt-4 text-center text-[0.66rem] uppercase tracking-[0.12em] text-muted">
          {t.cartPage.payNote}
        </p>
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
      <span className={accent ? "text-hibiscus" : "text-heading"}>{value}</span>
    </div>
  );
}
