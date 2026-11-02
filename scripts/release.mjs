#!/usr/bin/env node
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile, open, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE_DIR = path.join(ROOT, ".release");
const TARGETS_FILE = path.join(ROOT, "release-targets.json");
const APPROVAL_MAX_AGE_MS = 15 * 60 * 1000;

export const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`).join(",")}}`;
  return JSON.stringify(value);
}

export function validateManifest(manifest, expectedStoreId, expectedOrigin) {
  if (!manifest || manifest.version !== 1 || !Array.isArray(manifest.photos) || manifest.photos.length > 5000 || manifest.recordCount !== manifest.photos.length) throw new Error("Manifest schema or record count is invalid");
  if (!manifest.sourceStoreId || !manifest.capturedAt || !Number.isFinite(Date.parse(manifest.capturedAt))) throw new Error("Manifest capture metadata is invalid");
  if (manifest.sourceStoreId !== expectedStoreId || manifest.photoOrigin !== expectedOrigin) throw new Error("Manifest store or photo origin differs from the explicit target");
  const origin = new URL(expectedOrigin);
  if (origin.protocol !== "https:" || origin.origin !== expectedOrigin || origin.username || origin.password) throw new Error("Manifest origin must be an exact HTTPS origin");
  const { digest, ...payload } = manifest;
  if (!/^[a-f0-9]{64}$/.test(digest ?? "") || sha256(canonicalJson(payload)) !== digest) throw new Error("Manifest content digest is invalid");
  const albums = new Set(["ceremony", "table", "toasts", "candid", "details", "people", "wildcard"]);
  const seen = new Set();
  for (const photo of manifest.photos) {
    if (!photo || typeof photo.pathname !== "string" || !photo.pathname.startsWith("photos/") || photo.pathname.includes("\\") || photo.pathname.split("/").some((part) => !part || part === "." || part === "..")) throw new Error("Manifest photo path is invalid");
    if (seen.has(photo.pathname)) throw new Error("Manifest contains a duplicate photo path");
    seen.add(photo.pathname);
    const parts = photo.pathname.split("/");
    const knownAlbum = albums.has(parts[1]);
    const expectedAlbum = knownAlbum ? parts[1] : "wildcard";
    const uploaderPart = knownAlbum ? parts[2] : parts[1];
    const expectedUploader = (uploaderPart || "guest").replace(/-/g, " ");
    if (photo.album !== expectedAlbum || photo.uploader !== expectedUploader || !Number.isSafeInteger(photo.size) || photo.size < 0 || !Number.isFinite(Date.parse(photo.uploadedAt))) throw new Error("Manifest photo metadata is invalid");
    for (const value of [photo.url, photo.thumbUrl ?? photo.url]) {
      const url = new URL(value);
      if (url.protocol !== "https:" || url.origin !== expectedOrigin || url.username || url.password) throw new Error("Manifest photo URL is outside the approved HTTPS origin");
    }
  }
  return manifest;
}

export function parseArgs(argv) {
  const [mode, ...rest] = argv;
  if (!["plan", "check", "apply", "verify"].includes(mode)) {
    throw new Error("Usage: npm run release -- <plan|check|apply|verify> [--environment preview|production] [options]");
  }
  const result = { mode, environment: "preview" };
  const seen = new Set();
  for (let i = 0; i < rest.length; i += 1) {
    const key = rest[i];
    if (!key.startsWith("--") || i + 1 >= rest.length || rest[i + 1].startsWith("--")) throw new Error("Invalid release option");
    const name = key.slice(2);
    if (!["action", "environment", "team-id", "project-id", "store-id", "release-id", "manifest", "manifest-digest", "metadata", "approval", "deployment-id"].includes(name)) throw new Error("Unknown release option");
    const field = name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    if (seen.has(field)) throw new Error("Duplicate release option");
    seen.add(field);
    result[field] = rest[++i];
  }
  if (!["preview", "production"].includes(result.environment)) throw new Error("Environment must be preview or production");
  result.action ??= "deploy";
  if (!["deploy", "promote", "rollback"].includes(result.action)) throw new Error("Action must be deploy, promote, or rollback");
  if (result.environment !== "production" && result.action !== "deploy") throw new Error("Promote and rollback actions are production-only");
  return result;
}

