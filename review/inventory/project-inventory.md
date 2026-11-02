# Project inventory

- Inventory date: 2026-11-02 (Asia/Singapore)
- Checkout: `/Users/rudolph/alice-rudolph-wedding`
- Remote: `https://github.com/AgentShelly/wedding-site.git`
- Branch: `wedding-updates` tracking `origin/main`
- Evidence sources: tracked file metadata and source reads in this checkout, plus read-only Vercel/GitHub metadata recorded in [the initial audit](../audits/initial-audit.md). No provider was accessed again for this inventory.

## Applications and runtime

There is one application, a private Next.js App Router site named `alice-rudolph-wedding`. It serves the wedding home page, guest photo upload, public photo gallery, and password-protected gallery admin. It is not a monorepo. Routes are implemented under `app/`; shared photo rules and server helpers are in `lib/`; UI is in `components/` and route-local components.

| Concern | Current inventory | Evidence / ownership |
|---|---|---|
| Runtime/framework | Next.js `^16.2.6`, React and React DOM `19.1.0`. Vercel project metadata from the prior audit reported Node `24.x`. The repository has no `engines`, `.nvmrc`, `.node-version`, Dockerfile, or separate runtime config. | [package.json](../../package.json); Vercel metadata in [initial audit](../audits/initial-audit.md). Runtime setting is external to this checkout. |
| Package manager/lock | npm lockfile v3, `package-lock.json`. No `packageManager` field. Resolved direct packages: `@vercel/blob` 2.8.0, `archiver` 8.0.0, `next` 16.2.6, `react`/`react-dom` 19.1.0, `zod` 3.25.76; dev: Tailwind/PostCSS 4.3.0, TypeScript 5.9.3, Playwright Core 1.62.1, and listed type packages. | `package.json`, `package-lock.json`. `package.json` declares ranges; lockfile resolves them. No install was run. |
| Native configuration | Next image formats AVIF/WebP in `next.config.ts`; Tailwind/PostCSS in `postcss.config.js`; strict TypeScript with alias `@/*` in `tsconfig.json`. | These are the only tracked application build/config files found. No `vercel.json` or `vercel.ts`. |
| App entry points | `/` (`app/page.tsx`); `/photos` (`app/photos/page.tsx`); `/gallery` (`app/gallery/page.tsx`); `/gallery/admin` (`app/gallery/admin/page.tsx`). | Next App Router filesystem routing. |
| API entry points | `POST /api/photos/upload`; `POST /api/photos/admin/login`; `POST /api/photos/admin/delete`; `GET /api/photos/admin/urls`; `GET /api/photos/admin/zip`. | Route handlers in `app/api/photos/**/route.ts`. |
| Jobs/schedules | No cron routes, job queue, scheduled task, GitHub workflow, or package task runner was found. `scratchpad/make-pdf.mjs` is a manually invoked local asset generator, not an application job. | Package scripts, tracked paths, and repository inventory. No process was run. |
| Tests and CI | No test files/tree, test script, GitHub Actions workflow, or CI configuration appears in the tracked checkout. `lint` is configured as `next lint`; compatibility with Next 16 has not been checked. | `package.json`; tracked path inventory; GitHub workflow directory read from prior audit returned 404. |

## Dependencies and build/release commands

The `scripts` field in `package.json` is the command source of truth. These commands are listed, not executed:

| Command | Declared behavior | Notes |
|---|---|---|
| `npm run dev` | `next dev` | Local development server. |
| `npm run build` | `next build` | Production build. No CI invocation found. |
| `npm run start` | `next start` | Serve a built app. |
| `npm run lint` | `next lint` | Next 16 compatibility unresolved. |
| `npm run typecheck` | `tsc --noEmit` | TypeScript check. |
| `npm test` | Not defined | No test tree or test runner found. |
| `vercel deploy` / `vercel deploy --prod` | Documented in root `AGENTS.md` as preview / production CLI forms | Gated; the Vercel Git integration also has recorded Git-ref deployments, so this is not yet an enforced single path. No deployment was run. |
| `node scratchpad/make-pdf.mjs <basename> [size]` | Commented local PDF workflow | Not a package script; expects system Chrome and hardcodes the workstation path. Not executed. |

## Databases, storage, authentication, APIs

