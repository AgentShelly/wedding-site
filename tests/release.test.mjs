import assert from "node:assert/strict";
import test from "node:test";
import { readFile, unlink } from "node:fs/promises";
import { acquireLock, parseArgs, runCommand, sha256, validateApproval, validateDeploymentHealth, validateManifest, validateMetadata, validateTarget } from "../scripts/release.mjs";

const targets = { version: 1, targets: {
  preview: { teamId: "team-preview", projectId: "project-preview", storeId: "store-preview" },
  production: { teamId: "team-production", projectId: "project-production", storeId: "store-production" },
} };
const opts = { environment: "production", teamId: "team-production", projectId: "project-production", storeId: "store-production" };
const digest = "a".repeat(64);

test("release requires a supported mode, explicit target IDs, and valid environment", () => {
  assert.equal(parseArgs(["plan", "--team-id", "x", "--project-id", "y", "--store-id", "z"]).environment, "preview");
  assert.throws(() => parseArgs(["deploy"]), /Usage/);
  assert.throws(() => parseArgs(["plan", "--environment", "prod"]), /Environment/);
  assert.equal(parseArgs(["apply", "--action", "promote", "--environment", "production"]).action, "promote");
  assert.throws(() => parseArgs(["apply", "--action", "promote", "--environment", "preview"]), /production-only/);
  assert.throws(() => validateTarget(targets, { ...opts, projectId: "wrong" }), /projectId/);
  assert.throws(() => validateTarget({ ...targets, targets: { ...targets.targets, preview: { ...targets.targets.preview, projectId: "project-production" } } }, { ...opts, environment: "preview", teamId: "team-preview", projectId: "project-production", storeId: "store-preview" }), /must differ/);
});

test("release manifest validation binds the content digest, store and origin", async () => {
  const fixture = JSON.parse(await readFile(new URL("./fixtures/album-manifest.json", import.meta.url), "utf8"));
  assert.equal(validateManifest(fixture, "synthetic-store", "https://album.example.test").recordCount, 1);
  assert.throws(() => validateManifest(fixture, "other-store", "https://album.example.test"), /store/);
  assert.throws(() => validateManifest(fixture, "synthetic-store", "https://other.example.test"), /origin/);
});

test("offline account check requires fresh exact target, snapshot, and exclusive lease", () => {
  const now = Date.now();
  const record = { version: 1, capturedAt: new Date(now).toISOString(), ...opts, environment: "production", manifestDigest: digest, photoCount: 1, targetVerified: true, singleWriterLease: true, alternateDeploymentsDisabled: true, unexpectedResources: [] };
  assert.equal(validateMetadata(record, opts, digest, 1, now).targetVerified, true);
  assert.throws(() => validateMetadata({ ...record, capturedAt: new Date(now - 16 * 60_000).toISOString() }, opts, digest, 1, now), /stale/);
  assert.throws(() => validateMetadata({ ...record, singleWriterLease: false }, opts, digest, 1, now), /exclusive/);
  assert.throws(() => validateMetadata({ ...record, unexpectedResources: ["database"] }, opts, digest, 1, now), /Unexpected/);
});

test("scoped approval expires and binds to action, environment, target and manifest", () => {
  const now = Date.now();
  const record = { version: 1, approvalId: "owner-approval-41", approvedBy: "owner", issuedAt: new Date(now).toISOString(), expiresAt: new Date(now + 60_000).toISOString(), action: "deploy-production", environment: "production", releaseId: "release-1", teamId: opts.teamId, projectId: opts.projectId, storeId: opts.storeId, manifestDigest: digest };
  const approvalOptions = { ...opts, releaseId: "release-1", action: "deploy" };
  assert.equal(validateApproval(record, approvalOptions, digest, now).approvalId, record.approvalId);
  assert.throws(() => validateApproval({ ...record, projectId: "other" }, approvalOptions, digest, now), /scope/);
  assert.throws(() => validateApproval({ ...record, releaseId: "other-release" }, approvalOptions, digest, now), /scope/);
  assert.throws(() => validateApproval({ ...record, action: "deploy-preview" }, approvalOptions, digest, now), /scope/);
  assert.throws(() => validateApproval({ ...record, expiresAt: new Date(now - 1).toISOString() }, approvalOptions, digest, now), /expired/);
});

test("failed candidate health is rejected before production promotion", () => {
  const options = { ...opts, releaseId: "release-1" };
  const manifest = { digest, recordCount: 1 };
  const inspected = { readyState: "READY", projectId: opts.projectId };
  const health = { releaseId: options.releaseId, environment: "production", projectId: options.projectId, manifestDigest: digest, photoCount: 1 };
  assert.equal(validateDeploymentHealth(inspected, health, options, manifest), true);
  assert.throws(() => validateDeploymentHealth({ ...inspected, readyState: "ERROR" }, health, options, manifest), /READY/);
  assert.throws(() => validateDeploymentHealth({ ...inspected, projectId: "wrong-project" }, health, options, manifest), /READY/);
  assert.throws(() => validateDeploymentHealth(inspected, { ...health, photoCount: 0 }, options, manifest), /health metadata/);
  assert.throws(() => validateDeploymentHealth(inspected, { ...health, manifestDigest: "b".repeat(64) }, options, manifest), /health metadata/);
});

test("same-project local applies contend on one lock and manual release is required", async () => {
  const release = await acquireLock("test-team", `test-project-${process.pid}`);
  await assert.rejects(() => acquireLock("test-team", `test-project-${process.pid}`), /lock exists/);
  await release();
  const releaseAgain = await acquireLock("test-team", `test-project-${process.pid}`);
  await releaseAgain();
});

test("release lease blocks a competing process and resumes only after verified completion", async () => {
  const teamId = "lease-test-team";
  const projectId = `lease-test-project-${process.pid}`;
  const lockPath = new URL(`../.release/locks/${sha256(`${teamId}:${projectId}`).slice(0, 24)}.lock`, import.meta.url);
  const first = await acquireLock(teamId, projectId, "release-before", []);
  await assert.rejects(() => acquireLock(teamId, projectId, "release-before", ["in-progress"]), /local release action/);
  await first.updateState("complete", { pid: 2147483000 });
  await first();
  const next = await acquireLock(teamId, projectId, "release-after", ["complete"]);
  await next();
  await unlink(lockPath);
});

test("failed command output is suppressed and process timeouts are bounded", async () => {
  assert.equal((await runCommand(process.execPath, ["-e", "process.stdout.write('safe')"], { timeoutMs: 2_000 })).stdout, "safe");
  await assert.rejects(() => runCommand(process.execPath, ["-e", "process.stdout.write('TOKEN_CANARY'); process.stderr.write('PASSWORD_CANARY'); process.exit(3)"], { timeoutMs: 2_000 }), (error) => {
    assert.match(error.message, /output suppressed/);
    assert.doesNotMatch(error.message, /TOKEN_CANARY|PASSWORD_CANARY/);
    return true;
  });
  await assert.rejects(() => runCommand(process.execPath, ["-e", "setTimeout(() => {}, 5000)"], { timeoutMs: 50 }), /timed out/);
});
