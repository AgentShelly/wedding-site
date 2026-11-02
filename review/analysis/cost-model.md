# Cost model — design proposal, 2026-11-02

Status: approval required. User confirmed **0 total charges, including existing services**, and view/download-only scope. No implementation or recurring purchase is approved. All monetary examples below are USD excluding tax, foreign exchange, labour and existing third-party bills. Public rates are from [dated official research](official-sources.md), not this team's invoice. Zero estimated overage is not a zero-charge guarantee.

## Evidence and scope

- Prior audit: Pro team, public sin1 Blob, 167 objects / 324,999,630 bytes. Objects are not necessarily photos: originals, thumbnails and possibly media share storage. Do not derive photo count by halving 167.
- No observed live traffic, build durations, function CPU/memory, cache ratios, API token usage, invoices or remaining credits. No runtime tests performed in this stage.
- Database and paid auth: none in source. DeepSeek: no source integration. Their incremental application usage is **0 by design**, not an observed account bill of zero. Google/Resend/Cloudinary account charges remain unknown.
- Preserve production storage. A separate approved test project/store adds usage even if no platform subscription minimum is added. Synthetic tests are not free merely because their data is fake.

## Current-approach usage assumptions for comparison

These are capacity scenarios, not forecasts or accepted budgets. Monthly figures include production and test activity only if the owner assigns them within these totals; otherwise add test usage separately.

| Input | Low | Base | High |
|---|---:|---:|---:|
| Gallery/home renders V | 1,000 | 10,000 | 100,000 |
| Successful original uploads U, if retained | 100 | 1,000 | 10,000 |
| Extra attempts per success r | 1% | 5% | 20% |
| Retained originals at listing time N | 200 | 2,000 | 20,000 |
| Pages per prefix p = ceil(N/1,000), thumbs assumed similar | 1 | 2 | 20 |
| Average billed storage S (GB-month, includes existing objects) | 1 | 5 | 50 |
| Direct media requests R | 20,000 | 200,000 | 2,000,000 |
| App + Blob delivery (GB) | 5 | 50 | 500 |
| Cache-miss origin transfer O (GB), included in delivery above | 1 | 10 | 100 |
| Simple-operation miss ratio m | 20% | 20% | 20% |
| Builds B × rounded Basic minutes t | 2 × 3 | 8 × 5 | 30 × 10 |
| Admin API requests A / health requests H | 20 / 30 | 100 / 60 | 500 / 120 |

Uploaded original average 4 MB plus 0.1 MB thumbnail, decimal billing GB. End-of-month retained size and time-averaged billed size differ. HEIC fallback may transfer originals instead of thumbnails; no real mean size has been measured. Retained counts include historical content; optional uploads can be zero while N remains nonzero. Gallery prefetch/router refreshes and failures also count renders; V must include them. External video plays can dominate delivery: add plays × mean delivered bytes; video size and plays are unknown.

## Auditable equations and unit prices

Current live-read path, approximately one listing of each prefix per relevant render:

```text
upload attempts = U × (1 + r)
F = V + 4 × U × (1 + r) + A + H
  # up to two upload-token and two completion calls per photo pair; confirm SDK behaviour
advanced operations = 2 × V × p + 2 × U × (1 + r)
  # assumes single-part writes; add each multipart start/part/completion if used
simple operations = R × m + explicit HEAD calls
build = B × ceil(duration minutes) × 0.007    # Basic only
CPU = active seconds / 3,600 × 0.160         # sin1 example
memory = actual instance GB-hours × 0.0133
invocations = F / 1,000,000 × 0.60
storage = S × 0.025
advanced = advanced operations / 1,000,000 × 5.00
simple = simple operations / 1,000,000 × 0.40
origin = O × 0.27
```

Illustration assumes 0.02 active CPU seconds/request and 2 GB allocated for 0.2 seconds/request (0.4 GB-seconds). Memory allocation across shared instances cannot be inferred from request counts; actual memory-time can be higher or lower due to concurrency and idle lifetime. These are calculation inputs for approval, not measurements. Builds, retries and exports incur charges even when a core workflow fails. ZIP traffic traverses Blob → function → browser: add fetch operations, origin/egress and long-lived memory; it is excluded from the numeric table because archive sizes/frequency are unknown. URL-list download plus direct originals is the preferred bulk path.

## Monthly sensitivity at Singapore example rates

