"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, formatPrice, mailLink, waLink } from "@/lib/brand";
import { CheckIcon, MailIcon, WhatsappIcon } from "./Icons";

type LastOrder = {
  orderId: string;
  total: number;
  payment: string;
  whatsappUrl: string;
  name: string;
};

export default function ThankYou() {
  const params = useSearchParams();
  const orderFromUrl = params.get("order") || "";
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem("rootsrevival.lastorder");
      if (saved) setOrder(JSON.parse(saved) as LastOrder);
    } catch {
      /* ignore */
    }
  }, []);

  const orderId = order?.orderId || orderFromUrl;
  const isBank = order?.payment === "bank";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="card p-10 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest text-cream">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-4xl">
          Thank you{order?.name ? `, ${order.name.split(" ")[0]}` : ""}
        </h1>
        <div className="gold-rule mx-auto mt-6 w-24" />
        {orderId ? (
          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-muted">
            Order number{" "}
            <span className="font-medium text-forest">{orderId}</span>
          </p>
        ) : null}
        {order ? (
          <p className="mt-2 font-display text-3xl text-forest">
            {formatPrice(order.total)}
          </p>
        ) : null}
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted">
          Your order is with our team and your WhatsApp message is ready to send. Press
          the green button below so we can confirm your order right away.
        </p>

        {order?.whatsappUrl ? (
          <a
            href={order.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-8"
          >
            <WhatsappIcon className="h-5 w-5" />
            Send Order On WhatsApp
          </a>
        ) : (
          <a
            href={waLink(
              `Assalam o Alaikum ${brand.name} team, I placed order ${orderId} on your website.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-8"
          >
            <WhatsappIcon className="h-5 w-5" />
            Message Us About This Order
          </a>
        )}
      </div>

      {isBank ? (
        <div className="mt-8 rounded-2xl bg-forest p-8 text-cream">
          <p className="eyebrow text-gold-light">Payment details</p>
          <h2 className="mt-3 text-2xl text-cream">
            Transfer the amount and send us the receipt
          </h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-cream/15 pb-3">
              <dt className="text-cream-soft/70">Bank</dt>
              <dd>{brand.bank.bankName}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-cream/15 pb-3">
              <dt className="text-cream-soft/70">Account title</dt>
              <dd>{brand.bank.accountTitle}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-cream/15 pb-3">
              <dt className="text-cream-soft/70">Account number</dt>
              <dd className="tracking-wider text-gold-light">
                {brand.bank.accountNumber}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-cream-soft/70">Send receipt to</dt>
              <dd>{brand.contact.whatsappDisplay}</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-cream-soft/75">
            Once the receipt reaches our WhatsApp we confirm your payment and dispatch
            the parcel the same day.
          </p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[
          {
            step: "1",
            title: "We confirm",
            note: "Our team replies on WhatsApp to confirm your address and the total.",
          },
          {
            step: "2",
            title: "We bottle it fresh",
            note: "Your pack is filled, sealed and boxed by hand, then handed to the courier.",
          },
          {
            step: "3",
            title: "It reaches you",
            note: `Delivery usually takes ${brand.shipping.deliveryDays} anywhere in Pakistan.`,
          },
        ].map((item) => (
          <div key={item.step} className="card p-6">
            <span className="font-display text-3xl text-gold/50">{item.step}</span>
            <h3 className="mt-2 font-display text-lg">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
        <a href={mailLink} className="flex items-center gap-2 hover:text-gold">
          <MailIcon className="h-4 w-4" />
          {brand.contact.email}
        </a>
        <span className="text-gold">✦</span>
        <Link href="/shop" className="hover:text-gold">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
