# Evidence index — 20261102T215629Z

All paths below are repository-relative unless marked as local ignored artifacts. This index contains no credentials, photo bytes, account exports, or private production data.

| Evidence | Location | Use and limits |
|---|---|---|
| Approved behavior and thresholds | `spec/acceptance-criteria.md` | Canonical acceptance baseline; thresholds remain proposals unless marked otherwise |
| Static design and approval record | `spec/README.md` | Scope and separate release gates |
| Active starting handoff | `spec/handoffs/current.md` | Pre-run branch, commit, constraints and remaining gates |
| Prior fixture build record | `review/validation/local-static-build.md` | Earlier implementation evidence; not fresh-checkout or live proof |
| Unit test sources | `tests/photo-store.test.mjs`, `tests/release.test.mjs` | Synthetic manifest, release guard, health, lock and redaction cases |
| Synthetic input | `tests/fixtures/album-manifest.json` | Reserved `.example.test` origin; not production inventory |
| Release wrapper and target allowlist | `scripts/release.mjs`, `release-targets.json` | Local CLI negative guard; real target IDs intentionally unavailable |
| Current run result | `test-results.json` | Machine-readable statuses, environment, commands and limitations |
| Current run narrative | `summary.md` | Expected/actual evidence and gate summary |
| Current cost evidence | `cost-estimate.md` | No runtime cost measurement; approved scenarios retained |
| Static exported artifacts | Local ignored `out/` | 68 generated files from synthetic fixture; not committed or production material |
| Browser service snapshot/log | Not retained | Tool-generated YAML snapshots and console logs were removed after review; the synthetic gallery/dialog observation and image-host limitation are summarized in `summary.md` |

No raw account export, deployment log, photo, browser installation, screenshot, or provider output is included in Git. Evidence status distinguishes local synthetic results from unavailable external checks.