| Cost dimension | Low | Base | High |
|---|---:|---:|---:|
| Builds | 0.0420 | 0.2800 | 2.1000 |
| Functions: CPU | 0.0013 | 0.0128 | 0.1321 |
| Functions: memory | 0.0021 | 0.0212 | 0.2196 |
| Function invocations (1,454 / 14,360 / 148,620) | 0.0009 | 0.0086 | 0.0892 |
| Blob storage | 0.0250 | 0.1250 | 1.2500 |
| Blob advanced operations | 0.0110 | 0.2105 | 20.1200 |
| Blob simple operations | 0.0016 | 0.0160 | 0.1600 |
| Fast origin transfer | 0.2700 | 2.7000 | 27.0000 |
| **Gross metered subtotal, before delivery/fees/credits** | **0.3539** | **3.3741** | **51.0709** |
| Database / external auth / DeepSeek for observed app | 0 | 0 | 0 |
| New paid monitoring service selected | 0 | 0 | 0 |

Native log/event quotas, retention and charges remain unverified; “no paid monitoring selected” does not assert platform observability is unlimited or free. Additional plan features are not purchased. A backup copy adds backup GB-months, read operations, transfer, destination fees and verification costs; amount depends on the owner's chosen destination.

**Billing cases must stay separate:**

1. Hypothetical otherwise-unused Pro team, one included seat, current lowest Flat Rate CDN tier and entire USD 20 credit available: low/base approximately **USD 20/month total**; high approximately **USD 51.07** before a potential next-cycle CDN tier increase. High exceeds 1M requests; next tier can add USD 20/month, giving approximately **USD 71.07** if the same usage persists. Fees/credit eligibility must be confirmed, not assumed.
2. Existing shared Pro team with no spare credit: incremental gross subtotal is approximately **0.35 / 3.37 / 51.07**, plus CDN tier changes and exclusions. Existing platform fee and other projects continue separately. Additional paid seats increase the fixed bill.
3. On-demand delivery instead of applicable Flat Rate CDN: add app GB × 0.16, Blob GB × 0.053, and CDN requests / million × 2.60 at the example geography. If all tabulated delivery were Blob, illustrative extra delivery/request amounts are **0.317 / 3.17 / 31.70**. If all app delivery, **0.852 / 8.52 / 85.20**. Do not add both cases or subtract Flat Rate allowances from on-demand rates without account evidence. Origin charges are already in the subtotal.

The historical 0.325 GB store alone would be about USD 0.0081/month at S3 rates before credit; this is not an invoice. Removing the app deployment would not delete or stop billing storage. Plan downgrade, provider transfer, store deletion and billing cancellation are different operations and are not authorized here.

## Cost per successful core workflow

Core workflow: user opens album and views/downloads one original. An illustrative session transfers 20 × 0.1 MB thumbnails + one 4 MB original = 6 MB, 21 media requests, one live render. At 20% misses and p=2:

- Functions approximately USD 0.0000030; listing USD 0.0000200; simple operations USD 0.0000017; origin 0.0012 GB × 0.27 = USD 0.000324. Total **about USD 0.000349** before fees and delivery. Divide by 0.95 for a hypothetical 95% successful-session rate: **about USD 0.000367/success**, charging failed attempts too.
- Add on-demand Blob delivery 0.006 × 0.053 and 21 requests × 2.60/million if applicable: approximately USD 0.000373 extra per attempt. Under available Flat Rate capacity this portion may have no incremental charge. Original/video sizes can change the result substantially.
- Optional photo upload pair, held for a full month: approximately **USD 0.000126 / 0.000131 / 0.000149** per success at the three retry factors, for two writes, four function calls and 0.0041 GB storage. Add gallery refresh/view/download charges. Duplicates from new-path user retries can keep accumulating storage; this estimate charges a conservative extra pair per extra attempt.
- Fully allocated cost is `(hosting + builds + functions + storage + delivery + auth + monitoring + failures + backup + applicable fixed fees) / successful core sessions`. For the hypothetical USD 20 low/base bill and 95% successful V, **USD 0.0211 / 0.00211 per session**. High using USD 71.07 gives **USD 0.000748**. These are scenario allocation results; optional upload usage is included in the bill and shared fixed fees make this attribution arbitrary. They are not measured unit economics.

Selected static snapshot: removes per-visitor function/list costs, replacing them with two paginated prefix lists per authorized capture and manifest delivery. Storage/photo traffic remains; it saves roughly the live listing/function subtotal, not the whole bill. No runtime cache service is selected. Music/video are outside the required album release; preserve remote assets and separately verify their account charges.

## Selected static design — free-tier assumptions for approval

No new uploads, DB, auth, DeepSeek or runtime functions. Keep the audited ~0.325 GB store (not freshly verified); other media/stores/test fixtures count against applicable shared quotas. Assume 4 authorized snapshot captures/month and 2 static builds of 3 minutes each. Hobby build/deploy limits and zero-charge transition must be verified. Static HTML/scripts assume 0.2 MB/session plus 6 MB/21 media requests/session above. No automatic music/video loading in required journey; remote assets are preserved, and external account bills remain a lifecycle question.

