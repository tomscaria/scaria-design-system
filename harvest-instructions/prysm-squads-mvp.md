# Harvest from `refractor-labs/prysm-squads-mvp/packages/design-system-vite`

> Status: ✅ **unblocked.** Repo is in MCP scope; local checkout at `~/scaria/prysm-squads-mvp/`. This is a **pattern reference pull**, not a wholesale lift.

## What to harvest

Per the plan: **CVA discipline + 12-hue × 9-stop palette completeness.** The Prysm-era DS is read-only canonical for two things:

1. **CVA composition discipline** — `cva()` + `withCva` + `withProvidedProps` pattern is the gold standard for component variants. The new kit should follow it.
2. **Palette completeness** — Prysm has a fully fleshed-out 12-hue × 9-stop palette (108 swatches). The new kit currently has fewer formal swatches per hue; the Prysm catalog is the reference for what "complete" looks like.

This is NOT a wholesale code lift. We're reading Prysm patterns and codifying them in `agent/visual/tokens/` and `agent/components/_patterns.md`.

## Inspection commands

```sh
# CVA pattern reference
cat ~/scaria/prysm-squads-mvp/packages/design-system-vite/CLAUDE.md
grep -rln "withCva\|withProvidedProps\|cva(" ~/scaria/prysm-squads-mvp/packages/design-system-vite/src | head -10

# Palette reference
find ~/scaria/prysm-squads-mvp/packages/design-system-vite -name "*.css" -o -name "tokens*" -o -name "palette*" 2>/dev/null | head -10
```

## Codification targets

| What | Destination in this kit |
|---|---|
| CVA + withCva + withProvidedProps pattern doc | `agent/components/_patterns.md` (to create) |
| Full 12-hue × 9-stop palette JSON | `agent/visual/tokens/palette.json` (to create) |
| Theme-to-palette mapping | Already in per-theme `colors_and_type.css`; document the convention in `agent/visual/tokens/color-roles.md` |

## Anti-patterns

- ❌ Lifting the Prysm DS source code wholesale — it's the *previous* DS; the kit replaces it
- ❌ Forking from Prysm without documenting the divergence points
- ❌ Treating Prysm's color values as canonical for Lore — Prysm's palette is a *catalog* reference, not the brand identity

## Bidirectional dependency

`prysm-squads-mvp` is **the primary consumer** of this kit post-publish (it's the Signal Labs sale target). After the pattern harvest, the migration patch in `consumer-patches/prysm-squads-mvp.md` rebases `packages/lore-webapp` and any other consuming apps onto the new external DS.
