import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { markDatesBooked } from "@/lib/availability";
import { sendBookingConfirmationEmail } from "@/lib/resend";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[booking/confirm] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("[booking/confirm] webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const {
      propertySlug,
      propertyName,
      checkIn,
      checkOut,
      guests,
    } = session.metadata ?? {};

    if (!propertySlug || !checkIn || !checkOut) {
      console.error("[booking/confirm] missing metadata in session", session.id);
      return NextResponse.json({ received: true });
    }

    try {
      // Mark dates as booked in availability JSON
      await markDatesBooked(propertySlug, checkIn, checkOut);

      // Send confirmation email to guest
      const customerEmail = session.customer_details?.email;
      const customerName = session.customer_details?.name ?? "Guest";
      if (customerEmail) {
        await sendBookingConfirmationEmail({
          to: customerEmail,
          name: customerName,
          propertyName: propertyName ?? propertySlug,
          checkIn,
          checkOut,
          guests: parseInt(guests ?? "1", 10),
          sessionId: session.id,
          total: (session.amount_total ?? 0) / 100,
        });
      }

      console.log(`[booking/confirm] booking confirmed: ${session.id} — ${propertySlug} (${checkIn} → ${checkOut})`);
    } catch (error) {
      console.error("[booking/confirm] failed to process confirmed booking:", error);
      // Don't return error — Stripe will retry if we return non-200
    }
  }

  return NextResponse.json({ received: true });
}
