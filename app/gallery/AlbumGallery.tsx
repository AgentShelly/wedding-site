"use client";

import { useState } from "react";
import Link from "next/link";
import type { AlbumSection, GalleryPhoto } from "@/lib/photo-store";

export function AlbumGallery({ sections }: { sections: AlbumSection[] }) {
  const [active, setActive] = useState<GalleryPhoto | null>(null);
  const total = sections.reduce((s, a) => s + a.photos.length, 0);

  return (
    <div>
      {/* jump bar */}
      <nav className="flex flex-wrap justify-center gap-2 mb-12">
        {sections.map((a) => (
          <a
            key={a.slug}
            href={`#album-${a.slug}`}
            className="font-body text-xs tracking-wide px-3 py-1.5 rounded-full border border-gold/30 text-ivory/80 hover:border-gold hover:text-ivory transition-colors"
          >
            {a.name}
            <span className="text-ivory/40"> · {a.photos.length}</span>
          </a>
        ))}
      </nav>

      {total === 0 && (
        <p className="font-body text-ivory/60 text-sm text-center py-10">
          No photos yet — the albums fill up as guests take the challenge.
        </p>
      )}

      <div className="space-y-16">
        {sections.map((a) => (
          <section key={a.slug} id={`album-${a.slug}`} className="scroll-mt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-gold/20 pb-3 mb-6">
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-ivory">
                  {a.name}
                </h2>
                <p className="font-body text-ivory/50 text-xs mt-1">
                  {a.prompt} · {a.photos.length}{" "}
                  {a.photos.length === 1 ? "photo" : "photos"}
                </p>
              </div>
              <Link
                href={`/photos?album=${a.slug}`}
                className="font-body text-xs font-semibold uppercase tracking-[0.15em] px-4 py-2 rounded-sm bg-gold hover:bg-gold-light text-teal-dark transition-colors"
              >
                Add to this album
              </Link>
            </div>

            {a.photos.length === 0 ? (
              <p className="font-body text-ivory/40 text-sm py-6">
                Nothing here yet. Be the first.
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {a.photos.map((p) => (
                  <button
                    key={p.pathname}
                    type="button"
                    onClick={() => setActive(p)}
                    className="block w-full aspect-square overflow-hidden bg-teal rounded-sm group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.thumbUrl}
                      alt={`Photo by ${p.uploader}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>
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
