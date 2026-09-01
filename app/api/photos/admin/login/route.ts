import { NextRequest, NextResponse } from "next/server";
import { checkPassword, makeAdminCookie } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };

  if (!checkPassword(password ?? "")) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  const c = makeAdminCookie();
  res.cookies.set(c.name, c.value, c.options);
  return res;
}