export function validateTarget(targets, options) {
  const target = targets?.targets?.[options.environment];
  if (!target || targets.version !== 1) throw new Error("Release target configuration is missing or unsupported");
  for (const [field, supplied] of [["teamId", options.teamId], ["projectId", options.projectId], ["storeId", options.storeId]]) {
    if (!supplied || !/^[A-Za-z0-9_-]{1,100}$/.test(supplied) || !target[field] || supplied !== target[field]) throw new Error(`Explicit ${field} does not match the approved ${options.environment} target`);
  }
  const production = targets.targets.production;
  const preview = targets.targets.preview;
  if (production.projectId && preview.projectId && production.projectId === preview.projectId) throw new Error("Preview and production project targets must differ");
  if (production.storeId && preview.storeId && production.storeId === preview.storeId) throw new Error("Preview and production stores must differ");
  return target;
}

export function validateMetadata(metadata, options, manifestDigest, photoCount, now = Date.now()) {
  if (!metadata || metadata.version !== 1 || !metadata.capturedAt) throw new Error("A current sanitized account-check export is required");
  const age = now - Date.parse(metadata.capturedAt);
  if (!Number.isFinite(age) || age < 0 || age > APPROVAL_MAX_AGE_MS) throw new Error("Account-check export is stale; run check again");
  for (const [field, value] of [["teamId", options.teamId], ["projectId", options.projectId], ["storeId", options.storeId]]) {
    if (metadata[field] !== value) throw new Error(`Account-check ${field} differs from the explicit target`);
  }
  if (metadata.environment !== options.environment || metadata.manifestDigest !== manifestDigest || metadata.photoCount !== photoCount) throw new Error("Account-check scope, manifest digest, or count differs from this release");
  if (options.environment === "production" && photoCount === 0) throw new Error("An empty production snapshot is not releasable");
  if (metadata.targetVerified !== true || metadata.singleWriterLease !== true || metadata.alternateDeploymentsDisabled !== true) throw new Error("Target and exclusive release lease are not verified");
  if (metadata.unexpectedResources?.length) throw new Error("Unexpected resources detected; review drift before release");
  return metadata;
}

export function validateApproval(approval, options, manifestDigest, now = Date.now()) {
  if (!approval || approval.version !== 1 || !/^[A-Za-z0-9._-]{1,100}$/.test(approval.approvalId ?? "") || !approval.approvedBy) throw new Error("A scoped written approval record is required");
  const issued = Date.parse(approval.issuedAt);
  const expires = Date.parse(approval.expiresAt);
  if (!Number.isFinite(issued) || !Number.isFinite(expires) || issued > now || expires <= now || now - issued > APPROVAL_MAX_AGE_MS) throw new Error("Approval is missing, expired, or older than 15 minutes");
  const expectedAction = options.action === "promote" ? "promote-production" : options.action === "rollback" ? "rollback-production" : options.environment === "production" ? "deploy-production" : "deploy-preview";
  if (approval.action !== expectedAction || approval.environment !== options.environment || approval.releaseId !== options.releaseId || approval.teamId !== options.teamId || approval.projectId !== options.projectId || approval.storeId !== options.storeId || approval.manifestDigest !== manifestDigest) {
    throw new Error("Approval scope does not match this exact target and release");
  }
  return approval;
}

export function validateDeploymentHealth(inspected, deployedHealth, options, manifest) {
  const state = inspected?.readyState ?? inspected?.state ?? inspected?.status;
  if (state !== "READY" || (inspected.projectId && inspected.projectId !== options.projectId)) throw new Error("Deployment is not READY for the explicit project; do not promote");
  if (deployedHealth?.releaseId !== options.releaseId || deployedHealth.environment !== options.environment || deployedHealth.projectId !== options.projectId || deployedHealth.manifestDigest !== manifest.digest || deployedHealth.photoCount !== manifest.recordCount) throw new Error("Deployed health metadata differs from the approved release");
  return true;
}

