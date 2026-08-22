import type { Metadata } from "next";
import { brand, mailLink } from "@/lib/brand";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Roots Revival collects, uses and protects the personal details you share when you place an order.",
};

const sections = [
  {
    title: "What we collect",
    body: "When you place an order we ask for your name, WhatsApp number, delivery address, city and, if you choose to share it, your email address. If you write to us through the contact form we keep the message you send along with the way you asked us to reply. That is the whole list.",
  },
  {
    title: "Why we collect it",
    body: "We use these details for one purpose only: to confirm your order, pack it, deliver it and answer your questions. Your address goes to the courier company so the parcel can reach you, and nothing more than that is shared.",
  },
  {
    title: "How the details reach us",
    body: "Your order is sent to our own email inbox and to our own WhatsApp number. We do not run advertising trackers on this website and we do not build profiles of visitors.",
  },
  {
    title: "What we never do",
    body: "We never sell, rent or trade your details to anyone. We never add you to a marketing list without you asking for it, and we never share your number with another business.",
  },
  {
    title: "Payment information",
    body: "We do not collect or store card details anywhere on this website. Cash on delivery is handled by the courier, and bank transfers happen directly between your bank and ours. A payment receipt you send us on WhatsApp stays in that chat.",
  },
  {
    title: "How long we keep it",
    body: "Order details are kept as long as we need them for our own records and for handling any complaint or return. If you would like your details removed from our records, send us a message and we will do it.",
  },
  {
    title: "Cookies and local storage",
    body: "This website stores your cart inside your own browser so your selection is still there when you come back. Nothing in that storage identifies you, and it never leaves your device until you place an order.",
  },
  {
    title: "Children",
    body: "Our website and our products are meant for adults. We do not knowingly collect details from children.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Your details stay with us"
        intro="We are a small family brand and we treat your information the way we would want ours treated."
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
            Questions about your privacy can be sent to{" "}
            <a href={mailLink} className="link-underline text-forest">
              {brand.contact.email}
            </a>{" "}
            or to our WhatsApp at {brand.contact.whatsappDisplay}. This policy was last
            reviewed in {new Date().getFullYear()}.
          </p>
        </div>
      </Section>
    </>
  );
}
