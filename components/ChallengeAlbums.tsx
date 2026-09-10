"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import {
  ALBUMS,
  ALLOWED_TYPES,
  MAX_FILE_BYTES,
  buildPhotoPath,
  thumbPathFor,
  type AlbumSlug,
} from "@/lib/photos";
import type { AlbumSection, GalleryPhoto } from "@/lib/photo-store";

const NAME_KEY = "wedding-photo-name";
const THUMB_MAX = 700;

async function makeThumb(file: File): Promise<Blob | null> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, THUMB_MAX / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    return await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", 0.8),
    );
  } catch {
    return null;
  }
}

type Prog = { busy: number; done: number; err: number };
const emptyProg: Prog = { busy: 0, done: 0, err: 0 };

export function ChallengeAlbums({
  sections,
  variant = "list",
}: {
  sections?: AlbumSection[];
  variant?: "list" | "gallery";
}) {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [askName, setAskName] = useState(false);
  const [progress, setProgress] = useState<Record<string, Prog>>({});
  const [active, setActive] = useState<GalleryPhoto | null>(null);

  const pendingAlbum = useRef<AlbumSlug | null>(null);
  const currentAlbum = useRef<AlbumSlug | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(NAME_KEY);
      if (saved) setName(saved);
    } catch {}
  }, []);

  function openPicker(album: AlbumSlug) {
    currentAlbum.current = album;
    fileRef.current?.click();
  }

  function onAdd(album: AlbumSlug) {
    if (!name) {
      pendingAlbum.current = album;
      setNameInput("");
      setAskName(true);
      return;
    }
    openPicker(album);
  }

  function saveName() {
    const n = nameInput.trim();
    if (n.length < 2) return;
    try {
      localStorage.setItem(NAME_KEY, n);
    } catch {}
    setName(n);
    setAskName(false);
    if (pendingAlbum.current) {
      const a = pendingAlbum.current;
      pendingAlbum.current = null;
      setTimeout(() => openPicker(a), 0);
    }
  }

  async function onFiles(fileList: FileList | null) {
    const album = currentAlbum.current;
    if (!fileList || fileList.length === 0 || !album || !name) return;
    const files = Array.from(fileList);
    if (fileRef.current) fileRef.current.value = "";

    setProgress((prev) => ({
      ...prev,
      [album]: { ...(prev[album] ?? emptyProg), busy: (prev[album]?.busy ?? 0) + files.length },
    }));

    for (const file of files) {
      const okType =
        (file.type ? ALLOWED_TYPES.includes(file.type) : true) &&
        (file.type.startsWith("image/") || /\.(jpe?g|png|heic|heif|webp)$/i.test(file.name));
      if (!okType || file.size > MAX_FILE_BYTES) {
        setProgress((prev) => {
          const cur = prev[album] ?? emptyProg;
          return { ...prev, [album]: { ...cur, busy: Math.max(0, cur.busy - 1), err: cur.err + 1 } };
        });
        continue;
      }
      try {
        const path = buildPhotoPath(album, name, file.name);
        const thumb = await makeThumb(file);
        if (thumb) {
          await upload(thumbPathFor(path), thumb, {
            access: "public",
            handleUploadUrl: "/api/photos/upload",
            contentType: "image/jpeg",
          });
        }
        await upload(path, file, {
          access: "public",
          handleUploadUrl: "/api/photos/upload",
          contentType: file.type || "image/jpeg",
        });
        setProgress((prev) => {
          const cur = prev[album] ?? emptyProg;
          return { ...prev, [album]: { ...cur, busy: Math.max(0, cur.busy - 1), done: cur.done + 1 } };
        });
      } catch {
        setProgress((prev) => {
          const cur = prev[album] ?? emptyProg;
          return { ...prev, [album]: { ...cur, busy: Math.max(0, cur.busy - 1), err: cur.err + 1 } };
        });
      }
    }

    router.refresh();
  }

  const bySlug = new Map((sections ?? []).map((s) => [s.slug, s]));

  return (
    <div>
      {/* one hidden picker, retargeted per album */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*,.heic,.heif"
        multiple
        hidden
        onChange={(e) => onFiles(e.target.files)}
      />

      {name && (
        <p className="mb-6 text-center font-body text-xs text-ivory/40">
          Uploading as {name}.{" "}
          <button
            type="button"
            className="underline underline-offset-2 hover:text-ivory/70"
            onClick={() => {
              setNameInput(name);
              setAskName(true);
            }}
          >
            Not you?
          </button>
        </p>
      )}

      <div className={variant === "gallery" ? "space-y-14" : "space-y-3"}>
        {ALBUMS.map((a) => {
          const sec = bySlug.get(a.slug);
          const p = progress[a.slug] ?? emptyProg;
          const count = sec?.photos.length ?? 0;
          return (
            <div key={a.slug} id={`album-${a.slug}`} className="scroll-mt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-left">
                  <p className="font-display text-lg text-ivory md:text-xl">{a.name}</p>
                  <p className="font-body text-xs text-ivory/50">
                    {a.prompt}
                    {sec ? ` · ${count} ${count === 1 ? "photo" : "photos"}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onAdd(a.slug)}
                  disabled={p.busy > 0}
                  className="shrink-0 rounded-sm bg-gold px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-teal-dark transition-colors hover:bg-gold-light disabled:opacity-60"
                >
                  {p.busy > 0
                    ? `Uploading ${p.busy}…`
                    : p.done > 0
                      ? `✓ ${p.done} added — add more`
                      : "Add photos"}
                </button>
              </div>
              {p.err > 0 && (
                <p className="mt-1 text-right font-body text-xs text-coral">
                  {p.err} skipped (not an image, or over 12 MB)
                </p>
              )}

              {variant === "gallery" && (
                <div className="mt-4">
                  {count === 0 ? (
                    <p className="font-body text-sm text-ivory/30">Nothing here yet.</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                      {sec!.photos.map((ph) => (
                        <button
                          key={ph.pathname}
                          type="button"
                          onClick={() => setActive(ph)}
                          className="group block aspect-square w-full overflow-hidden rounded-sm bg-teal"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={ph.thumbUrl}
                            alt={`Photo by ${ph.uploader}`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* name prompt — shows once per device */}
      {askName && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={() => setAskName(false)}
        >
          <div
            className="w-full max-w-xs rounded-sm bg-ivory p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display text-xl text-teal-dark">One thing first</p>
            <p className="mt-1 font-body text-xs text-muted">
              Your name — so we know whose photos are whose. Asked once.
            </p>
            <input
              autoFocus
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              placeholder="e.g. Optimus Prime"
              className="mt-4 w-full rounded-sm border border-muted/30 bg-white px-4 py-2.5 font-body text-sm text-dark placeholder:text-muted/40 focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <button
              type="button"
              onClick={saveName}
              className="mt-3 w-full rounded-sm bg-gold px-6 py-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-teal-dark hover:bg-gold-light"
            >
              Start uploading
            </button>
          </div>
        </div>
      )}

      {/* lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="flex max-h-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.url}
              alt={`Photo by ${active.uploader}`}
              className="max-h-[80vh] w-auto rounded-sm object-contain"
            />
            <div className="mt-4 flex items-center gap-4 font-body text-sm">
              <span className="text-ivory/60">{active.uploader}</span>
              <a
                href={`${active.url}?download=1`}
                className="text-gold underline underline-offset-4 hover:text-gold-light"
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
