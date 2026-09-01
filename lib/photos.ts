// Shared constants + helpers for the guest photo album.

export const MAX_FILE_BYTES = 12 * 1024 * 1024; // 12 MB per photo
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/heic", "image/heif", "image/webp"];

export const PHOTO_PREFIX = "photos/";
export const THUMB_PREFIX = "thumbs/";

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

// photos/<name-slug>/<timestamp>-<rand>.<ext>
export function buildPhotoPath(name: string, filename: string): string {
  const ext = (filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const rand = Math.random().toString(36).slice(2, 8);
  return `${PHOTO_PREFIX}${slugifyName(name)}/${Date.now()}-${rand}.${ext}`;
}

export function thumbPathFor(photoPathname: string): string {
  return photoPathname.replace(PHOTO_PREFIX, THUMB_PREFIX).replace(/\.[a-z0-9]+$/, ".jpg");
}

// Recover the guest name from a stored pathname.
export function uploaderFromPath(pathname: string): string {
  const m = pathname.match(/^(?:photos|thumbs)\/([^/]+)\//);
  return m ? m[1].replace(/-/g, " ") : "guest";
}
