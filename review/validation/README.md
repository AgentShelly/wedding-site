# Validation evidence

Record validation by date and stage under this folder when later authorized stages perform checks. Prefer concise Markdown evidence with the exact commands, result, environment, and limits. Do not store large artifacts, credentials, uploaded photos, or production data in Git; link to an approved external evidence location if needed.

For each check, distinguish repository inspection from runtime checks and external Vercel/GitHub checks. State only what was actually verified. Record failures and skipped checks with the reason. Keep test source in the existing project test tree rather than this evidence folder.

Deployment validation must identify whether it was preview or production, the approved project/environment, the verified Blob store identity, and the explicit approval covering that action. Never use production photo data for a test environment. Before any push or merge, record the automatic Vercel and GitHub deployment/workflow trigger inspection. Production, paid, DNS, and data-affecting actions each require their own explicit approval record.
