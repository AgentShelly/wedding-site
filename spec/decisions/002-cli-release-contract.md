# ADR 002 — One CLI entry point with a guarded lifecycle

Status: approved for local implementation 2026-11-02; no target IDs, account access, or deployment are authorized yet.

Decision: `scripts/release.mjs` is the single repository release interface and delegates deploy/promote/rollback to the pinned Vercel CLI from root. Offline plan/check, explicitly approved apply and authorized read-only verify have separate capabilities. Explicit preview default/target IDs, native config, sanitized receipts, drift comparison, staged production, pre-promotion health, bounded execution and unknown-outcome reconciliation are mandatory. Target IDs remain blank pending T1. See deployment spec for the complete contract.

Concurrency: one authorized operator/host, owner-enforced remote lease/disabled alternate triggers, atomic local lock and immediate pre-mutation remote fingerprint check. Local locking does not solve cross-host concurrency. Stop if exclusivity cannot be enforced. No database/Redis lock service added for this manual album release.

Rejected: bare undocumented commands cannot enforce target/drift/approval safety; a separate GitHub deployment pipeline conflicts with the chosen entry-point rule; Terraform/provision-everything adds resource lifecycle surface; script that recreates stores or resets drift is unsafe; automatic retries after deployment timeout can duplicate work; a local lock presented as a distributed lock is incorrect.

Consequences: release checks take time and CLI version compatibility must be proven. Account lifecycle/security operations remain documented manual exceptions, not opaque deploy steps. No script grants its own permission. The local wrapper requires current external approval evidence and refuses non-interactive apply; real targets and cross-host lease are not yet verified.
