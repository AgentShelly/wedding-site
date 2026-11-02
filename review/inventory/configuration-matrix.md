# Configuration matrix

Values are deliberately omitted. Application reads were verified from checked-in source. Vercel-only names and targets below come from the prior audit's read-only metadata with decryption disabled; this inventory did not access provider accounts again.

## Environment variables

| Variable | Purpose | Where referenced / configured | Environment targets observed | Requiredness / status |
|---|---|---|---|---|
| `ADMIN_PASSWORD` | Admin password and HMAC signing basis for gallery cookie | Read in `lib/admin-auth.ts`; Vercel env metadata | Development, preview, production | Required for admin login. Values omitted. |
| `BLOB_READ_WRITE_TOKEN` | Server-side Blob listing/deletion and upload token handler | `lib/photo-store.ts`, `app/api/photos/admin/delete/route.ts`, Vercel Blob integration | Preview and production | Required for photo features. Both targets share the same store in prior metadata. Value omitted. |
| `NODE_ENV` | Framework/runtime environment; controls Secure cookie flag | `lib/admin-auth.ts` | Runtime-provided | Platform/runtime variable, not a user-managed secret. |
| `BLOB_STORE_ID` | Identifies Vercel Blob store | Vercel-managed integration metadata | Preview and production | Not directly read by app source. Identifier value omitted. |
| `BLOB_WEBHOOK_PUBLIC_KEY` | Public key for Blob webhook signature verification | Vercel-managed integration metadata | Preview and production | No direct app reference found. Public key value omitted. |
| `RESEND_API_KEY` | Email API credential, per `.env.example` comment | `.env.example`; Vercel environment metadata | Preview and production | No source reference. Treat as stale/unverified. Value omitted. |
| `RESEND_FROM_EMAIL` | Sender address, per `.env.example` | `.env.example`; Vercel environment metadata | Preview and production | No source reference. Treat as stale/unverified. |
| `RESEND_NOTIFY_EMAIL` | Notification recipient, per `.env.example` | `.env.example`; Vercel environment metadata | Preview and production | No source reference. Treat as stale/unverified. |
| `NEXT_PUBLIC_SITE_URL` | Site URL for redirects/meta per template comment | `.env.example` only | No app runtime target confirmed | No source reference; hardcoded handout origin differs. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Google service account identity suggested by name | Vercel environment metadata only | Preview and production | No source reference. Account purpose/ownership unverified. |
| `GOOGLE_PRIVATE_KEY` | Google service account key suggested by name | Vercel environment metadata only | Preview and production | No source reference. Secret value omitted. |
| `GOOGLE_SHEET_ID_YES` | Google Sheet identifier suggested by name | Vercel environment metadata only | Preview and production | No source reference. |
| `GOOGLE_SHEET_ID_NO` | Google Sheet identifier suggested by name | Vercel environment metadata only | Preview and production | No source reference. |

The prior Vercel listing showed the names and environment targets, not usable secret values. Do not treat a listed variable as proof the current code consumes it. The ignored local `.env.local` was not opened. `.env.example` contains template values/placeholders only; this report does not repeat them.

## Vercel account/project configuration

| Item | Last read-only evidence | Owner / status |
|---|---|---|
| Team | `Jarvis' projects`, slug `jarvis-tranquilovacationrentals`, Pro plan | Vercel team owns account access/billing. No billing amounts or usage limits checked. |
| Project | `alice-rudolph-2026`, framework Next.js, Node `24.x`, linked repo `AgentShelly/wedding-site` | Vercel project settings own deployment/runtime configuration outside repo. Project details are from the previous audit and have not been refreshed. |
| Blob | Public `alice-rudolph-photos`, region `sin1`, active; 167 objects, 324,999,630 bytes; attached to production and preview | Vercel owns storage lifecycle, access, quota/billing and environment attachment. Preserve data; preview sharing is a high-priority unresolved issue. |
| Domains | Prior metadata listed verified Vercel hostnames `alice-rudolph-2026.vercel.app` and `wedding-site-inky-six.vercel.app`; project summary also returned generated branch/deployment aliases | Vercel owns project aliases/TLS settings; registrar/DNS records and certificate state were not checked. `.env.example` and handout HTML disagree on intended origin. |
| Git deployment | Project linked to GitHub; deployments associated with `main` and a Claude branch | Vercel project owns Git/build triggers and production branch. Exact auto-deploy settings not inspected. |
| Build/install settings | Framework reported as Next.js; app package defines `next build` | Remote build/install commands, root directory, build cache and ignored-build logic unverified. No `vercel.json`/`vercel.ts` tracked. |
| Protection/CI | No repo `.github` workflow; prior rulesets GET returned empty; branch-protection GET denied (403) | GitHub owns branch protection and Actions settings; protections remain unknown. |

## DeepSeek and other provider settings

The root repository instructions state DeepSeek is the default API provider and prohibit changing integrations or selecting a specific model without approval. The checked-in app does not implement that requirement:

- No DeepSeek endpoint, SDK, provider adapter, API route, model name, model environment variable, or billing/rate-limit code was found in application source or declared dependencies.
- No server-side DeepSeek credential handling was found. Do not add a key or assume a provider account exists based on the instruction alone.
- No model selection, fallback provider, retry policy, or DeepSeek rate-limit behavior is present in the inspected app.
- No app-level request throttle, provider quota, rate-limit handler, or billing guard was found. Vercel/DeepSeek quotas and billing assumptions were not checked.
- No DeepSeek account, usage, billing, quota, or API configuration was accessed. All such details remain unverified.
- The only similar fallback found is photo storage behavior: `lib/photo-store.ts` catches Blob list failures and returns an empty gallery. It is not a provider fallback and can mask storage outages.

Required safe verification: ask the owner to identify the intended DeepSeek integration/module or confirm the instruction is inherited from a wider workspace. If code exists outside this checkout, request the exact repository/path or a redacted source/config export. If DeepSeek is intended in this app, design and cost review must establish server-side secret storage, selected model (with separate approval), quotas, request limits, retry/fallback behavior, logging privacy, and costs before implementation. Do not access provider accounts until separately approved.

## Account checks needed, not performed

1. Vercel: read project Git repository link, production branch, auto-deploy and preview triggers, build/install/root settings, Node runtime, environment variable **names/targets only**, project domains/TLS state, Blob store attachment by environment, Blob access and backup/retention, project protection settings, team billing/usage and account ownership.
2. GitHub: read Actions workflow inventory, deployment environments/secrets *names only*, branch protection/rulesets for `main` and `wedding-updates`, required checks, PR/fork deployment rules, and repository integration status. The last connector read could not read branch protection.
3. Domain/DNS: confirm approved public hostname, registrar/zone owner, nameservers/records, Vercel domain verification and TLS certificates. No registrar access was used.
4. Provider accounts: only after explicit approval, confirm whether Google Sheets, Resend, and DeepSeek integrations exist and whether variables are current. Do not export or print secret values.

Safe exports should redact all environment values, private keys, tokens, passwords, webhook secrets, and user PII. Record only owner, resource identifier, enabled status, environment target, and relevant non-secret policy settings.
