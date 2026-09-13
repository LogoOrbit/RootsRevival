/**
 * Full colour botanical art, one illustration for every ingredient on the label.
 *
 * Drawn flat, in layered shapes, on a shared 100x100 canvas. Flat fills rather
 * than gradients on purpose: no <defs> means no id collisions when a dozen of
 * these render on one page, and the art stays crisp at any size for a few kB.
 * Every illustration is decorative, the ingredient name always sits beside it,
 * so the svg itself is hidden from screen readers.
 */

type ArtProps = { className?: string };

/** One botanical palette for the whole set, so sixteen drawings read as one hand. */
const c = {
  leafDark: "#2c6137",
  leaf: "#3d8049",
  leafLight: "#6aa871",
  stem: "#4f7a3d",
  gold: "#c8901f",
  goldLight: "#e8bd5a",
  oil: "#dfa83a",
  oilDeep: "#b5701a",
  seed: "#2f2823",
  seedLight: "#4a3f36",
  bark: "#8a5a2b",
  barkLight: "#b07f45",
  rose: "#d9718a",
  roseDeep: "#b8465f",
  hibiscus: "#c2332a",
  hibiscusDeep: "#96201d",
  cream: "#f6ecd8",
  shell: "#fffaf0",
  sage: "#7fa38c",
  lilac: "#9a92c4",
  amla: "#cdd968",
  amlaLight: "#e3e996",
  glass: "#e9dcc0",
};

function Frame({ children, className = "h-10 w-10" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

/** A leaf blade with a midrib. Placed by transform so it can point anywhere. */
function Leaf({
  transform,
  fill = c.leaf,
  scale = 1,
}: {
  transform?: string;
  fill?: string;
  scale?: number;
}) {
  return (
    <g transform={transform}>
      <g transform={`scale(${scale})`}>
        <path d="M0 0C9-10 23-9 31 1C23 11 9 11 0 0Z" fill={fill} />
        <path d="M3 0.5L27 1" stroke={c.shell} strokeOpacity="0.4" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </g>
  );
}

/**
 * A sprig: a curved stem with blades or needles running up it in pairs, swept
 * toward the tip. Neem and rosemary are the same plant geometry, so they share
 * the maths and differ only in what hangs off the stem.
 */
function Sprig({
  count,
  render,
  from = [20, 88],
  to = [80, 18],
  sweep = 84,
  stagger = 0,
  stroke = c.stem,
  width = 4,
}: {
  count: number;
  render: (point: { x: number; y: number; angle: number; index: number; side: 1 | -1 }) => React.ReactNode;
  from?: [number, number];
  to?: [number, number];
  /** Degrees off the stem. Near 90 gives a compound leaf, less sweeps it forward. */
  sweep?: number;
  /** Offsets one side up the stem, so the pairs alternate instead of lining up. */
  stagger?: number;
  stroke?: string;
  width?: number;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const stemAngle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const spacing = 0.84 / Math.max(count - 1, 1);

  return (
    <>
      <path
        d={`M${x1} ${y1}Q${(x1 + x2) / 2 - 8} ${(y1 + y2) / 2 + 6} ${x2} ${y2}`}
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
      />
      {Array.from({ length: count }, (_, index) =>
        ([-1, 1] as const).map((side) => {
          const t = Math.min(
            0.1 + index * spacing + (side > 0 ? spacing * stagger : 0),
            0.97
          );
          return (
            <g key={`${index}-${side}`}>
              {render({
                x: x1 + (x2 - x1) * t,
                y: y1 + (y2 - y1) * t,
                index,
                side,
                angle: stemAngle + sweep * side,
              })}
            </g>
          );
        })
      )}
    </>
  );
}

/** A ribbed berry, the amla and the reetha both. */
function Berry({
  cx,
  cy,
  r,
  fill,
  ribs = 0,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  ribs?: number;
}) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      {Array.from({ length: ribs }, (_, index) => {
        const spread = ((index + 1) / (ribs + 1)) * 2 - 1;
        const bow = spread * r * 1.15;
        return (
          <path
            key={index}
            d={`M${cx} ${cy - r}C${cx + bow} ${cy - r * 0.45} ${cx + bow} ${cy + r * 0.45} ${cx} ${cy + r}`}
            stroke={c.leafDark}
            strokeOpacity="0.25"
            strokeWidth="1.5"
            fill="none"
          />
        );
      })}
      <circle cx={cx - r * 0.38} cy={cy - r * 0.42} r={r * 0.26} fill={c.shell} fillOpacity="0.5" />
    </>
  );
}

/** The shared bottle silhouette behind every oil in the list. */
function Bottle({ oil, cap = c.leafDark }: { oil: string; cap?: string }) {
  return (
    <>
      {/* The glass is nearly the colour of the medallion, so it carries an
          outline: without it a dark oil reads as a blob rather than a bottle. */}
      <path
        d="M41 20h18v10c10 5 16 15 16 26v26a9 9 0 0 1-9 9H34a9 9 0 0 1-9-9V56c0-11 6-21 16-26z"
        fill={c.glass}
        stroke={c.bark}
        strokeOpacity="0.45"
        strokeWidth="2"
      />
      <path d="M25 60c7-4 15-5 25-5s18 1 25 5v22a9 9 0 0 1-9 9H34a9 9 0 0 1-9-9z" fill={oil} />
      <rect x="38" y="9" width="24" height="13" rx="4" fill={cap} />
      <path d="M33 44c2-7 6-12 11-15" stroke={c.shell} strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" fill="none" />
    </>
  );
}

/* The three base oils */

export function MustardOilArt({ className }: ArtProps) {
  /** Four petal mustard blossoms, the flower the seed comes from. */
  const blossom = (x: number, y: number, size: number) => (
    <g transform={`translate(${x} ${y})`}>
      {[0, 90, 180, 270].map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy={-size}
          rx={size * 0.62}
          ry={size}
          fill={c.goldLight}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r={size * 0.5} fill={c.gold} />
    </g>
  );
  return (
    <Frame className={className}>
      <Bottle oil={c.oil} />
      {blossom(14, 28, 8)}
      {blossom(86, 22, 9)}
      {blossom(88, 46, 6)}
    </Frame>
  );
}

export function CoconutOilArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Leaf transform="translate(50 22) rotate(-155)" fill={c.leafDark} scale={0.9} />
      <Leaf transform="translate(50 22) rotate(-25)" fill={c.leaf} scale={0.9} />
      <circle cx="50" cy="60" r="27" fill={c.bark} />
      <path d="M23 60a27 27 0 0 0 54 0z" fill={c.barkLight} />
      <circle cx="50" cy="60" r="18" fill={c.shell} />
      <path d="M32 60a18 18 0 0 0 36 0z" fill={c.cream} />
      <circle cx="42" cy="52" r="3" fill={c.bark} fillOpacity="0.35" />
    </Frame>
  );
}

