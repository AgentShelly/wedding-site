import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? "rsvp@example.com";
const NOTIFY = process.env.RESEND_NOTIFY_EMAIL ?? "couple@example.com";

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const stamp = () =>
  new Date().toLocaleString("en-SG", {
    timeZone: "Asia/Singapore",
    dateStyle: "full",
    timeStyle: "short",
  });

const baseStyle = `font-family:Georgia,serif;max-width:620px;margin:0 auto;padding:28px;background:#FDF8F0;border:2px solid #C49A3C;border-radius:2px`;
const headerHtml = `
  <div style="text-align:center;margin-bottom:24px;">
    <h1 style="color:#0A5F6E;font-size:30px;margin:0 0 4px;">Alice &amp; Rudolph</h1>
    <p style="color:#C49A3C;font-size:15px;margin:0;letter-spacing:0.15em;">SEPTEMBER 12, 2026</p>
    <hr style="border:none;border-top:1px solid #C49A3C;margin:16px 0;"/>
  </div>`;

export async function sendYesRSVP(
  primary: GuestInfo,
  additional: GuestInfo[]
) {
  const all = [primary, ...additional];
  const rows = all
    .map(
      (g, i) => `
      <tr style="background:${i % 2 === 0 ? "#FDF8F0" : "#F5EDD8"}">
        <td style="padding:8px 12px;border:1px solid #e8d5a0;color:#073F4A;font-weight:600">${i === 0 ? "You" : `Guest ${i}`}</td>
        <td style="padding:8px 12px;border:1px solid #e8d5a0">${g.firstName} ${g.lastName}</td>
        <td style="padding:8px 12px;border:1px solid #e8d5a0">${g.email}</td>
        <td style="padding:8px 12px;border:1px solid #e8d5a0">${g.phone}</td>
      </tr>`
    )
    .join("");

  // Notify couple
  await resend.emails.send({
    from: FROM,
    to: NOTIFY,
    subject: `🎉 RSVP YES — ${primary.firstName} ${primary.lastName} (${all.length} guest${all.length > 1 ? "s" : ""})`,
    html: `<div style="${baseStyle}">${headerHtml}
      <h2 style="color:#2D7A5E;text-align:center;font-size:20px;margin-bottom:20px;">Attending! 🎉</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <thead><tr style="background:#0A5F6E;color:#FDF8F0;">
          <th style="padding:9px 12px;border:1px solid #C49A3C;text-align:left">Role</th>
          <th style="padding:9px 12px;border:1px solid #C49A3C;text-align:left">Name</th>
          <th style="padding:9px 12px;border:1px solid #C49A3C;text-align:left">Email</th>
          <th style="padding:9px 12px;border:1px solid #C49A3C;text-align:left">Phone</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="color:#6B5A52;font-size:13px;text-align:center;">Received: ${stamp()}</p>
    </div>`,
  });

  // Confirm to guest
  await resend.emails.send({
    from: FROM,
    to: primary.email,
    subject: `See you at our wedding, ${primary.firstName}! 💍`,
    html: `<div style="${baseStyle}">${headerHtml}
      <p style="color:#3D2B24;font-size:18px;text-align:center;">Dear ${primary.firstName},</p>
      <p style="color:#3D2B24;font-size:16px;text-align:center;line-height:1.7">
        We are absolutely delighted that you will be joining us to celebrate our special day.
        We cannot wait to see you!
      </p>
      <div style="text-align:center;margin:24px 0;padding:16px;border:1px solid #C49A3C;background:#F5EDD8;">
        <p style="color:#0A5F6E;font-size:20px;font-style:italic;margin:0">
          "Two hearts, one love, one celebration."
        </p>
      </div>
      <p style="color:#3D2B24;font-size:15px;text-align:center;line-height:1.8">
        <strong>Date:</strong> Saturday, 12 September 2026<br/>
        <strong>Venue:</strong> Details to follow
      </p>
      <p style="color:#3D2B24;font-size:16px;text-align:center;margin-top:20px">
        With love,<br/><strong>Alice &amp; Rudolph</strong>
      </p>
    </div>`,
  });
}

export async function sendNoRSVP(fullName: string, reason: string) {
  await resend.emails.send({
    from: FROM,
    to: NOTIFY,
    subject: `RSVP NO — ${fullName} cannot attend`,
    html: `<div style="${baseStyle}">${headerHtml}
      <h2 style="color:#D4685A;text-align:center;font-size:20px;margin-bottom:20px;">Unable to Attend</h2>
      <p style="color:#3D2B24"><strong>Name:</strong> ${fullName}</p>
      <p style="color:#3D2B24"><strong>Reason:</strong> ${reason}</p>
      <p style="color:#6B5A52;font-size:13px;text-align:center;margin-top:24px">Received: ${stamp()}</p>
    </div>`,
  });
}
