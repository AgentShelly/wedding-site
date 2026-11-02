# Design and approval index

This folder separates approved architecture intent from existing workflow constraints and review evidence. The static view/download design is approved for local synthetic implementation as recorded below. Account feasibility, external lifecycle operations, preview, production, and Git publication remain separate approval gates. Implementation belongs in application source/scripts/native configuration; evidence belongs in `review/`.

## Architecture decision package and remaining gates

- [Business case](business-case.md): user decisions, chosen static album, effort and explicit cost/availability trade-offs.
- [Current state](current-state.md): factual baseline with historical audit references.
- [Deployment specification](deployment-spec.md): complete single-entry-point, resource lifecycle, secrets, snapshot, health, concurrency, recovery and manual-exception contract.
- [Acceptance criteria](acceptance-criteria.md): measurable proposed thresholds and required evidence, no fabricated baseline.
- [Architecture decisions](decisions/README.md), [optimization analysis](../review/analysis/optimization-analysis.md), [cost model](../review/analysis/cost-model.md), [dated public sources](../review/analysis/official-sources.md).
- [Implementation task plan](handoffs/implementation.md), **not authorization**; [current handoff](handoffs/current.md) owns active resume state.

Confirmed user constraints: existing-album view/download only; zero **total** charges including existing services; minimal downtime with any time frame acceptable; retention/backups not essential; no special region/security constraints; provider/model changes permitted but unnecessary. User owns Vercel project; broader rights/access remain unverified. Proposed static/free-Hobby target is conditional on same production project/store/data/URL continuity and actual free-tier/billing feasibility. Existing audited Pro service is not budget-compliant. No shared-team downgrade/transfer/cancellation/data change is authorized to resolve this automatically.

## Rebuild objective

Rebuild the existing wedding site deployment through the single canonical release wrapper delegating to Vercel CLI, retaining the existing production project and production data. Existing default-provider policy names DeepSeek; this stage's user explicitly permits provider/model evaluation and change, but no AI integration exists here and none is selected. The static/read-only feature retirement is approved for local implementation. Free-tier billing and lifecycle feasibility remain unverified and require later operation-specific approvals.

## Deployment and data constraints

- Reuse the approved existing Vercel project and its existing production Vercel Blob store. Confirm identities before an authorized deployment. A rebuild must not create, replace, clear, or migrate production storage.
- Canonical entry point: `npm run release -- <plan|check|apply|verify>`, which delegates to the pinned Vercel CLI from the repository root and requires explicit allowlisted targets. The command is not authorization: the separate approval gates in [AGENTS.md](../AGENTS.md) apply.
- Before push or merge, inspect automatic Vercel and GitHub triggers. Record whether either action could deploy or run workflows. Obtain the required approval before proceeding.
- Any different environment requires approval and a separate Vercel project and non-production Blob store. The old audited dynamic app used `BLOB_READ_WRITE_TOKEN` and `ADMIN_PASSWORD`; this branch removes those readers from the new build. Existing provider variables and already deployed old functions are not changed by local source cleanup. Test fixture provisioning/capture credentials remain separately scoped operator credentials. Never connect a non-production app to production photo storage.
- `.env.example` now documents non-secret build-time manifest path/origin inputs. It does not define Vercel public variables or justify changing account settings.
- Do not access provider accounts or deploy as part of documentation work. Environment values must be set through the approved provider workflow and must never be committed.

## Approval record

| Approval | Evidence | Scope |
|---|---|---|
| Static design + local implementation | User messages in this Codex conversation, 2026-11-02. First: “go ahead with your recommendation for static design.” Then: “Implement only the approved tasks on an approved feature branch/worktree.” | Local source/config/tooling/tests on `codex/static-album`, using synthetic fixtures. Preserve the $0 total spend and view/download-only design. No production/account access, actual Vercel account commands, resource changes, production data capture, preview/production deploy, DNS, external spend, commit, push, PR or merge. |
| Account feasibility and external lifecycle | Not approved. | T1 redacted billing/ownership/store continuity export, token retirement, production snapshot and any Hobby/project/store/domain transfer remain blocked. |
| Commit/push/PR, preview/merge, production/paid/DNS/data action | Not approved. | Separate later explicit approvals required. |

This approval supersedes the earlier “no design or implementation approval” status only for local synthetic work. The previous user directive “Perform only approved local/test actions” remains a hard boundary.
