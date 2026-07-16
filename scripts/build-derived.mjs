#!/usr/bin/env node
// Build derived/npm from the atomic kit.
//
// For v0.1.0 the package ships:
//   - preset.cjs (root, used directly — CJS so require()/import both load it)
//   - styles.css (root, used directly)
//   - agent/* (raw kit files for tools that read the atomic kit)
//   - derived/npm/index.{mjs,js,d.ts} — entry stubs so the package is importable as JS
//
// When components land (currently only button has a spec, no built React),
// extend this script to tsc-compile src/ → derived/npm/.

import { mkdir, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "derived", "npm");

// Single source of truth — read the version from package.json so changeset
// bumps propagate to the derived entry stubs instead of drifting.
const VERSION = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version;

async function ensureDir(d) {
  await mkdir(d, { recursive: true });
}

async function writeEntry(file, content) {
  await ensureDir(dirname(file));
  await writeFile(file, content, "utf8");
}

async function main() {
  await ensureDir(OUT);

  await writeEntry(
    join(OUT, "index.mjs"),
    `// @tomscaria/consumer-fintech-design-system — ESM entry
// The kit's primary surface is CSS + preset + raw atomic files.
// React components live behind subpath imports as they land.

export const version = "${VERSION}";
export const themes = [
  "earth-light",
  "earth-dark",
  "revenant-light",
  "revenant-dark",
  "primitive",
  "primitive-dark",
  "kiosk",
  "arcade-light",
  "arcade-dark",
];
export const expressions = ["product", "marketing"];
export const brands = ["lore", "revenant"];
`
  );

  await writeEntry(
    join(OUT, "index.cjs"),
    `// @tomscaria/consumer-fintech-design-system — CJS entry
"use strict";
module.exports = {
  version: "${VERSION}",
  themes: [
    "earth-light",
    "earth-dark",
    "revenant-light",
    "revenant-dark",
    "primitive",
    "primitive-dark",
    "kiosk",
    "arcade-light",
    "arcade-dark",
  ],
  expressions: ["product", "marketing"],
  brands: ["lore", "revenant"],
};
`
  );

  await writeEntry(
    join(OUT, "index.d.ts"),
    `// @tomscaria/consumer-fintech-design-system — types
export declare const version: string;
export declare const themes: readonly string[];
export declare const expressions: readonly ("product" | "marketing")[];
export declare const brands: readonly ("lore" | "revenant")[];
`
  );

  console.log("derived/npm built");

  const mustExist = [
    "preset.cjs",
    "styles.css",
    "agent/themes/earth-light/colors_and_type.css",
    "agent/themes/earth-dark/colors_and_type.css",
    "agent/themes/revenant-light/colors_and_type.css",
    "agent/themes/revenant-dark/colors_and_type.css",
    "agent/themes/primitive/colors_and_type.css",
    "agent/themes/kiosk/colors_and_type.css",
    "agent/themes/arcade-light/colors_and_type.css",
    "agent/themes/arcade-dark/colors_and_type.css",
    "agent/visual/fonts/fonts.css",
    "agent/visual/dataviz/dataviz.css",
    "agent/visual/patterns/patterns.css",
    "agent/visual/patterns/orbfield.css",
    "agent/visual/patterns/orbfield.js",
    "agent/visual/patterns/leadrow.css",
    "agent/visual/botw/botw-flair.css",
    "agent/visual/glyphs/ledger-glyphs.svg",
    "agent/visual/motion/motion.css",
    "agent/visual/motion/motion.json",
    "magic_trick.md",
    "agent/brands/lore/magic_trick.md",
    "agent/brands/revenant/magic_trick.md",
  ];
  for (const f of mustExist) {
    if (!existsSync(join(ROOT, f))) {
      console.error(`MISSING: ${f}`);
      process.exit(1);
    }
  }
  console.log("  all package.json export paths verified present");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
