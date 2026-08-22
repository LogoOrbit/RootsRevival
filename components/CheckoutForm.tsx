"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { PackShot } from "./ProductArt";
import { brand, formatPrice } from "@/lib/brand";
import { CheckIcon, WhatsappIcon } from "./Icons";

const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit Baltistan",
  "Azad Jammu and Kashmir",
];

type Errors = Record<string, string>;

export default function CheckoutForm() {
  const { lines, totals, coupon, applyCoupon, clear, ready } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "Punjab",
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
        body: JSON.stringify({ ...form, coupon, lines }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        waWindow?.close();
        setErrors(data.errors || {});
        if (!data.errors)
          setFailed(
            "We could not place the order just now. Please try again or send it to us on WhatsApp."
          );
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
      setFailed(
        "The connection dropped. Please check your internet and try again, or send the order to us on WhatsApp."
      );
      setSending(false);
    }
  }

  if (!ready) {
    return (
      <p className="py-20 text-center text-sm uppercase tracking-[0.2em] text-muted">
        Loading checkout
      </p>
    );
  }

  if (totals.itemCount === 0) {
    return (
      <div className="card mx-auto max-w-xl p-12 text-center">
        <h2 className="text-3xl">There is nothing to check out yet</h2>
        <div className="gold-rule mx-auto mt-6 w-24" />
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Add a pack to your cart and come back here to place the order.
        </p>
        <Link href="/shop" className="btn btn-gold mt-8">
          Choose A Pack
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-8">
        <section className="card p-7">
          <h2 className="font-display text-2xl">Delivery details</h2>
          <div className="gold-rule mt-4 w-20" />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              id="name"
              value={form.name}
              onChange={(v) => update("name", v)}
              error={errors.name}
              placeholder="Your full name"
              required
            />
            <Field
              label="WhatsApp number"
              id="phone"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              error={errors.phone}
              placeholder="0311 3839767"
              type="tel"
              required
            />
            <div className="sm:col-span-2">
              <Field
                label="Email (optional)"
                id="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
                placeholder="you@example.com"
                type="email"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="address">
                Complete address
              </label>
              <textarea
                id="address"
                className="field min-h-28"
                value={form.address}
                onChange={(event) => update("address", event.target.value)}
                placeholder="House number, street, area, nearest landmark"
                required
              />
              {errors.address ? (
                <p className="mt-1 text-xs text-hibiscus">{errors.address}</p>
              ) : null}
            </div>
            <Field
              label="City"
              id="city"
              value={form.city}
              onChange={(v) => update("city", v)}
              error={errors.city}
              placeholder="Karachi"
              required
            />
            <div>
              <label className="label" htmlFor="province">
                Province
              </label>
              <select
                id="province"
                className="field"
                value={form.province}
                onChange={(event) => update("province", event.target.value)}
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="notes">
                Order notes (optional)
              </label>
              <textarea
                id="notes"
                className="field min-h-20"
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder="Anything we should know, for example a preferred delivery time"
              />
            </div>
          </div>

          {/* honeypot */}
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

        <section className="card p-7">
          <h2 className="font-display text-2xl">Payment method</h2>
          <div className="gold-rule mt-4 w-20" />

          <div className="mt-6 space-y-4">
            <PaymentOption
              id="cod"
              selected={form.payment === "cod"}
              onSelect={() => update("payment", "cod")}
              title="Cash on delivery"
              note="Pay the courier when your parcel arrives. Available all over Pakistan."
            />
            <PaymentOption
              id="bank"
              selected={form.payment === "bank"}
              onSelect={() => update("payment", "bank")}
              title="Online bank transfer"
              note="Transfer the amount, then send the receipt to our WhatsApp. We dispatch the same day."
            />
          </div>

          {form.payment === "bank" ? (
            <div className="mt-6 rounded-2xl bg-forest p-6 text-cream">
              <p className="eyebrow text-gold-light">Send the payment to</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-cream-soft/70">Bank</dt>
                  <dd>{brand.bank.bankName}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-cream-soft/70">Account title</dt>
                  <dd>{brand.bank.accountTitle}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-cream-soft/70">Account number</dt>
                  <dd className="font-medium tracking-wider text-gold-light">
                    {brand.bank.accountNumber}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-cream-soft/70">Send receipt to</dt>
                  <dd>{brand.contact.whatsappDisplay}</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-cream-soft/75">
                After placing the order, transfer {formatPrice(totals.total)} and send the
                screenshot to our WhatsApp number so we can confirm and dispatch.
              </p>
            </div>
          ) : null}
        </section>
      </div>

      <aside className="card h-fit p-7">
        <h2 className="font-display text-2xl">Your order</h2>
        <div className="gold-rule mt-4 w-20" />

        <ul className="mt-6 space-y-4">
          {totals.lines.map((line) => (
            <li key={line.slug} className="flex items-center gap-4">
              <PackShot bottles={line.product.bottles} className="h-16 w-16 shrink-0" />
              <div className="flex-1">
                <p className="font-display text-lg leading-tight">
                  {line.product.shortName}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-muted">
                  Quantity {line.qty}
                </p>
              </div>
              <p className="text-sm text-forest">{formatPrice(line.lineTotal)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <label className="label" htmlFor="checkoutcoupon">
            Discount code
          </label>
          <div className="flex gap-2">
            <input
              id="checkoutcoupon"
              className="field"
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="REVIVE10"
            />
            <button
              type="button"
              onClick={() => applyCoupon(code)}
              className="btn btn-primary shrink-0 px-5"
            >
              Apply
            </button>
          </div>
          {totals.couponCode ? (
            <p className="mt-2 text-xs text-forest">{totals.couponLabel} applied.</p>
          ) : null}
          {totals.couponInvalid ? (
            <p className="mt-2 text-xs text-hibiscus">
              That code is not valid for this order.
            </p>
          ) : null}
        </div>

        <div className="mt-6 space-y-3 border-t border-cream-deep pt-5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>{formatPrice(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 ? (
            <div className="flex justify-between text-hibiscus">
              <span>Code {totals.couponCode}</span>
              <span>{formatPrice(totals.discount)} off</span>
            </div>
          ) : null}
          <div className="flex justify-between">
            <span className="text-muted">Delivery</span>
            <span>
              {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
            </span>
          </div>
          <div className="flex items-baseline justify-between border-t border-cream-deep pt-4">
            <span className="text-sm uppercase tracking-[0.16em] text-muted">Total</span>
            <span className="font-display text-3xl text-forest">
              {formatPrice(totals.total)}
            </span>
          </div>
        </div>

        {errors.cart ? (
          <p className="mt-4 text-xs text-hibiscus">{errors.cart}</p>
        ) : null}
        {failed ? <p className="mt-4 text-xs text-hibiscus">{failed}</p> : null}

        <button type="submit" disabled={sending} className="btn btn-gold mt-6 w-full">
          {sending ? "Placing your order" : "Place Order"}
        </button>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <span className="mt-0.5 text-gold">
            <WhatsappIcon className="h-4 w-4" />
          </span>
          Your order details are emailed to our team and opened in WhatsApp so we can
          confirm with you right away.
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
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
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
        selected ? "border-gold bg-cream-soft" : "border-cream-deep bg-white"
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
          selected ? "border-gold bg-gold text-forest-deep" : "border-cream-deep"
        }`}
      >
        {selected ? <CheckIcon className="h-3 w-3" /> : null}
      </span>
      <span>
        <span className="block font-display text-lg text-forest">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{note}</span>
      </span>
    </label>
  );
}
