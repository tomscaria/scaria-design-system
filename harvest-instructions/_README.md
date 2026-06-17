# Harvest instructions

> Move 3 of the unification plan: pull DS-relevant work from source repos into this atomic kit before re-authoring anything. Each harvest = one PR with a diff audit (lifted verbatim vs. rewritten).

## Sources and lift targets

| Source repo | Lift | Lands in |
|---|---|---|
| `tomscaria/Thomas-OS` | D3 chart primitives, logo systems, any DS edits ahead of `lore-design-system` HEAD | `agent/components/d3-charts/`, `agent/visual/assets/logos/`, diff-audit of `agent/components/*` |
| `tomscaria/lorepreseriesa` (was `lore-teaser-prea`) | Motion system + Playground rule set | `agent/visual/motion/`, `agent/playground/` (to create) |
| `tomscaria/lore-institutional` | Flora framework (if confirmed) | `agent/components/marketing/flora/` or replace marketing artifact wholesale |
| `refractor-labs/prysm-squads-mvp/packages/design-system-vite` | CVA discipline + 12-hue × 9-stop palette completeness | Pattern reference + palette completeness in `agent/visual/tokens/` |

## Procedure (per source)

1. **Confirm access.** Is the source repo in MCP scope OR locally clone-able OR upload-able? If none of those, harvest is blocked.
2. **Diff audit.** Compare source HEAD against `lore-design-system` HEAD. Identify which files are genuinely ahead vs. drift.
3. **Lift ahead files.** Copy to the destination path in this kit.
4. **Refactor for atomic-kit conventions.** Each lifted component needs a `*.spec.md` and `*.tokens.json` companion; CSS vars instead of hard-coded values; theme-agnostic.
5. **Document the harvest.** Write the diff in this folder as `<source>.md` — what was lifted, what was rewritten, what was skipped.

## Per-source instruction files

- `thomas-os.md` — D3 charts + logos (highest priority; most divergent)
- `lorepreseriesa.md` — Motion + Playground harvest
- `lore-institutional.md` — Flora framework harvest (if confirmed YES per founder)
- `prysm-squads-mvp.md` — CVA discipline reference pull (not a wholesale lift; pattern reference)
