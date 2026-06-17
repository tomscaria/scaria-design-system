# revenant-dark

Revenant brand on a deep charcoal surface. Trading-floor-at-midnight mode.

## Positioning

The dark mode for `swarm-fund-mvp` product surfaces and `rswarm.ai` marketing. Same brand identity as `revenant-light` — concrete off-white as the reading ink, brick-orange signal accent unchanged. The surface goes deep but stays warm (not void-black) and the type stays legible at the densities the cohort expects.

## Surface + ink

- **`--bg`**: `hsl(15 5% 9%)` — near-black with an imperceptible warm undertone. Reference: Nucleus Engineering Office dark. Not pure black — a terminal at operational brightness.
- **`--fg`**: `hsl(32 12% 88%)` — the same concrete off-white that is the light-mode surface. Slightly warm — not `#fff`. Keeps warmth coherent across modes.

## Accent

**`--accent`: `hsl(20 80% 56%)`** — same brick-orange hue, slightly lifted in lightness for visibility on dark surface. Same usage rules as revenant-light: lifecycle badges, active states, primary CTA, calibration threshold crossings. One per viewport.

## Type

Same font contract as revenant-light. Aeonik display, Aeonik Mono for dense metadata.

## What changes vs revenant-light

- Surface and foreground flip (standard dark-mode inversion)
- `--accent-soft` deepens from a light tint to a dark muted fill (`hsl(20 35% 18%)`) — correct for dark surfaces
- Shadows use honest blacks (rgba(0,0,0,0.40–0.60)) not warm tinted values
- Status colors are lighter/more luminous — needs contrast on dark
- Everything else (type scale, spacing, radii, motion) is identical to revenant-light
