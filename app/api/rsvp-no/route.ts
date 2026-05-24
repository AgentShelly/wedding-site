import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendNoRSVP } from "@/lib/resend";
import { appendNoRow } from "@/lib/sheets";

const REASONS = [
  "A pet grooming appointment",
  "My grooming appointment",
  "Child enrichment activity",
  "Church cell group",
  "All of the above",
] as const;

const Body = z.object({
  fullName: z.string().min(1, "Full name is required"),
  reason: z.enum(REASONS).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { fullName, reason } = Body.parse(await req.json());
    await Promise.all([
      sendNoRSVP(fullName, reason ?? ""),
      appendNoRow({
        timestamp: new Date().toISOString(),
        fullName,
        reason: reason ?? "",
      }),
    ]);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    console.error("rsvp-no error:", err);
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}
