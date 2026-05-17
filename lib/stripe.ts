import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === "production") {
  throw new Error("STRIPE_SECRET_KEY environment variable is required in production");
}

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder",
  {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
    appInfo: {
      name: "Tranquilo Vacation Rentals",
      version: "1.0.0",
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tranquilovacationrentals.com",
    },
  }
);

/**
 * Calculate the total cost for a booking.
 */
export function calculateBookingTotal(
  pricePerNight: number,
  nights: number,
  cleaningFee: number
): {
  nightlyTotal: number;
  cleaningFee: number;
  total: number;
} {
  const nightlyTotal = pricePerNight * nights;
  const total = nightlyTotal + cleaningFee;
  return { nightlyTotal, cleaningFee, total };
}

/**
 * Retrieve a Stripe Checkout Session by ID.
 */
export async function getCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer_details"],
  });
}
