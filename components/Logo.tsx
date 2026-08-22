import Link from "next/link";
import { brand } from "@/lib/brand";

type Tone = "dark" | "light";

/**
 * The Roots Revival emblem: an arched crest holding a woman whose hair
 * flows down into living roots, framed by hibiscus and herb leaves.
 */
export function Emblem({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  const hair = tone === "dark" ? "#123524" : "#faf4e6";
  const strand = tone === "dark" ? "#faf4e6" : "#123524";
  const gold = tone === "dark" ? "#b8892f" : "#d9b163";
  const leaf = tone === "dark" ? "#2f6b3f" : "#8dbb84";
  const leafDeep = tone === "dark" ? "#1d4a33" : "#6ea169";
  const bloom = "#c33127";

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={`${brand.name} emblem`}
    >
      {/* arches */}
      <path
        d="M24 112 A76 76 0 0 1 176 112"
        fill="none"
        stroke={gold}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M34 114 A66 66 0 0 1 166 114"
        fill="none"
        stroke={gold}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* leaves on the right */}
      <g stroke={leafDeep} strokeWidth="1.2" fill={leaf}>
        <path d="M133 74c11 -9 26 -9 34 2c-11 9 -26 9 -34 -2z" />
        <path d="M138 95c12 -7 27 -4 33 8c-12 7 -27 4 -33 -8z" />
        <path d="M132 113c12 -5 26 0 30 13c-13 5 -26 0 -30 -13z" />
      </g>
      <path
        d="M126 128c14 -12 27 -26 38 -46"
        fill="none"
        stroke={leafDeep}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* leaves on the left */}
      <g stroke={leafDeep} strokeWidth="1.2" fill={leaf}>
        <path d="M67 72c-11 -9 -26 -9 -34 2c11 9 26 9 34 -2z" />
        <path d="M62 92c-12 -7 -27 -4 -33 8c12 7 27 4 33 -8z" />
      </g>
      <path
        d="M74 126c-14 -12 -27 -26 -38 -46"
        fill="none"
        stroke={leafDeep}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* hibiscus */}
      <g transform="translate(52,124)">
        <g fill={bloom}>
          <ellipse cx="0" cy="-12" rx="9" ry="12" />
          <ellipse cx="12" cy="-4" rx="9" ry="12" transform="rotate(72 12 -4)" />
          <ellipse cx="7" cy="11" rx="9" ry="12" transform="rotate(144 7 11)" />
          <ellipse cx="-7" cy="11" rx="9" ry="12" transform="rotate(216 -7 11)" />
          <ellipse cx="-12" cy="-4" rx="9" ry="12" transform="rotate(288 -12 -4)" />
        </g>
        <circle cx="0" cy="0" r="4.5" fill="#8f1f18" />
        <path
          d="M0 0c6 -6 10 -12 12 -20"
          fill="none"
          stroke={gold}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="-21" r="2" fill={gold} />
      </g>

      {/* figure: profile facing right, long hair falling into roots */}
      <path
        d="M100 32
           C116 32 128 45 128 60
           C128 64 123 63 126 67
           C130 71 137 77 128 80
           C124 81 127 84 123 86
           C121 88 125 91 118 94
           C112 97 107 100 106 107
           C105 114 112 118 116 126
           C121 134 118 144 109 146
           L91 146
           C82 145 77 139 78 130
           C79 118 70 112 67 98
           C62 78 66 50 79 39
           C85 33 92 32 100 32 Z"
        fill={hair}
      />
      {/* strands */}
      <g stroke={strand} strokeWidth="1.5" fill="none" opacity="0.65" strokeLinecap="round">
        <path d="M88 41c-10 14 -14 33 -10 54" />
        <path d="M96 37c-11 16 -15 36 -11 58" />
        <path d="M79 52c-8 15 -9 32 -6 46" />
        <path d="M110 104c-1 12 -1 24 0 34" />
      </g>

      {/* roots */}
      <g stroke={hair} fill="none" strokeLinecap="round">
        <path d="M100 143c0 15 1 26 3 38" strokeWidth="3.2" />
        <path d="M97 146c-9 9 -15 18 -18 30" strokeWidth="2.6" />
        <path d="M103 146c10 9 16 18 20 30" strokeWidth="2.6" />
        <path d="M92 152c-12 5 -21 12 -28 22" strokeWidth="2" />
        <path d="M108 152c13 5 22 12 29 22" strokeWidth="2" />
        <path d="M86 162c-8 2 -15 6 -21 12" strokeWidth="1.3" />
        <path d="M114 162c8 2 16 6 22 12" strokeWidth="1.3" />
        <path d="M95 168c-4 5 -6 10 -7 16" strokeWidth="1.3" />
        <path d="M107 168c4 5 6 10 7 16" strokeWidth="1.3" />
        <path d="M100 158c-2 8 -3 15 -3 22" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

/** Emblem plus wordmark, used in the header, footer and hero. */
export function Logo({
  tone = "dark",
  size = "md",
  withTagline = false,
  className = "",
}: {
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  className?: string;
}) {
  const emblemSize =
    size === "lg" ? "h-20 w-20" : size === "md" ? "h-12 w-12" : "h-10 w-10";
  const titleSize =
    size === "lg" ? "text-4xl" : size === "md" ? "text-2xl" : "text-xl";
  const text = tone === "dark" ? "text-forest" : "text-cream";
  const sub = tone === "dark" ? "text-gold" : "text-gold-light";

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      {brand.logoImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logoImage}
          alt={`${brand.name} logo`}
          className={`${emblemSize} object-contain`}
        />
      ) : (
        <Emblem tone={tone} className={`${emblemSize} shrink-0`} />
      )}
      <span className="flex flex-col leading-none">
        <span className={`wordmark ${titleSize} ${text}`}>
          Roots
          <span className="align-super text-[0.4em]">™</span>
        </span>
        <span className={`wordmark ${titleSize} ${text}`}>Revival</span>
        <span className={`eyebrow mt-1.5 ${sub}`}>Herbal Hair Oil</span>
        {withTagline ? (
          <span
            className={`mt-1 font-display text-sm italic ${
              tone === "dark" ? "text-muted" : "text-cream-soft"
            }`}
          >
            {brand.tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}

export function LogoLink({
  tone = "dark",
  size = "sm",
}: {
  tone?: Tone;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Link href="/" aria-label={`${brand.name} home`}>
      <Logo tone={tone} size={size} />
    </Link>
  );
}
