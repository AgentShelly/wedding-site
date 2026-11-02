# ADR 003 — Preserve bytes and separate recovery domains

Status: approved as the preservation and recovery contract for local implementation 2026-11-02; all external data/resource operations remain separately gated.

Readers/writers: dynamic home/gallery/admin and export routes read Blob; browser uploads and admin delete write. Path schema supports current album/name paths and legacy name paths. No database exists. Project/store IDs and public hosts are external identities, not reproducible names.

Decision: no production object copy/rename/overwrite/delete or schema migration. Inventory and freeze legacy writers under explicit credential/deployment approval; complete two matching listings, capture protected manifest and any separately approved byte backup, then build static album. Preserve current/legacy reader compatibility. Public URL validity and same-store identity are prerequisites for any ownership transfer; otherwise stop. No implicit cleanup after migration.

Retiring new upload routes does not retire old deployment URLs or issued tokens. Record token lifetime, all consumers and credential revocation effects. Future static readers need no token; old dynamic deployments may cease to be valid rollback targets. Never revoke a shared key blindly or execute a production test write.

Recovery domains: application rebuild is static code/config/manifest reproduction against existing bytes. Code rollback changes serving artifact/aliases only. Credential revocation, project/store transfer, billing change, uploads/deletes and data effects need their own recovery. DR requires bytes/metadata/ownership and often new URL mappings; manifest alone cannot restore photos. Provider transfer rollback and hostname preservation are not guaranteed by a Git revert.

Backup choice: user says retention/backups not essential; no automatic scheduled/paid backup selected, existing bytes retained. Expose irrecoverability without independent bytes; obtain explicit operation-specific risk acceptance or a verified backup before risky lifecycle actions. Synthetic restore checks do not prove production backup completeness.

Rejected: server ZIP as complete backup (skips errors/timeouts), new production store/re-upload as default, deletion to fit free quotas, treating 167 objects as 167 originals, assuming project transfer includes Blob, and claiming a code rollback undoes migration/external side effects.
