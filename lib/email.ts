import { brand, formatPrice } from "./brand";

/**
 * HTML bodies for the mail that reaches the shop.
 *
 * Mail clients strip <style> blocks and ignore most modern CSS, so everything
 * here is a table with inline styles. Each mail also goes out as plain text, so
 * a client that refuses HTML still shows the whole order.
 */

const GREEN = "#123524";
const CREAM = "#faf4e6";
const GOLD = "#a9791f";
const BORDER = "#e7dabe";
const TEXT = "#17241d";
const MUTED = "#4a5b51";

function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Turns newlines in a customer's own words into line breaks. */
function paragraph(value: string): string {
  return escape(value).replace(/\n/g, "<br />");
}

function shell(title: string, subtitle: string, body: string): string {
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:${CREAM};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fffdf7;border:1px solid ${BORDER};border-radius:14px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;">
  <tr>
    <td style="background:${GREEN};padding:24px 28px;">
      <div style="color:${CREAM};font-size:13px;letter-spacing:2px;text-transform:uppercase;">${escape(
        brand.name
      )}</div>
      <div style="color:#fff;font-size:24px;font-weight:bold;margin-top:6px;">${escape(
        title
      )}</div>
      <div style="color:#d9b163;font-size:14px;margin-top:6px;">${escape(subtitle)}</div>
    </td>
  </tr>
  <tr><td style="padding:24px 28px;color:${TEXT};font-size:15px;line-height:1.6;">${body}</td></tr>
  <tr>
    <td style="background:${CREAM};padding:16px 28px;color:${MUTED};font-size:12px;line-height:1.6;border-top:1px solid ${BORDER};">
      Sent by the ${escape(brand.name)} website. Reply to this mail to write back to the customer.
    </td>
  </tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function section(heading: string, rows: [string, string][]): string {
  const cells = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:6px 0;color:${MUTED};font-size:13px;width:38%;vertical-align:top;">${escape(
          label
        )}</td>
        <td style="padding:6px 0;color:${TEXT};font-size:15px;font-weight:600;vertical-align:top;">${value}</td>
      </tr>`
    )
    .join("");
  return `
  <div style="color:${GOLD};font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;margin:22px 0 6px;">${escape(
    heading
  )}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cells}</table>`;
}

export type OrderMailItem = { name: string; volume: string; qty: number; total: number };

export type OrderMailData = {
  orderId: string;
  placedAt: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  zoneLabel: string;
  notes: string;
  items: OrderMailItem[];
  freeBottles: number;
  subtotal: number;
  shipping: number;
  total: number;
  paymentLabel: string;
  whatsappUrl: string;
};

export function orderEmailHtml(order: OrderMailData): string {
  const items = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};">
          <div style="font-size:16px;font-weight:600;color:${TEXT};">${escape(item.name)}</div>
          <div style="font-size:13px;color:${MUTED};margin-top:2px;">${escape(item.volume)}</div>
          <div style="font-size:13px;color:${MUTED};margin-top:2px;">Quantity ${item.qty}</div>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};text-align:right;font-size:16px;font-weight:600;color:${TEXT};white-space:nowrap;vertical-align:top;">${escape(
          formatPrice(item.total)
        )}</td>
      </tr>`
    )
    .join("");

  const gift =
    order.freeBottles > 0
      ? `<tr>
          <td style="padding:6px 0;color:#bd2f26;font-size:14px;font-weight:600;">Free gift to pack</td>
          <td style="padding:6px 0;text-align:right;color:#bd2f26;font-size:14px;font-weight:600;">${order.freeBottles} x 60ml bottle</td>
        </tr>`
      : "";

  const body = `
  <p style="margin:0;font-size:16px;">A new order just came in through the website.</p>

  ${section("Customer", [
    ["Name", escape(order.name)],
    ["WhatsApp", `<a href="tel:${escape(order.phone)}" style="color:${GREEN};">${escape(order.phone)}</a>`],
    ["Email", order.email ? `<a href="mailto:${escape(order.email)}" style="color:${GREEN};">${escape(order.email)}</a>` : ""],
    ["Address", paragraph(order.address)],
    ["Area", escape(order.area)],
    ["Delivery zone", escape(order.zoneLabel)],
    ["Notes", order.notes ? paragraph(order.notes) : ""],
  ])}

  <div style="color:${GOLD};font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;margin:22px 0 6px;">Order</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
    ${gift}
    <tr>
      <td style="padding:6px 0;color:${MUTED};font-size:14px;">Subtotal</td>
      <td style="padding:6px 0;text-align:right;font-size:14px;color:${TEXT};">${escape(
        formatPrice(order.subtotal)
      )}</td>
    </tr>
    <tr>
      <td style="padding:6px 0;color:${MUTED};font-size:14px;">Delivery, ${escape(
        order.zoneLabel
      )}</td>
      <td style="padding:6px 0;text-align:right;font-size:14px;color:${TEXT};">${escape(
        formatPrice(order.shipping)
      )}</td>
    </tr>
    <tr>
      <td style="padding:12px 0 0;border-top:2px solid ${GREEN};font-size:16px;font-weight:bold;color:${GREEN};">Total to collect</td>
      <td style="padding:12px 0 0;border-top:2px solid ${GREEN};text-align:right;font-size:22px;font-weight:bold;color:${GREEN};">${escape(
        formatPrice(order.total)
      )}</td>
    </tr>
  </table>

  ${section("Payment", [["Method", escape(order.paymentLabel)]])}

  <div style="margin-top:26px;">
    <a href="${escape(order.whatsappUrl)}" style="display:inline-block;background:#1faa54;color:#fff;text-decoration:none;font-weight:bold;font-size:15px;padding:13px 26px;border-radius:999px;">Confirm on WhatsApp</a>
  </div>`;

  return shell(`Order ${order.orderId}`, `${order.placedAt}, Pakistan time`, body);
}

export type ContactMailData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  receivedAt: string;
  whatsappUrl: string;
};

export function contactEmailHtml(enquiry: ContactMailData): string {
  const body = `
  <p style="margin:0;font-size:16px;">Someone wrote to you through the contact form.</p>

  ${section("Who wrote", [
    ["Name", escape(enquiry.name)],
    ["WhatsApp", enquiry.phone ? `<a href="tel:${escape(enquiry.phone)}" style="color:${GREEN};">${escape(enquiry.phone)}</a>` : ""],
    ["Email", enquiry.email ? `<a href="mailto:${escape(enquiry.email)}" style="color:${GREEN};">${escape(enquiry.email)}</a>` : ""],
    ["Subject", escape(enquiry.subject)],
  ])}

  <div style="color:${GOLD};font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;margin:22px 0 6px;">Message</div>
  <div style="background:${CREAM};border:1px solid ${BORDER};border-radius:10px;padding:16px 18px;font-size:15px;line-height:1.7;color:${TEXT};">${paragraph(
    enquiry.message
  )}</div>

  <div style="margin-top:26px;">
    <a href="${escape(enquiry.whatsappUrl)}" style="display:inline-block;background:#1faa54;color:#fff;text-decoration:none;font-weight:bold;font-size:15px;padding:13px 26px;border-radius:999px;">Reply on WhatsApp</a>
  </div>`;

  return shell("New website message", enquiry.receivedAt, body);
}
