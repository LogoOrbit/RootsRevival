/**
 * Custom vector art, one mark for every ingredient printed on the label.
 * Everything is drawn with currentColor so the icons follow the theme.
 */

type IconProps = { className?: string };

const base = "h-8 w-8";

function Frame({ children, className = base }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function MustardOilIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M24 6c6 8 10 13 10 19a10 10 0 0 1-20 0c0-6 4-11 10-19z" />
      <circle cx="20" cy="27" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="26" cy="31" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="27" cy="24" r="1.2" fill="currentColor" stroke="none" />
      <path d="M14 40h20" />
    </Frame>
  );
}

export function CoconutOilIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <circle cx="24" cy="26" r="14" />
      <path d="M10 26a14 14 0 0 1 28 0" />
      <path d="M14 26c3 3 7 4 10 4s7-1 10-4" />
      <path d="M20 18c1-4 6-6 9-4" />
    </Frame>
  );
}

export function CastorOilIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M24 8c8 4 12 11 12 18a12 12 0 0 1-24 0c0-7 4-14 12-18z" />
      <path d="M24 14v22" />
      <path d="M24 22c-3-2-6-3-9-3" />
      <path d="M24 22c3-2 6-3 9-3" />
      <path d="M24 30c-3-2-5-3-8-3" />
      <path d="M24 30c3-2 5-3 8-3" />
    </Frame>
  );
}

export function AmlaIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <circle cx="22" cy="28" r="11" />
      <path d="M22 17v22" />
      <path d="M15 21c2 4 2 10 0 14" />
      <path d="M29 21c-2 4-2 10 0 14" />
      <path d="M22 17c0-5 4-8 9-8c0 5-4 8-9 8z" />
    </Frame>
  );
}

