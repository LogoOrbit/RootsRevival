"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { useT } from "./Providers";
import { PackShot } from "./ProductArt";
import { brand, formatPrice } from "@/lib/brand";
import { CheckIcon, WhatsappIcon } from "./Icons";

type Errors = Record<string, string>;

const SAVED_KEY = "rootsrevival.checkout";

const emptyBilling = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postal: "",
};

const emptyForm = {
  contact: "",
  newsletter: true,
  country: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postal: "",
  phone: "",
  notes: "",
  saveInfo: false,
  payment: "cod",
  billingSame: true,
  billing: emptyBilling,
  website: "",
};

type Form = typeof emptyForm;

export default function CheckoutForm() {
  const { lines, totals, clear, ready } = useCart();
  const t = useT();
  const router = useRouter();

  const [form, setForm] = useState<Form>(emptyForm);
  const [discount, setDiscount] = useState("");
  const [showDiscount, setShowDiscount] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState("");

  // Bring back whatever the shopper asked us to remember last time.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SAVED_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as Partial<Form>;
      setForm((current) => ({
        ...current,
        ...parsed,
        billing: { ...emptyBilling, ...(parsed.billing || {}) },
        saveInfo: true,
        website: "",
      }));
    } catch {
      /* ignore */
    }
  }, []);

  const update = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const updateBilling = (key: keyof typeof emptyBilling, value: string) =>
    setForm((current) => ({
      ...current,
      billing: { ...current.billing, [key]: value },
    }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    setErrors({});
    setFailed("");

    const name = `${form.firstName} ${form.lastName}`.trim();
    if (!form.lastName.trim()) {
      setErrors({ lastName: t.checkoutPage.errors.lastName });
      return;
    }

    const country = form.country || t.checkoutPage.countries[0];
    const contact = form.contact.trim();
    const email = contact.includes("@") ? contact : "";

    setSending(true);

    // Opened on the click itself so the browser does not treat it as a popup.
    const waWindow = window.open("", "_blank");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          firstName: form.firstName,
          lastName: form.lastName,
          contact,
          email,
          phone: form.phone,
          newsletter: form.newsletter,
          country,
          address: form.address,
          city: form.city,
          postal: form.postal,
          notes: form.notes,
          payment: form.payment,
          discount,
          billing: form.billingSame ? null : { ...form.billing, country },
          website: form.website,
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
        if (form.saveInfo) {
          window.localStorage.setItem(
            SAVED_KEY,
            JSON.stringify({ ...form, website: "" })
          );
        } else {
          window.localStorage.removeItem(SAVED_KEY);
        }
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
            name,
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
      <p className="py-20 text-center text-base text-muted">{t.common.loading}</p>
    );
  }

  if (totals.itemCount === 0) {
    return (
      <div className="card mx-auto max-w-xl p-10 text-center sm:p-12">
        <h2 className="text-3xl">{t.checkoutPage.emptyTitle}</h2>
        <div className="gold-rule mx-auto mt-6 w-24" />
        <p className="mt-6 text-base leading-relaxed">{t.checkoutPage.emptyBody}</p>
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
          <h2 className="font-display text-2xl">{t.checkoutPage.contact}</h2>
          <div className="gold-rule mt-4 w-20" />

          <div className="mt-6 space-y-4">
            <Field
              label={t.checkoutPage.emailOrPhone}
              id="contact"
              value={form.contact}
              onChange={(v) => update("contact", v)}
              error={errors.email}
              placeholder="you@example.com"
              ltr
              required
            />
            <Checkbox
              id="newsletter"
              checked={form.newsletter}
              onChange={(v) => update("newsletter", v)}
              label={t.checkoutPage.newsletterOptIn}
            />
          </div>
        </section>

        <section className="card p-6 sm:p-7">
          <h2 className="font-display text-2xl">{t.checkoutPage.delivery}</h2>
          <div className="gold-rule mt-4 w-20" />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label" htmlFor="country">
                {t.checkoutPage.countryRegion}
              </label>
              <select
                id="country"
                className="field"
                value={form.country || t.checkoutPage.countries[0]}
                onChange={(event) => update("country", event.target.value)}
              >
                {t.checkoutPage.countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label={t.checkoutPage.firstNameOptional}
              id="firstName"
              value={form.firstName}
              onChange={(v) => update("firstName", v)}
            />
            <Field
              label={t.checkoutPage.lastName}
              id="lastName"
              value={form.lastName}
              onChange={(v) => update("lastName", v)}
              error={errors.lastName || errors.name}
              required
            />
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
              placeholder="Karachi"
              required
            />
            <Field
              label={t.checkoutPage.postalCodeOptional}
              id="postal"
              value={form.postal}
              onChange={(v) => update("postal", v)}
              placeholder="75300"
              ltr
            />
            <div className="sm:col-span-2">
              <Field
                label={t.checkoutPage.phone}
                id="phone"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                error={errors.phone}
                placeholder="0311 3839767"
                type="tel"
                ltr
                required
              />
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
            <div className="sm:col-span-2">
              <Checkbox
                id="saveInfo"
                checked={form.saveInfo}
                onChange={(v) => update("saveInfo", v)}
                label={t.checkoutPage.saveInfo}
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
          <h2 className="font-display text-2xl">{t.checkoutPage.shippingMethod}</h2>
          <div className="gold-rule mt-4 w-20" />

          <div className="mt-6 rounded-2xl border border-gold bg-bgsoft p-5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-lg text-heading">
                {t.checkoutPage.shippingStandard}
              </span>
              <span className="price price-md">
                {totals.shipping === 0 ? t.common.free : formatPrice(totals.shipping)}
              </span>
            </div>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
              {t.checkoutPage.shippingNote}
            </p>
          </div>
        </section>

        <section className="card p-6 sm:p-7">
          <h2 className="font-display text-2xl">{t.checkoutPage.payment}</h2>
          <div className="gold-rule mt-4 w-20" />
          <p className="mt-4 text-[0.95rem] text-muted">{t.checkoutPage.paymentSecure}</p>

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

        <section className="card p-6 sm:p-7">
          <h2 className="font-display text-2xl">{t.checkoutPage.billingAddress}</h2>
          <div className="gold-rule mt-4 w-20" />

          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <BillingChoice
              id="billingsame"
              selected={form.billingSame}
              onSelect={() => update("billingSame", true)}
              label={t.checkoutPage.billingSame}
            />
            <div className="border-t border-border">
              <BillingChoice
                id="billingother"
                selected={!form.billingSame}
                onSelect={() => update("billingSame", false)}
                label={t.checkoutPage.billingDifferent}
              />
            </div>
          </div>

          {!form.billingSame ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label={t.checkoutPage.firstNameOptional}
                id="billingFirstName"
                value={form.billing.firstName}
                onChange={(v) => updateBilling("firstName", v)}
              />
              <Field
                label={t.checkoutPage.lastName}
                id="billingLastName"
                value={form.billing.lastName}
                onChange={(v) => updateBilling("lastName", v)}
                required
              />
              <div className="sm:col-span-2">
                <label className="label" htmlFor="billingAddress">
                  {t.checkoutPage.address}
                </label>
                <textarea
                  id="billingAddress"
                  className="field min-h-24"
                  value={form.billing.address}
                  onChange={(event) => updateBilling("address", event.target.value)}
                  placeholder={t.checkoutPage.addressPlaceholder}
                  required
                />
              </div>
              <Field
                label={t.checkoutPage.city}
                id="billingCity"
                value={form.billing.city}
                onChange={(v) => updateBilling("city", v)}
                required
              />
              <Field
                label={t.checkoutPage.postalCodeOptional}
                id="billingPostal"
                value={form.billing.postal}
                onChange={(v) => updateBilling("postal", v)}
                ltr
              />
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
                  className="h-16 w-16 shrink-0 rounded-lg"
                  sizes="80px"
                />
                <div className="flex-1">
                  <p className="font-display text-lg leading-tight">{copy.name}</p>
                  <p className="spec">{copy.volume}</p>
                  <p className="text-[0.95rem] text-muted">
                    {t.checkoutPage.quantityLabel} {line.qty}
                  </p>
                </div>
                <p className="price price-md">{formatPrice(line.lineTotal)}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-6">
          {showDiscount ? (
            <>
              <label className="label" htmlFor="discount">
                {t.checkoutPage.discountCode}
              </label>
              <input
                id="discount"
                className="field"
                dir="ltr"
                value={discount}
                onChange={(event) => setDiscount(event.target.value.toUpperCase())}
              />
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {t.checkoutPage.discountNote}
              </p>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setShowDiscount(true)}
              className="rounded-full border border-border px-5 py-2 text-[0.95rem] text-heading transition-colors hover:border-gold"
            >
              {t.checkoutPage.addDiscount}
            </button>
          )}
        </div>

        <div className="mt-6 space-y-3 border-t border-border pt-5 text-[0.95rem]">
          <div className="flex justify-between">
            <span className="text-muted">{t.common.subtotal}</span>
            <span className="font-semibold text-heading">
              {formatPrice(totals.subtotal)}
            </span>
          </div>
          {totals.freeBottles > 0 ? (
            <div className="flex justify-between">
              <span className="text-muted">{t.cartPage.freeBottles}</span>
              <span className="font-semibold text-hibiscus">
                {totals.freeBottles} x 60ml
              </span>
            </div>
          ) : null}
          <div className="flex justify-between">
            <span className="text-muted">{t.common.delivery}</span>
            <span className="font-semibold text-heading">
              {formatPrice(totals.shipping)}
            </span>
          </div>
          <div className="flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-base font-semibold text-heading">{t.common.total}</span>
            <span className="price price-xl">{formatPrice(totals.total)}</span>
          </div>
        </div>

        {errors.cart ? <p className="mt-4 text-xs text-hibiscus">{errors.cart}</p> : null}
        {failed ? <p className="mt-4 text-xs text-hibiscus">{failed}</p> : null}

        <button type="submit" disabled={sending} className="btn btn-gold mt-6 w-full">
          {sending ? t.common.placingOrder : t.checkoutPage.payNow}
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

function Checkbox({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 text-[0.95rem] text-muted"
    >
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
          checked ? "border-gold bg-gold text-white" : "border-border"
        }`}
      >
        {checked ? <CheckIcon className="h-3 w-3" /> : null}
      </span>
      {label}
    </label>
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

function BillingChoice({
  id,
  selected,
  onSelect,
  label,
}: {
  id: string;
  selected: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-4 p-5 transition-colors ${
        selected ? "bg-bgsoft" : "bg-card"
      }`}
    >
      <input
        id={id}
        type="radio"
        name="billing"
        className="sr-only"
        checked={selected}
        onChange={onSelect}
      />
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-gold bg-gold text-white" : "border-border"
        }`}
      >
        {selected ? <CheckIcon className="h-3 w-3" /> : null}
      </span>
      <span className="text-[0.95rem] text-heading">{label}</span>
    </label>
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
