"use client";

import { useMemo, useState } from "react";
import type { GalleryPhoto } from "@/lib/photo-store";

type Props = {
  photos: GalleryPhoto[];
  admin?: boolean;
  onDelete?: (pathname: string) => Promise<void>;
};

export function GalleryClient({ photos, admin = false, onDelete }: Props) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<GalleryPhoto | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const uploaders = useMemo(
    () => Array.from(new Set(photos.map((p) => p.uploader))).sort(),
    [photos],
  );

  const shown = photos.filter(
    (p) => !hidden.has(p.pathname) && (filter === "all" || p.uploader === filter),
  );

  async function remove(p: GalleryPhoto) {
    if (!onDelete) return;
    if (!confirm(`Delete this photo from ${p.uploader}?`)) return;
    setDeleting(p.pathname);
    try {
      await onDelete(p.pathname);
      setHidden((prev) => new Set(prev).add(p.pathname));
      if (active?.pathname === p.pathname) setActive(null);
    } catch {
      alert("Delete failed.");
    } finally {
      setDeleting(null);
    }
  }

  if (photos.length === 0) {
    return (
      <p className="font-body text-ivory/60 text-sm text-center py-20">
        No photos yet. Be the first to add some.
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-8">
        <label className="font-body text-xs uppercase tracking-wider text-ivory/50">
          Show
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-teal border border-gold/30 text-ivory font-body text-sm rounded-sm px-3 py-1.5 focus:outline-none"
        >
          <option value="all">Everyone ({photos.length})</option>
          {uploaders.map((u) => (
            <option key={u} value={u}>
              {u} ({photos.filter((p) => p.uploader === u).length})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {shown.map((p) => (
          <div key={p.pathname} className="relative group">
            <button
              type="button"
              onClick={() => setActive(p)}
              className="block w-full aspect-square overflow-hidden bg-teal rounded-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.thumbUrl}
                alt={`Photo by ${p.uploader}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </button>
            {admin && (
              <button
                type="button"
                onClick={() => remove(p)}
                disabled={deleting === p.pathname}
                className="absolute top-1 right-1 bg-coral text-white text-xs px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
              >
                {deleting === p.pathname ? "…" : "Delete"}
              </button>
            )}
          </div>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="max-w-5xl max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.url}
              alt={`Photo by ${active.uploader}`}
              className="max-h-[80vh] w-auto object-contain rounded-sm"
            />
            <div className="flex items-center gap-4 mt-4 font-body text-sm">
              <span className="text-ivory/60">{active.uploader}</span>
              <a
                href={`${active.url}?download=1`}
                className="text-gold hover:text-gold-light underline underline-offset-4"
              >
                Download original
              </a>
              {admin && (
                <button
                  type="button"
                  onClick={() => remove(active)}
                  className="text-coral hover:text-coral-light underline underline-offset-4"
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={() => setActive(null)}
                className="text-ivory/50 hover:text-ivory"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
