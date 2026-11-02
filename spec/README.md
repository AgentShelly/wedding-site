# Approved intent

This folder is the source of approved requirements for rebuilding this repository. Record design decisions here only after the relevant design/cost approval. Implementation belongs in application source, scripts, or native platform configuration; evidence belongs in `review/`.

## Rebuild objective

Rebuild the existing wedding site deployment through the single canonical Vercel CLI entry point, retaining the existing production project, production data, and provider integrations. DeepSeek remains the application's default API provider. Do not choose an exact model without approval.

## Deployment and data constraints

- Reuse the approved existing Vercel project and its existing production Vercel Blob store. Confirm identities before an authorized deployment. A rebuild must not create, replace, clear, or migrate production storage.
- Canonical entry point: Vercel CLI from the repository root, linked to the approved project. `vercel deploy` creates a preview; `vercel deploy --prod` targets production. The command is not authorization: the separate approval gates in [AGENTS.md](../AGENTS.md) apply.
- Before push or merge, inspect automatic Vercel and GitHub triggers. Record whether either action could deploy or run workflows. Obtain the required approval before proceeding.
- Any different environment requires approval and a separate Vercel project and non-production Blob store. Configure that environment's `BLOB_READ_WRITE_TOKEN` and `ADMIN_PASSWORD` there. Never connect a non-production app to production photo storage.
- Source currently reads `BLOB_READ_WRITE_TOKEN` and `ADMIN_PASSWORD`. Confirm source usage before treating other example or platform variables as required; `.env.example` includes Resend and a site URL, but their use was not established during this documentation pass.
- Do not access provider accounts or deploy as part of documentation work. Environment values must be set through the approved provider workflow and must never be committed.

## Approval record

Design/cost, implementation, commit/push/PR, preview/merge, and production/paid/DNS/data-affecting actions are separate gates. Record the specific approval and its scope in the stage handoff before taking the corresponding action. No such approvals were granted by this document's creation.
