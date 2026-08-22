import { Emblem } from "./Logo";

/** The 250ml bottle, drawn so the site never waits on a photo shoot. */
export function BottleArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 380" className={className} role="img" aria-label="Roots Revival 250ml bottle">
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0a2116" />
          <stop offset="22%" stopColor="#1d4a33" />
          <stop offset="48%" stopColor="#123524" />
          <stop offset="78%" stopColor="#0a2116" />
          <stop offset="100%" stopColor="#06170f" />
        </linearGradient>
        <linearGradient id="capg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8f6a20" />
          <stop offset="35%" stopColor="#e0be72" />
          <stop offset="65%" stopColor="#b8892f" />
          <stop offset="100%" stopColor="#8f6a20" />
        </linearGradient>
        <linearGradient id="labelg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf9ee" />
          <stop offset="100%" stopColor="#f2e9d5" />
        </linearGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="110" cy="366" rx="70" ry="9" fill="#123524" opacity="0.14" />

      {/* cap */}
      <rect x="86" y="8" width="48" height="42" rx="7" fill="url(#capg)" />
      <rect x="86" y="20" width="48" height="3" fill="#7a5a1a" opacity="0.5" />
      <rect x="86" y="30" width="48" height="3" fill="#7a5a1a" opacity="0.5" />
      {/* neck */}
      <rect x="95" y="48" width="30" height="26" fill="#0f2c1e" />
      {/* body */}
      <path
        d="M95 70c-18 6 -43 16 -43 44v230c0 16 10 26 26 26h64c16 0 26 -10 26 -26V114c0 -28 -25 -38 -43 -44z"
        fill="url(#glass)"
      />
      {/* glass highlight */}
      <path
        d="M70 130c0 0 -4 90 0 190"
        stroke="#ffffff"
        strokeOpacity="0.16"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />

      {/* label */}
      <rect x="62" y="132" width="96" height="176" rx="8" fill="url(#labelg)" />
      <rect
        x="66"
        y="136"
        width="88"
        height="168"
        rx="6"
        fill="none"
        stroke="#b8892f"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <g transform="translate(84,142) scale(0.26)">
        <Emblem tone="dark" />
      </g>
      <text
        x="110"
        y="212"
        textAnchor="middle"
        fill="#123524"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="19"
        fontWeight="700"
        letterSpacing="2"
      >
        ROOTS
      </text>
      <text
        x="110"
        y="230"
        textAnchor="middle"
        fill="#123524"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="19"
        fontWeight="700"
        letterSpacing="2"
      >
        REVIVAL
      </text>
      <rect x="68" y="238" width="84" height="15" rx="7.5" fill="#123524" />
      <text
        x="110"
        y="248.5"
        textAnchor="middle"
        fill="#faf4e6"
        fontFamily="Jost, Helvetica, sans-serif"
        fontSize="6.6"
        letterSpacing="1.2"
      >
        HERBAL HAIR OIL
      </text>
      <text
        x="110"
        y="266"
        textAnchor="middle"
        fill="#5f6f65"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="9"
        fontStyle="italic"
      >
        Revive Your Roots
      </text>
      <text
        x="110"
        y="277"
        textAnchor="middle"
        fill="#5f6f65"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="9"
        fontStyle="italic"
      >
        Reveal Your Beauty
      </text>
      <rect x="68" y="285" width="84" height="15" rx="4" fill="#123524" />
      <text
        x="110"
        y="295.5"
        textAnchor="middle"
        fill="#faf4e6"
        fontFamily="Jost, Helvetica, sans-serif"
        fontSize="6.8"
        letterSpacing="0.4"
      >
        250ml e 8.45 fl.oz
      </text>
    </svg>
  );
}

/** The printed carton, shown next to the bottle. */
export function BoxArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 380" className={className} role="img" aria-label="Roots Revival printed box">
      <defs>
        <linearGradient id="boxg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0e2b1d" />
          <stop offset="55%" stopColor="#123524" />
          <stop offset="100%" stopColor="#081c12" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="366" rx="62" ry="8" fill="#123524" opacity="0.13" />
      <rect x="34" y="26" width="132" height="330" rx="6" fill="url(#boxg)" />
      <rect x="34" y="26" width="16" height="330" fill="#061711" opacity="0.45" />
      <rect
        x="58"
        y="46"
        width="92"
        height="290"
        rx="4"
        fill="none"
        stroke="#b8892f"
        strokeWidth="0.7"
        opacity="0.55"
      />
      <g transform="translate(78,60) scale(0.26)">
        <Emblem tone="light" />
      </g>
      <text
        x="104"
        y="130"
        textAnchor="middle"
        fill="#faf4e6"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="2"
      >
        ROOTS
      </text>
      <text
        x="104"
        y="149"
        textAnchor="middle"
        fill="#faf4e6"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="2"
      >
        REVIVAL
      </text>
      <rect x="60" y="158" width="88" height="16" rx="8" fill="#faf4e6" />
      <text
        x="104"
        y="169"
        textAnchor="middle"
        fill="#123524"
        fontFamily="Jost, Helvetica, sans-serif"
        fontSize="6.8"
        letterSpacing="1.2"
      >
        HERBAL HAIR OIL
      </text>
      <text
        x="104"
        y="190"
        textAnchor="middle"
        fill="#d9b163"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="10"
        fontStyle="italic"
      >
        Revive Your Roots,
      </text>
      <text
        x="104"
        y="203"
        textAnchor="middle"
        fill="#d9b163"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="10"
        fontStyle="italic"
      >
        Reveal Your Beauty
      </text>
      <text
        x="104"
        y="228"
        textAnchor="middle"
        fill="#b8892f"
        fontFamily="Jost, Helvetica, sans-serif"
        fontSize="6.5"
        letterSpacing="2.4"
      >
        WITH GOODNESS OF
      </text>
      {["Amla", "Hibiscus", "Kalonji", "Neem", "Rosemary"].map((h, i) => (
        <text
          key={h}
          x="104"
          y={246 + i * 15}
          textAnchor="middle"
          fill="#efe4ca"
          fontFamily="Jost, Helvetica, sans-serif"
          fontSize="9"
        >
          {h}
        </text>
      ))}
      <rect x="58" y="322" width="92" height="18" rx="4" fill="#faf4e6" />
      <text
        x="104"
        y="334"
        textAnchor="middle"
        fill="#123524"
        fontFamily="Jost, Helvetica, sans-serif"
        fontSize="7.4"
        letterSpacing="0.4"
      >
        250ml e 8.45 fl.oz
      </text>
    </svg>
  );
}

/** Box and bottle together, the shot used on the home hero and shop cards. */
export function PackShot({
  className = "",
  bottles = 1,
}: {
  className?: string;
  bottles?: number;
}) {
  return (
    <div className={`relative flex items-end justify-center ${className}`}>
      <BoxArt className="w-[38%] translate-y-1 drop-shadow-xl" />
      <BottleArt className="-ml-4 w-[42%] drop-shadow-2xl" />
      {bottles > 1 ? (
        <BottleArt className="-ml-10 w-[36%] opacity-95 drop-shadow-xl" />
      ) : null}
      {bottles > 2 ? (
        <BottleArt className="-ml-10 w-[31%] opacity-90 drop-shadow-lg" />
      ) : null}
    </div>
  );
}
