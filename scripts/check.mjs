#!/usr/bin/env node
// Walk the registered consumers and report any drift between their
// design_handoff_lore/ contents and the canonical at the SHA they recorded.

import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const CONSUMERS = [
  "/Users/stew/scaria/Thomas OS",
  "/Users/stew/scaria/swarm-fund-mvp/swarm-fund-mvp",
  "/Users/stew/scaria/lore-teaser-prea",
];

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function walk(dir, base = dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, base, out);
    else out.push({ abs: p, rel: relative(base, p) });
  }
  return out;
}

function checkAtSha(sha) {
  // Use git show to read canonical files at the recorded SHA, compare against current consumer state.
  // For simplicity we compare against HEAD if the SHA matches HEAD; otherwise we warn the user.
  const headSha = execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim();
  return { sha, headSha, atHead: sha === headSha };
}

function checkConsumer(consumerPath) {
  const dsRoot = join(consumerPath, "design_handoff_lore");
  const versionFile = join(dsRoot, ".version");
  const result = { consumer: consumerPath, status: "unknown", details: [] };

  if (!existsSync(dsRoot)) {
    result.status = "not-synced";
    result.details.push(`no design_handoff_lore/ at ${dsRoot}`);
    return result;
  }
  if (!existsSync(versionFile)) {
    result.status = "no-version-file";
    result.details.push(`design_handoff_lore exists but no .version stamp; cannot determine sync state`);
    return result;
  }

  const versionLine = readFileSync(versionFile, "utf8").trim();
  const shaMatch = versionLine.match(/\(([a-f0-9]+)\)/);
  const profileMatch = versionLine.match(/profile=(\S+)/);
  if (!shaMatch) {
    result.status = "malformed-version";
    result.details.push(`could not parse .version: ${versionLine}`);
    return result;
  }
  const recordedSha = shaMatch[1];
  const profile = profileMatch ? profileMatch[1] : "unknown";
  const { headSha, atHead } = checkAtSha(recordedSha);

  if (!atHead) {
    result.status = "version-behind";
    result.details.push(`consumer recorded ${recordedSha}, canonical HEAD is ${headSha} — run sync.mjs to upgrade or check.mjs after that`);
    return result;
  }

  // Compare each synced file against current canonical.
  const driftFiles = [];
  for (const { abs, rel } of walk(dsRoot)) {
    if (rel === ".version") continue;
    const canonical = join(ROOT, rel);
    if (!existsSync(canonical)) {
      driftFiles.push({ rel, why: "extra-in-consumer" });
      continue;
    }
    if (sha256(abs) !== sha256(canonical)) {
      driftFiles.push({ rel, why: "modified-in-consumer" });
    }
  }

  if (driftFiles.length === 0) {
    result.status = "in-sync";
    result.details.push(`profile=${profile}, recorded sha matches HEAD, all synced files match`);
  } else {
    result.status = "drifted";
    result.details.push(`profile=${profile}, ${driftFiles.length} file(s) drifted from canonical`);
    for (const f of driftFiles.slice(0, 10)) result.details.push(`  ${f.why}: ${f.rel}`);
    if (driftFiles.length > 10) result.details.push(`  ... and ${driftFiles.length - 10} more`);
  }
  return result;
}

function main() {
  console.log(`Canonical: ${ROOT}`);
  console.log(`HEAD: ${execSync("git rev-parse --short HEAD", { cwd: ROOT }).toString().trim()}\n`);

  let anyDrift = false;
  for (const consumer of CONSUMERS) {
    const r = checkConsumer(consumer);
    const ok = r.status === "in-sync";
    console.log(`[${ok ? "OK" : "!!"}] ${r.consumer}`);
    console.log(`     status: ${r.status}`);
    for (const d of r.details) console.log(`     ${d}`);
    console.log();
    if (!ok) anyDrift = true;
  }

  if (anyDrift) {
    console.error("drift detected — see above");
    process.exit(2);
  }
}

try { main(); } catch (e) { console.error(`error: ${e.message}`); process.exit(1); }
