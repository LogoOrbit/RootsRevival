"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, formatPrice, mailLink, waLink } from "@/lib/brand";
import { useT } from "./Providers";
import { CheckIcon, MailIcon, WhatsappIcon } from "./Icons";

type LastOrder = {
  orderId: string;
  total: number;
  payment: string;
  whatsappUrl: string;
  emailDelivered?: boolean;
  whatsappPushed?: boolean;
  name: string;
};

export default function ThankYou() {
  const t = useT();
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
  const reached = Boolean(order?.emailDelivered || order?.whatsappPushed);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="card p-8 text-center sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-band text-bandtext">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-3xl sm:text-4xl">
          {t.thankyouPage.thankYou}
          {order?.name ? `, ${order.name.split(" ")[0]}` : ""}
        </h1>
        <div className="gold-rule mx-auto mt-6 w-24" />
        {orderId ? (
          <p className="mt-6 text-sm uppercase tracking-[0.16em] text-muted">
            {t.thankyouPage.orderNumber}{" "}
            <span className="font-medium text-heading" dir="ltr">
              {orderId}
            </span>
          </p>
        ) : null}
        {order ? (
          <p className="mt-2 font-display text-3xl text-heading">
            {formatPrice(order.total)}
          </p>
        ) : null}
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted">
          {reached ? t.thankyouPage.bodyDelivered : t.thankyouPage.bodyPending}
        </p>

        <a
          href={
            order?.whatsappUrl ||
            waLink(
              `Assalam o Alaikum ${brand.name} team, I placed order ${orderId} on your website.`
            )
          }
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp mt-8"
        >
          <WhatsappIcon className="h-5 w-5" />
          {order?.whatsappUrl ? t.thankyouPage.sendOrder : t.thankyouPage.messageAbout}
        </a>
      </div>

      {isBank ? (
        <div className="mt-8 rounded-2xl bg-band p-8 text-bandtext">
          <p className="eyebrow text-goldlight">{t.thankyouPage.paymentEyebrow}</p>
          <h2 className="mt-3 text-2xl text-bandtext">{t.thankyouPage.paymentTitle}</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <Row label={t.checkoutPage.bank} value={brand.bank.bankName} />
            <Row label={t.checkoutPage.accountTitle} value={brand.bank.accountTitle} />
            <Row label={t.checkoutPage.accountNumber} value={brand.bank.accountNumber} gold />
            <Row
              label={t.checkoutPage.sendReceiptTo}
              value={brand.contact.whatsappDisplay}
              last
            />
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-bandtext/75">
            {t.thankyouPage.paymentNote}
          </p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {t.thankyouPage.steps.map((item, index) => (
          <div key={item.title} className="card p-6">
            <span className="font-display text-3xl text-gold/50">{index + 1}</span>
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
          {t.common.continueShopping}
        </Link>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  gold,
  last,
}: {
  label: string;
  value: string;
  gold?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-4 ${last ? "" : "border-b border-bandtext/15 pb-3"}`}
    >
      <dt className="text-bandtext/70">{label}</dt>
      <dd className={gold ? "tracking-wider text-goldlight" : ""} dir="ltr">
        {value}
      </dd>
    </div>
  );
}
