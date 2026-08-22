import type { Metadata } from "next";
import Link from "next/link";
import { assurances, ingredients } from "@/lib/products";
import { PageHero, Section, SectionHeading, TickList } from "@/components/ui";
import { LeafIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "The complete ingredient list of Roots Revival herbal hair oil: mustard, coconut and castor oil infused with amla, hibiscus, kalonji, fenugreek, neem, reetha, shikakai, rose petals, rosemary and vitamin E.",
};

const baseOils = [
  {
    name: "Mustard Oil",
    note: "The warming base our grandmothers swore by. It carries the herbs deep into the scalp and gets the blood moving where new hair starts.",
  },
  {
    name: "Coconut Oil",
    note: "One of the few oils that truly enters the hair shaft. It guards the protein in your strands so they break less while combing.",
  },
  {
    name: "Castor Oil",
    note: "Thick, rich and slow. It coats the length, seals moisture and gives the oil its comforting weight.",
  },
];

export default function IngredientsPage() {
  return (
    <>
      <PageHero
        eyebrow="With goodness of"
        title="Sixteen ingredients you can actually pronounce"
        intro="Turn our box around and you will find a list, not a chemistry paper. Here is every ingredient in the bottle and the job it does for your hair."
      />

      <Section tone="cream">
        <SectionHeading
          eyebrow="The base"
          title="Three oils carry everything else"
          intro="The herbs are only as good as the oil they steep in, so we use three of the most trusted oils in traditional hair care."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {baseOils.map((oil) => (
            <div key={oil.name} className="card p-8">
              <LeafIcon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-2xl">{oil.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{oil.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="The full list"
          title="Everything printed on our label"
          intro="Exactly as it appears on the back of the box, with a note on why each one is there."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((item, index) => (
            <div key={item.name} className="card flex gap-4 p-6">
              <span className="font-display text-2xl text-gold/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg leading-snug">{item.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">What is not inside</h2>
            <div className="gold-rule mt-5 w-24" />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              A natural hair oil is defined as much by what it leaves out. These are the
              things you will never find in a Roots Revival bottle.
            </p>
            <div className="mt-7">
              <TickList
                items={[
                  "No parabens, so nothing artificial is preserving the oil.",
                  "No silicones, because a fake shine does nothing for the root.",
                  "No mineral oil, which sits on the scalp and blocks it.",
                  "No sulphates, no artificial colour and no synthetic fragrance.",
                  "No animal testing at any stage.",
                ]}
              />
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl">Good to know</h2>
            <div className="gold-rule mt-5 w-24" />
            <dl className="mt-6 space-y-5 text-sm leading-relaxed text-muted">
              <div>
                <dt className="font-display text-lg text-forest">
                  Why the oil looks cloudy sometimes
                </dt>
                <dd className="mt-1">
                  Real herb infusions settle. A little sediment at the bottom is the herb
                  itself, not a fault. Shake the bottle well before every use.
                </dd>
              </div>
              <div>
                <dt className="font-display text-lg text-forest">
                  Why the smell is strong at first
                </dt>
                <dd className="mt-1">
                  Mustard, kalonji and neem all have character. Rose petals and rosemary
                  soften it, and the smell washes out with one mild shampoo.
                </dd>
              </div>
              <div>
                <dt className="font-display text-lg text-forest">Shelf life</dt>
                <dd className="mt-1">
                  Store in a cool and dry place away from direct sunlight. After opening,
                  use the bottle within 12 months.
                </dd>
              </div>
              <div>
                <dt className="font-display text-lg text-forest">Patch test</dt>
                <dd className="mt-1">
                  For external use only. Apply a little behind the ear 24 hours before
                  your first full application. Keep out of reach of children.
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {assurances.map((item) => (
            <span
              key={item}
              className="text-[0.68rem] uppercase tracking-[0.18em] text-muted"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/shop" className="btn btn-gold">
            Shop The Oil
          </Link>
        </div>
      </Section>
    </>
  );
}
