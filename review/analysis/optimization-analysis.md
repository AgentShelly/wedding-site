# Optimization analysis — 2026-11-02

Analysis only. **Final user clarification: zero total charges including existing services, view/download only. Select D; the earlier B preference below is superseded.** Read [baseline](../../spec/current-state.md), [cost model](cost-model.md) and [official references](official-sources.md). Existing audit findings are evidence, not automatic change approval.

## Alternatives compared

| Option | Cost | Deployment speed | Reliability | Portability / maintenance | Decision |
|---|---|---|---|---|---|
| A. Rebuild unchanged | Lowest engineering effort; same listing/transfer/function cost, unknown bill | Fewest implementation steps, but build error/lint issue remains unexplained | Keeps shared preview store, competing trigger risk and empty-on-outage behaviour | Same dependencies and undocumented external state | Reject as releasable design; retain running production while approval is pending. |
| B. Minimal-change live-read Next + existing Blob | No new runtime service; modest release/check engineering. Persistent photo delivery still bills. Test isolation has usage costs | Native remote builds, no migration. Staging and checks add time; no measured build speed gain | Separates environments, blocks wrong target/drift, preserves data shape; Blob remains in each gallery read path | Least product change; moderate Vercel coupling. Manual owner lifecycle remains | Initially considered; rejected after read-only/zero-total clarification. |
| C. Add short-lived native Next gallery cache to B | Can reduce repeated paginated list calls, adds cache reads/writes/revalidation and invalidation work | Similar builds; more runtime validation | Can serve stale photos/deletes; must not cache errors as empty. Invalidation after direct uploads must be authorized and reliable | No new vendor required, but more consistency logic and framework coupling | Defer. Freshness requirement and live traffic unknown; no claimed savings. |
| D. Album-only static snapshot, existing public Blob | Eliminates viewer function/list operations; build lists once per snapshot. Storage/media egress persist | Faster serving, not necessarily faster build. New photos require snapshot+release | Album HTML survives listing outage; individual photos still depend on Blob. Snapshot completeness is a new release invariant | Simple long-term archive; removes runtime writes only with product approval. Manifest is portable, existing URLs are not | **Chosen candidate** after owner clarification; conditional on Hobby eligibility, same-resource/URL preservation and billing proof. No runtime edit authorized. |
| E. Move Next/container to self-hosted compute, retain/export media | Fixed machine minimum plus storage/transfer/backup; provider price not researched because no supported zero-budget destination selected | Provisioning/migration slower; later builds depend on chosen host | Operator owns OS, TLS, restarts, backups, monitoring. Single VM is a new failure domain | Better compute portability; higher operational load, Blob coupling persists unless separately migrated | Reject for current album scope/0 budget. Reopen only with a concrete owner-run destination and lifecycle budget. |

No alternative dominates all five dimensions. D removes unnecessary write/auth/listing work while accepting manual freshness and free-quota pauses. B leaves known running-cost drivers intact. D trades live features for fewer runtime moving parts. C trades freshness/simplicity for potential list savings. E trades platform dependence for operator responsibility. A is a safe no-change waiting state, not proof the audited hazards are acceptable.

## Behaviour and ownership before change

Readers: home preview, public gallery, admin gallery, URL list, ZIP. Writers: guest original/thumbnail uploads and admin delete. There is no database writer, job consumer, AI request path or migration runner. Schema is the Blob pathname plus object metadata; preserving both legacy and current path readers is the compatibility requirement. Owner password change invalidates every current admin bearer cookie; do not rotate it as a rebuild side effect.

At N originals and roughly N thumbs, each live request makes `ceil(N/1000) + ceil(T/1000)` list operations, then creates the full in-memory photo collection. Home uses only 12 afterward. This is an observed algorithmic cost, not evidence of a production latency problem. At high scenario N=20,000, 100,000 renders imply about 4M list operations. Cost table prices that instead of assuming “wedding scale” makes it free. Profile before introducing a query database, cached manifest, pagination redesign or worker.

Client thumbnail work avoids a server image pipeline and keeps photo upload off the function payload limit. Keep it. Pair writes and deletion are nontransactional. Partial state must be reported/reconciled without blind repair or production cleanup. User-initiated retries currently generate new names; repeatable release operations must not be confused with idempotent application writes.

## Platform and lifecycle constraints

