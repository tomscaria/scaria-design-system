---
"@tomscaria/scaria-design-system": minor
---

Harvest the ROLR liveness layer + `rolr` theme pair into the kit.

- `rolr-light` / `rolr-dark` — the shipped ROLR prediction-market brand (indigo `#6664FC` primary; cool near-black `#0B0B0E` / near-white `#F3F3F6` grounds), full per-theme contract with `--up`/`--down`/`--live`/`--win` + `--series-1..8` semantic tokens, product + marketing expressions via `data-expression`. Wired into `./styles`; subpath exports `./themes/rolr-light` and `./themes/rolr-dark`.
- `motion.json`/`motion.css` (0.1.0 → 0.2.0, additive) — new "liveness" purpose in the motion gate, 8 primitives (`live_pulse`, `win_glow`, `stream`, `breathe`, `pop`, `feed_in`, `slide_in`, `bar_fill`, `confetti`), per-page budgets + reduced-motion rules.
- 11 new theme-agnostic components (`var(--*)` only, so they render under any `data-theme`): `live-dot`, `live-stat`, `odds-bar`, `outcome-chip`, `market-card`, `sparkline`, `squares-grid`, `quick-play-card`, `activity-feed`, `settlement-hero`, `depth-book`.
