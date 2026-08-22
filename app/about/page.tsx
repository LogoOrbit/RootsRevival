import type { Metadata } from "next";
import Link from "next/link";
import { brand, waLink } from "@/lib/brand";
import { assurances } from "@/lib/products";
import { process, storyStats } from "@/lib/content";
import { PageHero, Section, SectionHeading, Stat, TickList } from "@/components/ui";
import { PackShot } from "@/components/ProductArt";
import { Emblem } from "@/components/Logo";
import { InstagramIcon, WhatsappIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Roots Revival is a handmade herbal hair oil cooked at home in small batches with 16 traditional herbs and oils. Read the story behind the brand and our purity promise.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A family recipe, cooked at home, bottled by hand"
        intro="Roots Revival was never meant to be a business. It was meant to save one woman's hair. It worked, word travelled, and here we are."
      />

      {/* The beginning */}
      <Section tone="cream">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Where it began</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              It started with a hairbrush full of hair
            </h2>
            <div className="gold-rule mt-6 w-24" />
            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted">
              <p>
                Every woman in our family remembers the same moment. You brush your hair
                in the morning, you look at the brush, and your heart sinks. Shampoos
                promised, serums promised, salon treatments promised, and still the
                hairline kept moving backwards.
              </p>
              <p>
                So we went back to what our grandmother used, the way she used it. Amla
                and hibiscus dried on the roof. Kalonji and methi warmed slowly in
                mustard oil. Neem for the scalp. Reetha and shikakai for softness. Rose
                petals because she always said the hair should smell like a garden.
              </p>
              <p>
                The first batch was made in our own kitchen for our own family. Within
                two months the difference was visible enough that cousins asked for a
                bottle, then friends, then their friends. Roots Revival is simply that
                same recipe, made with the same hands, now bottled properly so it can
                reach your home too.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="card leaf-pattern flex h-[26rem] items-end justify-center p-8 sm:h-[30rem]">
              <PackShot bottles={2} className="h-full w-full" />
            </div>
          </div>
        </div>
      </Section>

      {/* Genuine promise */}
      <Section tone="forest">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Emblem tone="light" className="h-24 w-24" />
            <p className="eyebrow mt-6 text-gold-light">Our promise</p>
            <h2 className="mt-4 text-3xl text-cream sm:text-4xl">
              100 percent genuine, and we mean every word of it
            </h2>
            <div className="gold-rule mt-6 w-24" />
            <p className="mt-6 text-base leading-relaxed text-cream-soft/85">
              Genuine is an easy word to print on a label. For us it means something
              very specific, and it is the reason we refuse to hand production over to
              a factory.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "What the label says is what is inside",
                note: "Sixteen ingredients, all of them named on the box. No hidden base oil, no filler, no artificial fragrance to cover a cheap blend.",
              },
              {
                title: "No chemical shortcuts",
                note: "Paraben free, silicone free, mineral oil free and sulphate free. Silicone would make the hair feel instantly smooth and would do nothing for the root, so it stays out.",
              },
              {
                title: "Small batches only",
                note: "We make what we can make properly. A batch is prepared, rested, strained and bottled before the next one begins, which keeps every bottle fresh.",
              },
              {
                title: "Cruelty free and family tested",
                note: "Nothing is tested on animals. Every batch is used by our own family first, and if a batch does not feel right it never gets sold.",
              },
              {
                title: "Made in Pakistan, by hand",
                note: "From washing the herbs to sealing the box, the work is done by people, not machines. That is why every bottle carries a little bit of us.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-cream/15 p-6"
              >
                <h3 className="font-display text-xl text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-soft/80">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="How it is made"
          title="Six slow steps from herb to bottle"
          intro="Nothing here is rushed. A single batch takes days from start to finish, and every step is done by hand at home."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {process.map((step, index) => (
            <div key={step.title} className="card p-7">
              <span className="font-display text-3xl text-gold/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section tone="soft">
        <div className="grid gap-10 rounded-2xl bg-white p-10 sm:grid-cols-2 lg:grid-cols-4">
          {storyStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">What we will never do</h2>
            <div className="gold-rule mt-5 w-24" />
            <div className="mt-7">
              <TickList
                items={[
                  "We will never add a chemical to make the oil look clearer or smell sweeter.",
                  "We will never promise results in seven days, because honest hair care does not work that way.",
                  "We will never sell a batch we would not use on our own children.",
                  "We will never leave your message unanswered, whatever the question is.",
                ]}
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl">What every bottle carries</h2>
            <div className="gold-rule mt-5 w-24" />
            <div className="mt-7 flex flex-wrap gap-3">
              {assurances.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cream-deep bg-white px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.14em] text-forest"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Roots Revival is a carefully crafted blend of traditional herbs and
              nutrient rich oils designed to strengthen hair from the roots, reduce hair
              fall, control dandruff and nourish the scalp deeply. That sentence is
              printed on our box, and everything on this website exists to prove it.
            </p>
          </div>
        </div>
      </Section>

      {/* Letter */}
      <Section tone="cream">
        <div className="card mx-auto max-w-3xl p-10 text-center">
          <Emblem className="mx-auto h-20 w-20" />
          <h2 className="mt-6 text-3xl">A note from our family to yours</h2>
          <div className="gold-rule mx-auto mt-6 w-24" />
          <p className="mt-6 text-base italic leading-relaxed text-muted">
            &ldquo;When you open the bottle, you will smell mustard, kalonji and neem
            before you smell the rose. That smell is the proof. It is the smell of real
            herbs that were dried, cooked and strained in a home kitchen, not the
            perfume of a factory. Give it six weeks of honest use and let your hair tell
            you the rest.&rdquo;
          </p>
          <p className="mt-8 font-display text-xl text-forest">
            The Roots Revival Family
          </p>
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-gold">
            {brand.tagline}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn btn-gold">
              Try The Oil
            </Link>
            <a
              href={waLink(
                `Assalam o Alaikum ${brand.name} team, I read your story and I have a question.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsappIcon className="h-5 w-5" />
              Talk To Us
            </a>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <InstagramIcon className="h-5 w-5" />
              Instagram
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
