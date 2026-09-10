// Shared constants + helpers for the guest photo album.

export const MAX_FILE_BYTES = 12 * 1024 * 1024; // 12 MB per photo
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/heic", "image/heif", "image/webp"];

export const PHOTO_PREFIX = "photos/";
export const THUMB_PREFIX = "thumbs/";

// The photo-challenge albums. Order here is the order shown in the gallery.
export const ALBUMS = [
  { slug: "ceremony", name: "The Ceremony", prompt: "The march-in & tea ceremony" },
  { slug: "table", name: "Your Table", prompt: "Your table, all together" },
  { slug: "toasts", name: "Speeches & Toasts", prompt: "A speech — or the yum seng" },
  { slug: "candid", name: "Candid & Sweet", prompt: "Happy (or sad) tears" },
  { slug: "details", name: "The Details", prompt: "Food, flowers, anything gold" },
  { slug: "people", name: "Selfies & Everyone", prompt: "A selfie with someone you love" },
  { slug: "wildcard", name: "Wildcard", prompt: "Your shot of the day" },
] as const;

export type AlbumSlug = (typeof ALBUMS)[number]["slug"];
export const DEFAULT_ALBUM: AlbumSlug = "wildcard";

const ALBUM_SLUGS = new Set<string>(ALBUMS.map((a) => a.slug));

export function isAlbumSlug(s: string | null | undefined): s is AlbumSlug {
  return !!s && ALBUM_SLUGS.has(s);
}

export function albumMeta(slug: string) {
  return ALBUMS.find((a) => a.slug === slug) ?? null;
}

// Turn a guest's typed name into a filesystem-safe slug.
export function slugifyName(name: string): string {
  return (
    name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "guest"
  );
}

// photos/<album>/<name-slug>/<timestamp>-<rand>.<ext>
export function buildPhotoPath(album: string, name: string, filename: string): string {
  const ext = (filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const rand = Math.random().toString(36).slice(2, 8);
  const a = isAlbumSlug(album) ? album : DEFAULT_ALBUM;
  return `${PHOTO_PREFIX}${a}/${slugifyName(name)}/${Date.now()}-${rand}.${ext}`;
}

export function thumbPathFor(photoPathname: string): string {
  return photoPathname.replace(PHOTO_PREFIX, THUMB_PREFIX).replace(/\.[a-z0-9]+$/, ".jpg");
}

// photos/<album>/<name>/<file> — pull the album segment (falls back for legacy paths).
export function albumFromPath(pathname: string): AlbumSlug {
  const parts = pathname.split("/");
  return isAlbumSlug(parts[1]) ? (parts[1] as AlbumSlug) : DEFAULT_ALBUM;
}

// Recover the guest name. New: photos/<album>/<name>/<file>. Legacy: photos/<name>/<file>.
export function uploaderFromPath(pathname: string): string {
  const parts = pathname.split("/"); // [0] = photos|thumbs
  const nameSeg = isAlbumSlug(parts[1]) ? parts[2] : parts[1];
  return (nameSeg || "guest").replace(/-/g, " ");
}
