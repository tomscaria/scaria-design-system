# Revenant Apparatus — Visual Primitive System

**Status:** Design spec · Rev 0.1 · 2026-06-21
**Scope:** A modular, composable, cheap primitive system that produces *all* Revenant illustration — marketing surfaces, the Learn Hub (267 pages), decks/memos, and restrained in-app motion — extensibly and at near-zero marginal cost.
**Grounds on:** the founder's "Revenant Apparatus — Visual Language Direction Rev 0.1" sheet (RA-VD-0001), the Flora model calibration (this session), and the existing kit (`ATOMIC_KIT.md`, `agent/components/*`, the `stat-*`/`orbit-*` classes on the live `/revenant` surface).

---

## 1. The architecture-defining rule

The Flora calibration proved one rule that dictates the whole architecture:

> **Never let a generative model own text or geometry that must be exact.**

Evidence: Ideogram 4.0 produced a beautiful sheet but duplicated label numbers (`03`, `06`); Nano Banana Pro *native* rendered all eight labels correctly **only because they were spelled out in the prompt**; the i2i pass richened the seed but **drifted the component names** despite an explicit "preserve labels" instruction. Models are excellent at *pictures*, unreliable at *exact symbols*.

Therefore the system splits into two layers, and everything modular/cheap lives in the code layer.

---

## 2. Two layers

**Layer A — composable code primitives.** Framework-agnostic SVG/CSS atoms (with thin React wrappers). `$0`, token-themeable, animatable, data-bindable, reused infinitely. This is the modular core.

**Layer B — rich pictorial bases.** Flora-generated mechanical "bodies," used sparingly and **cached as committed assets — never a live API call in a shipped page.**

**Composition contract:** every finished artifact is

```
artifact = Form base (Layer B Flora OR Layer A SVG)
         + Frame  (Layer A)
         + Annotation (Layer A)
         + Data   (Layer A)
```

This is exactly how the Rev 0.1 sheet is built: each panel = a form + annotations + a frame + data. The model supplies the *picture*; code supplies the *exact labels, specs, and marks*.

---

## 3. Primitive families (the catalog)

Build-priority order. Each atom ships, per kit convention, a `<name>.spec.md` + `<name>.tokens.json` + the implementation (SVG/CSS, optional React wrapper).

### 3.1 Annotation — the keystone (NEW, $0)
The connective tissue that makes everything read as one Revenant apparatus. Overlays *any* base. This is panel 6 of the Rev 0.1 sheet, currently unbuilt.

| Atom | Purpose | Key props (keep minimal) |
|---|---|---|
| `registration-mark` | corner/anchor crosshair-in-circle | `size`, `position` |
| `crosshair` | datum/center cross | `size` |
| `leader-callout` | line from point → label box | `from`, `to`, `label`, `side` |
| `datum-target` | filled target ▼ + frame letter (A/B/C) | `letter`, `at` |
| `break-line` | zig-zag section break | `axis`, `length` |
| `dot-grid` | 8px reference grid backing | `extent`, `spacing` |
| `tick-scale` | measurement scale, linear or log | `kind: linear\|log`, `range`, `at` |
| `angle-scale` | protractor arc, 0–95° | `range`, `at` |

Rendering: pure SVG. Theming: stroke = `--ann`, accent = `--accent`, labels in `--font-mono`. Animation: optional draw-on-scroll.

### 3.2 Frame (NEW, $0)
| Atom | Purpose | Key props |
|---|---|---|
| `sheet-frame` | dashed sheet border + corner ticks | `padding` |
| `title-block` | RA-VD-style block: project, doc-no, rev, date | `project`, `docNo`, `rev`, `date` |
| `ref-tag` | panel tag `REF-0N` | `id` |

### 3.3 Data — binds real numbers (extends existing `stat-*`, $0)
Falsification-first: these render *real* data, never invented performance.

| Atom | Purpose | Source |
|---|---|---|
| `spec-table` | parameter / symbol / nominal / tol / units / threshold / alert | extends `stat-row` |
| `terminal-log` | monospace agent ctrl log, one error line in accent | new |
| `population-grid` | telemetry grid: active ▣ / terminated ✕ / init ◉ | new |
| `gauge` | single dial readout | new |
| `stat-odometer` | animated counting value | new |

### 3.4 Form — the mechanical bodies ($0 SVG, or Flora base)
| Atom | Render strategy |
|---|---|
| `orbit` (lifecycle ring) | **exists** — refine to Rev 0.1 orbital diagram |
| `exploded-stack` | SVG for schematic; **Flora NBP** for hero/marketing richness |
| `cutaway` | SVG (section-hatched) |
| `lifecycle-ring` | SVG (Birth/Operation/Termination states) |

