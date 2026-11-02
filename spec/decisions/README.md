# Architecture decision register

Date: 2026-11-02. ADRs are approved for local implementation only; account/resource feasibility and release actions remain gated. Earlier preference for a live-read rebuild was superseded during analysis by the user's confirmed zero-total budget and view/download-only scope.

| ADR | Decision |
|---|---|
| [001 Static album and cost gate](001-static-album-and-zero-budget.md) | Static Next album; existing production store/URLs retained; eligible free scope required; no compliant deployment yet verified. |
| [002 Release ownership and safety](002-cli-release-contract.md) | Single wrapper delegates to Vercel CLI; read-only planning/checking distinct from approved mutations; explicit targets, locking/drift/recovery. |
| [003 Data and lifecycle](003-data-lifecycle-and-recovery.md) | No data migration/deletion; freeze old writers, snapshot, preserve legacy paths, separate transfer/rebuild/DR/rollback. |

Final contracts: [deployment](../deployment-spec.md), [acceptance](../acceptance-criteria.md). Evidence and rejected options: [optimization analysis](../../review/analysis/optimization-analysis.md), [cost model](../../review/analysis/cost-model.md).
