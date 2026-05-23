import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendYesRSVP } from "@/lib/resend";

const GuestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Phone number is required"),
});

const Body = z.object({
  primaryGuest: GuestSchema,
  additionalGuests: z.array(GuestSchema).max(4),
});

export async function POST(req: NextRequest) {
  try {
    const { primaryGuest, additionalGuests } = Body.parse(await req.json());
    await sendYesRSVP(primaryGuest, additionalGuests);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    console.error("rsvp-yes error:", err);
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}
