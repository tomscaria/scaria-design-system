#!/usr/bin/env node
// Sync the canonical Lore design system into a target project.
// Usage:
//   node scripts/sync.mjs --target=<absolute-path> --profile=<profile> [--force] [--check-only] [--allow-bare]
//
// Profiles (see README): tokens | tokens+decks | tokens+components | full

import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const PROFILES = {
  tokens:               ["tokens", "fonts", "assets/brand"],
  "tokens+decks":       ["tokens", "fonts", "assets/brand", "decks", "assets/tokens", "assets/icons"],
  "tokens+components":  ["tokens", "fonts", "assets/brand", "components", "assets/partners", "assets/tokens", "lib"],
  full:                 ["tokens", "fonts", "assets", "components", "decks", "docs", "themes", "lib"],
};

function parseArgs() {
  const args = {};
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) args[m[1]] = m[2] ?? true;
  }
  return args;
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function canonicalVersion() {
  const sha = execSync("git rev-parse HEAD", { cwd: ROOT }).toString().trim();
  const shortSha = sha.slice(0, 7);
  let tag;
  try {
    tag = execSync("git describe --tags --exact-match HEAD 2>/dev/null", { cwd: ROOT }).toString().trim();
  } catch { tag = "untagged"; }
  return { sha, shortSha, tag };
}

function walk(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, base, out);
    else out.push({ abs: p, rel: relative(base, p) });
  }
  return out;
}

function copyPath(srcPath, destPath, stats) {
  if (statSync(srcPath).isDirectory()) {
    if (!existsSync(destPath)) mkdirSync(destPath, { recursive: true });
    for (const { abs, rel } of walk(srcPath)) {
      const dest = join(destPath, rel);
      mkdirSync(dirname(dest), { recursive: true });
      if (existsSync(dest) && sha256(abs) === sha256(dest)) { stats.skipped++; continue; }
      copyFileSync(abs, dest);
      stats.copied++;
    }
  } else {
    mkdirSync(dirname(destPath), { recursive: true });
    if (existsSync(destPath) && sha256(srcPath) === sha256(destPath)) { stats.skipped++; return; }
    copyFileSync(srcPath, destPath);
    stats.copied++;
  }
}

function main() {
  const args = parseArgs();
  const target = args.target;
  const profile = args.profile || "tokens";

  if (!target) throw new Error("missing --target=<path>");
  if (!existsSync(target)) throw new Error(`target does not exist: ${target}`);
  if (!PROFILES[profile]) throw new Error(`unknown profile: ${profile}. valid: ${Object.keys(PROFILES).join(", ")}`);

  const targetPkg = join(target, "package.json");
  if (!existsSync(targetPkg) && !args["allow-bare"]) {
    throw new Error(`target has no package.json: ${target} (pass --allow-bare to override)`);
  }

  const { sha, shortSha, tag } = canonicalVersion();
  const dsRoot = join(target, "design_handoff_lore");
  const versionFile = join(dsRoot, ".version");

  // Drift check (only blocks if .version exists and not --force).
  if (existsSync(versionFile) && !args.force && !args["check-only"]) {
    const prior = readFileSync(versionFile, "utf8");
    const m = prior.match(/\(([a-f0-9]+)\)/);
    if (m && m[1] !== shortSha) {
      const driftFiles = [];
      for (const subdir of PROFILES[profile]) {
        const srcDir = join(ROOT, subdir);
        if (!existsSync(srcDir)) continue;
        const items = statSync(srcDir).isDirectory() ? walk(srcDir) : [{ abs: srcDir, rel: "" }];
        for (const { abs, rel } of items) {
          const dest = rel ? join(dsRoot, subdir, rel) : join(dsRoot, subdir);
          if (existsSync(dest) && sha256(abs) !== sha256(dest)) driftFiles.push(rel ? join(subdir, rel) : subdir);
        }
      }
      if (driftFiles.length) {
        console.error(`refused: target has uncommitted edits to ${driftFiles.length} DS file(s).`);
        console.error(`  first 5: ${driftFiles.slice(0, 5).join(", ")}`);
        console.error(`  re-run with --force to overwrite, or backport the edits into the canonical first.`);
        process.exit(2);
      }
    }
  }

  const stats = { copied: 0, skipped: 0 };

  if (!args["check-only"]) {
    mkdirSync(dsRoot, { recursive: true });
    for (const subdir of PROFILES[profile]) {
      const srcPath = join(ROOT, subdir);
      const destPath = join(dsRoot, subdir);
      if (!existsSync(srcPath)) continue;
      copyPath(srcPath, destPath, stats);
    }

    const syncedAt = new Date().toISOString();
    writeFileSync(versionFile, `${tag} (${shortSha}) profile=${profile} synced=${syncedAt}\n`);

    if (existsSync(targetPkg)) {
      const pkg = JSON.parse(readFileSync(targetPkg, "utf8"));
      pkg.designSystem = { version: tag, sha: shortSha, profile, syncedAt };
      writeFileSync(targetPkg, JSON.stringify(pkg, null, 2) + "\n");
    }
  }

  console.log(`sync${args["check-only"] ? " --check-only" : ""}: ${target}`);
  console.log(`  canonical: ${tag} (${shortSha})`);
  console.log(`  profile:   ${profile}`);
  console.log(`  copied:    ${stats.copied} file(s)`);
  console.log(`  skipped:   ${stats.skipped} file(s) (already in sync)`);
}

try { main(); } catch (e) { console.error(`error: ${e.message}`); process.exit(1); }
