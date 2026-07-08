# rolr-dark

ROLR prediction-market book — v2, the shipped brand. Cool near-black ground, ROLR indigo as the single brand color, green/rose market semantics, rose-pink live presence, orange demoted to a category accent. The Pro / desktop trading surface and the marketing-site dark ground.

> v1 of this theme was an ember/lime exploration harvested before the real brand landed. v2 (CHANGELOG 1.1.0) re-skins to the shipped ROLR brand, sampled from the desktop product + marketing site. The CSS (`colors_and_type.css`) is authoritative.

## Positioning

The dark "order book" surface for the ROLR prediction market — the Pro desktop expression, and (via the `marketing` expression) the rolr.xyz landing voice. It reads like a calm, well-lit trading room: dense but legible, alive with real-time price, presence and pot movement, but never frantic.

ROLR ships two surfaces that share one book: `rolr-dark` (Pro · desktop · marketing) and `rolr-light` (Casual · iOS). Same balance, positions and liquidity underneath — the theme is the surface, not a separate account.

## Surface + ink

- **`--bg`**: `#0B0B0E` — "book black," a cool near-black. Marketing expression deepens it to `#08080B`.
- **`--bg-2`**: `#141418` — raised card. Every market tile sits here.
- **`--bg-3`**: `#1B1B22` — floating / popover. **`--bg-muted`**: `#202029` — inset wells and tracks.
- **`--fg`**: `#F5F4F8` — near-white ink; tiers `#B8B8C2` / `#85858F` / `#5C5C67`.

## Brand + accent

Single-brand, and the discipline is load-bearing:

- **`--brand`: ROLR indigo** `#6664FC` — EVERY primary action: Deposit, active nav, selected toggles, the assumptions pill. There is no second action color.
- **`--accent`: orange** `#F2754A` — demoted to category tiles and one-off marks only. Never a button fill, never the brand.

Don't promote orange back to actions — indigo carries the whole interaction layer.

## Market + liveness semantics

Four tokens the base kit doesn't have:

- **`--up`** / **`--down`** — market direction. `--up` = `--success` (#34D17E), `--down` = `--danger` (#F8567F). Yes/up prices and ↗ deltas are `--up`; No/down are `--down`. Always paired with a sign or arrow, never color alone.
- **`--live`** `#FF5C8A` — presence pink. The "● 12,940 playing" dot; the only place pink appears.
- **`--win`** = `--brand` — win-cell / podium glow.
- **`--series-1..8`** — categorical ramp for multi-outcome charts and depth books.

## Type

- **`--font-display`: Jersey 10** — the pixel display face for marketing headlines and numeric callouts (replaces Lore's Lock Serif).
- **`--font-cond`: Anton** — the condensed heavy face for the single hero money number ($25,000,000).
- **`--font-sans`: Aeonik** — UI/body. **`--font-mono`: Aeonik Mono** — every value that updates: prices, cents, latency, counts, countdowns. If a number can change while you watch, it's mono + tabular slashed-zero.
- Jersey 10 and Anton load from Google Fonts; Aeonik faces ship in `fonts/`.

## Radii

6–22px, rounder than revenant (precision); soft fintech. Pills at `999rem`.

## Expressions

- **`product`** (default) — 40px section rhythm, 200ms entries.
- **`marketing`** — the rolr.xyz landing voice: `--bg` deepens to `#08080B`, display-xl scales to 148px, 110px section rhythm, slower (600ms) reveals. Pages compose black sections + white cards + chrome spot art.

## Motion

See `motion.json`. The signature is **liveness** — `ease-in-out` ambient (organic, breathing) is the deliberate inverse of revenant's mechanical `linear`. A live market should feel like it's breathing.

## What to avoid

- Orange for actions or navigation (that's indigo's job now)
- Pink for anything except live human presence
- Direction by color alone — always pair `--up`/`--down` with a sign or arrow
- More than one `breathe` / `win-glow` focal animation per viewport
- Continuous confetti — settlement only
