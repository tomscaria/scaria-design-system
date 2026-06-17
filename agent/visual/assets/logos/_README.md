# logos — harvest target

> 🟡 **Empty.** Drop target for logo system components harvested from `tomscaria/Thomas-OS`.

## What goes here

Per the unification plan (Move 3): logo / mark systems that exist in Thomas OS. Three families per the plan:

- **Employees** — current and former team members rendered as marks
- **Distribution partners** — fintech / neobank / broker / wallet partner marks
- **Employers** — Citi, Wyre, Polychain, Prysm, Lore (the operator's track record marks)

Plus the canonical Lore mark and (eventually) the Revenant mark.

## Expected file shape

```
agent/visual/assets/logos/
├── _README.md                ← you are here
├── lore/
│   ├── lore-wordmark.svg
│   ├── lore-mark.svg
│   └── lore-mark.tsx         ← React wrapper (optional)
├── revenant/                 ← 🟡 mark TBD pending brand identity
├── employees/
│   ├── <person-slug>.svg
│   └── _index.json           ← name → file mapping
├── distribution-partners/
│   ├── <partner-slug>.svg
│   └── _index.json
└── employers/                ← operator's track record
    ├── citi.svg
    ├── wyre.svg
    ├── polychain.svg
    ├── prysm.svg
    └── lore.svg
```

## Anti-patterns

- ❌ Raster (PNG/JPEG) for marks unless absolutely necessary — prefer SVG
- ❌ Hard-coded fills in SVG — use `currentColor` so the theme controls color
- ❌ Per-partner directories without an `_index.json` (agents need the mapping)
- ❌ Stale partner marks (former relationships) without an `_archived/` move
