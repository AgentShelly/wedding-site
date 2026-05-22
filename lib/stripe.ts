import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment variables."
    );
  }
  return new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
    appInfo: {
      name: "Tranquilo Vacation Rentals",
      version: "1.0.0",
      url:
        process.env.NEXT_PUBLIC_SITE_URL ??
        "https://tranquilovacationrentals.com",
    },
  });
}

// Lazy singleton — instantiated on first use, not at module load time
let _stripe: Stripe | null = null;
export function stripe(): Stripe {
  if (!_stripe) _stripe = getStripe();
  return _stripe;
}

export function calculateBookingTotal(
  pricePerNight: number,
  nights: number,
  cleaningFee: number
): { nightlyTotal: number; cleaningFee: number; total: number } {
  const nightlyTotal = pricePerNight * nights;
  return { nightlyTotal, cleaningFee, total: nightlyTotal + cleaningFee };
}

export async function getCheckoutSession(sessionId: string) {
  return stripe().checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer_details"],
  });
}
