import type { Metadata } from "next";
import Link from "next/link";
import { brand, waLink } from "@/lib/brand";
import { PageHero, Section, SectionHeading, TickList } from "@/components/ui";
import { ShieldIcon, TruckIcon, WhatsappIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Payment Methods",
  description:
    "Pay for Roots Revival herbal hair oil with cash on delivery, or send an online transfer to our Meezan Bank account and share the receipt on WhatsApp.",
};

export default function PaymentPage() {
  return (
    <>
      <PageHero
        eyebrow="Payment"
        title="Two easy ways to pay"
        intro="Pay the courier at your door, or send the amount online before dispatch. Both are simple and both are safe."
      />

      <Section tone="cream">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream">
              <TruckIcon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-3xl">Cash on delivery</h2>
            <div className="gold-rule mt-5 w-24" />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              The easiest option and the one most of our customers choose. Place the
              order, we confirm it on WhatsApp, and you pay the courier in cash when the
              parcel reaches you.
            </p>
            <div className="mt-6">
              <TickList
                items={[
                  "Available in every city of Pakistan.",
                  "No advance payment of any kind.",
                  "Check that the box seal is intact before you pay.",
                ]}
              />
            </div>
            <Link href="/shop" className="btn btn-outline mt-7">
              Order With Cash On Delivery
            </Link>
          </div>

          <div className="card overflow-hidden">
            <div className="bg-forest p-9 text-cream">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-forest">
                <ShieldIcon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-3xl text-cream">Online bank transfer</h2>
              <div className="gold-rule mt-5 w-24" />
              <p className="mt-5 text-sm leading-relaxed text-cream-soft/85">
                Prefer to pay before dispatch? Send the amount to our account and share
                the receipt with us on WhatsApp. Your parcel leaves the same day.
              </p>

              <dl className="mt-7 space-y-4 rounded-2xl border border-cream/20 p-6 text-sm">
                <div className="flex flex-wrap justify-between gap-3 border-b border-cream/15 pb-4">
                  <dt className="text-cream-soft/70">Bank name</dt>
                  <dd className="font-medium">{brand.bank.bankName}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-3 border-b border-cream/15 pb-4">
                  <dt className="text-cream-soft/70">Account title</dt>
                  <dd className="font-medium">{brand.bank.accountTitle}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-3 border-b border-cream/15 pb-4">
                  <dt className="text-cream-soft/70">Account number</dt>
                  <dd className="font-medium tracking-[0.12em] text-gold-light">
                    {brand.bank.accountNumber}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-3">
                  <dt className="text-cream-soft/70">Send receipt to</dt>
                  <dd className="font-medium">{brand.contact.whatsappDisplay}</dd>
                </div>
              </dl>

              <a
                href={waLink(
                  `Assalam o Alaikum ${brand.name} team, I have transferred the payment for my order. Here is the receipt.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp mt-7 w-full"
              >
                <WhatsappIcon className="h-5 w-5" />
                Send Receipt On WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="Step by step"
          title="How an online payment works"
          intro="Four simple steps from the transfer to the parcel leaving our home."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "1",
              title: "Place your order",
              note: "Choose your pack, fill in the delivery details and select online bank transfer at checkout.",
            },
            {
              step: "2",
              title: "Send the amount",
              note: `Transfer the total to ${brand.bank.accountTitle}, ${brand.bank.bankName}, account ${brand.bank.accountNumber}.`,
            },
            {
              step: "3",
              title: "Share the receipt",
              note: `Send the screenshot to our WhatsApp at ${brand.contact.whatsappDisplay} with your order number.`,
            },
            {
              step: "4",
              title: "We dispatch",
              note: "Payment confirmed, parcel packed by hand and handed to the courier the same day.",
            },
          ].map((item) => (
            <div key={item.step} className="card p-7">
              <span className="font-display text-3xl text-gold/50">{item.step}</span>
              <h3 className="mt-3 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="card mx-auto mt-12 max-w-3xl p-8">
          <h3 className="font-display text-xl">A word on safety</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The only account we ever ask you to send money to is the {brand.bank.bankName}{" "}
            account of {brand.bank.accountTitle} shown on this page, and the only number
            we use is {brand.contact.whatsappDisplay}. If anyone shares different details
            in our name, please stop and confirm with us first.
          </p>
        </div>
      </Section>
    </>
  );
}
