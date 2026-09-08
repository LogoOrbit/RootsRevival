import { brand } from "./brand";

/**
 * Delivery of order and message alerts.
 *
 * Every order goes to all the addresses in brand.orderEmails.
 *
 * Email, in order of preference:
 *   1. Resend, when RESEND_API_KEY is set.
 *   2. Any mailbox over SMTP, when SMTP_HOST, SMTP_USER and SMTP_PASS are set.
 *      A Gmail app password works, and then the order mail comes from your own
 *      address so a reply goes straight back to the customer.
 *   3. Any webhook you like, when ORDER_WEBHOOK_URL is set. Useful for Zapier,
 *      Make, Google Apps Script, Slack or Discord.
 *
 * With none of them set the order still reaches the shop through WhatsApp, and
 * the website says so honestly instead of pretending the mail went out.
 *
 * WhatsApp:
 *   The customer is handed a ready made WhatsApp message that lands in the
 *   shop inbox. With a CallMeBot key the server also pushes the same text to
 *   the shop number on its own.
 */

export type MailResult = { delivered: boolean; provider: string; error?: string };

/**
 * Everyone who should see a new order. ORDER_EMAIL_TO overrides the list in
 * lib/brand.ts and accepts several addresses separated by commas.
 */
export function shopEmails(): string[] {
  const override = (process.env.ORDER_EMAIL_TO || "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  return override.length > 0 ? override : [...brand.orderEmails];
}

/** The single address a customer replies to, for mailto links. */
export function shopEmail(): string {
  return shopEmails()[0] || brand.contact.email;
}

export async function sendMail(
  subject: string,
  text: string,
  replyTo?: string,
  html?: string
): Promise<MailResult> {
  const to = shopEmails();
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const from =
      process.env.ORDER_EMAIL_FROM || "Roots Revival <onboarding@resend.dev>";

    const postTo = async (recipients: string[]) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: recipients,
          subject,
          text,
          ...(html ? { html } : {}),
          ...(replyTo ? { reply_to: replyTo } : {}),
        }),
      });

    try {
      const response = await postTo(to);
      if (response.ok) return { delivered: true, provider: "resend" };

      /*
       * On the shared onboarding@resend.dev sender, Resend only delivers to the
       * address the account was opened with and rejects the whole send if any
       * other address is listed. Rather than lose the mail entirely, try each
       * address on its own so the one that is allowed still gets the order.
       */
      if (to.length > 1) {
        const results = await Promise.all(
          to.map(async (address) => {
            try {
              return (await postTo([address])).ok;
            } catch {
              return false;
            }
          })
        );
        const reached = to.filter((_, index) => results[index]);
        if (reached.length > 0) {
          return {
            delivered: true,
            provider: "resend",
            error:
              reached.length < to.length
                ? `only reached ${reached.join(", ")}; verify a domain in Resend to reach the rest`
                : undefined,
          };
        }
      }

      return {
        delivered: false,
        provider: "resend",
        error: `${response.status}`,
      };
    } catch (error) {
      return {
        delivered: false,
        provider: "resend",
        error: error instanceof Error ? error.message : "unknown",
      };
    }
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const nodemailer = (await import("nodemailer")).default;
      const port = Number(process.env.SMTP_PORT || 465);
      const transport = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure: port === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transport.sendMail({
        from: process.env.ORDER_EMAIL_FROM || `${brand.name} <${smtpUser}>`,
        to: to.join(", "),
        subject,
        text,
        ...(html ? { html } : {}),
        ...(replyTo ? { replyTo } : {}),
      });
      return { delivered: true, provider: "smtp" };
    } catch (error) {
      return {
        delivered: false,
        provider: "smtp",
        error: error instanceof Error ? error.message : "unknown",
      };
    }
  }

  const webhook = process.env.ORDER_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, text, html, replyTo, to }),
      });
      if (response.ok) return { delivered: true, provider: "webhook" };
      return {
        delivered: false,
        provider: "webhook",
        error: `${response.status}`,
      };
    } catch (error) {
      return {
        delivered: false,
        provider: "webhook",
        error: error instanceof Error ? error.message : "unknown",
      };
    }
  }

  return { delivered: false, provider: "none" };
}

export async function pushWhatsapp(text: string): Promise<boolean> {
  const key = process.env.CALLMEBOT_APIKEY;
  const phone = process.env.CALLMEBOT_PHONE || brand.contact.whatsappNumber;
  if (!key) return false;
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
      phone
    )}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(key)}`;
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}
