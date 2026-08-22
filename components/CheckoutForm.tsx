"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { useT } from "./Providers";
import { PackShot } from "./ProductArt";
import { brand, formatPrice } from "@/lib/brand";
import { CheckIcon, WhatsappIcon } from "./Icons";

type Errors = Record<string, string>;

export default function CheckoutForm() {
  const { lines, totals, coupon, applyCoupon, clear, ready } = useCart();
  const t = useT();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    notes: "",
    payment: "cod",
    website: "",
  });
  const [code, setCode] = useState(coupon);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState("");

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    setErrors({});
    setFailed("");
    setSending(true);

    // Opened on the click itself so the browser does not treat it as a popup.
    const waWindow = window.open("", "_blank");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          province: form.province || t.checkoutPage.provinces[0],
          coupon,
          lines,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        waWindow?.close();
        const fieldErrors: Errors = {};
        Object.keys(data.errors || {}).forEach((key) => {
          const messages = t.checkoutPage.errors as Record<string, string>;
          fieldErrors[key] = messages[key] || data.errors[key];
        });
        setErrors(fieldErrors);
        if (!data.errors) setFailed(t.checkoutPage.errors.failed);
        setSending(false);
        return;
      }

      try {
        window.sessionStorage.setItem(
          "rootsrevival.lastorder",
          JSON.stringify({
            orderId: data.orderId,
            total: data.total,
            payment: data.payment,
            whatsappUrl: data.whatsappUrl,
            mailtoUrl: data.mailtoUrl,
            emailDelivered: data.emailDelivered,
            whatsappPushed: data.whatsappPushed,
            name: form.name,
          })
        );
      } catch {
        /* ignore */
      }

      if (waWindow) waWindow.location.href = data.whatsappUrl;
      clear();
      router.push(`/thankyou?order=${data.orderId}`);
    } catch {
      waWindow?.close();
      setFailed(t.checkoutPage.errors.network);
      setSending(false);
    }
  }

  if (!ready) {
    return (
      <p className="py-20 text-center text-sm uppercase tracking-[0.18em] text-muted">
        {t.common.loading}
      </p>
    );
  }

  if (totals.itemCount === 0) {
    return (
      <div className="card mx-auto max-w-xl p-10 text-center sm:p-12">
        <h2 className="text-3xl">{t.checkoutPage.emptyTitle}</h2>
        <div className="gold-rule mx-auto mt-6 w-24" />
        <p className="mt-6 text-sm leading-relaxed text-muted">
          {t.checkoutPage.emptyBody}
        </p>
        <Link href="/shop" className="btn btn-gold mt-8">
          {t.checkoutPage.choosePack}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-8">
        <section className="card p-6 sm:p-7">
          <h2 className="font-display text-2xl">{t.checkoutPage.deliveryDetails}</h2>
          <div className="gold-rule mt-4 w-20" />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field
              label={t.checkoutPage.fullName}
              id="name"
              value={form.name}
              onChange={(v) => update("name", v)}
              error={errors.name}
              placeholder={t.checkoutPage.fullNamePlaceholder}
              required
            />
            <Field
              label={t.checkoutPage.whatsappNumber}
              id="phone"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              error={errors.phone}
              placeholder="0311 3839767"
              type="tel"
              ltr
              required
            />
            <div className="sm:col-span-2">
              <Field
                label={t.checkoutPage.emailOptional}
                id="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
                placeholder="you@example.com"
                type="email"
                ltr
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="address">
                {t.checkoutPage.address}
              </label>
              <textarea
                id="address"
                className="field min-h-28"
                value={form.address}
                onChange={(event) => update("address", event.target.value)}
                placeholder={t.checkoutPage.addressPlaceholder}
                required
              />
              {errors.address ? (
                <p className="mt-1 text-xs text-hibiscus">{errors.address}</p>
              ) : null}
            </div>
            <Field
              label={t.checkoutPage.city}
              id="city"
              value={form.city}
              onChange={(v) => update("city", v)}
              error={errors.city}
              required
            />
            <div>
              <label className="label" htmlFor="province">
                {t.checkoutPage.province}
              </label>
              <select
                id="province"
                className="field"
                value={form.province || t.checkoutPage.provinces[0]}
                onChange={(event) => update("province", event.target.value)}
              >
                {t.checkoutPage.provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="notes">
                {t.checkoutPage.notes}
              </label>
              <textarea
                id="notes"
                className="field min-h-20"
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder={t.checkoutPage.notesPlaceholder}
              />
            </div>
          </div>

          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </section>

        <section className="card p-6 sm:p-7">
          <h2 className="font-display text-2xl">{t.checkoutPage.paymentMethod}</h2>
          <div className="gold-rule mt-4 w-20" />

          <div className="mt-6 space-y-4">
            <PaymentOption
              id="cod"
              selected={form.payment === "cod"}
              onSelect={() => update("payment", "cod")}
              title={t.checkoutPage.codTitle}
              note={t.checkoutPage.codNote}
            />
            <PaymentOption
              id="bank"
              selected={form.payment === "bank"}
              onSelect={() => update("payment", "bank")}
              title={t.checkoutPage.bankTitle}
              note={t.checkoutPage.bankNote}
            />
          </div>

          {form.payment === "bank" ? (
            <div className="mt-6 rounded-2xl bg-band p-6 text-bandtext">
              <p className="eyebrow text-goldlight">{t.checkoutPage.sendPaymentTo}</p>
              <dl className="mt-4 space-y-3 text-sm">
                <BankRow label={t.checkoutPage.bank} value={brand.bank.bankName} />
                <BankRow label={t.checkoutPage.accountTitle} value={brand.bank.accountTitle} />
                <BankRow
                  label={t.checkoutPage.accountNumber}
                  value={brand.bank.accountNumber}
                  gold
                />
                <BankRow
                  label={t.checkoutPage.sendReceiptTo}
                  value={brand.contact.whatsappDisplay}
                />
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-bandtext/75">
                {t.checkoutPage.bankHint1} {formatPrice(totals.total)}{" "}
                {t.checkoutPage.bankHint2}
              </p>
            </div>
          ) : null}
        </section>
      </div>

      <aside className="card h-fit p-6 sm:p-7">
        <h2 className="font-display text-2xl">{t.checkoutPage.yourOrder}</h2>
        <div className="gold-rule mt-4 w-20" />

        <ul className="mt-6 space-y-4">
          {totals.lines.map((line) => {
            const copy = t.products[line.product.slug];
            return (
              <li key={line.slug} className="flex items-center gap-4">
                <PackShot
                  slug={line.product.slug}
                  className="h-16 w-16 shrink-0 rounded-lg bg-[#0d1710]"
                  sizes="80px"
                />
                <div className="flex-1">
                  <p className="font-display text-lg leading-tight">{copy.name}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">
                    {t.checkoutPage.quantityLabel} {line.qty}
                  </p>
                </div>
                <p className="text-sm text-heading">{formatPrice(line.lineTotal)}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          <label className="label" htmlFor="checkoutcoupon">
            {t.common.discountCode}
          </label>
          <div className="flex gap-2">
            <input
              id="checkoutcoupon"
              className="field"
              dir="ltr"
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="REVIVE10"
            />
            <button
              type="button"
              onClick={() => applyCoupon(code)}
              className="btn btn-primary shrink-0 px-5"
            >
              {t.common.apply}
            </button>
          </div>
          {totals.couponCode ? (
            <p className="mt-2 text-xs text-heading">
              {t.coupons[totals.couponCode as keyof typeof t.coupons]}{" "}
              {t.common.codeApplied}
            </p>
          ) : null}
          {totals.couponInvalid ? (
            <p className="mt-2 text-xs text-hibiscus">{t.common.codeInvalid}</p>
          ) : null}
        </div>

        <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">{t.common.subtotal}</span>
            <span>{formatPrice(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 ? (
            <div className="flex justify-between text-hibiscus">
              <span>{totals.couponCode}</span>
              <span>{formatPrice(totals.discount)}</span>
            </div>
          ) : null}
          <div className="flex justify-between">
            <span className="text-muted">{t.common.delivery}</span>
            <span>
              {totals.shipping === 0 ? t.common.free : formatPrice(totals.shipping)}
            </span>
          </div>
          <div className="flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-sm uppercase tracking-[0.14em] text-muted">
              {t.common.total}
            </span>
            <span className="font-display text-3xl text-heading">
              {formatPrice(totals.total)}
            </span>
          </div>
        </div>

        {errors.cart ? <p className="mt-4 text-xs text-hibiscus">{errors.cart}</p> : null}
        {failed ? <p className="mt-4 text-xs text-hibiscus">{failed}</p> : null}

        <button type="submit" disabled={sending} className="btn btn-gold mt-6 w-full">
          {sending ? t.common.placingOrder : t.common.placeOrder}
        </button>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <span className="mt-0.5 text-gold">
            <WhatsappIcon className="h-4 w-4" />
          </span>
          {t.checkoutPage.whatsappNote}
        </p>
      </aside>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required,
  ltr,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  ltr?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        dir={ltr ? "ltr" : undefined}
        className="field"
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <p className="mt-1 text-xs text-hibiscus">{error}</p> : null}
    </div>
  );
}

function BankRow({
  label,
  value,
  gold,
}: {
  label: string;
  value: string;
  gold?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-bandtext/70">{label}</dt>
      <dd className={gold ? "font-medium tracking-wider text-goldlight" : ""} dir="ltr">
        {value}
      </dd>
    </div>
  );
}

function PaymentOption({
  id,
  selected,
  onSelect,
  title,
  note,
}: {
  id: string;
  selected: boolean;
  onSelect: () => void;
  title: string;
  note: string;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer gap-4 rounded-2xl border p-5 transition-colors ${
        selected ? "border-gold bg-bgsoft" : "border-border bg-card"
      }`}
    >
      <input
        id={id}
        type="radio"
        name="payment"
        className="sr-only"
        checked={selected}
        onChange={onSelect}
      />
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-gold bg-gold text-white" : "border-border"
        }`}
      >
        {selected ? <CheckIcon className="h-3 w-3" /> : null}
      </span>
      <span>
        <span className="block font-display text-lg text-heading">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{note}</span>
      </span>
    </label>
  );
}
