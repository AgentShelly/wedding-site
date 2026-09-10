import "server-only";
import { list } from "@vercel/blob";
import {
  ALBUMS,
  PHOTO_PREFIX,
  THUMB_PREFIX,
  albumFromPath,
  thumbPathFor,
  uploaderFromPath,
  type AlbumSlug,
} from "@/lib/photos";

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

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

async function listAll(prefix: string) {
  const out: { pathname: string; url: string; size: number; uploadedAt: Date }[] = [];
  let cursor: string | undefined;
  do {
    const res = await list({ prefix, cursor, limit: 1000, token: TOKEN });
    for (const b of res.blobs) {
      out.push({ pathname: b.pathname, url: b.url, size: b.size, uploadedAt: b.uploadedAt });
    }
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  return out;
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const [photos, thumbs] = await Promise.all([
    listAll(PHOTO_PREFIX),
    listAll(THUMB_PREFIX),
  ]);

  const thumbByPath = new Map(thumbs.map((t) => [t.pathname, t.url]));

  return photos
    .map((p) => ({
      pathname: p.pathname,
      url: p.url,
      thumbUrl: thumbByPath.get(thumbPathFor(p.pathname)) ?? p.url,
      uploader: uploaderFromPath(p.pathname),
      album: albumFromPath(p.pathname),
      size: p.size,
      uploadedAt: p.uploadedAt.toISOString(),
    }))
    .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

// Same photos, grouped into the fixed album order (every album always present).
export async function getAlbumSections(): Promise<AlbumSection[]> {
  const photos = await getGalleryPhotos();
  return ALBUMS.map((a) => ({
    slug: a.slug,
    name: a.name,
    prompt: a.prompt,
    photos: photos.filter((p) => p.album === a.slug),
  }));
}
