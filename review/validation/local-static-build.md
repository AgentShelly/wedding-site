# Local static implementation evidence

Date: 2026-11-02, Asia/Singapore. Branch `codex/static-album`. Scope: authorized local implementation and synthetic fixture only. No live provider account, production URL, real photo, credential, external resource, or deployment was accessed.

## Fixture and build

Synthetic fixture: [`tests/fixtures/album-manifest.json`](../../tests/fixtures/album-manifest.json). It uses `synthetic-store`, a single synthetic ceremony record and `https://album.example.test` URLs. It is not a production inventory or evidence of photo count/completeness.

Exact build command:

```sh
NEXT_TELEMETRY_DISABLED=1 \
ALBUM_MANIFEST_PATH="$PWD/tests/fixtures/album-manifest.json" \
ALBUM_PHOTO_ORIGIN=https://album.example.test \
RELEASE_ID=synthetic-build \
RELEASE_ENVIRONMENT=preview \
VERCEL_PROJECT_ID=synthetic-project \
npm run build
```

Result: exit 0. Next 16.2.6 exported static `/`, `/photos`, `/gallery`, `/release-health.json`, and the not-found page. No API route was emitted. The workspace-root warning was corrected by pinning Turbopack root to `process.cwd()`; the final build had no incorrect-root warning. Next reported that it loaded `.env.local` automatically. No values were read or printed; output scanning found none of the secret names listed below. A later clean-checkout proof should use a separately sanitized environment.

## Tests and static checks

| Command | Result |
|---|---|
| `npm test` | Pass: 12 tests covering valid grouping/original URL preservation, bad digest, wrong origin, duplicates, record-count mismatch, unsafe URL and metadata, byte cap, target mismatch, stale/mismatched account-check data, scoped approval expiry, failed health behavior, same-target lock contention and lease resume, output redaction and bounded process timeout. |
| `npm run typecheck` | Pass (`tsc --noEmit`). |
| `npm run lint` | Pass (ESLint 9 + matching Next 16 flat config). |
| `git diff --check` | Pass. |
| `node_modules/.bin/vercel --version` | Local binary reports CLI 65.9.0. |
| Vercel `deploy`, `inspect`, `promote`, `rollback` `--help` | Local help only; confirms CLI command/flag shapes. No account operation. |

After export, a bounded local inspection confirmed `out/index.html`, `out/gallery.html`, `out/photos.html`, and `out/release-health.json`; there were no emitted API files. Searches over static output found none of `BLOB_READ_WRITE_TOKEN`, `ADMIN_PASSWORD`, `RESEND_API_KEY`, `DEEPSEEK_API_KEY`, `ChallengeAlbums`, `/api/photos/upload`, or `/gallery/admin`. The health artifact included the synthetic release/project IDs, manifest digest/count and capture timestamp only. Existing `public/` PDFs/images are still included by Next export; source assets were not deleted.

## Not demonstrated

- Browser-based desktop/mobile journeys, keyboard/focus behavior, original-download bytes, or cross-browser image rendering. No browser E2E was run; `playwright-core` requires a separately available authorized browser.
- Clean checkout on Node 24. The current environment was Node 26.4.0 even though `.nvmrc`/`engines` pin 24.x. Local tests and build succeeded on Node 26; this does not close AC01's clean Node 24 requirement.
- Real target identity, quota/billing, Vercel permissions, Blob continuity, real snapshot completeness, GitHub/Vercel triggers, preview, production, promotion, rollback or recovery. Target IDs in `release-targets.json` intentionally remain blank; the script fails closed until separately authorized T1 evidence.
- No live DeepSeek API request or token cost exists for this static app. No real user data or credentials were added to fixtures or tests.

## Dependency tooling notes

The local dependency updates completed without project audit remediation. npm reported 60 vulnerabilities (31 moderate, 27 high, 2 critical). npm also warned that install scripts for `esbuild`, `fsevents`, `koffi`, and `sharp` were not approved. No audit fix or install-script approval was run. The static build nevertheless completed in this environment. This count is current to the local npm audit output and is not a security audit of production.

Local-link validation passed for `spec/`, `review/analysis/`, `review/changes/`, and `review/validation/`. Some pre-existing historical audit reports link directly to runtime source paths that this approved cleanup removes. Those audit reports remain unchanged as historical evidence; the old-to-new mapping is recorded in `review/changes/cleanup-plan.md`.