export function CastorOilArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <path d="M50 60v30" stroke={c.stem} strokeWidth="5" strokeLinecap="round" />
      {[-96, -58, -20, 20, 58, 96].map((angle, index) => (
        <g key={angle} transform={`translate(50 60) rotate(${angle})`}>
          {/* A palmate lobe, notched down each side the way a castor leaf is. */}
          <path
            d="M0 0C-13-12-12-30 0-46C12-30 13-12 0 0Z"
            fill={index % 2 ? c.leafDark : c.leaf}
          />
          <path d="M0-3V-42" stroke={c.shell} strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="50" cy="60" r="6" fill={c.leafLight} />
    </Frame>
  );
}

/* The herbs */

export function AmlaArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <path d="M40 40C44 30 50 24 56 20" stroke={c.stem} strokeWidth="4" strokeLinecap="round" fill="none" />
      <Leaf transform="translate(54 22) rotate(-38)" fill={c.leaf} scale={0.72} />
      <Leaf transform="translate(50 24) rotate(-150)" fill={c.leafDark} scale={0.62} />
      <Berry cx={68} cy={52} r={20} fill={c.amlaLight} ribs={4} />
      <Berry cx={34} cy={62} r={24} fill={c.amla} ribs={5} />
      <Berry cx={58} cy={80} r={16} fill={c.amlaLight} ribs={3} />
    </Frame>
  );
}

export function HibiscusArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Leaf transform="translate(50 58) rotate(120)" fill={c.leafDark} scale={0.8} />
      {[0, 72, 144, 216, 288].map((angle, index) => (
        <path
          key={angle}
          d="M0 0C10-6 15-18 11-28C5-38-5-38-11-28C-15-18-10-6 0 0Z"
          transform={`translate(50 52) rotate(${angle})`}
          fill={index % 2 ? c.hibiscus : c.hibiscusDeep}
        />
      ))}
      <circle cx="50" cy="52" r="7" fill={c.goldLight} />
      <path d="M50 52C58 44 66 38 72 36" stroke={c.hibiscusDeep} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="73" cy="35" r="4" fill={c.gold} />
    </Frame>
  );
}

