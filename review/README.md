# Review record

Store dated, reviewable evidence of rebuild stages here. Keep approved intent in `spec/`, implementation in source/scripts/native configuration, and test sources in the project's existing test tree. Keep large artifacts, generated output, credentials, and production data out of Git.

The active written handoff is [spec/handoffs/current.md](../spec/handoffs/current.md). Update it after each stage and model/agent switch. It must state the exact next task so work can resume without chat memory. Record evidence paths and commands actually run; do not claim a check that was not performed.

Architecture-stage evidence, 2026-11-02: [optimization analysis](analysis/optimization-analysis.md), [cost model](analysis/cost-model.md), [official-source research](analysis/official-sources.md). These are analysis, not approved implementation intent or live account/usage proof. Historical `audits/` and `inventory/` remain intact; [current state](../spec/current-state.md) explains their dates and limits.

Validation recording rules are in [validation/README.md](validation/README.md). The local synthetic implementation evidence is in [local static build](validation/local-static-build.md) and [implementation log](changes/implementation-log.md). No deployment or provider-account evidence should be fabricated from repository inspection.