### 3.5 Token (extends kit tokens, $0)
- Color: brick-orange `#E05A2B`, concrete `#EDE9E5`, ink `#111111`, muted-warn (not flashing red). Pull from the `revenant` theme `--accent` etc. — do not hardcode in primitives.
- Type: **Aeonik** (display/label) + **IBM Plex Mono** (data/code).
- Line weights: structure `1.5`, detail `1`, hairline `0.75`, accent `2`.
- Grid: 8px dot grid.

---

## 4. Layer B — the Flora base pipeline

- **Models:** Nano Banana Pro native (`t2i-gemini-3-pro`, ~$0.18) for rich bases with correct in-prompt text; Recraft V4.1 Vector (`t2i-recraft-v4-1-vector-t2i`, ~$0.10) for editable vector drafts; Ideogram 4.0 for pure aesthetic where text is overlaid. **i2i is not used for exact text.**
- **Run path:** `POST /api/v1/generate` (canvas mode) → poll `/runs/{id}` → download → **commit the asset**. Auth + IDs per the handoff; rate ≈ $0.0009/credit.
- **Cache rule:** each base generated **once**, stored under `agent/visual/bases/revenant/<name>.{png,svg}`, referenced statically. Model deprecation or price change can never break a shipped page.
- **Budget:** the $0 code layer covers ~85% of surfaces; Flora is a thin top-up. Whole illustration system well under the $50 cap; the cap really only funds the launch video + character set.

---

## 5. Surfaces served

- **Learn Hub** (267 nodes / 8 categories): one Form base per category (+ flagship concepts) + Annotation/Data overlay; pages reuse by `node.category` → **$0/page**.
- **Marketing `/revenant`** (`sf-kit-migration/swarm-lab-site`, hero-only today): build folds + the launch-video fold; rich NBP bases + code chrome.
- **Decks / memos:** the same primitives, exported.
- **App:** restrained only — loaders, empty-states, success blooms from Annotation+Form atoms; core interaction stays normal.

---

## 6. Extensibility & guardrails (from the second-order analysis)

1. **Build Annotation + Frame first** — $0, vendor-independent, the keystone; composes with existing `stat-*`/`orbit-*`.
2. **Cache every Flora base as a committed asset** — removes model-drift / vendor risk.
3. **Keep primitives minimal** — generalize only on the 3rd real use; cap each at ~4 config props (defeats over-abstraction).
4. **Make composition the path of least resistance** + document the atoms in `ATOMIC_KIT.md` (defeats bespoke creep; triggers reuse critical mass).
5. **Re-skin path for Lore** = swap tokens only. Cross-brand reuse turns this into the Scaria-wide visual API.

**Leading indicators:** % of new illustrations assembled from primitives vs. hand-made · # of surfaces reusing the library · Flora $ per shipped asset (→ ~$0) · any primitive exceeding ~4 props before its 3rd use.

---

## 7. Build order → implementation plan

1. **Tokens** — add line-weight + grid tokens to the revenant theme.
2. **Annotation family** — the 8 atoms (keystone).
3. **Frame family** — sheet-frame, title-block, ref-tag.
4. **Data family** — extend `stat-*` into spec-table, terminal-log, population-grid, gauge, odometer.
5. **Form** — refine `orbit`; add `exploded-stack` (SVG) + the Flora base pipeline + cache.
6. **First real artifacts** — the *probability-statistics* Learn Hub master (the biggest category, 71 pages) + one marketing hero plate — as the templates the rest clone.

---

## 8. Open decisions

- **Kit location:** `agent/visual/primitives/<family>/<name>/` as source → built into the `./css/primitives` export. Confirm against canonical structure.
- **Canonical reconciliation:** this spec is authored in the stale `happy-bardeen-defc58` worktree. Canonical kit is `origin/main` 1.0.2 (`./css` API). The primitives must land there; `swarm-lab-site` also needs moving off the old `./styles` API (separate track).
- **Framework:** primitives authored as framework-agnostic SVG/CSS with thin React wrappers (consumers = React `swarm-lab-site` + Astro Learn Hub).

## 9. Non-goals (YAGNI)

- Not building all eight Flora mechanical-metaphor diagrams up front.
- Not animating everything at once (Revenant ceiling: "calm + one crescendo").
- Not a generic illustration engine — Revenant-specific, but token-re-skinnable.
