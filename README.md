# Lore Design System

Canonical source of truth for everything Lore-branded across Thomas's projects:
design tokens, themes (lore-light/dark, revenant-light/dark, kiosk, primitive),
fonts, brand assets, shadcn UI primitives, institutional component patterns,
Tailwind preset, and a thin React component layer wrapping the kit CSS.

Published privately to **GitHub Packages** as `@tomscaria/lore-design-system`.
Consumed by `swarm-fund-mvp`, `Thomas OS`, and `lore-teaser-prea`.

> **Note:** The package name `@tomscaria/lore-design-system` is a holding
> pattern. The canonical name (and the public/private + license decisions)
> are pending the IP conversation with Lore. See **Status** below.

---

## Install

### 1. Configure auth (one-time, per consuming project)

GitHub Packages requires a token to install private packages. Generate a
GitHub Personal Access Token with the `read:packages` scope (or a fine-grained
token with "Packages: Read" on this repo), then:

```bash
export NPM_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxx
```

Copy `.npmrc.example` from this repo into your project root as `.npmrc`
(or merge into your existing one):

```ini
@tomscaria:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_GITHUB_TOKEN}
always-auth=true
```

### 2. Install the package

```bash
npm install @tomscaria/lore-design-system
# or
pnpm add @tomscaria/lore-design-system
```

React is a peer dependency (`>=18`) and is optional — if you only need the
CSS / Tailwind preset, you can skip installing React.

---

## Usage

### CSS-only (any framework, any environment)

```html
<!-- in your global CSS or HTML head -->
<link rel="stylesheet" href="node_modules/@tomscaria/lore-design-system/tokens/colors_and_type.css">
<link rel="stylesheet" href="node_modules/@tomscaria/lore-design-system/preview/_revenant-kit.css">

<body data-theme="revenant-dark">
  <header class="sys-header">
    <a href="/" class="wordmark">LORE® REVENANT</a>
  </header>
  ...
</body>
```

Or via JS bundler import (Vite, Next.js, esbuild, etc.):

```ts
import '@tomscaria/lore-design-system/css';        // tokens + all theme blocks
import '@tomscaria/lore-design-system/css/kit';    // component classes
```

Switch themes by toggling the `data-theme` attribute on any ancestor element:

```html
<body data-theme="lore-light">      <!-- or lore-dark, revenant-light, revenant-dark, kiosk, primitive -->
```

### React component wrappers

```tsx
import {
  SysHeader, LiveDot,
  Panel, PanelHeader, PanelBody,
  StatStrip, StatCell,
  Button, Badge, LogRow,
} from '@tomscaria/lore-design-system';
import '@tomscaria/lore-design-system/css';
import '@tomscaria/lore-design-system/css/kit';

export function Dashboard() {
  return (
    <div data-theme="revenant-dark">
      <SysHeader
        wordmark="LORE® REVENANT"
        status={<><LiveDot /> LIVE</>}
      />
      <StatStrip columns={4}>
        <StatCell label="Published PnL" value="+18.4%" delta="30d net" accent />
        <StatCell label="Fleet Sharpe"   value="2.31"   delta="↑ 0.18 wk" deltaTone="pos" />
        <StatCell label="Strategies"     value="48"     delta="live + canary" />
        <StatCell label="Paper Agents"   value="180"    delta="in selection" />
      </StatStrip>

      <Panel>
        <PanelHeader title="Latest Decision" trailing={<Badge tone="live">LIVE</Badge>} />
        <PanelBody>
          <LogRow timestamp="09:41:03Z" tag="FILL" tone="signal"
                  message={<>RVN-001 <span className="hl">BTC-PERP +0.42</span> @ 67,340</>} />
        </PanelBody>
      </Panel>

      <Button variant="accent" size="lg">Subscribe</Button>
    </div>
  );
}
```

**Button hierarchy** (Atlas pattern): exactly ONE `variant="accent"` per view,
everything else tiers down through `primary` → `outline` → `ghost`.

### Tailwind preset

