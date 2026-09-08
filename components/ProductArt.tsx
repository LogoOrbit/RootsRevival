import Image from "next/image";

/** The photographs are square, so the tiles fill rather than letterbox. */
const packShots: Record<string, { src: string; alt: string; bg: string }> = {
  starter: {
    src: "/art/pack-single.jpg",
    alt: "Roots Revival single 250ml herbal hair oil bottle with its printed box",
    bg: "#e7e2d6",
  },
  duo: {
    src: "/art/pack-duo.jpg",
    alt: "Roots Revival duo pack, two 250ml bottles with the free 60ml bottle",
    bg: "#e7e2d6",
  },
  family: {
    src: "/art/pack-family.jpg",
    alt: "Roots Revival family pack, three 250ml bottles",
    bg: "#e7e2d6",
  },
};

/** The photographed pack shot for a product. */
export function PackShot({
  slug = "starter",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 90vw, 420px",
  fit = "cover",
}: {
  slug?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Square photographs fill their tile by default; contain keeps the whole frame. */
  fit?: "contain" | "cover";
}) {
  const shot = packShots[slug] ?? packShots.starter;
  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      style={{ backgroundColor: shot.bg }}
    >
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
