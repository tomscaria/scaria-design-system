#!/usr/bin/env node
/**
 * consumer-fintech-design-system CLI — adoption + migration helper.
 *
 *   npx @tomscaria/consumer-fintech-design-system init
 *     Wires the DS into the current app: checks the dependency, prints (and
 *     with --write, applies) the Tailwind preset + styles import + data-theme
 *     scaffold. Safe by default: --write only touches files it fully understands.
 *
 *   npx @tomscaria/consumer-fintech-design-system migrate [--apply]
 *     Migrates a consumer from @tomscaria/scaria-design-system and the old
 *     lore-x / rolr-x theme names to consumer-fintech-design-system with
 *     earth-x / arcade-x. Dry-run by default; --apply writes changes.
 *
 * Zero dependencies. Node >= 18.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const PKG = "@tomscaria/consumer-fintech-design-system";
const OLD_PKG = "@tomscaria/scaria-design-system";
const THEME_RENAMES = [
  ["lore-light", "earth-light"],
  ["lore-dark", "earth-dark"],
  ["rolr-light", "arcade-light"],
  ["rolr-dark", "arcade-dark"],
];
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", "out", "coverage", "derived"]);
const TEXT_EXT = new Set([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".css", ".scss", ".html", ".vue", ".svelte", ".astro", ".md", ".json", ".yml", ".yaml"]);

const args = process.argv.slice(2);
const cmd = args[0];
const flag = (f) => args.includes(f);
const log = (s) => console.log(s);

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) yield* walk(path.join(dir, e.name));
    } else if (TEXT_EXT.has(path.extname(e.name))) {
      yield path.join(dir, e.name);
    }
  }
}

function readJSON(p) {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; }
}

function detectPM(root) {
  if (fs.existsSync(path.join(root, "pnpm-lock.yaml"))) return "pnpm add";
  if (fs.existsSync(path.join(root, "yarn.lock"))) return "yarn add";
  if (fs.existsSync(path.join(root, "bun.lockb")) || fs.existsSync(path.join(root, "bun.lock"))) return "bun add";
  return "npm install";
}

function findTailwindConfig(root) {
  for (const n of ["tailwind.config.js", "tailwind.config.cjs", "tailwind.config.mjs", "tailwind.config.ts"]) {
    const p = path.join(root, n);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function init() {
  const root = process.cwd();
  const write = flag("--write");
  const pkg = readJSON(path.join(root, "package.json"));
  if (!pkg) { log("✖ No package.json here — run from your app root."); process.exit(1); }

  log(`\n${PKG} — init\n`);

  // 1. dependency
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (deps[PKG]) {
    log(`✔ dependency present (${deps[PKG]})`);
  } else {
    log(`1. Install the package:\n\n   ${detectPM(root)} ${PKG}\n`);
  }

  // 2. tailwind preset
  const tw = findTailwindConfig(root);
  if (tw) {
    const src = fs.readFileSync(tw, "utf8");
    if (src.includes(`${PKG}/preset`) || src.includes(`${PKG}/tailwind`)) {
      log(`✔ Tailwind preset already wired in ${path.basename(tw)}`);
    } else {
      log(`2. Add the preset to ${path.basename(tw)}:\n`);
      log(`   const preset = require('${PKG}/preset');`);
      log(`   // …inside the config object:`);
      log(`   presets: [preset],\n`);
      log(`   (Not auto-edited — Tailwind configs vary too much to rewrite safely.)\n`);
    }
  } else {
    log(`2. No tailwind.config found — if you use Tailwind, add:\n     presets: [require('${PKG}/preset')]\n`);
  }

  // 3. styles import — find the app's global css
  const cssCandidates = [];
  for (const f of walk(root)) {
    if (/(globals?|index|main|app)\.css$/.test(f) && !f.includes("node_modules")) cssCandidates.push(f);
  }
  const target = cssCandidates[0];
  const importLine = `@import '${PKG}/styles';`;
  if (target && fs.readFileSync(target, "utf8").includes(`${PKG}/styles`)) {
    log(`✔ styles imported in ${path.relative(root, target)}`);
  } else if (target && write) {
    fs.writeFileSync(target, importLine + "\n" + fs.readFileSync(target, "utf8"));
    log(`✔ wrote ${importLine}  →  ${path.relative(root, target)}`);
  } else if (target) {
    log(`3. Add to the top of ${path.relative(root, target)} (or run init --write):\n\n   ${importLine}\n`);
  } else {
    log(`3. Add to your global stylesheet:\n\n   ${importLine}\n`);
  }

  // 4. theme scaffold
  log(`4. Set a theme + expression on your root element:\n`);
  log(`   <html data-theme="earth-light" data-expression="product">\n`);
  log(`   themes: earth-light|earth-dark · arcade-light|arcade-dark · revenant-light|revenant-dark · primitive|primitive-dark · kiosk`);
  log(`   expressions: product (dense) · marketing (editorial)\n`);
  log(`Docs: MIGRATION.md + README in the package.\n`);
}

function migrate() {
  const root = process.cwd();
  const apply = flag("--apply");
  let filesTouched = 0, refs = 0, themes = 0;

  log(`\n${PKG} — migrate ${apply ? "(APPLYING)" : "(dry-run — pass --apply to write)"}\n`);

  for (const f of walk(root)) {
    // package.json is handled structurally below (dep key + version range).
    if (path.basename(f) === "package.json") continue;
    // lockfiles get regenerated on reinstall — don't churn them here.
    if (/package-lock\.json$|pnpm-lock\.yaml$|yarn\.lock$/.test(f)) continue;
    const before = fs.readFileSync(f, "utf8");
    let after = before.split(OLD_PKG).join(PKG);
    const refHits = (before.length - before.split(OLD_PKG).join("").length) / OLD_PKG.length;
    let themeHits = 0;
    for (const [oldT, newT] of THEME_RENAMES) {
      const c = after.split(oldT).length - 1;
      if (c) { themeHits += c; after = after.split(oldT).join(newT); }
    }
    if (after !== before) {
      filesTouched++; refs += refHits; themes += themeHits;
      log(`  ${apply ? "✔" : "→"} ${path.relative(root, f)}  (${refHits ? `${refHits} pkg ref` : ""}${refHits && themeHits ? ", " : ""}${themeHits ? `${themeHits} theme name` : ""})`);
      if (apply) fs.writeFileSync(f, after);
    }
  }

  // package.json dependency key
  const pkgPath = path.join(root, "package.json");
  const pkg = readJSON(pkgPath);
  if (pkg) {
    for (const field of ["dependencies", "devDependencies", "peerDependencies"]) {
      if (pkg[field]?.[OLD_PKG]) {
        log(`  ${apply ? "✔" : "→"} package.json ${field}: ${OLD_PKG} → ${PKG}@^2.1.0`);
        if (apply) {
          pkg[field][PKG] = "^2.1.0";
          delete pkg[field][OLD_PKG];
          fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
        }
      }
    }
  }

  log(`\n${filesTouched} file(s), ${refs} package ref(s), ${themes} theme name(s).`);
  if (!apply && filesTouched) log(`Re-run with --apply to write. Then: reinstall deps.`);
  if (apply) log(`Done. Reinstall deps (old data-theme="lore-*" markup keeps working via aliases, but is now renamed).`);
  log("");
}

if (cmd === "init") init();
else if (cmd === "migrate") migrate();
else {
  log(`\n${PKG}\n\n  init [--write]      wire the DS into this app (preset, styles, theme scaffold)`);
  log(`  migrate [--apply]   migrate from ${OLD_PKG} + lore/rolr theme names\n`);
  process.exit(cmd ? 1 : 0);
}