| Resource | Readers/writers and shape | Persistence, ownership, and code management |
|---|---|---|
| Vercel Blob `alice-rudolph-photos` | Browser client uploads public objects under `photos/<album>/<name>/<timestamp>-<random>.<extension>` and generated JPEG thumbnails under `thumbs/...`; server lists both prefixes, deletes an original plus derived thumbnail, and fetches originals for zip export. Album/path/type/12 MB file constraints are in `lib/photos.ts`. | External durable storage, public access. Vercel owns the store/binding and billing; code owns paths and CRUD. Prior read-only metadata showed 167 objects, about 325 MB, attached to this project in both production and preview. No migration or backup job is in code. Preserve contents. |
| Admin auth | `POST /api/photos/admin/login` compares the submitted password with `ADMIN_PASSWORD`; successful auth sets an HMAC-derived `wedding_admin` cookie with HttpOnly, SameSite=Lax, Secure in production, and 30-day max age. Admin page, delete, URL export, and zip check that cookie. | No user database or identity provider. The password remains a server environment value; cookie is client-held session proof. Auth code is `lib/admin-auth.ts`. |
| Databases | No SQL/NoSQL database, ORM, migration framework, schema files, or database connection code found. | None identified. |
| Queues/jobs | No queue package or durable job system found. | None identified. Uploads use direct client-to-Blob tokens rather than an app queue. |
| App APIs | Five same-origin Next route handlers listed above. Blob SDK calls are the only repository server storage API integration identified. | API behavior is managed in route source; Vercel hosts it. No OpenAPI/schema contract file found. |
| Email/Google APIs | `.env.example` and Vercel metadata name Resend variables; Vercel metadata also names Google service-account/Sheets variables. No corresponding client, SDK, `fetch`, or source variable read was found. | External account/resource ownership and actual use are unverified. Do not infer a working integration from variable presence. |
| DeepSeek/other LLM API | No DeepSeek endpoint, SDK, model configuration, request path, key variable, billing code, or LLM fallback was found in application source/dependencies. | The repo-level instruction says DeepSeek is the default API provider, but the checked app has no such integration. No account was checked. See [DeepSeek row in configuration matrix](configuration-matrix.md#deepseek-and-other-provider-settings). |
| Observability | No analytics, error-reporting, tracing, metrics, or logging dependency/configuration found. No structured telemetry path appears in app source. Vercel runtime/deployment logs are platform facilities but were not accessed. | Vercel owns platform logs/metrics; no app-level observability is configured in the tracked project. |

## External services and assets

| Service/resource | Use found in source | Persistence/dependency and management |
|---|---|---|
| Vercel hosting | Next.js app and API routes; project `alice-rudolph-2026` in team `Jarvis' projects` (`jarvis-tranquilovacationrentals`), linked to GitHub `AgentShelly/wedding-site`. | Vercel-managed runtime/deployments and team billing. Project settings are not represented by tracked native config. Prior metadata reports Node 24.x. |
| Vercel Blob | Guest photos/thumbs and remote wedding video/poster; photo data persists independently from deployments. | Store public; project store attachment is managed externally. Preview shares production store in the last metadata read. |
| Cloudinary | Background music URL in `components/MusicPlayer.tsx`. | External audio delivery; exact account owner/retention/billing not inspected. No local media copy. |
| Google Fonts | `next/font/google` imports Cormorant Garamond and DM Sans at build time. Handout HTML links Google Fonts directly. | Build/network dependency; no local font assets tracked. |
| Resend | Only environment-template and Vercel variable names; no app source usage. | Integration existence/ownership not established. |
| Google Sheets | Only Vercel variable names; no app source usage. | Integration existence/ownership not established. |

## Environment-variable names and stated purpose

No values are included. Application references below come from source. Platform-only names/targets were seen in the prior audit's read-only Vercel environment metadata with decryption disabled; do not interpret presence as proof of use.

| Name | Purpose indicated by source/template/platform metadata | Source / targets observed | Status |
|---|---|---|---|
| `ADMIN_PASSWORD` | Admin login password; HMAC cookie derivation | Source: `lib/admin-auth.ts`; prior Vercel metadata: development, preview, production | Used by app. Values were not read. |
| `BLOB_READ_WRITE_TOKEN` | Server Blob list/delete and Blob upload-token issuance | Source: `lib/photo-store.ts`, upload/delete handlers; prior Vercel metadata: preview and production | Used by app; preview currently binds to production store. Value was not read. |
| `NODE_ENV` | Next/Node environment; controls cookie Secure flag | `lib/admin-auth.ts`; framework-provided | Runtime-provided, not an app secret. |
| `BLOB_STORE_ID` | Vercel Blob integration identifies attached store | Prior Vercel metadata: preview and production | Platform-managed; source does not reference it directly. |
| `BLOB_WEBHOOK_PUBLIC_KEY` | Blob webhook verification public key according to Vercel metadata | Prior Vercel metadata: preview and production | Platform-managed; source does not reference it directly. Public-key value omitted. |
| `RESEND_API_KEY` | Transactional email key per `.env.example` comment | Template and Vercel metadata: preview/production | No source use found. Sensitive value omitted. |
| `RESEND_FROM_EMAIL` | Sender address per `.env.example` | Template and Vercel metadata: preview/production | No source use found. |
| `RESEND_NOTIFY_EMAIL` | Notification recipient per `.env.example` | Template and Vercel metadata: preview/production | No source use found. |
| `NEXT_PUBLIC_SITE_URL` | Site URL for redirects/meta per `.env.example` comment | Template only | No source read; printed handouts hardcode a separate Vercel URL. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service-account identity suggested by name | Prior Vercel metadata: preview/production | No source use found; sensitive configuration. Value omitted. |
| `GOOGLE_PRIVATE_KEY` | Private key suggested by name | Prior Vercel metadata: preview/production | No source use found; secret. Value omitted. |
| `GOOGLE_SHEET_ID_YES` | Sheet identifier suggested by name | Prior Vercel metadata: preview/production | No source use found. Value omitted. |
| `GOOGLE_SHEET_ID_NO` | Sheet identifier suggested by name | Prior Vercel metadata: preview/production | No source use found. Value omitted. |

The local `.env.local` exists but is ignored and was not opened. No `.env` values were printed. See [coverage and untracked treatment](coverage.md#git-coverage-and-file-treatment).

## Referenced resources outside the checkout

- The local PDF generator hardcodes `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` and `/Users/rudolph/alice-rudolph-wedding` in `scratchpad/make-pdf.mjs`.
- `.claude/settings.local.json` is globally ignored and contains local permission rules with stale `wedding-rsvp` path arguments; it is not tracked project policy.
- `.vercel/` local linkage and `.env.local` are ignored; their contents were not read.
- `components/MusicPlayer.tsx` points at Cloudinary audio; `components/TimelineSection.tsx` points at public Vercel Blob video and poster; `app/layout.tsx` uses Google-hosted fonts via `next/font/google`.
- Static handouts embed `alice-rudolph-2026.vercel.app`; `.env.example` separately names `aliceandrudolph.com`. Actual canonical public origin and DNS/TLS ownership still need confirmation.

Related maps: [request/deployment flow](deployment-map.md), [configuration matrix](configuration-matrix.md), and [coverage](coverage.md).
