import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendYesRSVP } from "@/lib/resend";
import { appendYesRow } from "@/lib/sheets";

const PrimaryGuestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(4, "Phone number is required"),
});

const AdditionalGuestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().optional().default(""),
  phone: z.string().optional().default(""),
});

const Body = z.object({
  primaryGuest: PrimaryGuestSchema,
  additionalGuests: z.array(AdditionalGuestSchema).max(5),
});

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    console.log("RSVP YES RAW BODY:", JSON.stringify(raw));
    const { primaryGuest, additionalGuests } = Body.parse(raw);
    const normalizedGuests = additionalGuests.map(g => ({
      firstName: g.firstName,
      lastName: g.lastName,
      email: g.email ?? "",
      phone: g.phone ?? "",
    }));

    await Promise.all([
      sendYesRSVP(primaryGuest, normalizedGuests),
      appendYesRow({
        timestamp: new Date().toISOString(),
        totalGuests: 1 + normalizedGuests.length,
        primaryFirst: primaryGuest.firstName,
        primaryLast: primaryGuest.lastName,
        primaryEmail: primaryGuest.email,
        primaryPhone: primaryGuest.phone,
        guests: normalizedGuests,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log("ZOD ERRORS:", JSON.stringify(err.errors));
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    console.error("rsvp-yes error:", err);
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}