export async function acquireLock(teamId, projectId, releaseId, allowedPriorStates = []) {
  const dir = path.join(PRIVATE_DIR, "locks");
  await mkdir(dir, { recursive: true, mode: 0o700 });
  const lockPath = path.join(dir, `${sha256(`${teamId}:${projectId}`).slice(0, 24)}.lock`);
  if (!releaseId) {
    const handle = await open(lockPath, "wx", 0o600).catch((error) => {
      if (error.code === "EEXIST") throw new Error("A release lock exists; verify the process and remote operation before manual cleanup");
      throw error;
    });
    await handle.writeFile(JSON.stringify({ pid: process.pid, host: process.env.HOSTNAME ?? "unknown", startedAt: new Date().toISOString() }));
    return async () => {
      await handle.close();
      const { unlink } = await import("node:fs/promises");
      await unlink(lockPath);
    };
  }

  const busyPath = `${lockPath}.busy`;
  await mkdir(busyPath, { mode: 0o700 }).catch((error) => {
    if (error.code === "EEXIST") throw new Error("Another local release action holds the project lock");
    throw error;
  });
  const { rm, rename } = await import("node:fs/promises");
  const current = await readJson(lockPath).catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (current) {
    const reusableCompletedLease = current.state === "complete" && allowedPriorStates.includes("complete");
    if ((!reusableCompletedLease && current.releaseId !== releaseId) || current.teamId !== teamId || current.projectId !== projectId || !allowedPriorStates.includes(current.state)) {
      await rm(busyPath, { recursive: true, force: true });
      throw new Error("Existing release lease does not match this release/action; reconcile it manually");
    }
    if (current.host !== (process.env.HOSTNAME ?? "unknown")) {
      await rm(busyPath, { recursive: true, force: true });
      throw new Error("Existing release lease belongs to another host; verify remote exclusivity before continuing");
    }
    try {
      process.kill(current.pid, 0);
      await rm(busyPath, { recursive: true, force: true });
      throw new Error("Prior release process is still active");
    } catch (error) {
      if (error.code !== "ESRCH") {
        await rm(busyPath, { recursive: true, force: true });
        throw error;
      }
    }
  }
  const record = current ?? { teamId, projectId, host: process.env.HOSTNAME ?? "unknown", startedAt: new Date().toISOString() };
  record.releaseId = releaseId;
  record.pid = process.pid;
  record.state = "in-progress";
  const updateState = async (state, extra = {}) => {
    Object.assign(record, extra, { state, updatedAt: new Date().toISOString() });
    const temporary = `${lockPath}.${process.pid}.tmp`;
    await writeFile(temporary, JSON.stringify(record), { mode: 0o600 });
    await rename(temporary, lockPath);
  };
  await updateState("in-progress");
  const release = async () => rm(busyPath, { recursive: true, force: true });
  release.updateState = updateState;
  return release;
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

function metadataFingerprint(metadata) {
  const stable = Object.fromEntries(Object.entries(metadata).filter(([key]) => key !== "capturedAt"));
  return sha256(canonicalJson(stable));
}

export async function runCommand(command, args, { timeoutMs, cwd = ROOT, env = process.env } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, env, shell: false, stdio: ["ignore", "pipe", "pipe"] });
    let stdoutText = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 5_000).unref();
    }, timeoutMs);
    child.stdout.setEncoding("utf8").on("data", (chunk) => { stdoutText = (stdoutText + chunk).slice(-1_000_000); });
    child.stderr.resume();
    child.once("error", (error) => { clearTimeout(timer); reject(new Error(`Could not start ${command}: ${error.code ?? "process error"}`)); });
    child.once("close", (code, signal) => {
      clearTimeout(timer);
      if (timedOut) return reject(new Error("Command timed out; remote state is unknown and must be reconciled before retry"));
      if (code !== 0) return reject(new Error(`${command} failed (${signal ?? code}); output suppressed for secret safety`));
      resolve({ stdout: stdoutText });
    });
  });
}

