import { NextResponse } from "next/server";
import { Readable } from "stream";
import type { Archiver } from "archiver";
import { isAdmin } from "@/lib/admin-auth";

// @types/archiver doesn't type the default factory; require it directly.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const archiver = require("archiver") as (
  format: string,
  options?: { store?: boolean },
) => Archiver;
import { getGalleryPhotos } from "@/lib/photo-store";

export const maxDuration = 300;

// Streams every original photo as one .zip. For very large albums (multi-GB)
// prefer the download-list endpoint + a local script — a single response may
// time out. Fine for a few hundred photos.
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const photos = await getGalleryPhotos();
  const archive = archiver("zip", { store: true });

  (async () => {
    for (const p of photos) {
      try {
        const res = await fetch(p.url);
        if (!res.ok || !res.body) continue;
        const name = `${p.uploader.replace(/[^a-z0-9]+/gi, "-")}/${p.pathname.split("/").pop()}`;
        archive.append(Readable.fromWeb(res.body as never), { name });
      } catch {
        // skip unreachable blob
      }
    }
    archive.finalize();
  })();

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(Readable.toWeb(archive) as never, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="alice-rudolph-photos-${stamp}.zip"`,
    },
  });
}
