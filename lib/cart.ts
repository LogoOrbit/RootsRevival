import { brand } from "./brand";
import { findCoupon, getProduct, type Product } from "./products";

export type CartLine = { slug: string; qty: number };

export type ResolvedLine = CartLine & { product: Product; lineTotal: number };

export type CartTotals = {
  lines: ResolvedLine[];
  itemCount: number;
  subtotal: number;
  compareSubtotal: number;
  bundleSaving: number;
  couponCode: string | null;
  couponInvalid: boolean;
  discount: number;
  shipping: number;
  freeShipping: boolean;
  total: number;
};

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines
    .map((line) => {
      const product = getProduct(line.slug);
      if (!product) return null;
      const qty = Math.max(1, Math.min(20, Math.round(line.qty)));
      return { ...line, qty, product, lineTotal: product.price * qty };
    })
    .filter(Boolean) as ResolvedLine[];
}

export function computeTotals(
  rawLines: CartLine[],
  couponInput?: string | null
): CartTotals {
  const lines = resolveLines(rawLines);
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const compareSubtotal = lines.reduce(
    (sum, l) => sum + (l.product.compareAt ?? l.product.price) * l.qty,
    0
  );
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);

  const typed = (couponInput ?? "").trim();
  const coupon = typed ? findCoupon(typed) : undefined;
  const couponUsable = coupon && subtotal >= coupon.minimum ? coupon : undefined;

  let discount = 0;
  if (couponUsable) {
    if (couponUsable.kind === "percent") {
      discount = Math.round((subtotal * couponUsable.value) / 100);
    } else if (couponUsable.kind === "flat") {
      discount = Math.min(couponUsable.value, subtotal);
    }
  }

  const qualifiesFreeShipping =
    lines.some((l) => l.product.freeDelivery) ||
    subtotal - discount >= brand.shipping.freeAbove ||
    couponUsable?.kind === "shipping";

  const shipping =
    itemCount === 0 ? 0 : qualifiesFreeShipping ? 0 : brand.shipping.flatRate;

  return {
    lines,
    itemCount,
    subtotal,
    compareSubtotal,
    bundleSaving: Math.max(0, compareSubtotal - subtotal),
    couponCode: couponUsable ? couponUsable.code : null,
    couponInvalid: Boolean(typed) && !couponUsable,
    discount,
    shipping,
    freeShipping: qualifiesFreeShipping,
    total: Math.max(0, subtotal - discount) + shipping,
  };
}
