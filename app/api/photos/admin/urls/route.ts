import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getGalleryPhotos } from "@/lib/photo-store";

// Plain-text list of original URLs — feed to `xargs -n1 -P4 curl -O` for a
// resilient bulk download when the album is too big for the zip endpoint.
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const photos = await getGalleryPhotos();
  const body = photos.map((p) => `${p.url}?download=1`).join("\n");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="photo-urls.txt"',
    },
  });
}
