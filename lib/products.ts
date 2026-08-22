/**
 * Prices and structure live here. All wording lives in lib/i18n so the shop
 * reads the same in English and in Urdu.
 */

export type ProductSlug = "starter" | "duo" | "family";

export type Product = {
  slug: ProductSlug;
  bottles: number;
  price: number;
  compareAt: number;
  freeDelivery: boolean;
  bestValue?: boolean;
};

export const products: Product[] = [
  { slug: "starter", bottles: 1, price: 1850, compareAt: 2400, freeDelivery: false },
  { slug: "duo", bottles: 2, price: 3400, compareAt: 4800, freeDelivery: true },
  { slug: "family", bottles: 3, price: 4700, compareAt: 7200, freeDelivery: true, bestValue: true },
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
  return product.compareAt - product.price;
}

export function percentOff(product: Product): number {
  return Math.round((savingOf(product) / product.compareAt) * 100);
}
