# Initial project audit

- Audit date: 2026-11-02 (Asia/Singapore)
- Repository: `/Users/rudolph/alice-rudolph-wedding`
- Remote: `https://github.com/AgentShelly/wedding-site.git`
- Branch: `wedding-updates`, tracking `origin/main`
- Starting Git state: no tracked modifications; pre-existing workflow documents `AGENTS.md`, `spec/`, and `review/` were untracked. They were preserved. This audit adds new files under `review/audits/` and updates the existing active handoff.
- Method: bounded repository reads and read-only GitHub/Vercel connector requests. No application code, tests, scripts, hooks, build, install, commit, push, deploy, or production runtime/data were accessed.

Related records: [open questions](open-questions.md) and [source-of-truth map](source-of-truth-map.md).

## Executive findings

1. **High, high confidence — previews use the production photo store.** Vercel environment metadata assigns the same Blob store and `BLOB_READ_WRITE_TOKEN` to both `production` and `preview`. The public store currently reports 167 objects and about 325 MB. A preview can therefore write guest uploads into production storage. This conflicts with the rebuild handoff's promise of a separate store for another environment.
2. **High, high confidence — there are two deployment paths.** The repository instructions name Vercel CLI as canonical, while the Vercel project is Git-linked and has deployments associated with Git refs. The latest listed deployment is an errored deployment from a Claude branch; a successful production deployment is associated with `main`. Pushes may cause builds/deployments independently of a CLI invocation. Automatic deployment settings were not exposed by the read-only project metadata, so their precise behavior remains unverified.
3. **High, high confidence — local Claude permissions contain stale, broad Git mutations.** The globally ignored `.claude/settings.local.json` allows checkout, merge, commit, push, revert, remote, and wildcard Git commands. Several entries refer to `wedding-rsvp` paths/branches despite this being `wedding-site`. This file was inspected as project material; none of its commands or hooks were run.
4. **Medium, high confidence — environment documentation and configured variables do not match the checked-in app.** `.env.example` advertises Resend and a public URL; Vercel also has Google and Resend variable names. The scanned app source reads `ADMIN_PASSWORD` and `BLOB_READ_WRITE_TOKEN`; no Resend, Google, or DeepSeek integration appears in this checkout.
5. **Medium, high confidence — the Vercel environment is more specific than the checked-in platform config.** The Vercel project reports Next.js and Node 24.x, while the repository has no `vercel.json`, `vercel.ts`, runtime pin, `engines` declaration, CI workflow, or test tree. `next.config.ts` only configures image formats.

## Findings

### A1 — Preview and production share public photo storage

