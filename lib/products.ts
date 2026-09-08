/**
 * Prices and structure live here. All wording lives in lib/i18n so the shop
 * reads the same in English and in Urdu.
 */

export type ProductSlug = "starter" | "duo" | "family";

export type Product = {
  slug: ProductSlug;
  bottles: number;
  price: number;
  /**
   * What the same number of bottles costs one at a time. Left out when the pack
   * is priced at the single bottle rate and the value sits in the free gift.
   */
  compareAt?: number;
  freeDelivery: boolean;
  /** A gift that ships with the pack. The wording lives in lib/i18n. */
  gift?: boolean;
  bestValue?: boolean;
};

/** The single bottle price every pack is measured against. */
export const bottlePrice = 1400;

export const products: Product[] = [
  { slug: "starter", bottles: 1, price: bottlePrice, freeDelivery: false },
  { slug: "duo", bottles: 2, price: 2 * bottlePrice, freeDelivery: true, gift: true },
  {
    slug: "family",
    bottles: 3,
    price: 4000,
    compareAt: 3 * bottlePrice,
    freeDelivery: true,
    bestValue: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const heroProduct = products[0];

/* Coupon codes */

export type Coupon = {
  code: "REVIVE10" | "ROOTS15" | "FREESHIP";
  kind: "percent" | "flat" | "shipping";
  value: number;
  minimum: number;
};

export const coupons: Coupon[] = [
  { code: "REVIVE10", kind: "percent", value: 10, minimum: 0 },
  { code: "ROOTS15", kind: "percent", value: 15, minimum: 3000 },
  { code: "FREESHIP", kind: "shipping", value: 0, minimum: 0 },
];

export function findCoupon(code: string): Coupon | undefined {
  const clean = code.trim().toUpperCase();
  return coupons.find((c) => c.code === clean);
}

export function savingOf(product: Product): number {
  return product.compareAt ? product.compareAt - product.price : 0;
}

export function percentOff(product: Product): number {
  return product.compareAt ? Math.round((savingOf(product) / product.compareAt) * 100) : 0;
}

/** True when the pack costs less than the same bottles bought one at a time. */
export function hasSaving(product: Product): boolean {
  return savingOf(product) > 0;
}
