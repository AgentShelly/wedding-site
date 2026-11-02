"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GalleryPhoto } from "@/lib/photo-store";
import { ALBUMS } from "@/lib/photos";

type Props = {
  photos: GalleryPhoto[];
  admin?: boolean;
  onDelete?: (pathname: string) => Promise<void>;
};

export function GalleryClient({ photos }: Props) {
  const [filter, setFilter] = useState("all");
  const [albumFilter, setAlbumFilter] = useState("all");
  const [active, setActive] = useState<GalleryPhoto | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  function openPhoto(photo: GalleryPhoto, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setActive(photo);
  }

  function closePhoto() {
    setActive(null);
  }

  useEffect(() => {
    if (!active) return;

    const dialog = document.getElementById("photo-lightbox");
    const controls = dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    controls?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePhoto();
      } else if (event.key === "Tab" && controls?.length) {
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [active]);

  const uploaders = useMemo(
    () => Array.from(new Set(photos.map((p) => p.uploader))).sort(),
    [photos],
  );

  const shown = photos.filter(
    (p) =>
      (filter === "all" || p.uploader === filter) &&
      (albumFilter === "all" || p.album === albumFilter),
  );

  if (photos.length === 0) {
    return (
      <p className="font-body text-ivory/60 text-sm text-center py-20">
        This album snapshot contains no photos.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <label className="font-body text-sm text-ivory/70">
          Album{" "}
          <select
            value={albumFilter}
            onChange={(e) => setAlbumFilter(e.target.value)}
            className="ml-2 bg-teal border border-gold/30 text-ivory font-body text-sm rounded-sm px-3 py-1.5 focus:outline-none"
          >
          <option value="all">All albums ({photos.length})</option>
          {ALBUMS.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.name} ({photos.filter((p) => p.album === a.slug).length})
            </option>
          ))}
          </select>
        </label>
        <label className="font-body text-sm text-ivory/70">
          Photographer{" "}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="ml-2 bg-teal border border-gold/30 text-ivory font-body text-sm rounded-sm px-3 py-1.5 focus:outline-none"
          >
          <option value="all">Everyone</option>
          {uploaders.map((u) => (
            <option key={u} value={u}>
              {u} ({photos.filter((p) => p.uploader === u).length})
            </option>
          ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {shown.map((p) => (
          <div key={p.pathname} className="relative group">
            <button
              type="button"
              onClick={(event) => openPhoto(p, event.currentTarget)}
              aria-label={`View photo by ${p.uploader} in ${ALBUMS.find((album) => album.slug === p.album)?.name ?? "the album"}`}
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
          </div>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          id="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo by ${active.uploader}`}
          onClick={closePhoto}
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
            href={`${active.url}${active.url.includes("?") ? "&" : "?"}download=1`}
                className="text-gold hover:text-gold-light underline underline-offset-4"
              >
                Download original
              </a>
              <button
                type="button"
                onClick={closePhoto}
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