export function KalonjiArt({ className }: ArtProps) {
  const seeds = [
    [28, 74, -20],
    [44, 82, 12],
    [60, 76, -8],
    [72, 84, 25],
    [36, 66, 40],
  ];
  return (
    <Frame className={className}>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="30"
          rx="9"
          ry="17"
          fill={c.sage}
          fillOpacity="0.85"
          transform={`rotate(${angle} 50 40)`}
        />
      ))}
      <circle cx="50" cy="40" r="7" fill={c.seedLight} />
      {seeds.map(([x, y, rotation]) => (
        <path
          key={`${x}-${y}`}
          d="M0 0C3-3 7-2 8 1C6 4 2 4 0 0Z"
          transform={`translate(${x} ${y}) rotate(${rotation}) scale(1.3)`}
          fill={c.seed}
        />
      ))}
    </Frame>
  );
}

export function FenugreekArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <path d="M50 42v30" stroke={c.stem} strokeWidth="5" strokeLinecap="round" />
      {/* The three leaflets methi is known by. */}
      <Leaf transform="translate(50 40) rotate(-90)" fill={c.leaf} scale={1.15} />
      <Leaf transform="translate(46 44) rotate(-168)" fill={c.leafDark} scale={1.05} />
      <Leaf transform="translate(54 44) rotate(-12)" fill={c.leafLight} scale={1.05} />
      {[
        [26, 78, -25],
        [44, 86, 10],
        [64, 80, 30],
        [78, 66, -12],
      ].map(([x, y, rotation]) => (
        <path
          key={`${x}-${y}`}
          d="M0 0L11 5L6 13L-5 8Z"
          transform={`translate(${x} ${y}) rotate(${rotation})`}
          fill={c.goldLight}
          stroke={c.gold}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      ))}
    </Frame>
  );
}

export function NeemLeavesArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Sprig
        count={5}
        sweep={78}
        stagger={0.5}
        render={({ x, y, angle, side, index }) => (
          <Leaf
            transform={`translate(${x} ${y}) rotate(${angle})`}
            fill={(index + (side > 0 ? 1 : 0)) % 2 ? c.leaf : c.leafDark}
            scale={0.62}
          />
        )}
      />
    </Frame>
  );
}

export function ReethaArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <path d="M36 40V26M68 38V28" stroke={c.stem} strokeWidth="4" strokeLinecap="round" />
      <Leaf transform="translate(54 26) rotate(-30)" fill={c.leafDark} scale={0.62} />
      <Berry cx={70} cy={54} r={19} fill={c.bark} />
      <Berry cx={34} cy={60} r={23} fill={c.barkLight} />
      <Berry cx={58} cy={80} r={15} fill={c.bark} />
    </Frame>
  );
}

