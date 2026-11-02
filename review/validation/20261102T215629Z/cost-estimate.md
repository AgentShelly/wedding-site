# Cost estimate update — validation run 20261102T215629Z

## Approved assumptions retained

The accepted cost assumptions and low/base/high scenarios remain exactly as recorded in [the approved cost model](../../analysis/cost-model.md). This validation did not change demand, retry, cache, storage, transfer, build frequency, free-tier quota, price, or provider/model assumptions. Existing estimates are proposals, not account measurements or approvals to spend.

| Cost signal | Low | Base | High | Evidence/status |
|---|---:|---:|---:|---|
| Local synthetic unit tests | 12 tests | 12 tests | 12 tests | Measured in this run; test count has no service-billing conversion |
| Local synthetic static build | 1 build | 1 build | 1 build | Measured local run only; no provider build charge observed |
| Live album sessions / successful user workflows | Unknown | Unknown | Unknown | No live traffic telemetry |
| Photo delivery / storage / CDN / origin transfer | Unknown | Unknown | Unknown | No real photo URLs or provider usage accessed |
| Database / paid auth / monitoring | Not applicable in static app source | Not applicable | Not applicable | No selected database/auth/paid monitor; account bills remain unknown |
| DeepSeek API calls and input/output/cache tokens | 0 app calls by design | 0 app calls by design | 0 app calls by design | No AI integration or live request; this is not an account bill or provider-cost test |
| Total account charges | Unknown | Unknown | Unknown | No billing account accessed; user constraint remains $0 total |

## Cost per successful core workflow

No live successful guest workflow, bandwidth, cache-hit rate, or bill was measured. Cost per successful production view/download remains **unknown**. Keep the model's conditional free-quota marginal figure and scenario allocations clearly labelled as estimates; do not treat this local fixture test as operational unit-cost evidence. The local browser test did not retrieve an original photo and did not create a provider request.

Build compiler/generation timings from a local synthetic run measure local execution only. They do not predict Vercel build minutes, deployment charges, storage/CDN usage, or service availability.

## Uncertainty and excluded costs

Existing Pro charges, eligibility for any free plan, shared quota consumption, photo bytes/requests, transfer or account fees, domains, external media, taxes/FX, and future overage remain unverified. Under the approved zero-total-charge limit, base/high usage cannot be claimed serviceable until real account evidence proves otherwise. No paid fallback or automatic upgrade is allowed by the approved design.

Mocked/local checks show application behavior only. No live DeepSeek tokens, provider cache hits, AI API charges, or account costs were observed. Re-estimate only after separately approved, sanitized usage/billing evidence; any changed scenario assumptions require owner approval.
