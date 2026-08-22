import type { Metadata } from "next";
import { brand, formatPrice, mailLink } from "@/lib/brand";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms Of Service",
  description:
    "The simple terms that apply when you order Roots Revival herbal hair oil through this website.",
};

const sections = [
  {
    title: "Who we are",
    body: `${brand.legalName} is a home run herbal hair oil brand based in ${brand.contact.country}. Orders placed on this website are handled directly by our own family, and every message you send reaches us and nobody else.`,
  },
  {
    title: "Placing an order",
    body: "An order placed on this website is a request to buy. It becomes final once we confirm it with you on WhatsApp. If a pack is out of stock or an address is outside our courier network, we will tell you honestly and cancel the order without any charge.",
  },
  {
    title: "Prices and payment",
    body: `All prices are shown in Pakistani Rupees and include taxes. Delivery is ${formatPrice(brand.shipping.flatRate)} and becomes free above ${formatPrice(brand.shipping.freeAbove)}. Payment is either cash to the courier on delivery, or an online transfer to the ${brand.bank.bankName} account named on our payment page. We never ask for a payment to any other account.`,
  },
  {
    title: "Discount codes",
    body: "One discount code applies per order. Codes may carry a minimum order value, they cannot be exchanged for cash, and we may end an offer at any time. An order already confirmed keeps the price it was confirmed at.",
  },
  {
    title: "Product use",
    body: "Roots Revival herbal hair oil is for external use only. Please do a patch test before your first use, keep the bottle away from children and stop using it if any irritation appears. If you are pregnant, nursing or under treatment for a scalp condition, speak to your doctor first.",
  },
  {
    title: "Honest results",
    body: "Our oil is a natural care product, not a medicine, and it does not claim to cure any medical condition. Results depend on your hair, your health and how regularly you use it. We describe what our customers usually experience and we will never promise more than that.",
  },
  {
    title: "Delivery and returns",
    body: "Delivery times, replacement of damaged parcels and the seven day return window for unopened bottles are described in full on our delivery and returns page, and those rules form part of these terms.",
  },
  {
    title: "Our content",
    body: "The Roots Revival name, logo, label artwork and the words on this website belong to us. Please do not copy them for another brand or use them to sell a product that is not ours.",
  },
  {
    title: "Changes",
    body: "We may update these terms as the brand grows. The version published on this page at the time of your order is the version that applies to it.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="The rules of ordering from us"
        intro="Written in plain words, because you should not need a lawyer to buy a bottle of hair oil."
      />
      <Section tone="cream">
        <div className="mx-auto max-w-3xl">
          {sections.map((section) => (
            <article key={section.title} className="border-b border-cream-deep py-7">
              <h2 className="font-display text-2xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{section.body}</p>
            </article>
          ))}
          <p className="mt-8 text-sm leading-relaxed text-muted">
            Anything unclear? Write to{" "}
            <a href={mailLink} className="link-underline text-forest">
              {brand.contact.email}
            </a>{" "}
            or message {brand.contact.whatsappDisplay} and we will explain it ourselves.
          </p>
        </div>
      </Section>
    </>
  );
}
