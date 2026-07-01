# Harvest from the ROLR prediction-market product

> Status: ✅ **lifted.** Source is the ROLR prediction-market design exploration (the `Prediction Market - *.dc.html` set). This is a **net-new primitive + liveness lift** — the kit had no real-time / liveness vocabulary before this.

## Why this harvest

The kit's motion system (v0.1.0) covered marketing + product motion well — float, reveal, trace, magnet, glow-pulse, snap-step — but had **no liveness language**: nothing for real-time presence, streaming prices, live pots, or settlement moments. The ROLR product is built almost entirely on that missing layer (a prediction market's whole value is that it is happening *now*). This harvest codifies it.

It also adds a new product surface pair — **ROLR**, the internet-native prediction market that shares Lore's financial substrate but presents as its own product with two surfaces (Pro · desktop, Casual · iOS).

## What was lifted

### 1. Themes — `agent/themes/rolr-dark/`, `agent/themes/rolr-light/`

A new two-surface theme. Full per-theme variable blocks (color + type + motion + spacing + radii + shadows + fonts) following the `lore-light` contract, plus `motion.json`, `tokens.json`, `readme.md` each.

- **rolr-dark** — the Pro/desktop "book": near-black warm olive surface (#16190F), ember primary (#D9794C), lime hero accent (#D4F24B).
- **rolr-light** — the Casual/iOS surface: warm white (#FFFBF0), graphite primary, deep-lime accent, ember for the no/down side.
- New **semantic tokens** absent from the base kit: `--up`, `--down` (market direction), `--live` (human-presence pink #FF4D8D), `--win` (win-cell glow). These are ROLR-introduced but theme-portable.

### 2. Motion — `agent/visual/motion/motion.{json,css}` (v0.1.0 → v0.2.0)

Added a fourth purpose to the gate — **liveness** ("Is this surface live right now?") — and **8 new primitives**, lifted verbatim in spirit from the ROLR keyframes:

| New primitive | Purpose | Source keyframe | CSS util |
|---|---|---|---|
| `live_pulse` | liveness | `livedot` / `blink` | `.m-live-pulse` |
| `win_glow` | liveness | `winglow` | `.m-win-glow` |
| `stream` | liveness | JS price/pot/player tick | (JS-driven) |
| `breathe` | liveness | `breathe` | `.m-breathe` |
| `pop` | proof | `popin` | `.m-pop` |
| `feed_in` | orientation | `feedin` | `.m-feed-in` |
| `slide_in` | orientation | `slidein` | `.m-slide-in` |
| `bar_fill` | proof | `barfill` | `.m-bar-fill` |
| `confetti` | delight | `confettiFall` | `.m-confetti` |

New CSS var contract entries: `--motion-duration-live` (1300ms), `--motion-duration-pop` (350ms), `--motion-ease-pop` (overshoot). Per-page **budgets** and **reduced-motion** rules extended for every new primitive. The ROLR signature `ambient = ease-in-out` (organic/breathing) is documented as the deliberate inverse of `revenant`'s mechanical `linear`.

### 3. Components — `agent/components/` (10 new)

Each with a `*.spec.md` + `*.tokens.json` companion, matching the `button/` convention (CSS vars, theme-agnostic, anti-patterns, a11y, per-theme example outputs):

- `live-dot/` — the liveness atom (pulsing presence dot)
- `live-stat/` — count-up / latency / countdown numeric readout (mono tabular)
- `odds-bar/` — Yes/No (or N-way) probability split bar
- `outcome-chip/` — outcome price pill with up/down delta
- `market-card/` — the repeating book row (composes odds-bar + outcome-chip)
- `sparkline/` — static + streaming line chart
- `squares-grid/` — Bingo/Pool live cell grid with single win-glow cell
- `quick-play-card/` — games-first launcher tile
- `activity-feed/` — live social feed with feed-in rows
- `settlement-hero/` — win/settlement moment (pop + confetti)

### 4. Reference — `reference/ROLR primitives.dc.html`

A live gallery rendering every harvested primitive + component under `rolr-dark`, with the liveness motion actually running (streaming spark, pulsing presence, win-glow, count-up, feed-in, settlement). Drop-test surface for the harvest.

## What was rewritten (not lifted verbatim)

- **Hard-coded hex → CSS vars.** The source DCs used literal colors (#16190F, #D4F24B …). The theme files re-express these as `hsl()` tokens; components consume `var(--*)` only, so they reskin across themes.
- **Per-DC `@keyframes` → shared `motion.css`.** Each source file redeclared its own keyframes (`livedot`, `winglow`, etc.). These are unified into the kit's `m-*` keyframe namespace + utility classes.
- **Ad-hoc JS intervals → the `stream` primitive contract.** The count-up / sparkline-extension logic is documented as a primitive (windowed series, tabular digits, `--up`/`--down` recolor) rather than lifted as a specific component's code.

## What was skipped (intentionally)

- **The full app screens** (`Prediction Market - Home`, `Tick`, `Bingo`, `The Crew`, `ROLR - Market View`, the 10-retakes exploration). These are *consumers* / mocks, not DS source — they belong in `agent/visual/artifacts/product/` if archived, not in `components/`.
- **Alternate exploration styles** in `10 Retakes.dc.html` (Space Grotesk / JetBrains Mono type, tug-of-war `ropePull`, flame-streak `flamewiggle`, marching-ants `dash`). These are one-off concept flourishes, not yet product-canonical. Candidates for a future harvest if they ship; noted here so they aren't lost.
- **Device frames + browser chrome** — already covered by the kit's starter components.

## Follow-ups

- If ROLR ships the tug-of-war / streak motifs, harvest `ropePull` + `flamewiggle` + `dash` as a second motion pass.
- Consider promoting `--up` / `--down` / `--live` into the base semantic token set (every theme), since market/liveness UIs aren't ROLR-exclusive.
- Add `button` intent `accent` example rows for `rolr-dark` / `rolr-light` to `button.spec.md`'s per-theme table.
