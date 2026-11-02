# Inventory coverage and file treatment

## Scope and method

This inventory uses the current Git index, source/config reads, `package.json`/lockfile metadata, ignore/status output, and the read-only provider metadata already captured in [the initial audit](../audits/initial-audit.md). The tracked-path list below is complete for the inspected checkout at its starting HEAD. Source was read where relevant; binary, generated, vendor, and large files are classified from names, Git mode, file type, and byte size rather than claimed as fully inspected.

Checkout: `/Users/rudolph/alice-rudolph-wedding`; remote `AgentShelly/wedding-site`; branch `wedding-updates` tracking `origin/main`; starting HEAD `ff0608e7f11700bf19b7bd144ee699428179dedd`. The worktree had no tracked modifications. Prior user-requested workflow documents were untracked and preserved. This inventory adds four untracked documents under `review/inventory/` and updates `spec/handoffs/current.md`; no tracked application files changed.

## Complete tracked-path inventory

All 39 paths in the Git index are reproduced below, one exact path per line:

```text
.env.example
.gitignore
app/api/photos/admin/delete/route.ts
app/api/photos/admin/login/route.ts
app/api/photos/admin/urls/route.ts
app/api/photos/admin/zip/route.ts
app/api/photos/upload/route.ts
app/gallery/GalleryClient.tsx
app/gallery/admin/AdminGallery.tsx
app/gallery/admin/LoginForm.tsx
app/gallery/admin/page.tsx
app/gallery/page.tsx
app/globals.css
app/layout.tsx
app/page.tsx
app/photos/page.tsx
components/ChallengeAlbums.tsx
components/HeroSection.tsx
components/MusicPlayer.tsx
components/PhotosSection.tsx
components/TimelineSection.tsx
email-invite.html
lib/admin-auth.ts
lib/photo-store.ts
lib/photos.ts
next.config.ts
package-lock.json
package.json
postcss.config.js
public/hero-photo.jpg
public/photo-challenge-card.html
public/photo-challenge-card.pdf
public/photo-handout-tent.html
public/photo-handout-tent.pdf
public/photos-qr.png
public/photos-qr.svg
public/wedding-thankyou.jpg
scratchpad/make-pdf.mjs
tsconfig.json
```

**Text/config/app source (30 paths):** all listed paths except `package-lock.json` and the eight `public/` files.

**Lockfile (1 path):** `package-lock.json` (npm lockfile v3, 89,708 bytes). It is generated dependency-resolution metadata and remains a tracked reproducibility input.

**Static/image/PDF assets (8 paths):** two JPEGs, two HTML handout sources, two one-page PDFs, one QR PNG, and one QR SVG, all named in the exact listing above.

The public PDFs are tracked despite `.gitignore` ignoring `*.pdf`; they may be intended downloadable assets. The HTML files and QR artifacts appear to be handout source/derived assets from names and format, but their generation history was not verified. No image, QR, or PDF visual/content inspection was part of this audit. No application source is vendored. No package source under `node_modules/` is tracked.

**Count:** 39 tracked paths = 30 text/source/config + 1 lockfile + 8 public static assets. The two HTML handouts are text source within the public asset group; classification above distinguishes them. Asset size threshold is greater than 1 MiB; only the two JPEGs exceed it. Remote music and wedding video are not tracked files.

## Untracked and ignored paths

- **Untracked and preserved before this inventory:** root `AGENTS.md`; `spec/README.md`; `spec/handoffs/current.md`; `review/README.md`; `review/validation/README.md`; `review/audits/initial-audit.md`; `review/audits/open-questions.md`; `review/audits/source-of-truth-map.md`. They came from the prior user-authorized workflow/audit work and are not in the index.
- **Added by this inventory:** `review/inventory/project-inventory.md`, `review/inventory/deployment-map.md`, `review/inventory/configuration-matrix.md`, and `review/inventory/coverage.md`. These, along with the updated handoff, remain untracked; nothing was staged.
- **Ignored paths reported locally:** `.DS_Store`, `.claude/`, `.env.local`, `.vercel/`, `next-env.d.ts`, `node_modules/`, root `photo-challenge-tent.pdf`, `public/.DS_Store`, `scratchpad/photo-challenge-card.pdf`, `scratchpad/photo-handout-tent.pdf`, `scratchpad/photo-handout.html`, `scratchpad/qr-snippet.txt`, `scratchpad/qr.txt`, and `tsconfig.tsbuildinfo`.
- Ignore rules in `.gitignore` cover build output, node_modules, local env files, `.vercel`, media/PDF patterns, generated TS files, and most scratchpad contents. `.claude/settings.local.json` is excluded by the user's global Git ignore at `/Users/rudolph/.config/git/ignore`, not a tracked repo rule.
- `.env.local` and `.vercel` contents were not opened. `.claude/settings.local.json` was read only to enumerate permission keys/paths in the prior audit; hooks were not executed. Ignored files are not part of the 39 tracked paths.
- `git submodule status` produced no entries; no submodules are configured. No Git LFS attributes/config were found in the tracked path inventory. This does not rule out external dependencies or storage.

