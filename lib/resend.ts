import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "hello@tranquilovacationrentals.com";
const REPLY_TO =
  process.env.RESEND_REPLY_TO ?? "bookings@tranquilovacationrentals.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Tranquilo Vacation Rentals";

// ============================================================
// Inquiry Email
// ============================================================
interface SendInquiryEmailParams {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertySlug?: string;
  propertyName?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export async function sendInquiryEmail(params: SendInquiryEmailParams) {
  const {
    name,
    email,
    phone,
    message,
    propertySlug,
    propertyName,
    checkIn,
    checkOut,
    guests,
  } = params;

  const subject = propertyName
    ? `New inquiry: ${propertyName}`
    : `New inquiry from ${name}`;

  const propertyLine = propertyName
    ? `<p><strong>Property:</strong> ${propertyName} (${propertySlug})</p>`
    : "";
  const datesLine =
    checkIn && checkOut
      ? `<p><strong>Dates:</strong> ${checkIn} → ${checkOut}</p>`
      : "";
  const guestsLine = guests
    ? `<p><strong>Guests:</strong> ${guests}</p>`
    : "";
  const phoneLine = phone ? `<p><strong>Phone:</strong> ${phone}</p>` : "";

  // Send internal notification
  await resend.emails.send({
    from: FROM_EMAIL,
    to: REPLY_TO,
    replyTo: email,
    subject,
    html: `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phoneLine}
      ${propertyLine}
      ${datesLine}
      ${guestsLine}
      <hr />
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  // Send confirmation to guest
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    replyTo: REPLY_TO,
    subject: `We received your inquiry — ${SITE_NAME}`,
    html: `
      <h2>Thanks for reaching out, ${name}!</h2>
      <p>We've received your inquiry and will get back to you within 24 hours.</p>
      ${propertyName ? `<p>You inquired about: <strong>${propertyName}</strong></p>` : ""}
      ${checkIn && checkOut ? `<p>Dates: ${checkIn} → ${checkOut}</p>` : ""}
      <p>In the meantime, you can reach us directly on WhatsApp:</p>
      <p><a href="https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+15005550006").replace(/\D/g, "")}">Message us on WhatsApp</a></p>
      <br>
      <p>Warm regards,<br>The ${SITE_NAME} Team</p>
    `,
  });
}

// ============================================================
// Booking Confirmation Email
// ============================================================
interface SendBookingConfirmationEmailParams {
  to: string;
  name: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  sessionId: string;
  total: number;
}

export async function sendBookingConfirmationEmail(
  params: SendBookingConfirmationEmailParams
) {
  const { to, name, propertyName, checkIn, checkOut, guests, sessionId, total } =
    params;

  // Send to guest
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    replyTo: REPLY_TO,
    subject: `Booking Confirmed — ${propertyName}`,
    html: `
      <h2>Your booking is confirmed!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for booking with ${SITE_NAME}. Your reservation is confirmed.</p>
      <hr />
      <h3>Booking Details</h3>
      <p><strong>Property:</strong> ${propertyName}</p>
      <p><strong>Check-in:</strong> ${checkIn}</p>
      <p><strong>Check-out:</strong> ${checkOut}</p>
      <p><strong>Guests:</strong> ${guests}</p>
      <p><strong>Total paid:</strong> $${total.toFixed(2)} USD</p>
      <p><strong>Booking reference:</strong> ${sessionId.slice(0, 20)}...</p>
      <hr />
      <p>Our team will reach out soon with your check-in instructions and local tips.</p>
      <p>If you have any questions, reply to this email or message us on WhatsApp.</p>
      <br>
      <p>We can't wait to welcome you to Playa del Carmen!</p>
      <p>Warm regards,<br>The ${SITE_NAME} Team</p>
    `,
  });

  // Send internal notification
  await resend.emails.send({
    from: FROM_EMAIL,
    to: REPLY_TO,
    subject: `New booking: ${propertyName} (${checkIn} → ${checkOut})`,
    html: `
      <h2>New Booking Confirmed</h2>
      <p><strong>Guest:</strong> ${name} (${to})</p>
      <p><strong>Property:</strong> ${propertyName}</p>
      <p><strong>Check-in:</strong> ${checkIn}</p>
      <p><strong>Check-out:</strong> ${checkOut}</p>
      <p><strong>Guests:</strong> ${guests}</p>
      <p><strong>Total:</strong> $${total.toFixed(2)} USD</p>
      <p><strong>Session:</strong> ${sessionId}</p>
    `,
  });
}
