# Current state — factual baseline

As of repository inspection on 2026-11-02, Asia/Singapore. Current documentation-stage starting HEAD: `bee5f8ffc68c277038a643ee48ac5e1ceaf6ef19`, branch `wedding-updates`, one local documentation commit ahead of `origin/main`, initially clean. Remote: `https://github.com/AgentShelly/wedding-site.git`. Earlier audits describe application HEAD `ff0608e7f11700bf19b7bd144ee699428179dedd`; their 39-path inventory predates the documentation commit and is historical, not a current total-file count.

## Application and data

| Concern | Observed baseline | Evidence |
|---|---|---|
| Purpose/users | Wedding home, seven challenge albums, guest upload/view/download, owner admin. User now names album access as required. No RSVP/AI workflow found in this source. | `app/page.tsx`, `app/photos/page.tsx`, `app/gallery/**`; [inventory](../review/inventory/project-inventory.md) |
| Stack | One Next App Router app; lock-resolved Next 16.2.6, React 19.1.0, Blob SDK 2.8.0, npm lock v3. No database, ORM, queue, worker, CI workflow or test tree found. | `package.json`, lock; [inventory](../review/inventory/project-inventory.md) |
| Gallery reads | `/` and `/gallery` force dynamic rendering. `lib/photo-store.ts` lists `photos/` and `thumbs/` in parallel, pages at 1,000, pairs/sorts all originals. Home displays only 12 after listing all. Failed list returns `[]`, masking outage as empty content. | [request map](../review/inventory/deployment-map.md), current source |
| Writes/shape | Browser creates optional 700px JPEG thumb, uploads thumb then original directly to public Blob. Token route checks album/path/type and 12 MiB maximum. Original path `photos/<album>/<name-slug>/<timestamp>-<random>.<ext>`; thumb mirrors under `thumbs/` as JPEG. Reads support legacy `photos/<name>/<file>`, mapping to wildcard. Two writes are not atomic. A failed thumb upload currently aborts the original attempt; failed thumbnail generation allows an original-only upload. | `components/ChallengeAlbums.tsx`, `lib/photos.ts`, upload handler |
| Authorization | Guest token issuance has no guest authentication or app rate limiter. Admin uses server password and deterministic HMAC bearer cookie: HttpOnly, Lax, Secure in production, 30-day browser max-age. No server-side session expiry/revocation except password change. Malformed password types are not schema-validated. | `lib/admin-auth.ts`, login/upload routes |
| Export/delete | Admin deletes original+derived thumb. URL list exports originals only. ZIP fetches originals sequentially, skips failures, streams response, sets 300s duration. No complete manifest, verified backup, restore, soft delete, or transaction. | Admin routes; [request map](../review/inventory/deployment-map.md) |
| Secrets | Source requires `ADMIN_PASSWORD`, `BLOB_READ_WRITE_TOKEN`; `NODE_ENV` is runtime-supplied. Example and platform metadata also contain unused/unverified Resend/Google/site-URL names. Secret values not read. | [config matrix](../review/inventory/configuration-matrix.md) |
| AI | DeepSeek default is a repository instruction; there is no implemented API/model/key/request path here. User now permits provider/model evaluation and selection; no AI change is needed for album access. | Source/dependencies; [config matrix](../review/inventory/configuration-matrix.md) |

## External metadata: prior audit only, not refreshed

- Team slug `jarvis-tranquilovacationrentals`, Pro; project `alice-rudolph-2026`, Node 24.x, Git-linked to this repository.
- Public photo store `alice-rudolph-photos`, sin1, 167 objects, 324,999,630 bytes; preview and production share attachment/token according to last audit. Actual immutable IDs must be verified before deployment. Display names alone are insufficient.
- Git-ref deployments exist; latest audited Claude-branch build errored. Push-trigger behaviour, remote install/build settings and branch protections remain unknown (prior GitHub branch-protection read returned 403).
- Verified project domains in prior evidence: `alice-rudolph-2026.vercel.app`, `wedding-site-inky-six.vercel.app`. Example mentions another hostname. Canonical origin and DNS owner remain unresolved.
- Cloudinary music, public Blob video/poster, Google font fetches are external lifecycle dependencies. Video/poster store identity is not proven equal to the photo store. Git cannot recreate these assets/accounts/secrets.

Sources: [initial audit A1–A7](../review/audits/initial-audit.md), [configuration matrix](../review/inventory/configuration-matrix.md), [source-of-truth map](../review/audits/source-of-truth-map.md), [coverage limits](../review/inventory/coverage.md). All three audits, all four inventory reports, root instructions, indexes and active handoff were read for this stage. Relevant request/storage/auth/UI implementation was reread. No runtime baseline, live API cost, availability, backup completeness or performance claim has been verified. Public documentation now confirms `next lint` is removed in Next 16; see [S11](../review/analysis/official-sources.md).
