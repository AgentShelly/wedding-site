import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendInquiryEmail } from "@/lib/resend";
import { verifyTurnstile } from "@/lib/turnstile";
import { ratelimit } from "@/lib/ratelimit";

const InquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  propertySlug: z.string().optional(),
  propertyName: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.coerce.number().int().min(1).max(20).optional(),
  locale: z.enum(["en", "es"]).default("en"),
  turnstileToken: z.string().min(1, "Please complete the CAPTCHA"),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? request.headers.get("x-real-ip")
      ?? "anonymous";

    const limited = await ratelimit(ip, "inquiry", { requests: 5, window: "1h" });
    if (!limited.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = InquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Verify Turnstile
    const turnstileValid = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstileValid) {
      return NextResponse.json(
        { error: "CAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Send email
    await sendInquiryEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      propertySlug: data.propertySlug,
      propertyName: data.propertyName,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[inquiry] error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
