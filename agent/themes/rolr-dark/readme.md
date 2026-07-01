# rolr-dark

ROLR prediction-market book. Near-black warm olive surface, ember primary, lime hero accent, live-presence pink. The Pro / desktop trading surface.

## Positioning

This is the dark "order book" surface for the ROLR prediction market — the Pro desktop expression. It reads like a calm, well-lit trading room: dense but legible, alive with real-time price, presence and pot movement, but never frantic. Same financial substrate as Lore; a different product with its own pulse.

ROLR ships two surfaces that share one book: `rolr-dark` (Pro · desktop) and `rolr-light` (Casual · iOS). Same balance, positions and liquidity underneath — the theme is the surface, not a separate account.

## Surface + ink

- **`--bg`**: `hsl(75 24% 8%)` (#16190F) — "book black," a warm near-black olive. Not Lore's `lore-dark`; greener and lower.
- **`--bg-2`**: `hsl(90 11% 10%)` (#1A1D18) — raised card. Every market tile sits here.
- **`--bg-muted`**: `hsl(90 11% 13%)` (#22251E) — inset wells (game tiles inside the quick-play card, odds-bar track).
- **`--fg`**: `hsl(43 38% 91%)` (#F1ECE0) — parchment ink, carried over from Lore for warmth.

## Accent + brand

Two-tier, and the distinction is load-bearing:

- **`--brand`: ember** `hsl(19 64% 58%)` (#D9794C) — primary action: Deposit, active nav, the selected Pro/Casual toggle. The "money" color.
- **`--accent`: lime** `hsl(72 85% 62%)` (#D4F24B) — the games + win color. Quick-play CTAs, Tick up-ticks, win-cell glow, the lime "Play →" chips. Reserve it for play and winning, not for navigation.
- **`--accent-deep`** `hsl(76 74% 43%)` (#9BBD1C) — lime label text where the bright lime would vibrate.

Don't swap them: ember = transact, lime = play/win. Using lime for Deposit or ember for Play breaks the learned mapping.

## Market + liveness semantics

ROLR adds four tokens the base kit doesn't have:

- **`--up`** / **`--down`** — market direction. `--up` = `--success` (#7FC08A), `--down` = `--danger` (#E0794F). Yes/up prices and ↗ deltas are `--up`; No/down prices and ↘ deltas are `--down`. Always paired with a sign or arrow, never color alone.
- **`--live`** `hsl(335 100% 65%)` (#FF4D8D) — presence pink. The "● 12,940 playing" dot, the only place pink appears. Signals *people are here right now*, distinct from market color.
- **`--win`** = accent lime — the win-cell glow on Pool/Bingo boards.

## Type

- **`--font-display`: Lock Serif** — hero numbers (balance, pots) and section openers only.
- **`--font-mono`: Aeonik Mono** — every value that updates: prices, cents, latency, player counts, volume, countdowns. If a number can change while you watch, it's mono + tabular slashed-zero.
- Body 14px / 1.5 — terminal density, but a notch looser than revenant.

## Radii

11–18px cards. Rounder than revenant (precision) and Lore-dark, softer than a SaaS card — the casual sibling keeps it friendly even on the Pro surface.

## Motion

See `motion.json`. The signature is **liveness** — `ease-in-out` ambient (organic, breathing) is the deliberate inverse of revenant's mechanical `linear`. A live market should feel like it's breathing.

## What to avoid

- Lime for navigation or deposit (that's ember's job)
- Pink for anything except live human presence
- Direction by color alone — always pair `--up`/`--down` with a sign or arrow
- More than one `breathe` / `win-glow` focal animation per viewport
- Continuous confetti — settlement only
