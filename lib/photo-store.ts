import "server-only";

import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { z } from "zod";
import {
  ALBUMS,
  albumFromPath,
  uploaderFromPath,
  type AlbumSlug,
} from "./photos.ts";

export type GalleryPhoto = {
  pathname: string;
  url: string;
  thumbUrl: string;
  uploader: string;
  album: AlbumSlug;
  size: number;
  uploadedAt: string;
};

export type AlbumSection = {
  slug: AlbumSlug;
  name: string;
  prompt: string;
  photos: GalleryPhoto[];
};

const MAX_MANIFEST_BYTES = 5 * 1024 * 1024;
const MAX_PHOTOS = 5000;

const inputPhoto = z.object({
  pathname: z.string().min(1),
  url: z.string().url(),
  thumbUrl: z.string().url().optional(),
  album: z.string().min(1),
  uploader: z.string().min(1),
  size: z.number().int().nonnegative(),
  uploadedAt: z.string().datetime({ offset: true }),
}).strict();

const inputManifest = z.object({
  version: z.literal(1),
  capturedAt: z.string().datetime({ offset: true }),
  photoOrigin: z.string().url(),
  sourceStoreId: z.string().min(1),
  recordCount: z.number().int().nonnegative(),
  digest: z.string().regex(/^[a-f0-9]{64}$/),
  photos: z.array(inputPhoto).max(MAX_PHOTOS),
}).strict();

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function secureHttpsUrl(value: string, expectedOrigin: string, field: string): string {
  const parsed = new URL(value);
  if (parsed.protocol !== "https:" || parsed.origin !== expectedOrigin || parsed.username || parsed.password) {
    throw new Error(`Invalid ${field}: URL must use the approved HTTPS photo origin`);
  }
  return parsed.toString();
}

function photoFromInput(photo: z.infer<typeof inputPhoto>, origin: string): GalleryPhoto {
  if (!photo.pathname.startsWith("photos/") || photo.pathname.includes("\\") || photo.pathname.split("/").some((part) => !part || part === "." || part === "..")) {
    throw new Error("Invalid photo pathname");
  }

  return {
    pathname: photo.pathname,
    url: secureHttpsUrl(photo.url, origin, "photo"),
    thumbUrl: photo.thumbUrl ? secureHttpsUrl(photo.thumbUrl, origin, "thumbnail") : secureHttpsUrl(photo.url, origin, "photo"),
    uploader: uploaderFromPath(photo.pathname),
    album: albumFromPath(photo.pathname),
    size: photo.size,
    uploadedAt: new Date(photo.uploadedAt).toISOString(),
  };
}

export function parsePhotoManifest(raw: unknown, expectedOrigin: string): AlbumSection[] {
  const manifest = inputManifest.parse(raw);
  const approved = new URL(expectedOrigin);
  if (approved.protocol !== "https:" || approved.origin !== expectedOrigin || manifest.photoOrigin !== expectedOrigin || approved.username || approved.password) {
    throw new Error("Manifest photo origin does not match the approved target");
  }
  if (manifest.recordCount !== manifest.photos.length) throw new Error("Manifest record count does not match its records");
  const { digest, ...payload } = manifest;
  const actualDigest = createHash("sha256").update(canonicalJson(payload)).digest("hex");
  if (digest !== actualDigest) throw new Error("Manifest digest does not match its contents");

  const seen = new Set<string>();
  const photos = manifest.photos.map((photo) => {
    if (seen.has(photo.pathname)) throw new Error("Manifest contains a duplicate photo path");
    seen.add(photo.pathname);
    const parsed = photoFromInput(photo, expectedOrigin);
    if (photo.album !== parsed.album || photo.uploader !== parsed.uploader) {
      throw new Error("Manifest album or uploader metadata does not match its path");
    }
    return parsed;
  }).sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));

  return ALBUMS.map((album) => ({
    ...album,
    photos: photos.filter((photo) => photo.album === album.slug),
  }));
}

export function getAlbumSnapshot() {
  const manifestPath = process.env.ALBUM_MANIFEST_PATH;
  const photoOrigin = process.env.ALBUM_PHOTO_ORIGIN;
  if (!manifestPath || !path.isAbsolute(manifestPath)) {
    throw new Error("ALBUM_MANIFEST_PATH must name an approved absolute manifest path");
  }
  if (!photoOrigin) throw new Error("ALBUM_PHOTO_ORIGIN must name the approved HTTPS Blob origin");

  const stats = statSync(manifestPath);
  if (!stats.isFile() || stats.size > MAX_MANIFEST_BYTES) throw new Error("Photo manifest is not a file or exceeds 5 MiB");
  const raw = JSON.parse(readFileSync(manifestPath, "utf8")) as unknown;
  const parsed = inputManifest.parse(raw);
  const sections = parsePhotoManifest(parsed, photoOrigin);
  return { sections, capturedAt: parsed.capturedAt, digest: parsed.digest, count: parsed.recordCount };
}

export function getAlbumSections(): AlbumSection[] {
  return getAlbumSnapshot().sections;
}

// Keep source type imports stable for the existing client component while all
// Blob enumeration and credentials are removed from runtime code.
export function getAlbumPhotoCount(sections: AlbumSection[]): number {
  return sections.reduce((count, section) => count + section.photos.length, 0);
}
