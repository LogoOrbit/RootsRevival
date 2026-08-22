"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { useT } from "./Providers";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { WhatsappIcon } from "./Icons";
import type { Product } from "@/lib/products";

export function AddToCart({
  product,
  withQuantity = true,
  withWhatsapp = true,
}: {
  product: Product;
  withQuantity?: boolean;
  withWhatsapp?: boolean;
}) {
  const { add } = useCart();
  const t = useT();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const copy = t.products[product.slug];

  const handleAdd = () => {
    add(product.slug, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const handleBuy = () => {
    add(product.slug, qty);
    router.push("/checkout");
  };

  return (
    <div className="space-y-4">
      {withQuantity ? (
        <div className="flex items-center gap-4">
          <span className="label mb-0">{t.common.quantity}</span>
          <div className="flex items-center rounded-full border border-border bg-card">
            <button
              type="button"
              aria-label="minus"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-10 w-10 text-lg text-heading"
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{qty}</span>
            <button
              type="button"
              aria-label="plus"
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              className="h-10 w-10 text-lg text-heading"
            >
              +
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={handleBuy} className="btn btn-gold flex-1 sm:flex-none">
          {t.common.buyNow} {formatPrice(product.price * qty)}
        </button>
        <button type="button" onClick={handleAdd} className="btn btn-outline flex-1 sm:flex-none">
          {added ? t.common.added : t.common.addToCart}
        </button>
      </div>

      {withWhatsapp ? (
        <a
          href={waLink(
            `Assalam o Alaikum ${brand.name} team, I want to order ${qty} x ${copy.name} (${formatPrice(
              product.price * qty
            )}). Please confirm.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp w-full"
        >
          <WhatsappIcon className="h-5 w-5" />
          {t.common.orderOnWhatsapp}
        </a>
      ) : null}
    </div>
  );
}

export function QuickAdd({ product }: { product: Product }) {
  const { add } = useCart();
  const t = useT();
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        add(product.slug, 1);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 2000);
      }}
      className="btn btn-primary w-full"
    >
      {added ? t.common.added : t.common.addToCart}
    </button>
  );
}