async function saveReport(name, report) {
  await mkdir(PRIVATE_DIR, { recursive: true, mode: 0o700 });
  await writeFile(path.join(PRIVATE_DIR, name), `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const targetBytes = await readFile(TARGETS_FILE);
  const targets = JSON.parse(targetBytes.toString("utf8"));
  const target = validateTarget(targets, options);
  if (!options.releaseId) throw new Error("An explicit --release-id is required");
  if (!/^[a-zA-Z0-9._-]{1,80}$/.test(options.releaseId)) throw new Error("Invalid release ID");
  const manifestPath = options.manifest ?? process.env.ALBUM_MANIFEST_PATH;
  if (!manifestPath || !path.isAbsolute(manifestPath)) throw new Error("Provide an absolute --manifest path to the approved immutable snapshot");
  const manifestStats = await stat(manifestPath);
  if (!manifestStats.isFile() || manifestStats.size > 5 * 1024 * 1024) throw new Error("Manifest must be a file no larger than 5 MiB");
  const manifestBytes = await readFile(manifestPath);
  const manifestDigest = sha256(manifestBytes);
  if (!options.manifestDigest || options.manifestDigest !== manifestDigest) throw new Error("Explicit --manifest-digest does not match the snapshot bytes");
  const manifest = JSON.parse(manifestBytes.toString("utf8"));
  validateManifest(manifest, options.storeId, process.env.ALBUM_PHOTO_ORIGIN);
  const lockfile = await readJson(path.join(ROOT, "package-lock.json"));
  if (targets.cliVersion !== lockfile.packages?.["node_modules/vercel"]?.version) throw new Error("Pinned Vercel CLI version differs from the target configuration");
  if (options.mode === "apply" || (options.mode === "verify" && options.deploymentId)) {
    if (targets.cliVersion !== (await readJson(path.join(ROOT, "node_modules", "vercel", "package.json"))).version) throw new Error("Installed Vercel CLI version differs from the pinned target configuration");
  }
  const releaseDigest = sha256(`${options.releaseId}:${options.environment}:${options.teamId}:${options.projectId}:${options.storeId}:${manifestDigest}:${targets.cliVersion}`);
  const summary = { version: 1, mode: options.mode, action: options.action, environment: options.environment, releaseId: options.releaseId, teamId: options.teamId, projectId: options.projectId, storeId: options.storeId, manifestDigest, releaseDigest, createdAt: new Date().toISOString() };

  if (options.mode === "plan") {
    await saveReport("plan.json", { ...summary, status: "planned-offline", accountState: "unverified", mutations: [] });
    stdout.write("Offline plan recorded; account state and deploy readiness remain unverified.\n");
    return;
  }

  if (options.mode === "check") {
    if (!options.metadata) throw new Error("check needs an owner-authorized, sanitized metadata export via --metadata; no account access is performed");
    const metadata = await readJson(options.metadata);
    validateMetadata(metadata, options, manifestDigest, manifest.recordCount);
    await saveReport("check.json", { ...summary, status: "offline-export-verified", metadataCapturedAt: metadata.capturedAt });
    stdout.write("Sanitized metadata export matches the explicit target; live state is not verified by this offline check.\n");
    return;
  }

  if (options.mode === "verify") {
    const healthFile = path.join(ROOT, "out", "release-health.json");
    const health = await readJson(healthFile);
    if (health.releaseId !== options.releaseId || health.manifestDigest !== manifest.digest || health.environment !== options.environment || health.projectId !== options.projectId) throw new Error("Static artifact health metadata does not match the requested release");
    if (!options.deploymentId) {
      stdout.write("Local static artifact identity verified; remote deployment state was not queried.\n");
      return;
    }
    const receiptFile = path.join(PRIVATE_DIR, "receipts", `${options.releaseId}.json`);
    const receipt = await readJson(receiptFile);
    if (receipt.releaseDigest !== releaseDigest || !["staged", "verified", "promoted", "rolled-back", "unknown"].includes(receipt.status) || receipt.deploymentUrl !== options.deploymentId) throw new Error("Deployment URL does not match the staged release receipt");
    if (options.metadata) validateMetadata(await readJson(options.metadata), options, manifestDigest, manifest.recordCount);
    else throw new Error("Remote verify requires a fresh sanitized metadata export via --metadata");
    const release = await acquireLock(options.teamId, options.projectId, options.releaseId, ["staged", "verified", "promoted", "rolled-back", "unknown"]);
    try {
      const inspection = await runCommand(path.join(ROOT, "node_modules", ".bin", "vercel"), ["inspect", options.deploymentId, "--json", "--scope", options.teamId, "--project", options.projectId], { timeoutMs: 3 * 60 * 1000 });
      let inspected;
      try { inspected = JSON.parse(inspection.stdout); } catch { throw new Error("Vercel inspect returned unrecognized output; remote state remains unverified"); }
      const url = new URL(options.deploymentId);
      if (url.protocol !== "https:" || !url.hostname.endsWith(".vercel.app")) throw new Error("Deployment verification URL is outside the expected Vercel host suffix");
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 120_000);
      let response;
      try { response = await fetch(new URL("/release-health.json", url), { signal: controller.signal, redirect: "manual" }); }
      catch { throw new Error("Health request failed or timed out; candidate remains staged and must not be promoted"); }
      finally { clearTimeout(timer); }
      if (response.status !== 200 || !response.headers.get("content-type")?.includes("application/json")) throw new Error("Health endpoint did not return a successful JSON response");
      let deployedHealth;
      try { deployedHealth = await response.json(); } catch { throw new Error("Health endpoint returned invalid JSON"); }
      validateDeploymentHealth(inspected, deployedHealth, options, manifest);
      await release.updateState(options.environment === "preview" || ["promoted", "rolled-back"].includes(receipt.status) ? "complete" : "verified", { deploymentUrl: options.deploymentId });
      await writeFile(receiptFile, JSON.stringify({ ...receipt, status: "verified", verifiedAt: new Date().toISOString() }, null, 2), { mode: 0o600 });
      stdout.write("Remote deployment and public health metadata verified; any required production promotion remains a separately approved operation.\n");
    } catch (error) {
      await release.updateState("unknown", { error: error.message });
      throw error;
    } finally {
      await release();
    }
    return;
  }

  if (!stdin.isTTY || !stdout.isTTY) throw new Error("Apply requires an interactive authorized operator session; non-interactive apply is disabled");
  if (!options.approval) throw new Error("Apply requires --approval pointing to the current owner-approved scoped record outside the repository");
  if (!path.isAbsolute(options.approval) || !path.relative(ROOT, options.approval).startsWith("..")) throw new Error("Approval record must be stored outside the repository");
  const approval = validateApproval(await readJson(options.approval), options, manifestDigest);
  if (!options.metadata) throw new Error("Apply requires a fresh --metadata check export");
  const accountCheck = validateMetadata(await readJson(options.metadata), options, manifestDigest, manifest.recordCount);
  const accountCheckFingerprint = metadataFingerprint(accountCheck);
  const approvalBytes = await readFile(options.approval);
  const linkedProject = await readJson(path.join(ROOT, ".vercel", "project.json"));
  if (linkedProject.projectId !== target.projectId || linkedProject.orgId !== target.teamId) throw new Error("Local Vercel link does not match the explicit target");
  const confirmation = readline.createInterface({ input: stdin, output: stdout });
  const confirmPhrase = `APPLY ${approval.approvalId} ${options.action} ${options.environment} ${options.projectId}`;
  const typed = await confirmation.question(`Type ${confirmPhrase} to execute this scoped action: `);
  confirmation.close();
  if (typed !== confirmPhrase) throw new Error("Operator confirmation did not match; no action taken");

  const releaseDir = path.join(PRIVATE_DIR, "receipts");
  await mkdir(releaseDir, { recursive: true, mode: 0o700 });
  const receipt = path.join(releaseDir, `${options.releaseId}.json`);
  let priorReceipt;
  try {
    priorReceipt = await readJson(receipt);
    if (priorReceipt.releaseDigest !== releaseDigest) throw new Error("Release ID already exists with different inputs");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (options.action === "deploy" && priorReceipt?.status === "verified") {
    stdout.write(`Release ${options.releaseId} is already staged and verified; no duplicate deployment was created.\n`);
    return;
  }
  if (priorReceipt && options.action === "deploy") throw new Error("Prior release is not reconciled; verify it before retry");
  if (options.action === "promote" && (priorReceipt?.status !== "verified" || priorReceipt.deploymentUrl !== options.deploymentId)) throw new Error("Promotion requires this release's verified staged deployment URL");
  if (options.action === "rollback" && (!options.deploymentId || accountCheck.rollbackEligible !== true || accountCheck.rollbackDeploymentId !== options.deploymentId || accountCheck.rollbackStatic !== true)) throw new Error("Rollback requires an explicitly verified compatible static deployment in the fresh account-check export");
  const release = await acquireLock(options.teamId, options.projectId, options.releaseId, options.action === "deploy" ? ["complete"] : ["verified"]);
  try {
    if (options.action === "promote" || options.action === "rollback") {
      const verb = options.action === "promote" ? "promote" : "rollback";
      const operation = await runCommand(path.join(ROOT, "node_modules", ".bin", "vercel"), [verb, options.deploymentId, "--yes", "--scope", options.teamId, "--project", options.projectId], { timeoutMs: 3 * 60 * 1000 });
      void operation;
      const resultState = options.action === "promote" ? "promoted" : "rolled-back";
      await release.updateState(resultState, { deploymentUrl: options.deploymentId });
      await writeFile(receipt, JSON.stringify({ ...priorReceipt, status: resultState, operationCompletedAt: new Date().toISOString(), approvalId: approval.approvalId, deploymentUrl: options.deploymentId }, null, 2), { mode: 0o600 });
      stdout.write(`${options.action} command returned successfully; run verify to confirm the resulting health before closing the release lease.\n`);
      return;
    }
    await writeFile(receipt, JSON.stringify({ ...summary, approvalId: approval.approvalId, status: "running" }, null, 2), { mode: 0o600 });
    await runCommand("npm", ["run", "build"], { timeoutMs: 20 * 60 * 1000, env: { ...process.env, ALBUM_MANIFEST_PATH: manifestPath, RELEASE_ID: options.releaseId, RELEASE_ENVIRONMENT: options.environment, VERCEL_PROJECT_ID: target.projectId } });
    if (sha256(await readFile(TARGETS_FILE)) !== sha256(targetBytes)) throw new Error("Target configuration changed during build; no deployment was attempted");
    if (sha256(await readFile(manifestPath)) !== manifestDigest) throw new Error("Manifest changed during build; no deployment was attempted");
    if (sha256(await readFile(options.approval)) !== sha256(approvalBytes)) throw new Error("Approval record changed during build; no deployment was attempted");
    validateApproval(await readJson(options.approval), options, manifestDigest);
    const afterBuildCheck = validateMetadata(await readJson(options.metadata), options, manifestDigest, manifest.recordCount);
    if (metadataFingerprint(afterBuildCheck) !== accountCheckFingerprint) throw new Error("Account-check state changed during build; no deployment was attempted");
    const afterBuildLink = await readJson(path.join(ROOT, ".vercel", "project.json"));
    if (afterBuildLink.projectId !== target.projectId || afterBuildLink.orgId !== target.teamId) throw new Error("Vercel project link changed during build; no deployment was attempted");
    const args = ["deploy", path.join(ROOT, "out"), "--yes", "--scope", options.teamId, "--project", options.projectId, "--environment", options.environment];
    if (options.environment === "production") args.push("--skip-domain");
    const { stdout: cliOutput } = await runCommand(path.join(ROOT, "node_modules", ".bin", "vercel"), args, { timeoutMs: 20 * 60 * 1000 });
    const deploymentUrl = cliOutput.match(/https:\/\/[a-z0-9.-]+\.vercel\.app\b/i)?.[0];
    if (!deploymentUrl) throw new Error("Deploy command returned without a recognizable deployment URL; remote state is unknown");
    await release.updateState("staged", { deploymentUrl });
    await writeFile(receipt, JSON.stringify({ ...summary, approvalId: approval.approvalId, deploymentUrl, status: "staged", note: "Candidate awaits separate read-only verify and, for production, separately approved promotion." }, null, 2), { mode: 0o600 });
    stdout.write(`Candidate staged for ${options.environment}; deployment ${deploymentUrl} awaits verify.\n`);
  } catch (error) {
    await release.updateState("unknown", { error: error.message });
    await writeFile(receipt, JSON.stringify({ ...summary, approvalId: approval.approvalId, deploymentUrl: options.deploymentId ?? priorReceipt?.deploymentUrl, status: "unknown", error: error.message }, null, 2), { mode: 0o600 });
    throw error;
  } finally {
    // Apply deliberately leaves the lease file for reconciliation after the
    // external deployment outcome is verified; an operator removes stale
    // locks only after checking process and remote operation state.
    void release;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`Release stopped: ${error.message}\n`);
    process.exitCode = 1;
  });
}
