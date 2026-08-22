"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { PackShot } from "./ProductArt";
import { brand, formatPrice } from "@/lib/brand";

export default function CartView() {
  const { totals, setQty, remove, applyCoupon, coupon, ready } = useCart();
  const [code, setCode] = useState(coupon);

  if (!ready) {
    return (
      <p className="py-20 text-center text-sm uppercase tracking-[0.2em] text-muted">
        Loading your cart
      </p>
    );
  }

  if (totals.itemCount === 0) {
    return (
      <div className="card mx-auto max-w-xl p-12 text-center">
        <h2 className="text-3xl">Your cart is empty</h2>
        <div className="gold-rule mx-auto mt-6 w-24" />
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Every pack holds the same handmade 250ml bottle. Pick the one that suits your
          hair journey and we will bottle it fresh for you.
        </p>
        <Link href="/shop" className="btn btn-gold mt-8">
          Browse The Packs
        </Link>
      </div>
    );
  }

  const remaining = brand.shipping.freeAbove - (totals.subtotal - totals.discount);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-5">
        {totals.lines.map((line) => (
          <div key={line.slug} className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
            <Link href={`/product/${line.slug}`} className="shrink-0">
              <PackShot bottles={line.product.bottles} className="h-28 w-32" />
            </Link>

            <div className="flex-1">
              <h3 className="font-display text-xl">
                <Link href={`/product/${line.slug}`}>{line.product.shortName}</Link>
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                {line.product.volume}
              </p>
              <p className="mt-2 text-sm text-muted">
                {formatPrice(line.product.price)} each
              </p>
              <button
                type="button"
                onClick={() => remove(line.slug)}
                className="mt-3 text-[0.7rem] uppercase tracking-[0.16em] text-hibiscus"
              >
                Remove
              </button>
            </div>

            <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
              <div className="flex items-center rounded-full border border-cream-deep bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty(line.slug, line.qty - 1)}
                  className="h-10 w-10 text-lg text-forest"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{line.qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty(line.slug, line.qty + 1)}
                  className="h-10 w-10 text-lg text-forest"
                >
                  +
                </button>
              </div>
              <p className="font-display text-2xl text-forest">
                {formatPrice(line.lineTotal)}
              </p>
            </div>
          </div>
        ))}

        <Link
          href="/shop"
          className="inline-block text-[0.72rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-gold"
        >
          Continue shopping
        </Link>
      </div>

      <aside className="card h-fit p-7">
        <h2 className="font-display text-2xl">Order summary</h2>
        <div className="gold-rule mt-4 w-20" />

        <div className="mt-6 space-y-3 text-sm">
          <Row label={`Items (${totals.itemCount})`} value={formatPrice(totals.subtotal)} />
          {totals.bundleSaving > 0 ? (
            <Row
              label="Bundle saving"
              value={`${formatPrice(totals.bundleSaving)} off`}
              accent
            />
          ) : null}
          {totals.discount > 0 ? (
            <Row
              label={`Code ${totals.couponCode}`}
              value={`${formatPrice(totals.discount)} off`}
              accent
            />
          ) : null}
          <Row
            label="Delivery"
            value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
          />
        </div>

        <div className="mt-5 flex items-baseline justify-between border-t border-cream-deep pt-5">
          <span className="text-sm uppercase tracking-[0.16em] text-muted">Total</span>
          <span className="font-display text-3xl text-forest">
            {formatPrice(totals.total)}
          </span>
        </div>

        {!totals.freeShipping && remaining > 0 ? (
          <p className="mt-4 rounded-xl bg-cream-soft px-4 py-3 text-xs leading-relaxed text-muted">
            Add {formatPrice(remaining)} more and your delivery becomes free.
          </p>
        ) : null}

        <div className="mt-6">
          <label className="label" htmlFor="coupon">
            Discount code
          </label>
          <div className="flex gap-2">
            <input
              id="coupon"
              className="field"
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="REVIVE10"
            />
            <button
              type="button"
              onClick={() => applyCoupon(code)}
              className="btn btn-primary shrink-0 px-5"
            >
              Apply
            </button>
          </div>
          {totals.couponCode ? (
            <p className="mt-2 text-xs text-forest">{totals.couponLabel} applied.</p>
          ) : null}
          {totals.couponInvalid ? (
            <p className="mt-2 text-xs text-hibiscus">
              That code is not valid for this order.
            </p>
          ) : null}
        </div>

        <Link href="/checkout" className="btn btn-gold mt-7 w-full">
          Proceed To Checkout
        </Link>
        <p className="mt-4 text-center text-[0.68rem] uppercase tracking-[0.14em] text-muted">
          Cash on delivery or bank transfer
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
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={accent ? "text-hibiscus" : "text-forest"}>{value}</span>
    </div>
  );
}
