/**
 * Written content for the pages that are not the shop itself.
 * Reviews start empty on purpose: add your own real customer words below
 * and the reviews page fills in automatically.
 */

export type Review = {
  name: string;
  city: string;
  stars: number;
  weeks: string;
  words: string;
};

/**
 * Add real customer reviews here, for example:
 * { name: "Sana", city: "Lahore", stars: 5, weeks: "Using for 6 weeks",
 *   words: "My hair fall reduced a lot." }
 */
export const reviews: Review[] = [];

export const expectations = [
  {
    period: "Week 1",
    title: "A calmer scalp",
    note: "Itching and tightness settle down as neem, rosemary and reetha get to work.",
  },
  {
    period: "Week 2 and 3",
    title: "Less hair on the brush",
    note: "Roots feel stronger, so the everyday shedding starts to slow.",
  },
  {
    period: "Week 4 to 6",
    title: "Softness and shine return",
    note: "Amla, hibiscus and shikakai smooth the cuticle, hair looks alive again.",
  },
  {
    period: "Week 8 and beyond",
    title: "New growth at the hairline",
    note: "With regular use most people notice baby hair filling in around the temples.",
  },
];

export const process = [
  {
    title: "Sourcing the herbs",
    note: "Amla, hibiscus, kalonji, methi, neem, reetha, shikakai, rose and rosemary are bought in small quantities so nothing sits in storage.",
  },
  {
    title: "Cleaning and sun drying",
    note: "Every herb is washed, checked by hand and dried before it ever touches the oil.",
  },
  {
    title: "Slow infusion",
    note: "The herbs steep in mustard, coconut and castor oil on a low flame for hours, never rushed, so the goodness moves into the oil.",
  },
  {
    title: "Resting and straining",
    note: "The batch rests, then it is strained through fine muslin until the oil runs clear.",
  },
  {
    title: "Finishing touches",
    note: "Vitamin E, kalonji oil, neem oil and rosemary essential oil go in at the end, when the oil is cool enough to keep them active.",
  },
  {
    title: "Bottling by hand",
    note: "Each 250ml bottle is filled, sealed, boxed and checked by hand before it leaves for you.",
  },
];

export const faqs = [
  {
    q: "Is Roots Revival really 100 percent natural?",
    a: "Yes. The bottle holds herbs and oils, nothing else. There is no paraben, no silicone, no mineral oil, no sulphate and no artificial colour or fragrance. What you smell is the herbs themselves.",
  },
  {
    q: "Who makes the oil?",
    a: "It is made at home in small batches, by hand, by our own family. Nothing is outsourced to a factory, which is why every bottle is fresh and why we can stand behind it personally.",
  },
  {
    q: "Which hair types is it for?",
    a: "All hair types, women and men. Straight, wavy, curly, coloured, chemically treated or oily, the blend was balanced to suit every scalp.",
  },
  {
    q: "How often should I use it?",
    a: "Two to three times a week. Massage into the scalp for 5 to 10 minutes, leave it for 2 to 4 hours or overnight, then wash with a mild shampoo.",
  },
  {
    q: "When will I see results?",
    a: "Most people feel a calmer scalp within the first week and notice reduced hair fall in three to four weeks. Visible new growth usually shows after six to eight weeks of regular use.",
  },
  {
    q: "Does it smell strong?",
    a: "It carries the earthy scent of mustard, kalonji and neem softened by rose petals and rosemary. The smell washes out completely with one shampoo.",
  },
  {
    q: "Can I use it if I am pregnant or have a sensitive scalp?",
    a: "The blend is natural, still we ask everyone to do a patch test behind the ear 24 hours before the first use. If you are pregnant, nursing or under treatment for a scalp condition, please ask your doctor first.",
  },
  {
    q: "How long does one bottle last?",
    a: "A 250ml bottle lasts roughly one month for medium length hair used two to three times a week. Once opened, use it within 12 months.",
  },
  {
    q: "How should I store it?",
    a: "Keep the bottle in a cool and dry place away from direct sunlight. A little settling at the bottom is normal for a natural oil, simply shake before use.",
  },
  {
    q: "Which cities do you deliver to?",
    a: "All over Pakistan. Orders are dispatched within one working day and usually reach you in 2 to 4 working days.",
  },
  {
    q: "How do I pay?",
    a: "Cash on delivery, or an online transfer to our Meezan Bank account. For online payment send the receipt screenshot to our WhatsApp and we dispatch the same day.",
  },
  {
    q: "Can I order without using the website?",
    a: "Of course. Send us a message on WhatsApp with your name, address and the pack you want, and we will take care of the rest.",
  },
];

export const storyStats = [
  { value: "16", label: "Natural herbs and oils" },
  { value: "250ml", label: "In every bottle" },
  { value: "0", label: "Chemicals added" },
  { value: "100%", label: "Made by hand" },
];
