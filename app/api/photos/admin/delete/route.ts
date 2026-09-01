import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { isAdmin } from "@/lib/admin-auth";
import { PHOTO_PREFIX, thumbPathFor } from "@/lib/photos";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { pathname } = (await req.json().catch(() => ({}))) as { pathname?: string };
  if (!pathname || !pathname.startsWith(PHOTO_PREFIX)) {
    return NextResponse.json({ error: "Bad path" }, { status: 400 });
  }

  // Remove the original and its generated thumbnail. del() ignores missing keys.
  await del([pathname, thumbPathFor(pathname)], {
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return NextResponse.json({ ok: true });
}
