# Source-of-truth cleanup plan — approved static album

Date: 2026-11-02. Approval: local static implementation on `codex/static-album` as recorded in [spec/README.md](../../spec/README.md#approval-record). This plan maps only checked-in application sources made obsolete by the approved view/download-only runtime. Historical audits and inventories are retained unchanged. External Vercel variables, resources, domains, media, generated PDFs, and credentials are not modified by this local branch.

| Old source | New owner / mapping | Classification and effect |
|---|---|---|
| `lib/photo-store.ts` Blob `list()` live read + empty-on-error fallback | Same file becomes a strict build-time manifest reader and still derives album/uploader from the existing `lib/photos.ts` compatibility helpers. | Replace; no runtime Blob client or secret. Manifest failures fail build rather than publish an empty page. |
| No release identity endpoint | `app/release-health.json/route.ts` emits static non-secret release, project, manifest digest/count and capture time metadata. | Add; statically exported at build time and contains no photo inventory or credentials. |
| No guarded release command | `scripts/release.mjs`, `release-targets.json`, and `npm run release` implement one Vercel CLI wrapper with offline plan/check, guarded apply, and local/authorized remote verify. | Add. Target IDs remain empty pending T1 owner evidence; routine apply cannot create resources. `.release/` receipts and locks are ignored/private. |
| `components/ChallengeAlbums.tsx` guest name/localStorage, file picker, thumbnail generation/upload/progress | `app/gallery/page.tsx` reads snapshot sections and `app/gallery/GalleryClient.tsx` provides filters/lightbox/original download. | Remove obsolete writer component; paths remain readable through helpers. |
| `app/photos/page.tsx` uploader page | Static information + link to `/gallery`; static QR/handout destination remains navigable. | Replace. No guest upload control. |
| `app/api/photos/upload/route.ts` | None in new static build. | Remove route source; old deployed URLs/tokens remain a separately gated external retirement task. |
| `app/api/photos/admin/{login,delete,urls,zip}/route.ts`, `app/gallery/admin/**`, `lib/admin-auth.ts` | None in new static build. | Remove obsolete auth/write/export source. This does not disable already deployed old functions or revoke tokens. |
| `components/PhotosSection.tsx`, `MusicPlayer.tsx`, `TimelineSection.tsx` and old media-fetching homepage | Minimal static home link to gallery; media files and provider assets are not deleted. | Remove unreferenced source from required album release to avoid needless media requests and unused code. |
| `@vercel/blob`, `archiver` dependencies | None in static runtime after route/component retirement. | Remove direct dependencies and lock entries if no remaining source import. |
| `package.json` `next lint` script | ESLint CLI with Next flat config. | Replace; Next 16 removed `next lint`. Pin dev tooling in npm lock. |
| No ESLint flat config or test runner | `eslint.config.mjs` and Node native tests in `tests/`. | Add the single project test tree. |
| `.env.example` Resend/public-site entries absent from this code | `ALBUM_MANIFEST_PATH` and `ALBUM_PHOTO_ORIGIN` build-time, non-secret inputs. | Replace template only. No Vercel account variable cleanup or secret revocation. |
| `AGENTS.md`, `review/audits/*`, `review/inventory/*` | No mapping required. | Retain as canonical instruction and historical evidence; no deletion/rewriting. |

External/manual follow-up, outside approval: enumerate provider variable readers and token consumers; disable old deployment write surface and revoke credentials only after separate approval and impact proof; confirm manifest completeness/store identity/origin; verify actual Hobby billing and same-store transfer safety. A new static build alone does not perform those operations.
