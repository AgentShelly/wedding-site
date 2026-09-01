"use client";

import { useState } from "react";
import type { GalleryPhoto } from "@/lib/photo-store";
import { GalleryClient } from "../GalleryClient";

export function AdminGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [totalMB] = useState(() =>
    (photos.reduce((s, p) => s + p.size, 0) / 1024 / 1024).toFixed(0),
  );

  async function onDelete(pathname: string) {
    const res = await fetch("/api/photos/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pathname }),
    });
    if (!res.ok) throw new Error("delete failed");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 font-body text-sm">
        <span className="text-ivory/50">
          {photos.length} photos · {totalMB} MB
        </span>
        <a
          href="/api/photos/admin/zip"
          className="bg-gold hover:bg-gold-light text-teal-dark font-semibold px-4 py-2 rounded-sm"
        >
          Download all (.zip)
        </a>
        <a
          href="/api/photos/admin/urls"
          className="text-gold hover:text-gold-light underline underline-offset-4"
        >
          URL list
        </a>
      </div>
      <GalleryClient photos={photos} admin onDelete={onDelete} />
    </div>
  );
}
