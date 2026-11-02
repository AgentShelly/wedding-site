import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { parsePhotoManifest } from "../lib/photo-store.ts";

const origin = "https://album.example.test";

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(",")}}`;
  return JSON.stringify(value);
}

function manifest() {
  const payload = {
    version: 1,
    capturedAt: "2026-11-02T00:00:00.000Z",
    photoOrigin: origin,
    sourceStoreId: "synthetic-store",
    recordCount: 1,
    photos: [{
      pathname: "photos/ceremony/alice-lim/2026-01.jpg",
      url: `${origin}/photos/ceremony/alice-lim/2026-01.jpg`,
      thumbUrl: `${origin}/thumbs/ceremony/alice-lim/2026-01.jpg`,
      album: "ceremony",
      uploader: "alice lim",
      size: 123,
      uploadedAt: "2026-10-12T00:00:00.000Z",
    }],
  };
  return { ...payload, digest: createHash("sha256").update(canonical(payload)).digest("hex") };
}

test("valid snapshot is grouped into all seven albums without changing original URLs", () => {
  const sections = parsePhotoManifest(manifest(), origin);
  assert.equal(sections.length, 7);
  assert.equal(sections[0].photos[0].url, `${origin}/photos/ceremony/alice-lim/2026-01.jpg`);
  assert.equal(sections[0].photos[0].thumbUrl, `${origin}/thumbs/ceremony/alice-lim/2026-01.jpg`);
  assert.equal(sections[0].photos[0].uploader, "alice lim");
  assert.equal(sections[6].photos.length, 0);
});

test("snapshot rejects a bad digest, wrong host, duplicate path, and inconsistent count", () => {
  const badDigest = manifest();
  badDigest.photos[0].size += 1;
  assert.throws(() => parsePhotoManifest(badDigest, origin), /digest/);
  assert.throws(() => parsePhotoManifest(manifest(), "https://other.example.test"), /origin/);
  const duplicate = manifest();
  duplicate.photos.push({ ...duplicate.photos[0] });
  duplicate.recordCount = 2;
  const { digest: _digest, ...payload } = duplicate;
  duplicate.digest = createHash("sha256").update(canonical(payload)).digest("hex");
  assert.throws(() => parsePhotoManifest(duplicate, origin), /duplicate/);
  const wrongCount = manifest();
  wrongCount.recordCount = 0;
  assert.throws(() => parsePhotoManifest(wrongCount, origin), /record count/);
});

test("snapshot rejects non-HTTPS, credentialed, and mismatched metadata URLs", () => {
  const insecure = manifest();
  insecure.photos[0].url = "http://album.example.test/photo.jpg";
  const { digest: _digest, ...payload } = insecure;
  insecure.digest = createHash("sha256").update(canonical(payload)).digest("hex");
  assert.throws(() => parsePhotoManifest(insecure, origin), /HTTPS/);
  const mismatched = manifest();
  mismatched.photos[0].uploader = "another person";
  const { digest: _old, ...body } = mismatched;
  mismatched.digest = createHash("sha256").update(canonical(body)).digest("hex");
  assert.throws(() => parsePhotoManifest(mismatched, origin), /metadata/);
});

test("snapshot reader requires an absolute path and enforces the manifest byte cap", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "album-snapshot-"));
  const fixturePath = path.join(dir, "manifest.json");
  const previous = { path: process.env.ALBUM_MANIFEST_PATH, origin: process.env.ALBUM_PHOTO_ORIGIN };
  try {
    await writeFile(fixturePath, JSON.stringify(manifest()));
    process.env.ALBUM_MANIFEST_PATH = fixturePath;
    process.env.ALBUM_PHOTO_ORIGIN = origin;
    const { getAlbumSnapshot } = await import("../lib/photo-store.ts");
    assert.equal(getAlbumSnapshot().count, 1);
    process.env.ALBUM_MANIFEST_PATH = "relative.json";
    assert.throws(() => getAlbumSnapshot(), /absolute/);
    await writeFile(fixturePath, " ".repeat(5 * 1024 * 1024 + 1));
    process.env.ALBUM_MANIFEST_PATH = fixturePath;
    assert.throws(() => getAlbumSnapshot(), /5 MiB/);
  } finally {
    if (previous.path === undefined) delete process.env.ALBUM_MANIFEST_PATH; else process.env.ALBUM_MANIFEST_PATH = previous.path;
    if (previous.origin === undefined) delete process.env.ALBUM_PHOTO_ORIGIN; else process.env.ALBUM_PHOTO_ORIGIN = previous.origin;
    await rm(dir, { recursive: true, force: true });
  }
});
