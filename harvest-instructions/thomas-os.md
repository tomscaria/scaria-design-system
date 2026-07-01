# Harvest from `tomscaria/Thomas-OS`

> Status: 🟡 **blocked on access.** Thomas OS is not in current MCP scope and not present on the sandbox. To unblock: grant scope OR upload `src/components/charts/`, `src/components/visuals/`, `src/components/logos/` directly to the conversation OR copy locally to `~/scaria/Thomas-OS/`.

## What we expect to find

Based on the unification plan and founder direction, Thomas OS contains:

- **D3 chart primitives** — line, bar, candle, calibration-surface, plus any Revenant-specific charts (lifecycle pyramid, graveyard timeline, factor-library waterfall, etc.)
- **Logo systems** — employees / distribution partners / employers (Citi, Wyre, Polychain, Prysm, Lore as operator track-record marks)
- **DS component edits** — possibly ahead of `scaria-design-system` HEAD; needs diff audit

## Pre-harvest: diff audit

Before lifting anything:

```sh
# From the user's Mac:
diff -rq ~/scaria/Thomas-OS/src/components/ ~/scaria/scaria-design-system/src/components/ 2>/dev/null | tee /tmp/thomas-os.diff.txt
```

The audit identifies:
- **Ahead** — files in Thomas OS that don't exist in `scaria-design-system` or are genuinely newer (lift these)
- **Drift** — files that diverge in both but with no clear "newer" signal (need founder judgment)
- **Behind** — files older in Thomas OS than in `scaria-design-system` (skip)

Save the audit output to `harvest-instructions/thomas-os.diff.txt` when complete.

## Lift targets and destinations

| Source path (Thomas OS) | Destination (this kit) | Notes |
|---|---|---|
| `src/components/charts/*.tsx` | `agent/components/d3-charts/<chart>/<chart>.tsx` | One subdir per chart |
| `src/components/charts/*.spec.md` (if exists) | `agent/components/d3-charts/<chart>/<chart>.spec.md` | If not, author after lift |
| `src/lib/charts/*.ts` | `agent/components/d3-charts/_lib/*.ts` | Chart-helper modules |
| `src/components/logos/lore-*.svg` | `agent/visual/assets/logos/lore/` | Lore marks |
| `src/components/logos/employees/*` | `agent/visual/assets/logos/employees/` | Plus generate `_index.json` |
| `src/components/logos/partners/*` | `agent/visual/assets/logos/distribution-partners/` | Plus `_index.json` |
| `src/components/logos/employers/*` | `agent/visual/assets/logos/employers/` | Plus `_index.json` |

## Post-harvest

1. For every component lifted: confirm it reads CSS vars (not hard-coded colors). Refactor if needed.
2. For every chart: write `*.spec.md` + `*.tokens.json` following `agent/components/button/` shape.
3. Add `d3` (or `recharts`, etc.) to peerDependencies in `package.json`. Bump minor.
4. Add a changeset describing the harvest.
5. Run `pnpm run build` to verify the package builds clean with the new content.

## Anti-patterns

- ❌ Lifting full Thomas OS tree without the diff audit — risks importing drift
- ❌ Lifting components without converting hard-coded colors to CSS vars
- ❌ Lifting test fixtures or scratch files alongside production components
- ❌ Lifting node_modules-fetched libs (re-add as proper peerDeps)
