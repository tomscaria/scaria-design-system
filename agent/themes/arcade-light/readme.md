# arcade-light

ROLR casual surface. Warm white, graphite primary, deep-lime accent, ember for the no/down side. The phone-first, games-first iOS expression.

## Positioning

This is the light "casual" surface for the ROLR prediction market — games first, one tap to play, big readable odds, friends and presence. It is the same book as `arcade-dark` (the Pro desktop surface): same balance, same positions, same liquidity. The theme is the surface a person chose, not a second account.

## Surface + ink

- **`--bg`**: `hsl(46 100% 97%)` (#FFFBF0) — warm white, a hair off parchment. Phone background.
- **`--bg-2`**: `#FFFFFF` — market + game cards.
- **`--bg-muted`**: `hsl(40 38% 92%)` (#F3EDE1) — inset wells, the Lore parchment.
- **`--fg`**: `hsl(80 5% 8%)` (#141613) — graphite. Dark game tiles (Tick, Pool) invert to this as their surface.

## Accent + brand

Same load-bearing split as arcade-dark, re-valued for a light surface:

- **`--brand`: graphite** `hsl(80 5% 8%)` — the primary pill (balance chip, dark Tick card). On a light surface the "money/serious" color is ink, not ember; ember (`--danger`/#B85C3A) carries the no/down + Pro-marker role.
- **`--accent`: lime** `hsl(74 56% 54%)` (#B6D43E) — play + win. Yes bars, lime CTAs.
- **`--accent-deep`** `hsl(99 33% 27%)` (#3B5A2E) — lime *text* (Yes 63¢). The bright lime is for fills and dark surfaces; on white, text uses the deep value.

## Market + liveness semantics

Same four ROLR tokens as arcade-dark:

- **`--up`** = `--success` `hsl(99 33% 27%)` (#3B5A2E), **`--down`** = `--danger` `hsl(18 53% 47%)` (#B85C3A). On light, both are deepened for contrast on white.
- **`--live`** `hsl(335 100% 65%)` (#FF4D8D) — presence pink, identical across both surfaces so "live" reads the same everywhere.
- **`--win`** = bright lime #D4F24B — the win-cell glow (dark game tiles host it, so the bright value holds).

## Type

Identical type identity to arcade-dark. Lock Serif for the greeting ("Hey, Maya") and hero pot values; Aeonik Mono for all live readouts. Casual keeps numbers large.

## Radii

13–22px — rounder than the Pro surface. Phone-friendly, tap-friendly, soft.

## Motion

Same liveness language and timing as arcade-dark (see `motion.json`). The difference between the surfaces is density and copy, not motion identity.

## What to avoid

- Pure-white page background — use `--bg` (warm white); white is for cards
- Bright `--accent` as body text on white — use `--accent-deep`
- Lime for navigation; graphite/ember own structure and the no side
- Direction by color alone — always pair with a sign or arrow
