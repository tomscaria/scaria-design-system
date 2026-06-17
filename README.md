# Lore Design System — Atomic Kit

> Atomic brand kit for Lore + Revenant under Scaria, Inc. Built on the "HTML Brand" framework (Emmett / Little Plains, 2026). One brand encoded in two formats:
> - `human/` — traditional guidelines (PDFs, Figma)
> - `agent/` — machine-readable atomic files any agentic tool (Claude Design, Cursor, Code) can read and build from

## Quickstart for an agent

Given the full `agent/` folder and a target theme, you can build a coherent landing page, UI surface, or campaign in one prompt. Try:

> "Generate me an HTML landing page based on the atomic design system at `agent/`, using the `revenant-light` theme and `marketing` expression."

The result will use the correct fonts, type scale, motion curves, color palette, tone of voice, and component primitives — all sourced from this kit.

## Structure

```
lore-design-system/
├── readme.md              ← you are here
├── magic_trick.md         ← Scaria, Inc. umbrella POV
├── human/                 ← PDFs, Figma links
├── inspo/                 ← reference imagery (drives new theme authoring)
└── agent/
    ├── brands/
    │   ├── lore/{magic_trick.md, verbal/×6}
    │   └── revenant/{magic_trick.md, verbal/×6}
    ├── visual/            ← brand-wide visual primitives
    │   ├── fonts/         ← Aeonik, Aeonik Mono, Lock Serif, Inter, Geist
    │   ├── assets/        ← logos, marks, employee/partner/employer marks
    │   ├── tokens/        ← token specimens (introspectable JSON / md)
    │   ├── motion/        ← motion.json + motion.css (six primitives)
    │   └── artifacts/
    │       ├── web/       ← landing artifact templates
    │       └── product/   ← product UI artifact templates
    ├── themes/            ← one micro-kit per theme
    │   ├── lore-light/    ← ✅ retrofit from existing
    │   ├── lore-dark/     ← ✅ retrofit
    │   ├── primitive/     ← ✅ retrofit
    │   ├── primitive-dark/← 🆕 stub
    │   ├── revenant-light/← 🆕 author from inspo (Phase 0)
    │   ├── revenant-dark/ ← 🆕 author from inspo (Phase 0)
    │   ├── berlin/        ← 🆕 awaiting inspo
    │   └── kiosk/         ← ♻️ restore from earlier expressive themes
    └── components/        ← UI primitives + specs (theme-agnostic)
```

## The two axes

Themes carry **color + type identity**. Expressions carry **rhythm** (density, motion budget, section spacing). Compose both on `<html>`:

```html
<html data-theme="revenant-light" data-expression="product">   <!-- dashboard -->
<html data-theme="revenant-light" data-expression="marketing"> <!-- deck/landing -->
```

Default expression is `product`. Marketing/deck surfaces opt in.

## Consuming

**As an atomic kit** (drop folder into Cursor / Claude Design / agent):
```
~/scaria/<your-project>/lore-kit/  ← clone or copy the agent/ folder here
```

**As an npm package** (for traditional component imports):
```sh
npm install @tomscaria/lore-design-system
```
```ts
import { Button, Card } from '@tomscaria/lore-design-system';
```
```css
@import '@tomscaria/lore-design-system/styles';
```

## Editing

Change a primary color: edit one CSS var in `agent/themes/<theme>/colors_and_type.css`.
Change a motion curve: edit the JSON in `agent/visual/motion/motion.json`.
Re-publish derived npm; consumers pick up changes on `npm update`.

## License

UNLICENSED. IP owned by tomscaria, licensed to refractor-labs for production use (primarily `prysm-squads-mvp`).
