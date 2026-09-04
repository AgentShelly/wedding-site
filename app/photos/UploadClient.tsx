"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import {
  ALLOWED_TYPES,
  MAX_FILE_BYTES,
  buildPhotoPath,
  thumbPathFor,
} from "@/lib/photos";

type Status = "pending" | "uploading" | "done" | "error";
type Item = { id: string; name: string; status: Status; message?: string };

const THUMB_MAX = 700;

// Downscale an image file to a small JPEG for the gallery grid.
// Returns null when the browser can't decode the format (e.g. HEIC on Chrome).
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

export function UploadClient() {
  const [name, setName] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wedding-photo-name");
      if (saved) setName(saved);
    } catch {}
  }, []);

  const update = useCallback((id: string, patch: Partial<Item>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      alert("Please enter your name first.");
      return;
    }
    try {
      localStorage.setItem("wedding-photo-name", trimmed);
    } catch {}

    const files = Array.from(fileList);
    setBusy(true);
    setAllDone(false);

    const queued: Item[] = files.map((f, i) => ({
      id: `${Date.now()}-${i}-${f.name}`,
      name: f.name,
      status: "pending",
    }));
    setItems((prev) => [...prev, ...queued]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const item = queued[i];

      const looksImage =
        file.type.startsWith("image/") || /\.(jpe?g|png|heic|heif|webp)$/i.test(file.name);
      if (!looksImage) {
        update(item.id, { status: "error", message: "Not an image" });
        continue;
      }
      if (file.type && !ALLOWED_TYPES.includes(file.type)) {
        update(item.id, { status: "error", message: "Unsupported format" });
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        update(item.id, {
          status: "error",
          message: `Too large (${(file.size / 1024 / 1024).toFixed(1)} MB, max 12)`,
        });
        continue;
      }

      update(item.id, { status: "uploading" });
      try {
        const photoPath = buildPhotoPath(trimmed, file.name);

        const thumb = await makeThumb(file);
        if (thumb) {
          await upload(thumbPathFor(photoPath), thumb, {
            access: "public",
            handleUploadUrl: "/api/photos/upload",
            contentType: "image/jpeg",
          });
        }

        await upload(photoPath, file, {
          access: "public",
          handleUploadUrl: "/api/photos/upload",
          contentType: file.type || "image/jpeg",
        });

        update(item.id, { status: "done" });
      } catch (err) {
        update(item.id, {
          status: "error",
          message: err instanceof Error ? err.message : "Upload failed",
        });
      }
    }

    setBusy(false);
    setAllDone(true);
    if (inputRef.current) inputRef.current.value = "";
  }

  const doneCount = items.filter((it) => it.status === "done").length;
  const errCount = items.filter((it) => it.status === "error").length;

  return (
    <div className="w-full max-w-md mx-auto">
      <label className="block font-body text-xs font-semibold uppercase tracking-wider text-teal-dark mb-1">
        Your name <span className="text-coral">*</span>
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Lawrence Wong"
        className="w-full px-4 py-2.5 border border-muted/30 rounded-sm bg-white text-dark font-body text-sm placeholder:text-muted/40 focus:outline-none focus:ring-1 focus:ring-gold"
      />

      <div className="mt-5">
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 transition-colors text-teal-dark font-body font-semibold text-sm uppercase tracking-[0.2em] px-6 py-4 rounded-sm"
        >
          {busy ? "Uploading…" : "Upload photos"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <p className="font-body text-muted text-xs mt-3 text-center">
        Full-resolution originals. JPEG, PNG or HEIC, up to 12 MB each. Add as
        many as you like — we&apos;ll curate the album afterwards.
      </p>

      {items.length > 0 && (
        <ul className="mt-6 space-y-1.5 text-left">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-center gap-2 font-body text-xs text-dark/80"
            >
              <span aria-hidden className="w-4 shrink-0 text-center">
                {it.status === "done"
                  ? "✓"
                  : it.status === "error"
                    ? "✕"
                    : it.status === "uploading"
                      ? "…"
                      : "·"}
              </span>
              <span className="truncate">{it.name}</span>
              {it.message && (
                <span className="text-coral shrink-0">— {it.message}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {allDone && !busy && (
        <p className="mt-5 text-center font-body text-sm text-jade">
          {doneCount} uploaded{errCount > 0 ? `, ${errCount} skipped` : ""}. Thank
          you! Add more any time.
        </p>
      )}
    </div>
  );
}
