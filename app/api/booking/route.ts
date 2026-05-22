import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { getPropertyBySlug } from "@/content/properties/index";
import { isAvailable, calculateTotal } from "@/lib/availability";
import { differenceInCalendarDays, parseISO } from "date-fns";

const BookingSchema = z.object({
  propertySlug: z.string().min(1),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  guests: z.coerce.number().int().min(1).max(20),
  locale: z.enum(["en", "es"]).default("en"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = BookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { propertySlug, checkIn, checkOut, guests, locale } = parsed.data;

    // Validate dates
    const checkInDate = parseISO(checkIn);
    const checkOutDate = parseISO(checkOut);
    const nights = differenceInCalendarDays(checkOutDate, checkInDate);

    if (nights < 1) {
      return NextResponse.json(
        { error: "Check-out must be after check-in" },
        { status: 400 }
      );
    }

    if (nights > 30) {
      return NextResponse.json(
        { error: "Maximum stay is 30 nights. Please contact us for longer stays." },
        { status: 400 }
      );
    }

    // Get property
    const property = await getPropertyBySlug(propertySlug);
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Check guest count
    if (guests > property.maxGuests) {
      return NextResponse.json(
        {
          error: `This property accommodates a maximum of ${property.maxGuests} guests.`,
        },
        { status: 400 }
      );
    }

    // Check availability
    const available = await isAvailable(propertySlug, checkIn, checkOut);
    if (!available) {
      return NextResponse.json(
        { error: "The selected dates are not available. Please choose different dates." },
        { status: 409 }
      );
    }

    // Calculate total
    const { nightlyTotal, cleaningFee, total } = calculateTotal(
      property.pricePerNight,
      nights,
      property.cleaningFee
    );

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://www.tranquilovacationrentals.com";

    // Create Stripe Checkout Session
    const session = await stripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${property.name} — ${nights} night${nights !== 1 ? "s" : ""}`,
              description: `Check-in: ${checkIn} | Check-out: ${checkOut} | Guests: ${guests}`,
              images: property.images.slice(0, 1),
            },
            unit_amount: nightlyTotal * 100, // Stripe uses cents
          },
          quantity: 1,
        },
        ...(cleaningFee > 0
          ? [
              {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: "Cleaning fee",
                  },
                  unit_amount: cleaningFee * 100,
                },
                quantity: 1,
              },
            ]
          : []),
      ],
      metadata: {
        propertySlug,
        propertyName: property.name,
        checkIn,
        checkOut,
        guests: String(guests),
        nights: String(nights),
        pricePerNight: String(property.pricePerNight),
        cleaningFee: String(cleaningFee),
        total: String(total),
        locale,
      },
      success_url: `${siteUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/stays/${propertySlug}`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("[booking] error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
