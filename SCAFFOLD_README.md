# Scaffold drop instructions

Starter kit for the new Lore atomic design system. Copy into `~/scaria/lore-design-system/` on your Mac to bootstrap the Little Plains "HTML Brand" structure.

## What's in here

| File | Status |
|---|---|
| `readme.md` | ✅ atomic kit overview |
| `magic_trick.md` | 🟡 **founder authorship needed** — template only, with prompts |
| `preset.js` | ✅ refactored Tailwind preset — reads CSS vars for `fontSize`/`fontFamily`/`spacing-rhythm`/`borderRadius`/`shadow`/`transition` (Move 1 spine). Drop into the package root. |
| `agent/verbal/voice.md` | ✅ ported from `docs/brand/VOICE_AND_TONE.md` |
| `agent/verbal/positioning.md` | 🟡 draft — founder-confirm |
| `agent/verbal/audience.yaml` | 🟡 draft — founder-confirm |
| `agent/verbal/messaging.md` | ✅ codified from `COPY_GUIDELINES.md` |
| `agent/verbal/differentiation.md` | 🟡 draft — founder-confirm |
| `agent/verbal/concepts.md` | 🟡 draft — house vocabulary, founder-confirm |
| `agent/visual/motion/motion.json` | ✅ codified from `MOTION_SYSTEM.md` |
| `agent/visual/motion/motion.css` | ✅ utility classes for the six primitives, reduced-motion handled |
| `agent/visual/tokens/_index.md` | ✅ specimen authoring index |
| `agent/visual/tokens/color-roles.md` | ✅ semantic color tokens reference |
| `agent/visual/tokens/type-scale.md` | ✅ per-theme type scale reference (Move 1 contract) |
| `agent/visual/tokens/accent-usage.md` | ✅ strict accent rules |
| `agent/visual/tokens/spacing-rhythm.md` | ✅ primitive + rhythm spacing systems |
| `agent/visual/tokens/motion-budget.md` | ✅ per-page motion budget + reduction order |
| `agent/themes/lore-light/{colors_and_type.css, tokens.json, readme.md}` | ✅ **reference implementation** — full per-theme contract incl. `data-expression` overrides |
| `agent/themes/lore-dark/{colors_and_type.css, tokens.json, readme.md}` | ✅ |
| `agent/themes/primitive/{colors_and_type.css, tokens.json, readme.md}` | ✅ |
| `agent/themes/primitive-dark/{colors_and_type.css, readme.md}` | 🟡 stub (low priority) |
| `agent/themes/kiosk/{colors_and_type.css, tokens.json, readme.md}` | ✅ restored from earlier expressive themes work |
| `agent/themes/revenant-light/readme.md` | 🟡 **PLACEHOLDER** — Phase 0; needs inspo |
| `agent/themes/revenant-dark/readme.md` | 🟡 **PLACEHOLDER** — Phase 0; needs inspo |
| `agent/themes/berlin/` | (empty) — awaiting inspo |
| `agent/components/button/{button.spec.md, button.tokens.json}` | ✅ example component-spec format |

## Drop pattern

```sh
# Merge into your existing lore-design-system (don't overwrite — it already has assets/, components/, decks/, docs/, fonts/)
rsync -av /home/user/lore-design-system-scaffold/ ~/scaria/lore-design-system/
```

The atomic-kit structure (`agent/`, `human/`, `inspo/`, `magic_trick.md`, top-level `readme.md`) sits **alongside** your existing `assets/`, `components/`, `decks/`, `docs/`, `fonts/`. Nothing existing gets clobbered.

`preset.js` at the root will replace whatever is there today — preview the diff before committing. The new version is the Move 1 refactor (per-theme type / motion / spacing via CSS vars).

## Quickstart for an agent (Claude Design / Cursor / Code)

Drop the `agent/` folder into your tool and prompt:

> "Generate an HTML landing page based on the atomic design system at `agent/`, using the `lore-light` theme and `marketing` expression. Pull voice from `agent/verbal/voice.md` and positioning from `agent/verbal/positioning.md`."

The model has everything it needs: tone, type scale, color rules, motion vocabulary, accent constraints, banned words. Result should match the brand without further direction.

## What this scaffold DOES NOT do

- ❌ Doesn't refactor the existing `lore-design-system` component code (`src/components/...`) to use the new tokens — that's Move 1 follow-on work that needs MCP scope on the repo.
- ❌ Doesn't author `revenant-*` aesthetic values — Phase 0, needs inspo image review.
- ❌ Doesn't harvest Thomas OS D3 charts or logo systems — Move 3, needs MCP scope on Thomas OS.
- ❌ Doesn't publish to npm — Move 4, needs local lockfile + Changesets setup.

## Next concrete steps

After you drop this in:

1. **Founder pass** — review the 🟡 drafts (positioning, audience, differentiation, concepts, magic_trick.md). Each was assembled from existing brand cues; needs your judgment to confirm or rewrite.
2. **Grant MCP scope** on `tomscaria/lore-design-system` so I can PR (a) refactor the component CSS to read from the new CSS vars, (b) port the remaining themes that exist in your current repo, (c) set up Changesets + the publish workflow.
3. **Upload inspo images individually** so Phase 0 for `revenant-light` / `revenant-dark` can begin. Start with the most directional ones (likely `designmaxxing 1/2`, `HH3Wc0aa8AAtpjp`, `machine age modern`).
4. **Drop `inspo/` confirms.** The Emmett HTML framework is already consumed.

## Full file tree

```
lore-design-system-scaffold/
├── SCAFFOLD_README.md
├── readme.md
├── magic_trick.md
├── preset.js
└── agent/
    ├── verbal/
    │   ├── voice.md
    │   ├── positioning.md
    │   ├── audience.yaml
    │   ├── messaging.md
    │   ├── differentiation.md
    │   └── concepts.md
    ├── visual/
    │   ├── motion/
    │   │   ├── motion.json
    │   │   └── motion.css
    │   └── tokens/
    │       ├── _index.md
    │       ├── color-roles.md
    │       ├── type-scale.md
    │       ├── accent-usage.md
    │       ├── spacing-rhythm.md
    │       └── motion-budget.md
    ├── components/
    │   └── button/
    │       ├── button.spec.md
    │       └── button.tokens.json
    └── themes/
        ├── lore-light/   { colors_and_type.css, tokens.json, readme.md }
        ├── lore-dark/    { colors_and_type.css, tokens.json, readme.md }
        ├── primitive/    { colors_and_type.css, tokens.json, readme.md }
        ├── primitive-dark/ { colors_and_type.css, readme.md }
        ├── kiosk/        { colors_and_type.css, tokens.json, readme.md }
        ├── revenant-light/ { readme.md }
        ├── revenant-dark/  { readme.md }
        └── berlin/       (empty)
```
