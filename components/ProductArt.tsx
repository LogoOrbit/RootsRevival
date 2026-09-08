import Image from "next/image";

/** Square photographs. Any letterbox falls back to the page ground. */
const packShots: Record<string, { src: string; alt: string }> = {
  starter: {
    src: "/art/pack-single.jpg",
    alt: "Roots Revival single 250ml herbal hair oil bottle with its printed box",
  },
  duo: {
    src: "/art/pack-duo.jpg",
    alt: "Roots Revival duo pack, two 250ml bottles with the free 60ml bottle",
  },
  family: {
    src: "/art/pack-family.jpg",
    alt: "Roots Revival family pack, three 250ml bottles",
  },
};

/** The photographed pack shot for a product. */
export function PackShot({
  slug = "starter",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 90vw, 420px",
  fit = "contain",
}: {
  slug?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** The whole pack is always shown; pass cover only for a decorative crop. */
  fit?: "contain" | "cover";
}) {
  const shot = packShots[slug] ?? packShots.starter;
  return (
    <span className={`relative block overflow-hidden bg-bgsoft ${className}`}>
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === "cover" ? "object-cover" : "object-contain"}
      />
    </span>
  );
}

/** A single photograph panel, used for the box gallery and the wide banners. */
export function ArtPanel({
  src,
  alt,
  className = "",
  fit = "cover",
  sizes = "(max-width: 768px) 45vw, 300px",
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "contain" | "cover";
  sizes?: string;
}) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={fit === "cover" ? "object-cover" : "object-contain"}
      />
    </span>
  );
}

export const artwork = {
  hero: "/art/hero.jpg",
  /** The same shot cropped to a wide strip, for banners between sections. */
  banner: "/art/banner.jpg",
  boxFront: "/art/box-front.jpg",
  boxIngredients: "/art/box-ingredients.jpg",
  boxAbout: "/art/box-about.jpg",
};

/**
 * The three sides of the box, shown on every product page so a shopper can read
 * the label whichever pack they opened.
 */
export const boxSides = [
  artwork.boxFront,
  artwork.boxIngredients,
  artwork.boxAbout,
] as const;
