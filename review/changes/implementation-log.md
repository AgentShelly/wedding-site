# Implementation log — local static album

Date: 2026-11-02, Asia/Singapore. Branch: `codex/static-album`. Repository: `/Users/rudolph/alice-rudolph-wedding`, origin `https://github.com/AgentShelly/wedding-site.git`. Starting HEAD was `bee5f8ffc68c277038a643ee48ac5e1ceaf6ef19`; existing documentation work was already unstaged/untracked and was preserved. No commit was made.

## Approval and limits

The user approved the static view/download design and local synthetic implementation, as recorded in [spec/README.md](../../spec/README.md#approval-record). Approval covers local source/config/tooling/tests and synthetic fixtures only. It does not cover production/account access, real album manifests, credentials, external resources, commit/push/PR, preview, promotion or production deployment. Zero total service spend and view/download-only scope remain unchanged. No provider/model integration exists or was added.

## Implemented

- Static export serves `/`, `/photos`, `/gallery`, and `/release-health.json`. The gallery loads a strict build-time manifest: file size and record cap, digest, store/origin match, path uniqueness, URL origin/protocol, album/uploader consistency and photo count are checked. No live Blob listing, empty-on-error fallback, admin UI, upload, delete, URL export or server ZIP remains in the new build.
- Guest flow is read/filter/lightbox/download only. Existing original object URLs are retained; no production photo bytes were read or copied. The synthetic fixture uses `.example.test` URLs.
- Added `npm run release -- <plan|check|apply|verify>` backed by one root `scripts/release.mjs`, pinned Vercel CLI 65.9.0, Node 24.x declaration, explicit target allowlist, sanitized receipts, TTL-bound metadata and approval records, action-specific TTY confirmation, local lock, output redaction, bounded command/health timeouts, no mutation retries, staged production (`--skip-domain`), guarded promote/rollback actions and read-only verify. The allowlist has **blank IDs** pending separately approved owner evidence, so no operation can currently target Vercel.
- Removed only application sources classified by the approved [cleanup plan](cleanup-plan.md). Audit and inventory history is retained. `.env.example` now describes non-secret local build inputs; it does not revoke or alter any account variable or credential.

## Local proof performed

See [local static build evidence](../validation/local-static-build.md) for exact commands/results. Twelve Node tests passed, typecheck and lint passed, and the Next static export completed with the synthetic manifest. Static artifact inspection found all required pages and health metadata, no API output, and none of the checked secret names/admin-upload strings. CLI `--version`/`--help` checks were local only. No browser E2E or live Vercel check was performed.

## Findings and unresolved gates

- T1 remains blocked: actual free-tier eligibility, zero total billing, ownership/permissions, immutable team/project/store IDs, same-store URL/byte continuity, active workflows, triggers and quota state have not been verified.
- No verified production manifest exists in the checkout and none was obtained. The placeholder target config deliberately blocks plan/check/apply/verify until immutable IDs and approved sanitized inputs are supplied.
- Static export does not disable functions or tokens in an already deployed prior build. Legacy routes/tokens require separate owner-approved retirement and lifecycle work.
- `npm` reported 60 dependency vulnerabilities after dependency changes (31 moderate, 27 high, 2 critical), and warned that install scripts for `esbuild`, `fsevents`, `koffi`, and `sharp` were not approved. No audit remediation or install-script approval was performed. This synthetic build succeeded despite the warnings.
- The environment ran Node 26.4.0 although the project pins Node 24.x; clean-checkout proof on Node 24 is not established. Next's static build read `.env.local` automatically, but no secret values were printed; the generated output scan found none of the listed secret names. A later isolated clean-checkout build should use an approved sanitized environment.
- The local lock is intentionally retained after apply until remote outcome reconciliation. Cross-host exclusivity requires a separately verified owner lease. Promotion/rollback and production recovery have not been exercised.

## Exact next task

Request separately scoped authorization for read-only T1 evidence collection. Obtain owner-supplied or explicitly authorized sanitized Vercel/GitHub metadata and billing/usage evidence. If zero-total billing, target identity, static hosting capacity or same-store continuity cannot be established, stop and return for a design/cost amendment. Do not deploy, provision, mutate accounts/data, publish Git changes, or infer feasibility from this local implementation.