export function HibiscusIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M24 24C28 20 30 15 28 11C26 7 22 7 20 11C18 15 20 20 24 24Z"
          transform={`rotate(${angle} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="2.4" fill="currentColor" stroke="none" />
      <path d="M24 24c4-3 7-6 8-11" />
    </Frame>
  );
}

export function KalonjiIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M9 32c4-3 9-4 15-4s11 1 15 4" />
      <path d="M9 32c0 4 7 7 15 7s15-3 15-7" />
      <ellipse cx="18" cy="22" rx="3" ry="2" transform="rotate(-25 18 22)" />
      <ellipse cx="26" cy="18" rx="3" ry="2" transform="rotate(15 26 18)" />
      <ellipse cx="31" cy="24" rx="3" ry="2" transform="rotate(-10 31 24)" />
      <ellipse cx="23" cy="25" rx="3" ry="2" transform="rotate(30 23 25)" />
    </Frame>
  );
}

export function FenugreekIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M24 40V18" />
      <path d="M24 22c-6 0-10-4-11-10c6-1 11 3 11 10z" />
      <path d="M24 26c6 0 10-4 11-10c-6-1-11 3-11 10z" />
      <path d="M24 34c-5 0-8-3-9-8c5-1 9 2 9 8z" />
    </Frame>
  );
}

export function NeemLeafIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M12 38c0-12 8-22 24-26c1 14-8 24-24 26z" />
      <path d="M12 38C18 30 26 22 34 16" />
      <path d="M20 30l-3-4M26 24l-3-4M31 19l-3-4" />
    </Frame>
  );
}

export function ReethaIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <circle cx="20" cy="28" r="9" />
      <circle cx="31" cy="21" r="6" />
      <path d="M20 19c1-4 4-6 8-6" />
      <path d="M16 26c1-2 3-3 5-3" />
    </Frame>
  );
}

export function ShikakaiIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M11 15c10 2 20 10 26 20" />
      <path d="M11 15c-1 6 2 10 7 12" />
      <path d="M18 21c3 1 6 3 8 6" />
      <path d="M26 29c3 2 6 5 8 8" />
      <circle cx="16" cy="19" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="23" cy="25" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="30" cy="32" r="1.4" fill="currentColor" stroke="none" />
    </Frame>
  );
}

export function RoseIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M24 12c5 0 9 4 9 9s-4 9-9 9s-9-4-9-9" />
      <path d="M18 21c0-3 3-6 6-6s6 3 6 6s-3 5-6 5" />
      <path d="M24 26c-1-1-2-2-2-4" />
      <path d="M24 30v10" />
      <path d="M24 34c-4 0-7-2-8-6c4-1 7 1 8 6z" />
    </Frame>
  );
}

export function RosemaryIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M14 40C20 30 27 20 36 10" />
      <path d="M20 31l-6-1M23 27l-6-2M26 22l-6-2M29 18l-5-2M32 14l-5-2" />
      <path d="M22 33l5-3M25 28l5-3M28 23l5-3M31 18l4-2" />
    </Frame>
  );
}

export function VitaminEIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M17 31a9 9 0 0 1 0-13l4-4a9 9 0 0 1 13 13l-4 4a9 9 0 0 1-13 0z" />
      <path d="M20 28l8-8" />
      <path d="M31 34c1 2 3 3 5 3" />
    </Frame>
  );
}

export function EssentialOilIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M20 8h8v5h-8z" />
      <path d="M21 13c-3 2-5 5-5 9v13a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V22c0-4-2-7-5-9" />
      <path d="M24 20c2 3 3 5 3 7a3 3 0 0 1-6 0c0-2 1-4 3-7z" />
    </Frame>
  );
}

export function KalonjiOilIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M19 9h10l-1 6c4 2 6 6 6 10v13a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V25c0-4 2-8 6-10z" />
      <ellipse cx="21" cy="30" rx="2.6" ry="1.8" transform="rotate(-20 21 30)" />
      <ellipse cx="27" cy="27" rx="2.6" ry="1.8" transform="rotate(15 27 27)" />
      <ellipse cx="25" cy="34" rx="2.6" ry="1.8" transform="rotate(-5 25 34)" />
    </Frame>
  );
}

export function NeemOilIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M19 9h10l-1 6c4 2 6 6 6 10v13a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V25c0-4 2-8 6-10z" />
      <path d="M18 33c0-5 4-9 11-10c0 6-5 10-11 10z" />
    </Frame>
  );
}

/** Ordered exactly like the ingredient list on the label. */
export const herbIcons = [
  MustardOilIcon,
  CoconutOilIcon,
  CastorOilIcon,
  AmlaIcon,
  HibiscusIcon,
  KalonjiIcon,
  FenugreekIcon,
  NeemLeafIcon,
  ReethaIcon,
  ShikakaiIcon,
  RoseIcon,
  RosemaryIcon,
  VitaminEIcon,
  EssentialOilIcon,
  KalonjiOilIcon,
  NeemOilIcon,
];

export function HerbIcon({ index, className }: { index: number; className?: string }) {
  const Icon = herbIcons[index % herbIcons.length];
  return <Icon className={className} />;
}

/* Benefit marks, drawn in the same family */

export function BenefitIcon({ index, className }: { index: number; className?: string }) {
  const icons = [
    // hair fall
    <Frame key="a" className={className}>
      <path d="M24 8c8 0 13 6 13 14c0 7-4 10-4 16H15c0-6-4-9-4-16c0-8 5-14 13-14z" />
      <path d="M19 24c2 3 2 8 1 12M29 24c-2 3-2 8-1 12" />
    </Frame>,
    // roots
    <Frame key="b" className={className}>
      <path d="M24 8v16" />
      <path d="M24 24c-5 3-8 8-9 16M24 24c5 3 8 8 9 16" />
      <path d="M24 30v10M17 34c-3 2-5 4-6 6M31 34c3 2 5 4 6 6" />
    </Frame>,
    // growth
    <Frame key="c" className={className}>
      <path d="M24 40V16" />
      <path d="M24 22c-7 0-11-5-11-11c7-1 11 4 11 11z" />
      <path d="M24 28c7 0 11-5 11-11c-7-1-11 4-11 11z" />
    </Frame>,
    // scalp health
    <Frame key="d" className={className}>
      <circle cx="24" cy="24" r="13" />
      <path d="M17 27c2-4 5-6 9-6c3 0 5 1 7 3" />
      <path d="M20 18c1-1 2-2 4-2" />
    </Frame>,
    // shine
    <Frame key="e" className={className}>
      <path d="M24 8l3 8l8 3l-8 3l-3 8l-3-8l-8-3l8-3z" />
      <path d="M34 30l1.5 4l4 1.5l-4 1.5l-1.5 4l-1.5-4l-4-1.5l4-1.5z" />
    </Frame>,
    // dandruff
    <Frame key="f" className={className}>
      <path d="M24 9l0 30M13 17l22 14M35 17L13 31" />
      <circle cx="24" cy="24" r="4" />
    </Frame>,
    // thickness
    <Frame key="g" className={className}>
      <path d="M14 40c0-14 3-24 10-32c7 8 10 18 10 32" />
      <path d="M20 40c0-10 1-17 4-23M28 40c0-10-1-17-4-23" />
    </Frame>,
  ];
  return icons[index % icons.length];
}
