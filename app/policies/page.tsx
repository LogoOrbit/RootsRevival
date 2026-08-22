import type { Metadata } from "next";
import Link from "next/link";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { PageHero, Section, SectionHeading, TickList } from "@/components/ui";
import { WhatsappIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Delivery And Returns",
  description:
    "Delivery charges, delivery times and the return policy for Roots Revival herbal hair oil orders across Pakistan.",
};

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Delivery and returns"
        title="How your parcel reaches you"
        intro="Clear, simple rules with no fine print games. If anything goes wrong with your parcel, one message is all it takes."
      />

      <Section tone="cream">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Delivery charges",
              note: `A flat ${formatPrice(brand.shipping.flatRate)} anywhere in Pakistan. Delivery is free on every order above ${formatPrice(brand.shipping.freeAbove)}, which includes the duo pack and the family pack.`,
            },
            {
              title: "Delivery time",
              note: `Orders are dispatched within one working day of confirmation and usually reach you in ${brand.shipping.deliveryDays}. Remote areas can take a little longer.`,
            },
            {
              title: "Tracking",
              note: "As soon as the courier collects your parcel we send the tracking number to your WhatsApp, so you always know where it is.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-8">
              <h2 className="font-display text-2xl">{item.title}</h2>
              <div className="gold-rule mt-4 w-16" />
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Returns and replacements</h2>
            <div className="gold-rule mt-5 w-24" />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Hair oil is a personal care product, so a bottle that has been opened
              cannot be resold or returned. Everything else, we will make right.
            </p>
            <div className="mt-7">
              <TickList
                items={[
                  "Damaged or leaking bottle on arrival: we replace it free of cost.",
                  "Wrong pack delivered: we collect it and send the correct one at our expense.",
                  "Unopened and sealed bottle: return it within 7 days of delivery for a refund of the product amount.",
                  "Send us a photo on WhatsApp within 48 hours of delivery so we can act quickly.",
                ]}
              />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Refunds are transferred back to your bank account within 3 working days of
              the returned parcel reaching us. Delivery charges are not refundable unless
              the mistake was ours.
            </p>
          </div>

          <div className="space-y-6">
            <div className="card p-8">
              <h3 className="font-display text-xl">Order cancellation</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                You can cancel any order before it is handed to the courier. Simply send
                us a message with your order number. Once the parcel has left, please
                refuse the delivery instead and it comes back to us.
              </p>
            </div>
            <div className="card p-8">
              <h3 className="font-display text-xl">Repeated refused parcels</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                We are a small home run brand and every refused cash on delivery parcel
                costs us both ways. If an address refuses delivery more than once, future
                orders from that address will need an advance payment.
              </p>
            </div>
            <div className="card p-8">
              <h3 className="font-display text-xl">Wrong address or number</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Please double check your address and WhatsApp number at checkout. If the
                courier cannot reach you the parcel returns to us, and a fresh delivery
                charge applies for a second attempt.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="forest" className="text-center">
        <SectionHeading
          title="Something wrong with your parcel?"
          intro="Message us with your order number and a photo. We answer every complaint ourselves and we fix it quickly."
          tone="light"
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(
              `Assalam o Alaikum ${brand.name} team, I need help with my order.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsappIcon className="h-5 w-5" />
            {brand.contact.whatsappDisplay}
          </a>
          <Link href="/contact" className="btn btn-gold">
            Contact Page
          </Link>
        </div>
      </Section>
    </>
  );
}
