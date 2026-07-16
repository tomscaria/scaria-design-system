# @tomscaria/consumer-fintech-design-system

## 2.0.0

### Major Changes

- **Package renamed** `@tomscaria/scaria-design-system` → `@tomscaria/consumer-fintech-design-system`. Update import specifiers and the dependency name (see `MIGRATION.md`).
- **Themes renamed**: `lore-*` → `earth-*`, `rolr-*` → `arcade-*` (dirs, `data-theme` values, `/themes/*` subpath exports, tokens.json names). `revenant-*`, `primitive*`, and `kiosk` unchanged.
- **Backward-compat**: old `data-theme="lore-light"` / `lore-dark"` values ship as deprecated aliases resolving to the renamed tokens, so live consumers (e.g. `prysm-squads-mvp`) keep rendering on 2.0.0 with no change. To be removed in a future major. `rolr-*` had no runtime consumer — renamed outright, no alias.
- Licensed under **MIT**; README rewritten for the new identity; removed dev-only `inspo/` screenshots and outdated scaffold notes.

## 1.3.1

### Patch Changes

- **brand-layer hardening** (adversarial review of the 1.3.0 ship): cursor position moves to a `.bl-cursor-wrap` wrapper so `.is-hover`/`.is-down` ring transforms are no longer clobbered by the per-frame translate; `forced-colors: active` restores the OS pointer and hides the reticle; ticker tape becomes a theme-invariant ink terminal strip (amber/green/clay now pass contrast) and swaps its flex `gap` for per-item `margin-right` so the −50% marquee wraps seamlessly; grain drops `mix-blend-mode` (whole-viewport re-blend per scrolled frame); new `.bl-hero-fold` class carries the fold height with a stacked `vh`→`svh` fallback; `@media print` hides all brand-layer chrome. `primitive` `--fg-3` darkened `#6E7064` → `#65675B` (4.9:1 on parchment).

## 1.3.0

### Minor Changes

- **Primitive → THE STUDIO.** `primitive` / `primitive-dark` re-authored from the brand-neutral Inter baseline into the Scaria flagship marketing theme — the new default public identity for tomscaria.com. Material from Lore (parchment `#F0ECE1`, chartreuse `#D4F24B`, Lock Serif + Aeonik + Aeonik Mono), discipline from Revenant (ink-filled actions, one accent per view, 2–12px radii), plus studio garnish tokens: `--term-amber` (Bloomberg amber, data-only), `--term-green`, `--glow` (monitor moss), `--grain-opacity`, `--hero-art-filter`. Both expressions (`product` / `marketing`) authored; `primitive-dark` graduates from stub to full Studio Night theme.

- **Brand Layer** (`agent/visual/patterns/brand-layer.css`, export `./brand-layer`, wired into `./styles`). The cross-theme Scaria constants: crosshair cursor + chartreuse click tick (`pointer:fine` only), paper-grain overlay, section dial (`n/N`), letterspaced scroll cue, `.kicker` mono-caps wayfinding with moss dot, amber ticker tape, `[data-reveal]` scroll entrances (JS-armed via `html.bl-anim`, safe without JS), and studio hero-art helpers (`--hero-art-filter` re-lighting for dark siblings). Fully token-driven; respects `prefers-reduced-motion`.

## 1.2.1

### Patch Changes

- fix(preset): ship the Tailwind preset as `preset.cjs`

  `preset.js` used CommonJS (`module.exports`) while the package is `"type": "module"`, so Node parsed it as ESM and both exported entry points threw — `require('.../preset'|'.../tailwind')` raised `module is not defined in ES module scope`, and `import preset from '.../tailwind'` had no default export. This blocked every Tailwind consumer at `tailwind.config` load. Renaming to `preset.cjs` (and repointing the `./preset` / `./tailwind` exports) makes both `require()` and `import`-default work. Supersedes the broken 1.2.0 preset.

## 1.1.0

### Minor Changes

- Tailwind preset now ships the kit-native color names alongside the shadcn-style ones.

  `bg` / `bg-2` / `bg-3` / `bg-muted` / `bg-inverted`, `fg` / `fg-2` / `fg-3` / `fg-muted` / `fg-inverted`, and `line` / `line-2` / `line-strong` resolve through the same per-theme CSS vars as `background` / `card` / `border` etc. Consumers that ported kit components (written against `bg-bg-2`, `text-fg-3`, `border-line`, …) no longer need a bridging `theme.extend.colors` block in their Tailwind config.

- 347eab5: Harvest the ROLR liveness layer + `rolr` theme pair into the kit.

  - `rolr-light` / `rolr-dark` — the shipped ROLR prediction-market brand (indigo `#6664FC` primary; cool near-black `#0B0B0E` / near-white `#F3F3F6` grounds), full per-theme contract with `--up`/`--down`/`--live`/`--win` + `--series-1..8` semantic tokens, product + marketing expressions via `data-expression`. Wired into `./styles`; subpath exports `./themes/rolr-light` and `./themes/rolr-dark`.
  - `motion.json`/`motion.css` (0.1.0 → 0.2.0, additive) — new "liveness" purpose in the motion gate, 8 primitives (`live_pulse`, `win_glow`, `stream`, `breathe`, `pop`, `feed_in`, `slide_in`, `bar_fill`, `confetti`), per-page budgets + reduced-motion rules.
  - 11 new theme-agnostic components (`var(--*)` only, so they render under any `data-theme`): `live-dot`, `live-stat`, `odds-bar`, `outcome-chip`, `market-card`, `sparkline`, `squares-grid`, `quick-play-card`, `activity-feed`, `settlement-hero`, `depth-book`.
