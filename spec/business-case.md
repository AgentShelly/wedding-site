# Business case — architecture decision proposal

Date: 2026-11-02, Asia/Singapore. This is the authoritative approved static design for local implementation, as recorded in [the approval index](README.md#approval-record). The user's zero-total-cost and minimal-downtime constraints remain fixed. Vercel account feasibility, paid-resource lifecycle, preview, production, and external data actions are not authorized by this design approval.

## Purpose and user decisions

Observed product: Alice and Rudolph's wedding site with a public photo album and phone uploads. Guests view/download originals; an owner manages/export/deletes photos. Inferred benefit: preserve easy access to wedding memories without introducing a new operating burden. Wedding date displayed in source is 12 September 2026; continued archival use is plausible but **inferred**, not a reason to remove uploads automatically.

User's answers in this stage:

| Decision | Answer / consequence |
|---|---|
| Downtime | Any time frame; minimal preferred. No fixed blackout given. Propose no planned outage and recovery within 5 minutes; both numerical targets require approval and rehearsal. |
| Hard spend | **0 total charges, including existing services**, confirmed in follow-up. Shared Pro fees cannot be ignored as sunk cost. |
| Ownership | User owns Vercel project. Team billing rights, immutable IDs, Blob ownership, DNS, media and other account access still need explicit evidence/access scope. |
| Required journey | **View/download existing album only**, confirmed in follow-up. Uploads/admin are outside the target runtime; preserve existing bytes. |
| Retention/backup | “Not essential.” No mandatory schedule specified; this does **not** authorize losing/deleting existing data. Automatic retention/deletion is not added. |
| Region/security | No special constraints stated. Preserve audited public access and existing region; no security downgrade. |
| Providers/models | Permission to evaluate and change both. No provider/model change selected: album has no AI requirement. Permission does not authorize deployment, purchases or data transfer. |

## Candidate selection and value

Select a **static album built with the existing Next.js stack**, retaining the same production project, Blob store and public photo URLs. Build from a validated owner-approved manifest; retire uploads/admin/server ZIP and runtime secrets. Use the single guarded CLI release path. An eligible free Hobby scope and same-resource preservation are prerequisites, not verified account facts. Separate synthetic preview resources need approval; no production test credentials. Add no database, queue, AI/auth/monitoring/cache service.

This removes per-visitor function/list work and unnecessary write/auth surface, at the cost of manual freshness and free-quota availability limits. A free Hobby destination may support low usage but cannot promise unlimited access. The existing Pro setup is a **no-go under zero-total budget**. No downgrade, transfer, cancellation or new resource is authorized to resolve this automatically. Project and Blob transfer are separate lifecycle operations; shared-team effects and remaining bills must be reviewed.

The earlier minimal-change dynamic rebuild remains a comparison, rejected after scope clarification. A VPS/container move adds patching, TLS, backup and a fixed bill. See [option analysis](../review/analysis/optimization-analysis.md), [cost model](../review/analysis/cost-model.md) and [ADRs](decisions/README.md).

## Benefits, risks and explicit trade-offs

| Dimension | Benefit sought | Cost / remaining limit |
|---|---|---|
| Deployment speed | Remote native Next build, staged production check, reuse warm build cache where compatible | Gating/isolation/checks lengthen release; no measured build baseline. No guaranteed seconds-to-deploy claim. |
| Reliability | Keep known Blob paths/project, avoid a data migration, distinguish storage outage from empty gallery | Photo delivery still depends on Blob; free-quota exhaustion may pause access. No availability SLA established. |
| Cost | No new runtime services; direct media delivery; no runtime auth/functions/listing | Existing Pro/Blob and tests can bill. Strict zero total conflicts with public Pro list fee. Static can reduce functions/listing but cannot eliminate storage/traffic costs. |
| Portability | Next/npm source and manifest-based exports remain understandable outside Vercel | Blob SDK/token protocol, hostnames, domain routing and platform release controls remain Vercel-specific. No speculative adapter layer. |
| Maintenance | One release interface, no second CI deployment mechanism, existing source owners | Manual owner checks/lease and external exports remain necessary; new wrapper must be tested. No automated recreation of accounts/data. |
| Security/data | Preserve data and schema, isolate tests, redact logs, keep server secrets off client | Public images/uploader slugs and historical cached URLs stay public. Legacy writers and issued tokens need separately approved retirement. |

## Effort and cost estimate

Planning estimates, not commitments; one experienced engineer, 6 productive hours/day; excludes account-access waiting and any incident/data repair. Work is bounded in [implementation handoff](handoffs/implementation.md).

| Work | Estimate |
|---|---:|
| Resolve owner/billing/target/trigger evidence and final scope | 2–4 hours |
| Release wrapper, target/drift/lock checks and failure recovery | 8–14 hours |
| Runtime/tooling failure handling and focused album/security checks | 5–9 hours |
| Isolated E2E, recovery rehearsal and evidence/docs | 5–9 hours |
| **Live-read rebuild total** | **20–36 hours** |
| Selected static snapshot, old-writer retirement and lifecycle proof | +4–8 hours over comparison estimate |
| **Selected static total** | **24–44 hours**, excluding external waiting/unsupported-transfer complications |

Labour fee is unknown; paid labour is not funded by the 0 one-time limit. Current-approach monthly scenarios show USD 0.35 / 3.37 / 51.07 gross metered usage before delivery/fixed fees/credits/exclusions; Pro publicly starts at USD 20/month. The selected static scenarios use 6 / 60 / 600 GB Blob delivery monthly before retries; only low potentially fits the documented 10 GB Hobby allowance, subject to all other/shared quotas. Target cash cost is **USD 0 within verified free quotas**. Base/high require service pauses or a new capacity/budget decision. No charge-free transition or unlimited free access is claimed.

## Approval boundary

Review the complete [deployment contract](deployment-spec.md), [acceptance criteria](acceptance-criteria.md), cost model and ADRs. Approving the design/cost/downtime stage does not authorize implementation, account access, validation scripts, commit/push/PR, preview, production, resource changes or data-affecting operations. Those actions retain their separate gates. Unverified free-tier/billing/ownership feasibility, canonical origin and numerical targets are release blockers, recorded in the current handoff.
