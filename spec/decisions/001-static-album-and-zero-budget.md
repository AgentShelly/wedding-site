# ADR 001 — Static album under a zero-total budget

Status: approved for local implementation 2026-11-02; external feasibility and lifecycle gates remain.

Context: user requires access/view/download of existing album only, no special region/security constraints, minimal downtime, zero total charges including existing services. Existing source is dynamic Next + public Blob on an audited Pro team. AI permission is broad but no AI workflow exists.

Decision: retain Next/React and existing photo paths/public URLs; build static album pages from a validated owner-approved manifest. Remove new-build uploads/admin/server ZIP and runtime storage/auth secrets. Keep `/`, `/photos`, `/gallery` usable. No automatic music/video requests in required journey. Target existing project and same production Blob store in a verified eligible Hobby scope using separately approved native transfers if necessary. No new storage by default. Account ownership, quotas, URL continuity and elimination of attributable paid obligations must be established before apply. If unavailable, no-go; do not relax 0 budget silently.

Why: static viewing removes server auth/token/listing and cache invalidation from the required journey. At low usage, documented free quotas may suffice, but account-specific capacity and actual media demand are unknown. Availability may pause under quotas; this requires acceptance. No promise of unlimited free hosting or an automatic refund of past charges.

Rejected/deferred: unchanged rebuild retains audited risks/cost; dynamic optimized rebuild preserves unnecessary write/session surface; caching adds consistency work for a read-only archive; replacing Next/static framework adds conversion work with little benefit; VPS adds operator burden and a fixed bill; new storage/provider means a data/URL migration. Paid monitoring/auth/AI not justified. Hobby trial/credit tricks are not durable zero-total compliance.

Consequences: manual snapshot refresh rather than live uploads; code rollback cannot restore revoked credentials/team billing. Free-tier lifecycle is a separate risky/owner-controlled change. Existing public photos remain public. No mandatory paid backup, so DR is not guaranteed. Exact publication origin and lifecycle sequence await verified external facts. Implementation effort/cost assumptions require review.