| Monthly input | Low | Base | High |
|---|---:|---:|---:|
| Successful album sessions, assumed | 1,000 | 10,000 | 100,000 |
| Extra failed/retried attempts | 1% | 5% | 20% |
| Blob delivery before retries (GB) | 6 | 60 | 600 |
| Media requests before retries | 21,000 | 210,000 | 2,100,000 |
| Simple operations at 20% misses before retries | 4,200 | 42,000 | 420,000 |
| Origin transfer before retries (GB) | 1.2 | 12 | 120 |
| Static app delivery before retries (GB) | 0.2 | 2 | 20 |
| Stored GB-month assumed | 0.325 | 0.325 | 0.325 |

Multiply transfer/requests/simple/origin by **1.01 / 1.05 / 1.20** to charge failed attempts too. Capture lists: `4 × (ceil(N/1000) + ceil(T/1000))`, plus inventories/HEAD/download checks. Use actual N/T later. No duplicate guest retry uploads in static target. Never delete data to fit quotas.

Public Hobby allowances (S5/S14): Blob storage **1 GB**, transfer **10 GB**, simple operations **10,000**, advanced operations **2,000**; hosting fast transfer **100 GB**, origin **10 GB**, CDN requests **1M**, subject to actual service/account scope/reset. **Low potentially fits; base/high exceed Blob transfer/simple/origin; high also CDN requests.** Low is the only proposed operating envelope, not an approved forecast. Transfer alone allows about 1,666 such sessions/month before retries; simple operations about 2,380. These are arithmetic ceilings, not safe account capacity; other/shared usage reduces them.

Target cash cost **USD 0 / 0 / 0**, with **pause before full base/high demand can be served**, no overage purchase or automatic upgrade. Those scenarios are capacity failures under this budget, not achievable free service promises. Marginal cash per successful journey can be USD 0 while within verified quotas; beyond quotas requests may fail. Actual account cost remains unknown until billing verification and the first complete post-transition billing period. Current Pro is noncompliant.

Transition must also cost zero: unpaid commitments, source-team fee, transfer conditions, account/plan eligibility, domain renewal, exports and validation API traffic are unknown. Read-only provider access can itself create metered operations. No capture/resource/account operation is authorized without charge-free scope evidence or revised budget. Shared-team cancellation/downgrade is never an app-deploy side effect.

## DeepSeek sensitivity — excluded from album bill

No live API usage or mocked token-spend evidence exists. Proposed application call count is **0**. User allows evaluating/selecting another provider/model, but adding AI has no demonstrated album benefit and is not selected. If a missing AI workflow is later identified, reopen design and budget before adding it.

Formula per attempt: `(uncached input × Pmiss + cached input × Phit + output × Pout) / 1M`. Per success: sum cost of all attempts including failed/partial generations, divided by successful workflows. Cache hits must come from provider usage fields; repeated prompts do not prove a hit. Count thinking/output tokens according to actual provider billing. No fallback/retry can bypass the zero budget.

S12 public USD/million rates, presented for comparison only:

| Table model | Off-peak hit / miss / output | Peak hit / miss / output |
|---|---|---|
| Flash | 0.003 / 0.15 / 0.60 | 0.006 / 0.30 / 1.20 |
| V4 Pro | 0.022 / 0.66 / 1.98 | 0.044 / 1.32 / 3.96 |

Hypothetical low/base/high AI scenarios: **100 / 1,000 / 10,000 successful calls**, each 2,000 input + 500 output tokens; cached input **0% / 50% / 80%**; extra attempts **1% / 5% / 20%**. Peak Flash illustrative totals **USD 0.1212 / 0.9513 / 8.7552**; peak V4 Pro **USD 0.4666 / 3.5112 / 30.9408**. Off-peak half these totals under the retrieved table. Recalculate before any selection; do not infer account concurrency, top-up minimum, balance, taxes or credits from documentation. Search/Fetch optional APIs are USD 0.75/1,000 successful requests each and are excluded. No top-up or new account is proposed.

## Zero-budget decision and exclusions

No approach can promise unlimited public album delivery for exactly zero money. Alerts are delayed, concurrent/in-flight operations on a paid plan can accrue charges, and pause can interrupt free-tier access. Under the confirmed **0 total** cap, current Pro is not compliant; do not downgrade/delete it automatically to force compliance. The selected Hobby/static path needs verified eligibility, free capacity and account-specific lifecycle/billing evidence. If unavailable, apply must refuse until the user revises constraints or approves another proven free path.

Unknown/excluded: actual contract/legacy pricing, shared usage, taxes/FX, labour rate, extra seats, paid security rules, domain renewal, Cloudinary/music/video licensing and transfer, email/Sheets bills, support, backup destination, data retrieval, DR, deploy retention/storage, image transformations if introduced, test/browser infrastructure and abuse. No account was accessed. Cost feasibility remains a release blocker until the budget interpretation and account evidence are settled.
