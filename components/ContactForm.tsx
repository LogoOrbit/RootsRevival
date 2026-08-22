"use client";

import { useState } from "react";
import { brand, waLink } from "@/lib/brand";
import { CheckIcon, WhatsappIcon } from "./Icons";

const subjects = [
  "Question about the product",
  "Question about my order",
  "Wholesale and reseller enquiry",
  "Feedback or review",
  "Something else",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: subjects[0],
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState("");

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    setErrors({});
    setFailed("");
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setErrors(data.errors || {});
        if (!data.errors)
          setFailed("The message did not go through. Please try WhatsApp instead.");
        setSending(false);
        return;
      }
      setSent(true);
      setSending(false);
    } catch {
      setFailed("The connection dropped. Please try again or message us on WhatsApp.");
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="card p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-cream">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h2 className="mt-6 text-3xl">Your message reached us</h2>
        <div className="gold-rule mx-auto mt-6 w-24" />
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Thank you for writing to us. We reply to every message ourselves, usually
          within a few hours during our working times.
        </p>
        <a
          href={waLink(
            `Assalam o Alaikum ${brand.name} team, I just sent a message from your website.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp mt-8"
        >
          <WhatsappIcon className="h-5 w-5" />
          Continue On WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7 sm:p-9">
      <h2 className="font-display text-2xl">Write to us</h2>
      <div className="gold-rule mt-4 w-20" />

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="cname">
            Your name
          </label>
          <input
            id="cname"
            className="field"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            required
          />
          {errors.name ? (
            <p className="mt-1 text-xs text-hibiscus">{errors.name}</p>
          ) : null}
        </div>
        <div>
          <label className="label" htmlFor="cphone">
            WhatsApp number
          </label>
          <input
            id="cphone"
            type="tel"
            className="field"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="0311 3839767"
          />
          {errors.phone ? (
            <p className="mt-1 text-xs text-hibiscus">{errors.phone}</p>
          ) : null}
        </div>
        <div>
          <label className="label" htmlFor="cemail">
            Email
          </label>
          <input
            id="cemail"
            type="email"
            className="field"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-hibiscus">{errors.email}</p>
          ) : null}
        </div>
        <div>
          <label className="label" htmlFor="csubject">
            Subject
          </label>
          <select
            id="csubject"
            className="field"
            value={form.subject}
            onChange={(event) => update("subject", event.target.value)}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="cmessage">
            Your message
          </label>
          <textarea
            id="cmessage"
            className="field min-h-32"
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Tell us about your hair type, your question or your order number"
            required
          />
          {errors.message ? (
            <p className="mt-1 text-xs text-hibiscus">{errors.message}</p>
          ) : null}
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

      {failed ? <p className="mt-4 text-xs text-hibiscus">{failed}</p> : null}

      <button type="submit" disabled={sending} className="btn btn-gold mt-7 w-full sm:w-auto">
        {sending ? "Sending" : "Send Message"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Your message is emailed straight to {brand.contact.email}. For the fastest reply,
        WhatsApp is always open.
      </p>
    </form>
  );
}
