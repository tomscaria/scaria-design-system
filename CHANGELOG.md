# @tomscaria/scaria-design-system

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
