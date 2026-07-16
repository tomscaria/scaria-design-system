# consumer-fintech-design-system

A consumer-fintech design system by **Scaria, Inc.** — design tokens, a multi-theme
runtime, a Tailwind preset, kit CSS primitives, and thin React component wrappers.
One system, encoded in two formats:

- **`agent/`** — machine-readable atomic files any agentic tool (Claude, Cursor, Code) can read and build from.
- **`tokens/` + `styles.css` + `preset.cjs`** — the runtime a product ships: CSS variables, per-theme blocks, and the Tailwind preset.

## Themes

Composed on `<html>`/`<body>` via `data-theme` (identity: color + type) and
`data-expression` (rhythm: spacing, hero scale, motion pace — `product` | `marketing`).

| Theme | Register |
|---|---|
| `earth-light` / `earth-dark` | Warm consumer-fintech — parchment, graphite, chartreuse |
| `arcade-light` / `arcade-dark` | Prediction-market / liveness — indigo, near-black grounds |
| `revenant-light` / `revenant-dark` | American-Dynamism ops — concrete, onyx, signal orange |
| `primitive` / `primitive-dark` | **The Studio** — Scaria flagship marketing identity |
| `kiosk` | High-contrast, touch-first |

```html
<html data-theme="earth-light" data-expression="marketing">
```

## Install

```bash
npm install @tomscaria/consumer-fintech-design-system
```

> Published to GitHub Packages today (scoped `@tomscaria`, needs a `read:packages`
> token via `.npmrc`). A zero-auth public-npm path is being wired up separately.

## Quickstart

**CSS tokens + all themes:**
```js
import '@tomscaria/consumer-fintech-design-system/styles';   // fonts + every theme + brand layer
// or just the token layer:
import '@tomscaria/consumer-fintech-design-system/css';
```

**Tailwind preset** (colors, type scale, spacing, motion all resolve through the theme CSS vars):
```js
// tailwind.config.js
const preset = require('@tomscaria/consumer-fintech-design-system/tailwind');
module.exports = { presets: [preset], content: ['./src/**/*.{ts,tsx}'] };
```

**React wrappers** (optional — React is an optional peer dependency):
```tsx
import { Button, Panel, StatStrip } from '@tomscaria/consumer-fintech-design-system';
```

## Subpath exports

| Import | What |
|---|---|
| `.` | React component wrappers (ESM + CJS + types) |
| `/styles` | Aggregate CSS: fonts + every theme + brand layer |
| `/css`, `/css/primitives`, `/css/kit`, `/css/dataviz` | Individual CSS layers |
| `/tailwind` (alias `/preset`) | Tailwind preset (`.cjs` — `require` and `import` both work) |
| `/themes/<name>` | A single theme's `colors_and_type.css` |
| `/tokens.json` | Machine-readable token summary |
| `/agent/*` | Raw atomic kit files |

## Migration

Renaming from `@tomscaria/scaria-design-system`, and the `lore-*` / `rolr-*` themes
were renamed to `earth-*` / `arcade-*` in **2.0.0**. The old `data-theme="lore-*"`
values still resolve via deprecated backward-compat aliases, so existing markup keeps
working. See [`MIGRATION.md`](./MIGRATION.md).

## License

[Apache-2.0](./LICENSE) — © 2026 Scaria, Inc. Free to use in commercial and
proprietary products; attribution required.
