# Lore Design System

Canonical source of truth for everything Lore-branded across Thomas's projects: design tokens, fonts, brand assets, shadcn UI primitives, institutional component patterns, and the HTML deck runtime.

This repo replaces 9+ drifting `design_handoff_lore` folders that lived in scattered project directories and Downloads zips. Updates flow OUT from this repo into consumers via an explicit `sync` command — no symlinks, no submodules, no automatic upgrades.

## Provenance

Consolidated 2026-05-11 from four sources:

1. `~/scaria/Thomas OS/design_handoff_lore/` (Apr 27 baseline — superseded)
2. `~/scaria/design_handoff_lore 2/` (May 11 — primary source for tokens + insto theme docs)
3. `~/scaria/design_handoff_marketing_and_decks 2/` (May 11 — primitives.css, JSON token exports)
4. `~/scaria/lore-institutional/` (live Vite app — 49 shadcn primitives, 7 named insto patterns, 6 design docs, partner logos)

## Structure

```
tokens/                Design tokens. The 988-line colors_and_type.css is the canonical CSS.
fonts/                 Aeonik (Reg/Med/Bold + Mono) + LockSerif (.woff2)
assets/
  brand/               Lore brand marks + wordmarks
  partners/            Partner / backer logos (Polychain, Axelar, Sui, Monad, …)
  tokens/              Crypto + equity asset SVGs (btc, eth, sol, aapl, …)
  icons/               UI icon set (TSX wrappers + raw SVGs)
themes/                Theme reference (light theme convention)
components/
  ui/                  49 shadcn primitives (Button, Card, Dialog, …)
  insto/               Named institutional patterns (FundManagerConsole, BentoTile, …)
decks/                 HTML deck runtime (deck-stage.js, lore-elements.js)
docs/                  Design docs: INSTO_THEME, INSTO_COMPONENTS, VISUAL_SYSTEM, MOTION_SYSTEM, VOICE_AND_TONE, COPY_GUIDELINES
preview/               Standalone HTML preview pages for color/type/component swatches
lib/                   Utilities required by components (cn helper)
scripts/               sync.mjs, check.mjs
```

## Consume

To pull this DS into a project, run:

```bash
node ~/scaria/lore-design-system/scripts/sync.mjs --target=/path/to/your/project --profile=<profile>
```

This copies the relevant subset into `<target>/design_handoff_lore/`, stamps a `.version` file with the canonical's git SHA, and adds a `designSystem` block to the target's `package.json`.

### Profiles

| Profile | Includes | Use for |
|---|---|---|
| `tokens` | `tokens/`, `fonts/`, `assets/brand/` | Minimal: a static page or a marketing site |
| `tokens+decks` | `tokens` + `decks/` + `assets/tokens/`, `assets/icons/` | Thomas OS (HTML decks) |
| `tokens+components` | `tokens` + `components/` + `assets/partners/` + `assets/tokens/` + `lib/` | Vite/React apps (swarm-fund-mvp, lore-institutional, future Lore apps) |
| `full` | Everything except `preview/` | Any consumer that wants the lot |

### Consumer tsconfig

The `components/ui/` and `components/insto/` files import via `@/` aliases (e.g., `import { cn } from "@/lib/utils"`, `import { Button } from "@/components/ui/button"`). The canonical mirrors the lore-institutional `src/` layout exactly, so the aliases resolve cleanly if your consumer's `tsconfig.json` maps `@/*` to the synced `design_handoff_lore/*` path:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["design_handoff_lore/*"]
    }
  }
}
```

If you already use `@/` for your own `src/`, add a second entry:

```json
"paths": {
  "@/*": ["src/*"],
  "@ds/*": ["design_handoff_lore/*"]
}
```

…and rewrite the lifted components' imports to use `@ds/...` instead of `@/...`. (One-time sed across `design_handoff_lore/components/`.)

## Upgrade workflow

1. Edit files in this repo (`~/scaria/lore-design-system/`).
2. Commit + push: `git commit -am "…" && git push`.
3. Bump version + tag: `npm version patch` (or `minor`/`major`), then `git push --tags`.
4. Re-run `sync.mjs --target=<consumer>` for each consumer that should pick up the change.

Consumers don't upgrade automatically. Every `sync` is explicit. Run `node scripts/check.mjs` (no args) to scan all registered consumers and report drift.

## Version policy

Semver:
- **patch** — token tweak, asset replacement, docs-only edit
- **minor** — new component, new asset category, additive change
- **major** — breaking rename, removed component, restructured paths

## Drift guards

Two layers:

1. **Canonical-side:** `scripts/check.mjs` walks the hard-coded `CONSUMERS` list, checks each consumer's `design_handoff_lore/.version` against the canonical, and reports any sha256 mismatches on synced files.
2. **Thomas-OS-side:** `~/scaria/Thomas OS/scripts/check-design-system.mjs` verifies that `design_handoff_lore/tokens/colors_and_type.css` matches every `public/deck*/tokens.css`. Wired into Thomas OS's `prebuild:deck` hook so a divergent deck token fails the build loudly.

Drift is detected, not auto-fixed. The fix is either re-running `sync` (canonical wins) or backporting the consumer edit into the canonical (consumer wins) and then re-syncing.