- **Severity / confidence:** High / High
- **Facts:** Vercel project `alice-rudolph-2026` has a Blob store named `alice-rudolph-photos`. Read-only store metadata reports it as public, available, with 167 objects and 324,999,630 bytes. Its project metadata lists both `production` and `preview`; Vercel variable metadata (read with decryption disabled) also targets `BLOB_READ_WRITE_TOKEN` and `BLOB_STORE_ID` at both environments. Application upload uses Vercel Blob in [app/api/photos/upload/route.ts](../../app/api/photos/upload/route.ts#L16) and [components/ChallengeAlbums.tsx](../../components/ChallengeAlbums.tsx#L120); storage listing and deletion use that store in [lib/photo-store.ts](../../lib/photo-store.ts#L30) and [app/api/photos/admin/delete/route.ts](../../app/api/photos/admin/delete/route.ts#L16).
- **Impact:** Preview uploads can land in the live public store and appear beside production photos. An unintended preview/admin action can affect production data. This is the clearest data-preservation issue for rebuilds.
- **Suggested verification/owner:** Vercel project environment bindings and Blob store attachment own the live binding; `lib/photo-store.ts` and upload/delete route behavior own application access. Before any preview, a Vercel admin should provide a non-secret read-only export of environment targets and attached stores. Decide whether previews need an isolated store; do not change bindings in this audit.

### A2 — CLI and Git integration compete as deployment entry points

- **Severity / confidence:** High / High that both paths exist; Medium that each push auto-deploys
- **Facts:** [AGENTS.md](../../AGENTS.md#L34) and [spec/README.md](../../spec/README.md#L12) designate Vercel CLI. Vercel project metadata identifies a GitHub link to `AgentShelly/wedding-site`. Deployment metadata includes `main` production deployments and an errored deployment for `claude/elegant-sagan-Oid3y`. No `.github/workflows/` directory exists in the checked-out tree or GitHub contents listing for `wedding-updates`; GitHub rulesets returned an empty list. Branch-protection reads for `main` and `wedding-updates` were denied (403), so protections remain unknown.
- **Impact:** A push or merge can trigger deployment independently of the documented CLI. Current approval gates therefore do not yet control every path into Vercel. The newest listed deployment is in `ERROR` state; the audit did not read deployment logs.
- **Suggested verification/owner:** Vercel project Git/deployment settings own automatic build triggers; GitHub branch/ruleset settings own merge protections. A read-only Vercel project-settings export and GitHub branch-protection export are needed. Then approve one canonical path and align the other path to it before any push/merge/deploy. The precise automatic trigger is **unverified**.

### A3 — Imported Claude local settings permit unrelated Git writes

- **Severity / confidence:** High / High
- **Facts:** [.claude/settings.local.json](../../.claude/settings.local.json#L3) has only a `permissions.allow` key. Its entries allow `git checkout`, `git merge`, `git commit`, `git push`, `git revert`, remote mutation, and wildcard `git add *`, `git commit *`, and `git push *` (lines 8–33). Some path arguments name `wedding-rsvp` files; the current repository is `wedding-site`. Git's global ignore file excludes this local settings file. No `CLAUDE.md`, `.mcp.json`, `.claude/hooks/`, or hooks/MCP key was found in the repository inventory.
- **Impact:** The permission list is stale, broader than this audit's authorization, and unsafe as a source of authority. Its contents do not supersede user instructions. No listed command was executed.
- **Suggested verification/owner:** Repository-level policy belongs in root `AGENTS.md`; Claude-specific permissions belong in explicitly reviewed local Claude configuration, with narrow repository-specific commands. A safe sanitized export of any user-level Claude MCP/hooks configuration is needed only if those settings affect this checkout. Do not execute imported hooks.

### A4 — Vercel variables and `.env.example` advertise integrations absent from source

- **Severity / confidence:** Medium / High for checked-in source; Medium for intent
- **Facts:** [`.env.example`](../../.env.example#L1) lists `RESEND_*` and `NEXT_PUBLIC_SITE_URL`. Vercel environment metadata includes `RESEND_*`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and `GOOGLE_SHEET_ID_*` names (values were not decrypted or copied here). Searches of checked-in application source found reads of `ADMIN_PASSWORD` and `BLOB_READ_WRITE_TOKEN` only; no Resend, Google Sheets, or DeepSeek code/dependency was found. `NEXT_PUBLIC_SITE_URL` had no application reference. The earlier workflow instructions say DeepSeek is the default provider, but that behavior is not represented by the audited source.
- **Impact:** Operators may provision stale or unrelated variables and assume missing integrations are live. Environment exports and `.env.example` can drift independently.
- **Suggested verification/owner:** `package.json` plus source should own actual integrations; `.env.example` should mirror only variables used by the checked-in application. Vercel variable names/targets should match that contract. Confirm whether the Google/Resend/DeepSeek configuration belongs to another omitted application or was carried over before changing any values.

### A5 — Public URL has multiple candidates

- **Severity / confidence:** Medium / High
- **Facts:** [`.env.example`](../../.env.example#L6) names `https://aliceandrudolph.com`; printable assets hardcode `alice-rudolph-2026.vercel.app` in [public/photo-handout-tent.html](../../public/photo-handout-tent.html#L262) and [public/photo-challenge-card.html](../../public/photo-challenge-card.html#L274). Read-only Vercel project-domain metadata lists verified `alice-rudolph-2026.vercel.app` and `wedding-site-inky-six.vercel.app`; `aliceandrudolph.com` was not among those project domains. No source consumes `NEXT_PUBLIC_SITE_URL`.
- **Impact:** The configuration example, printable handouts, and assigned Vercel domains can point users at different origins.
- **Suggested verification/owner:** Vercel project domain assignment owns the actual serving domains; approved public URL intent belongs in `spec/`; printable sources should derive or be checked against the approved public origin. Confirm the intended canonical URL and aliases with the domain owner before DNS or content changes.

### A6 — Runtime and command contract is incomplete

- **Severity / confidence:** Medium / High for observed files
- **Facts:** [package.json](../../package.json#L5) defines `dev`, `build`, `start`, `lint` (`next lint`), and `typecheck`; it has no `test`, `engines`, or deployment command. [package-lock.json](../../package-lock.json#L1) is npm lockfile v3. Vercel project metadata reports Node 24.x. No `.nvmrc`, `.node-version`, Dockerfile, or CI workflow was found. `next.config.ts` only sets image formats. `playwright-core` is used by the standalone scratchpad PDF generator, not by a test suite. No test source files were found. The `next lint` command's compatibility with installed Next 16 was not executed or verified.
- **Impact:** A rebuild has no repository-pinned runtime contract, CI proof, or test suite; the lint command may not be valid for this Next major. The Vercel Node setting is currently the only observed runtime pin.
- **Suggested verification/owner:** `package.json` and `package-lock.json` own package/runtime constraints and scripts; Vercel project settings should match the approved runtime. Confirm CLI compatibility from official Next 16 docs or a separately authorized validation stage. Keep future tests in the existing test tree (none currently exists); do not add tests as part of this audit.

### A7 — Tracked PDFs survive the global ignore rule

- **Severity / confidence:** Low / High
- **Facts:** `.gitignore` ignores `*.pdf` at line 18, but [public/photo-challenge-card.pdf](../../public/photo-challenge-card.pdf) and [public/photo-handout-tent.pdf](../../public/photo-handout-tent.pdf) are already tracked. The scratchpad generator writes a PDF to `scratchpad/` and uses a fixed local Chrome and repository path in [scratchpad/make-pdf.mjs](../../scratchpad/make-pdf.mjs#L3).
- **Impact:** The ignore pattern prevents new untracked PDFs from being added but does not remove already tracked deliverables. This may be intentional because the public PDFs are downloadable site assets.
- **Suggested verification/owner:** The public HTML/PDF handouts are authored content/assets; `scratchpad/make-pdf.mjs` owns local PDF generation. Confirm the two public PDFs are intentionally shipped assets before any later artifact policy cleanup. No files were removed.

## Structure and runtime inventory

| Area | Observed facts | Canonical owner recommendation |
|---|---|---|
| Entry points | Next App Router; `/` in `app/page.tsx`, `/photos`, `/gallery`, `/gallery/admin`, and API routes under `app/api/photos/**` | `app/` route files |
| Photo behavior/data | Album names, upload size/type limits, path mapping in `lib/photos.ts`; Blob reads, uploads, deletes, zip and URL-list endpoints | `lib/photos.ts` plus owning API route; Blob remains data store |
| Runtime/framework | Next 16, React 19; Vercel reports Node 24.x; no repo engine pin | `package.json` for approved runtime constraint, mirrored in Vercel project settings |
| Dependencies | `@vercel/blob`, `archiver`, Next, React, zod; dev dependencies include TypeScript, Tailwind, Playwright Core and types | `package.json` for declared dependencies, `package-lock.json` for resolved npm tree |
| Tests/CI | No test tree or test script; no GitHub workflows in local tree or remote branch root listing | Existing test tree if established later; otherwise document test gap in `review/`; CI workflow only after approval |
| Native config | `next.config.ts` configures AVIF/WebP; `postcss.config.js`, `tsconfig.json`; no tracked Vercel config file | Framework-native config in repository; Vercel project settings own external platform values |
| Deployment | Vercel Git-linked project and multiple Git-ref deployments observed; CLI is documented; exact automatic trigger setting unknown | One approved entry point, enforced jointly by Vercel deployment settings and documented Git gate |
| External media | Fonts via `next/font/google`; background music via Cloudinary URL; wedding video/poster via public Vercel Blob URLs | Component source owns embed URLs; provider stores own media and access |
| Environment | Code reads admin password and Blob token; Vercel metadata has additional Google/Resend variables; values intentionally not read | Source defines required names; Vercel stores per-environment secret values |
| Claude material | Only `.claude/settings.local.json` found; globally ignored; allow list contains stale Git mutation permissions; no hooks/MCP config file found | Root `AGENTS.md` for repo rules; reviewed local Claude settings for tool permissions |

## Git and secret-risk evidence

- Before this audit, Git reported `wedding-updates...origin/main` with no tracked modifications; earlier requested docs were untracked and preserved. Current HEAD is `ff0608e7f11700bf19b7bd144ee699428179dedd` (2026-09-28).
- `.env.local` exists locally but is ignored; it was not opened, copied, searched, or printed. `.vercel/` exists and is ignored; its local linkage metadata was not opened.
- `git ls-files` showed `.env.example` but no `.env.local`, credential/key-named JSON file, or environment secret file. The filename `instant-icon-497208-h2-e80600283320.json` is ignored, not tracked. A path-only Git history query for `.env*`, private-key, service-account, and credential filenames returned no matching history.
- Vercel environment metadata was requested with `decrypt=false`. Secret values were not requested, copied, or included in this report. The audit did not run a secret scanner and makes no claim that every historical blob or secret is clean.

## External state read and limits

- Vercel read-only metadata confirmed the `alice-rudolph-2026` project is Next.js on Node 24.x; it is Git-linked to `AgentShelly/wedding-site`. The latest listed deployment is an error on a Claude branch; a listed ready production deployment points to `main` at this checkout's HEAD. The public photo Blob store is active, attached to this project in production and preview, and contains 167 objects.
- GitHub contents on `wedding-updates` showed no `.github` entry; `.github` and `.github/workflows` reads on `main` returned 404. Repository rulesets returned an empty array. Branch protection API requests returned 403 (`Resource not accessible by integration`), so protections are not known.
- Vercel project Git auto-deployment settings, deployment logs, GitHub repository settings not exposed by the connector, any domain registrar/DNS records, secret values, Blob object contents, and production app behavior were not inspected.
- No project code, hooks, scripts, tests, build, or install ran. This is a documentation/configuration audit, not runtime, security penetration, secret-scanner, dependency-vulnerability, or production-data validation.