export function ShikakaiArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <path d="M20 16C34 26 42 42 44 58" stroke={c.stem} strokeWidth="4" strokeLinecap="round" fill="none" />
      {[
        [22, 40, -28],
        [40, 58, -6],
        [46, 80, 14],
      ].map(([x, y, rotation]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${rotation})`}>
          {/* A curled seed pod, ribbed across its length. */}
          <path d="M0 0C16-6 36 0 42 11C28 19 8 14 0 0Z" fill={c.bark} />
          <path
            d="M8 4C18 2 30 5 36 11"
            stroke={c.barkLight}
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
          />
          {[12, 20, 28].map((offset) => (
            <path
              key={offset}
              d={`M${offset} ${offset * 0.16 - 1}l-2 9`}
              stroke={c.seedLight}
              strokeOpacity="0.4"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ))}
        </g>
      ))}
    </Frame>
  );
}

export function RosePetalsArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Leaf transform="translate(50 70) rotate(150)" fill={c.leafDark} scale={0.7} />
      <Leaf transform="translate(50 70) rotate(30)" fill={c.leaf} scale={0.7} />
      {[0, 90, 180, 270].map((angle) => (
        <path
          key={angle}
          d="M0 0C11-5 17-17 12-27C6-36-6-36-12-27C-17-17-11-5 0 0Z"
          transform={`translate(50 50) rotate(${angle})`}
          fill={c.rose}
        />
      ))}
      {[45, 135, 225, 315].map((angle) => (
        <path
          key={angle}
          d="M0 0C8-4 12-13 9-20C4-27-4-27-9-20C-12-13-8-4 0 0Z"
          transform={`translate(50 50) rotate(${angle})`}
          fill={c.roseDeep}
        />
      ))}
      <circle cx="50" cy="50" r="9" fill={c.rose} />
      <circle cx="50" cy="50" r="4.5" fill={c.roseDeep} />
    </Frame>
  );
}

export function RosemaryArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Sprig
        count={10}
        sweep={52}
        stagger={0.5}
        width={3}
        render={({ x, y, angle, side, index }) => {
          const length = 17 - index * 0.9;
          const radians = (angle * Math.PI) / 180;
          return (
            <path
              d={`M${x} ${y}L${x + Math.cos(radians) * length} ${y + Math.sin(radians) * length}`}
              stroke={side > 0 ? c.leafDark : c.sage}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          );
        }}
      />
      <circle cx="30" cy="58" r="4.5" fill={c.lilac} />
      <circle cx="48" cy="40" r="3.8" fill={c.lilac} />
      <circle cx="64" cy="26" r="3.2" fill={c.lilac} />
    </Frame>
  );
}

/* The finishing oils */

export function VitaminEArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      {/* The softgel capsule, seamed across the middle the way a real one is. */}
      <g transform="rotate(-20 46 50)">
        <rect x="20" y="16" width="52" height="70" rx="26" fill={c.oil} />
        <path d="M20 51h52" stroke={c.oilDeep} strokeOpacity="0.45" strokeWidth="2.5" />
        <path
          d="M32 30C28 38 27 48 30 58"
          stroke={c.shell}
          strokeOpacity="0.7"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <path d="M80 54c6 9 9 14 9 18a9 9 0 0 1-18 0c0-4 3-9 9-18z" fill={c.goldLight} />
    </Frame>
  );
}

export function RosemaryEssentialOilArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <path d="M76 24C68 36 60 46 52 54" stroke={c.stem} strokeWidth="3" strokeLinecap="round" fill="none" />
      {[0, 1, 2, 3].map((index) => (
        <path
          key={index}
          d={`M${72 - index * 6} ${30 + index * 8}L${60 - index * 6} ${26 + index * 8}`}
          stroke={c.sage}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <rect x="30" y="12" width="18" height="14" rx="4" fill={c.seedLight} />
      <path d="M29 26h20c8 5 13 13 13 22v30a9 9 0 0 1-9 9H25a9 9 0 0 1-9-9V48c0-9 5-17 13-22z" fill={c.oilDeep} />
      <path d="M16 60c7-4 14-5 23-5s16 1 23 5v18a9 9 0 0 1-9 9H25a9 9 0 0 1-9-9z" fill={c.oil} />
      <path d="M24 42c2-6 5-10 8-12" stroke={c.shell} strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" fill="none" />
    </Frame>
  );
}

export function KalonjiOilArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Bottle oil={c.seedLight} cap={c.seed} />
      {[
        [14, 86, -20],
        [84, 80, 15],
        [10, 66, 30],
        [88, 58, -35],
      ].map(([x, y, rotation]) => (
        <path
          key={`${x}-${y}`}
          d="M0 0C3-3 7-2 8 1C6 4 2 4 0 0Z"
          transform={`translate(${x} ${y}) rotate(${rotation}) scale(1.5)`}
          fill={c.seed}
        />
      ))}
    </Frame>
  );
}

export function NeemOilArt({ className }: ArtProps) {
  return (
    <Frame className={className}>
      <Bottle oil={c.leaf} />
      <Leaf transform="translate(74 30) rotate(-42)" fill={c.leafDark} scale={0.72} />
      <Leaf transform="translate(26 32) rotate(-138)" fill={c.leaf} scale={0.66} />
    </Frame>
  );
}

/** Ordered exactly like the ingredient list on the label. */
export const herbArt = [
  MustardOilArt,
  CoconutOilArt,
  CastorOilArt,
  AmlaArt,
  HibiscusArt,
  KalonjiArt,
  FenugreekArt,
  NeemLeavesArt,
  ReethaArt,
  ShikakaiArt,
  RosePetalsArt,
  RosemaryArt,
  VitaminEArt,
  RosemaryEssentialOilArt,
  KalonjiOilArt,
  NeemOilArt,
];

export function HerbArt({ index, className }: { index: number; className?: string }) {
  const Art = herbArt[index % herbArt.length];
  return <Art className={className} />;
}

/**
 * The art inside a tinted round medallion, which is how ingredients are shown
 * across the site. The ground is a warm wash so the drawings sit on something
 * in both themes rather than floating on the card.
 */
export function HerbMedallion({
  index,
  className = "h-20 w-20",
  artClassName = "h-[84%] w-[84%]",
}: {
  index: number;
  className?: string;
  artClassName?: string;
}) {
  return (
    <span
      className={`herb-medallion relative flex shrink-0 items-center justify-center rounded-full ${className}`}
    >
      <HerbArt index={index} className={artClassName} />
    </span>
  );
}
