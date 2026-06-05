# lore-light

The default Lore theme. Parchment surface, graphite ink, lime accent (`HSL 82 100% 55%`).

## When to use

Default for both marketing and product surfaces unless the consuming product overrides. Use `lore-light` in the daytime, brand-canonical Lore presence — pitch decks, partner-facing flows, the marketing site.

## Type stack

- **Display:** Lock Serif — used for h1, h2, hero headlines
- **Sans:** Aeonik — body, UI, navigation
- **Mono:** Aeonik Mono — code, numerics

## Accent usage rules

Per `agent/verbal/voice.md` and the visual system:

- ✅ Primary CTA button background
- ✅ Active tab indicator
- ✅ Key metric value (text-accent)
- ✅ Chart accent line
- ✅ Glow pulse on active card (max 3 per page)
- ❌ Section background fill
- ❌ Paragraph text
- ❌ Decorative borders

## Files in this theme

- `colors_and_type.css` — the CSS variable contract (color + type + motion + spacing)
- `tokens.json` — machine-readable summary for agent introspection
- `readme.md` — you are here

## Inversion

`lore-dark` is the inversion — same brand identity, dark surface. They share `--accent` value; surfaces, foreground, and lines invert.