- **4.5 MB function body limit:** 12 MiB files must continue direct client→Blob transfer. No server proxy upload. Token bodies remain small and validated. Runtime request bodies, malformed inputs and content metadata require bounds.
- **Export:** 300s ZIP declaration is not a guarantee for multi-GB output. Streaming, client disconnect, response limits and fetch timeouts need proof. Prefer per-object direct download + manifest; no queue/worker is justified solely to retain one-click ZIP.
- **Isolation:** never use the current production-bound Preview environment for tests. A separately approved test project/store, separate admin password and synthetic fixtures are prerequisites. Store creation may attach every environment by default; inspect final bindings explicitly. No create-store command belongs in routine release apply.
- **Compute/region:** retain Node 24 reported in audit, verify remote before pinning. sin1 store does not prove sin1 functions or data residency; region change is not selected. No large-bundle/beta/extended-timeout feature is needed.
- **Budget:** credit/Flat Rate CDN is team-shared; free quota does not mean unused quota. Public anonymous reads/downloads can be abused. Spend controls can interrupt album access and cannot prove exactly zero spend with in-flight traffic. Do not purchase a higher tier automatically.
- **Resources:** deleting a deployment does not delete Blob objects, cancel a team subscription or reclaim third-party assets. Recreating a store cannot preserve original hostnames/object URLs by assumption. Project/store names are not identity. Access revocation, deleted account, removed video/music, expired DNS or unavailable old deployment cannot be rebuilt from Git alone.
- **Triggers:** align Git auto-deploys/deploy hooks/CI with the single CLI path under a separate settings approval. Capture before/after evidence. GitHub protection visibility is not established by an empty ruleset response.
- **DR:** immutable asset URLs, retained bytes, metadata, domain control, credentials and a compatible runtime are all needed. A URL list or old code deployment alone is not DR. No backup schedule promised after user said retention is not essential; preserve existing bytes and record recovery limits explicitly.

## Comparison B improvements; selected D requirements

The following dynamic improvements explain option B, not work to add to D. D instead validates an immutable snapshot, emits static health metadata and retires runtime storage/auth/writes. Retain release safety, tooling, legacy-path compatibility and recovery controls. Guest auth/WAF/rate-limit services are not selected because writes are retired; old deployments still need approved credential retirement.

1. Release wrapper delegates to Vercel CLI; explicit immutable targets, staged production, scoped read-only preflight, drift diff, single authorized operator lease and local lock; no automatic resource creation/reset/deletion.
2. Health owns dependency failure: gallery empty is success only after a successful complete list. A sanitized dependency check bypasses error swallowing; outage makes candidate unhealthy. Missing config fails checks instead of blessing an empty gallery.
3. Reproducible Node/npm/CLI contract and repair of removed lint invocation. No framework/provider migration or speculative package updates. Tests use one approved tree (none exists yet; propose `tests/` once during implementation) and native Node where suitable; installed browser tooling only after authorized compatibility check.
4. Preserve album/lightbox/download, current/legacy paths and direct-upload architecture. If writes remain, include bounded input validation, deliberate guest authorization decision and shared rate controls supported by existing platform capabilities/budget; no in-memory limiter masquerades as cross-instance protection. Strict zero budget without adequate controls blocks enabling anonymous writes rather than silently accepting unlimited spend.
5. Reliable completeness evidence and recovery runbooks; no automatic data migration, renaming, deletion or cleanup.

## Source-of-truth cleanup proposal

Only through a later approved PR; **no archival/deletion/move performed now**. Keep source/history reviewable. Preserve existing audit/inventory reports byte-for-byte as dated evidence; their point-in-time path counts and findings should not be rewritten into current facts.

| Material | Classification | Approved-PR proposal / owner |
|---|---|---|
| Root `AGENTS.md`, `spec/README.md` | Replace outdated index wording where necessary | Keep one root workflow; index current design/approval record. Do not create nested agent files. `spec/` design is pending until approved. |
| `review/audits/*`, `review/inventory/*` | Archive logically, preserve paths/history | Keep all dated evidence with a current-state link; mark superseded claims in a new validation record rather than edit history. |
| `spec/handoffs/current.md` | Replace active content | Current resume state owns approvals/blockers. This stage replaces it as explicitly requested. `implementation.md` is a task plan, not a second active handoff. |
| `.env.example` | Replace | Mirror source-used variable names with blank placeholders and environment-safety guidance. Remove stale template Resend/site-URL lines only after feature owner confirms no missing intended integration. |
| Unused Google/Resend provider env/resource settings | Remove only after independent approval | No source use found does not prove no other consumer. Inventory readers, credential scope, resource owner and billing first; never revoke/delete during a deploy. Preserve sanitized evidence, never archive secret values. |
| Misleading upload-path/ISR/“cheap” source comments | Replace | Owning route/helper documents actual shape and dynamic behaviour; no behavioural migration hidden in comment cleanup. |
| `scratchpad/make-pdf.mjs` | Archive if retired; otherwise replace hardcoded paths | Owner confirms handout-generation need; preserve source in history. Not on release critical path. |
| Public HTML, QR and tracked PDFs | Replace together only if approved origin changes | Preserve currently shipped links/deliverables until confirmed. Never remove PDFs just because ignored by wildcard. Verify QR destinations during later asset validation. |
| Ignored generated scratch PDFs/build output | Remove from local disk only with owner approval | Never add them to PR. No data cleanup needed for rebuild. |
| Ignored `.claude/settings.local.json` | Replace locally, outside PR | Owner removes stale broad permission entries after separate review; no secret export or hook execution. PR can document review disposition only. |
| Unused dependency declarations | Remove if proven unused and approved | Trace imports/generator usage first. Preserve lock reproducibility; no broad dependency pruning in this stage. |

Decision gate: [business case](../../spec/business-case.md), [ADRs](../../spec/decisions/README.md), [deployment contract](../../spec/deployment-spec.md). Budget and journey scope are resolved. Account/free-tier/billing facts, origin and numerical targets remain unresolved; candidate D is not implementation authorization.
