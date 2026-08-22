import Image from "next/image";

const packShots: Record<string, { src: string; alt: string }> = {
  starter: { src: "/art/packstarter.jpg", alt: "Roots Revival 250ml bottle with its printed box" },
  duo: { src: "/art/packduo.jpg", alt: "Two Roots Revival packs, bottle and box" },
  family: { src: "/art/packfamily.jpg", alt: "Roots Revival family pack, bottle with printed boxes" },
};

/** The photographed pack shot for a product. */
export function PackShot({
  slug = "starter",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 90vw, 420px",
}: {
  slug?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const shot = packShots[slug] ?? packShots.starter;
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </span>
  );
}

/** A single artwork panel, used for the label and box gallery. */
export function ArtPanel({
  src,
  alt,
  className = "",
  fit = "contain",
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
  scene: "/art/scene.jpg",
  bottle: "/art/bottleclose.jpg",
  box: "/art/boxclose.jpg",
  labelFront: "/art/labelfront.jpg",
  labelBack: "/art/labelback.jpg",
  boxFront: "/art/boxfront.jpg",
  boxIngredients: "/art/boxingredients.jpg",
  boxBenefits: "/art/boxbenefits.jpg",
  boxAbout: "/art/boxabout.jpg",
  usageStrip: "/art/usagestrip.jpg",
  badges: "/art/badges.jpg",
  herbs: "/art/herbs.png",
  herbScene: "/art/herbscene.jpg",
  dealsWide: "/art/dealswide.jpg",
  bottleHero: "/art/bottlehero.jpg",
};