```js
// tailwind.config.js
const lorePreset = require('@tomscaria/lore-design-system/tailwind');

module.exports = {
  presets: [lorePreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

All theme colors, fontSize, spacing, and motion are exposed as Tailwind
classes resolving to CSS variables — so they automatically adapt to whatever
`data-theme` is active on the surrounding element.

### Structured tokens (for Figma / Tokens Studio / cross-platform)

```ts
import tokens from '@tomscaria/lore-design-system/tokens.json';
// { themes: { lore: { color: {...}, type: {...} }, ... } }
```

---

## What's in the package

| Path | Contents |
|---|---|
| `tokens/colors_and_type.css` | The token contract — every CSS variable for every theme, incl. the categorical data-viz wheel (`--cat-1…8`, `--chart-grid/axis/track`) |
| `tokens/primitives.css` | Spacing scale, layout primitives |
| `tokens/tokens.json` | Structured tokens (Figma/Tokens Studio-ready format) |
| `agent/themes/<theme>/` | Per-theme readme + CSS snapshot |
| `agent/visual/` | Motion, spacing rhythm, type scale, color role docs |
| `preview/_revenant-kit.css` | Component class layer (Panel, StatStrip, Button, …) |
| `preview/_dataviz-kit.css` | Chart primitives (stacked/grouped/ranked bars, bullet, stat-hero) + geometric embellishments (swarm-glyph field, staircase, half-moons, mosaic, wave-bands) |
| `preview/_primitives.css` | Surface + layout primitives (Stack, Row, Grid, Split, …) |
| `preset.js` | Tailwind preset |
| `fonts/` | Aeonik (Reg/Med/Bold + Mono) + Lock Serif (woff2) |
| `components/ui/` | 51 shadcn primitives (Button, Card, Dialog, …) — copy-paste pattern |
| `components/insto/` | Lore institutional product components (HeroSection, FundManagerConsole, …) |
| `dist/` | Built React wrapper layer (ESM + CJS + .d.ts) |
| `src/` | TypeScript source for the React wrappers |

---

## Status

This is **v0.1** — a working, installable holding pattern. Resolved before v1:

- **IP / canonical name.** The package name is currently `@tomscaria/...` as a
  placeholder. The canonical name depends on the IP conversation: if Lore owns
  the system, it's likely `@lore/...`; if Scaria built and licenses it to
  Lore, it stays `@tomscaria/...` or moves to `@refractor/...`.
- **License.** Currently `UNLICENSED` — appropriate for private GitHub Packages
  distribution, but needs a real license (MIT / Apache-2.0 / proprietary)
  once IP is settled.
- **Auto-publish.** The `.github/workflows/publish.yml` workflow is
  `workflow_dispatch`-only until the first manual publish is green-lit.

---

## Alternative consumption: file sync (legacy)

For consumers that predate the npm package or can't authenticate to GitHub
Packages, the original `scripts/sync.mjs` flow still works:

```bash
node ~/scaria/lore-design-system/scripts/sync.mjs --target=/path/to/project --profile=<profile>
```

Profiles: `tokens`, `tokens+decks`, `tokens+components`, `full`. See
`scripts/sync.mjs` for definitions. This copies a subset into
`<target>/design_handoff_lore/`, stamps a `.version` file with the canonical's
git SHA, and adds a `designSystem` block to the target's `package.json`.
Use `node scripts/check.mjs` to scan registered consumers and report drift.

The npm package is the preferred path; sync remains for back-compat.

---

## Develop

```bash
npm install                  # one-time
npm run build                # build dist/ via tsup
npm run pack:dry             # inspect what would publish
```

Preview HTML pages live in `preview/` and are served by the `.claude/launch.json`
preview server (Python `http.server` on port 7340). The key compositional refs:

- `preview/theme-revenant.html` — operational dashboard
- `preview/revenant-marketing.html` — branded marketing hero
- `preview/colors-*.html`, `preview/components-*.html`, etc. — per-primitive swatches

---

## Provenance

Consolidated 2026-05-11 from four sources:

1. `~/scaria/Thomas OS/design_handoff_lore/` (Apr 27 baseline — superseded)
2. `~/scaria/design_handoff_lore 2/` (May 11 — primary source for tokens + insto docs)
3. `~/scaria/design_handoff_marketing_and_decks 2/` (May 11 — primitives.css, JSON exports)
4. `~/scaria/lore-institutional/` (live Vite app — 49 shadcn primitives, 7 named insto patterns, 6 design docs, partner logos)

---

## Version policy

Semver:
- **patch** — token tweak, asset replacement, docs-only edit
- **minor** — new component, new asset category, additive change
- **major** — breaking rename, removed component, restructured paths
