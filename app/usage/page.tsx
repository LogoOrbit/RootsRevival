import type { Metadata } from "next";
import Link from "next/link";
import { howToUse } from "@/lib/products";
import { expectations } from "@/lib/content";
import { PageHero, Section, SectionHeading, TickList } from "@/components/ui";
import { BottleArt } from "@/components/ProductArt";

export const metadata: Metadata = {
  title: "How To Use",
  description:
    "How to use Roots Revival herbal hair oil: shake well, massage into the scalp for 5 to 10 minutes, leave for 2 to 4 hours or overnight, and repeat 2 to 3 times a week.",
};

const weeklyPlan = [
  {
    day: "Day 1",
    title: "Full oil treatment",
    note: "Section the hair, oil the scalp, massage for ten minutes, braid loosely and leave it overnight. Wash in the morning with a mild shampoo.",
  },
  {
    day: "Day 3",
    title: "Short treatment",
    note: "A lighter application, left for two to four hours before washing. Focus on the crown and the hairline.",
  },
  {
    day: "Day 5 or 6",
    title: "Roots only",
    note: "A few drops worked into the parting and temples. Perfect for the days you want to keep the length free of oil.",
  },
];

export default function UsagePage() {
  return (
    <>
      <PageHero
        eyebrow="The ritual"
        title="How to use Roots Revival"
        intro="Ten quiet minutes, two or three times a week. That is the whole method, and it is the reason it works."
      />

      <Section tone="cream">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="card leaf-pattern flex items-center justify-center p-10">
            <BottleArt className="h-[24rem]" />
          </div>

          <div>
            <p className="eyebrow text-gold">Six steps</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Straight from the label</h2>
            <div className="gold-rule mt-6 w-24" />
            <ol className="mt-8 space-y-6">
              {howToUse.map((step, index) => (
                <li key={step.step} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-display text-lg text-cream">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-snug">{step.step}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {step.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="A simple week"
          title="What a good week looks like"
          intro="You do not need to oil your hair every day. Three touch points a week keep the scalp fed without weighing the hair down."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {weeklyPlan.map((item) => (
            <div key={item.day} className="card p-8">
              <p className="eyebrow text-gold">{item.day}</p>
              <h3 className="mt-3 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Small habits that double the results</h2>
            <div className="gold-rule mt-5 w-24" />
            <div className="mt-7">
              <TickList
                items={[
                  "Warm the oil slightly by keeping the bowl in warm water. Never heat it directly on a flame.",
                  "Use your fingertips in slow circles, never your nails, so the scalp is stimulated and not scratched.",
                  "Comb gently with a wide tooth comb after massaging to spread the oil through the length.",
                  "Cover with a soft cotton cloth if you are leaving it overnight, so your pillow stays clean.",
                  "Wash with a mild sulphate free shampoo. Two gentle rounds are better than one harsh one.",
                  "Give it six full weeks before you judge the results. Hair grows on its own schedule.",
                ]}
              />
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl">Please remember</h2>
            <div className="gold-rule mt-5 w-24" />
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              <li>
                <span className="font-display text-lg text-forest">Patch test first.</span>{" "}
                Apply a little behind the ear 24 hours before your first use.
              </li>
              <li>
                <span className="font-display text-lg text-forest">External use only.</span>{" "}
                Keep the oil away from the eyes and never swallow it.
              </li>
              <li>
                <span className="font-display text-lg text-forest">Keep it away from children.</span>{" "}
                Store the bottle out of their reach.
              </li>
              <li>
                <span className="font-display text-lg text-forest">Store it well.</span>{" "}
                A cool and dry shelf away from sunlight. Use within 12 months of opening.
              </li>
              <li>
                <span className="font-display text-lg text-forest">Ask your doctor</span>{" "}
                if you are pregnant, nursing or under treatment for a scalp condition.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="The honest timeline"
          title="What to expect and when"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {expectations.map((item) => (
            <div key={item.period} className="card p-7">
              <p className="eyebrow text-gold">{item.period}</p>
              <h3 className="mt-3 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-gold">
            Start Your Course
          </Link>
          <Link href="/faq" className="btn btn-outline">
            Read The FAQ
          </Link>
        </div>
      </Section>
    </>
  );
}