## References outside this repository

- Local absolute paths: `scratchpad/make-pdf.mjs` names system Google Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` and fixes its project root to `/Users/rudolph/alice-rudolph-wedding`.
- Local ignored settings: `.claude/settings.local.json` uses stale `wedding-rsvp` path arguments and global permissions. The file is not repository policy.
- Local ignored deployment/environment state: `.vercel/` and `.env.local`; not read.
- External hosts embedded in source/assets: Vercel project/Blob URLs for app/photo/video, Cloudinary audio, Google Fonts, and hardcoded handout hostnames. Their persistence, ownership, billing, and DNS are not inferable from Git alone.
- Previous Vercel metadata identifies team/project and Blob store; see [project inventory](project-inventory.md) and [configuration matrix](configuration-matrix.md). No new account read was performed for this stage.

## What this inventory does not establish

- No provider/account values, private keys, local env values, or Blob contents were read. The prior read-only Vercel metadata is a point-in-time reference and was not refreshed; billing, current project settings, Git trigger flags, aliases, TLS certificates, Blob backup/retention, and store bindings may have changed.
- GitHub branch-protection endpoints were denied to the previous connector. No branch protection is inferred from an empty ruleset response. No `.github` workflow files were present in the inspected tree/listing.
- No project scripts, tests, typecheck, lint, build, dependency install, application route, hook, or local Node/npm runtime commands were executed. Commands in package metadata are inventory only.
- No production domain request, production runtime, storage object, backup, restore, rollback, data-integrity, quota, performance, accessibility, security-penetration, or dependency-vulnerability check was performed.
- DeepSeek billing, limits, model, credentials, fallback and account ownership remain unverified because no app integration was found and no provider account was accessed.
- External file references, team settings, registrar state, local ignored file contents, and untracked user documents are not captured by the tracked-path list. Untracked workflow files were preserved rather than folded into the list of committed source paths.

## Verification commands and account checks for a later approved stage

These are proposals only; they were not run here.

| Purpose | Read/check needed | Guard |
|---|---|---|
| Reconfirm paths/state | `git status --short --branch`; `git ls-files`; `git ls-files --stage`; `git status --short --ignored`; `git submodule status`; file-size/type metadata | Local read-only checks; preserve untracked/ignored state. |
| Dependency/build proof | After explicit validation approval: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`; `npm test` is absent | Installs/scripts are outside this inventory authorization. Confirm lint command compatibility first. |
| Vercel project/trigger | Read project Git link, production branch, PR/preview and push triggers, root/build/install commands, Node version, deployment protection, project domains/TLS, deployment logs | Approved read-only account access; never create a deployment or temporary share URL. |
| Vercel config/storage | List env **names/targets only**; confirm Blob store attachment and distinct store/token per environment; verify backup/retention and usage metadata | Do not decrypt or copy secret values. Do not read/write Blob objects. Separate preview from production before any preview. |
| GitHub controls | Read workflow inventory, deployment environments, branch protections, rulesets, required checks, fork/PR deployment policies | Request admin-provided sanitized export if read access returns 403. No push, merge, workflow run, or secret access. |
| Domain/TLS | Verify project aliases/certificate state; request registrar/zone owner and DNS export if custom DNS is intended | Read-only only; no DNS edits or validation challenges. |
| DeepSeek/provider | Identify whether integration exists in another authorized path; if confirmed, obtain approved model, key scope, usage/rate-limit and billing policy, server-side secret owner, fallback requirements | No provider login/key retrieval or model change without explicit approval. |

Related records: [initial audit](../audits/initial-audit.md), [open questions](../audits/open-questions.md), and [current handoff](../../spec/handoffs/current.md).
