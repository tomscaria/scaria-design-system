# d3-charts — harvest target

> 🟡 **Empty.** Drop target for D3 chart primitives harvested from `tomscaria/Thomas-OS`.

## What goes here

Per the unification plan (Move 3): D3 chart components that exist in Thomas OS but not in the current `scaria-design-system`. The Thomas OS instance is ahead — its charts are the canonical source going forward.

Expected file shape (per component):

```
agent/components/d3-charts/
├── _README.md                  ← you are here
├── line-chart/
│   ├── line-chart.spec.md      ← agent-readable spec
│   ├── line-chart.tokens.json  ← machine-readable consumption manifest
│   └── line-chart.tsx          ← React implementation
├── bar-chart/
├── candle/
├── calibration-surface/        ← Revenant-specific
└── ... other charts
```

Each component follows the same convention as `agent/components/button/`:
- `*.spec.md` — purpose, tokens consumed, API, anti-patterns, accessibility, theme behavior
- `*.tokens.json` — variants, default variants, consumed tokens (color/type/radii/motion/spacing)
- `*.tsx` — React implementation; theme-agnostic (reads CSS vars)

## Harvest procedure

When Thomas OS becomes accessible (MCP scope, local clone, or file upload):

1. **Diff audit first.** Identify which Thomas OS files are genuinely ahead vs. drift.
2. **Lift the ahead files.**
3. **Refactor for theme-agnostic tokens.** Replace hard-coded colors with CSS var references.
4. **Author the spec.** For each chart, write the `*.spec.md` and `*.tokens.json` following the button pattern.
5. **Add to `agent/components/_index.md`** so agents can introspect what's available.

## Anti-patterns

- ❌ Lifting full component code without the spec — the spec is what makes it agent-readable
- ❌ Lifting drift (Thomas OS files that diverge from `scaria-design-system` HEAD without being genuinely ahead)
- ❌ Hard-coding colors / sizes in the chart code rather than reading CSS vars
- ❌ Adding chart-library dependencies (d3, recharts) to the kit's `peerDependencies` without an explicit minor version bump
