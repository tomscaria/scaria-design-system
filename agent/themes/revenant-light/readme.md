# revenant-light

Revenant brand on a concrete-gray surface. Bell Labs rigor × trading-floor README × Discord maintainer.

## Positioning

This is the light mode for `swarm-fund-mvp` product surfaces and `rswarm.ai` marketing. It reads like a research instrument: off-white concrete surface, warm near-black ink, monospace-heavy information density. Not a SaaS product. Not crypto marketing. An operator-built tool that happens to have a website.

## Surface + ink

- **`--bg`**: `hsl(32 12% 93%)` — "Concrete Gray." Reference: designmaxxing spec sheet CONCRETE GRAY #F1EEEB. Slightly warm off-white — industrial paper, not Lore's archival parchment.
- **`--fg`**: `hsl(14 8% 10%)` — "System Black." Reference: designmaxxing SYSTEM BLACK #1E1B1B. Very slightly warm near-black — not pure `#000`.

## Accent

**`--accent`: `hsl(20 82% 50%)`** — brick-orange signal color. The calibration-active indicator. Reference: signal orange used across robotics studio refs and Atlas Advanced Research chrome. Usage rules:
- Primary CTA button fill
- Active lifecycle badge (Birth / Canary / Apex / Revenant stage indicator)
- Active threshold crossings on calibration plots
- System-active status tags
- One per viewport. Never as section background fill.

## Type

- **`--font-display`**: Aeonik — no Lock Serif (that's Lore's voice)
- **`--font-mono`**: Aeonik Mono — **primary reading experience** for dense surfaces: calibration readouts, lifecycle status labels, system metadata, n= values, factor IDs
- Body at 15px / 1.42 line-height — manuscript density; tighter than Lore

## Radii

Collapsed to 2–8px. Trading terminal, not a SaaS card. Hard corners signal precision.

## Motion

- Entry: 160ms product / 380ms marketing — decisive, not decorative
- Easing: `cubic-bezier(0.4, 0, 0.15, 1)` — snaps into place, doesn't float
- Ambient: `linear` — if it loops, it's mechanical

## Expression notes

- `data-expression="product"`: tight spacing (32px section-y), minimal motion, dashboard density
- `data-expression="marketing"`: generous spacing (144px section-y), 112px display type, 380ms entry — LOUD without violating the quiet-confidence rule

## What to avoid

- Lock Serif at any size
- Rounded corners above `--r-xl` (8px)
- Lime accent — that's Lore
- Entry animations above 400ms on product surfaces
- Pure white (`#fff`) as the base surface — use `--bg` (off-white concrete)
