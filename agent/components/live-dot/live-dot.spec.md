# LiveDot — spec

> Agent-readable component specification. The atom of liveness in the ROLR surfaces: a small pulsing dot that says "this is happening right now."

## Purpose

A 7-9px dot that pulses opacity to signal a live/real-time state. Used in live-demo headers ("Pro · desktop · live demo"), presence labels ("● 12,940 playing"), latency chips, and in-play score tags. It is the single most-repeated liveness signal in the product, so it is codified as its own primitive.

## Tokens used

| Token | Where |
|---|---|
| `--live` | default dot color (human presence) |
| `--up` / `--down` / `--accent` / `--brand` | alternate dot color by context |
| `--motion-duration-live` | pulse period (1300ms) |
| `--motion-ease-ambient` | pulse easing (organic) |

## API

```ts
interface LiveDotProps {
  tone?: 'live' | 'up' | 'down' | 'accent' | 'brand';  // default 'live'
  size?: number;          // px, default 8
  pulsing?: boolean;      // default true; false = static dot
  label?: string;         // optional adjacent text, rendered in --font-mono
}
```

## Anatomy

- A `border-radius:50%` span, `size × size`, filled with the tone color.
- When `pulsing`, applies `.m-live-pulse` (the `m-live-pulse` keyframe).
- Optional `label` sits to the right in `--font-mono`, `--fs-body-xs`, never animated.

## States

| State | Visual |
|---|---|
| live (default) | `--live` pink dot, pulsing |
| market in-play | `--up`/`--down` dot, pulsing, paired with score |
| paused / settled | `pulsing=false`, `--fg-muted` dot |
| reduced-motion | static dot, full opacity (no pulse) |

## Anti-patterns

- Don't animate the label text — only the dot pulses.
- Don't use `--live` (pink) for anything but live human presence; market state uses `--up`/`--down`.
- Don't place more than a couple of pulsing dots in one tight cluster — they compete; promote one and mute the rest.

## Accessibility

- Decorative; the meaning must also be in adjacent text ("Live", "12,940 playing"). Never color-only.
- Respect `prefers-reduced-motion`: render static.

## Example outputs per theme

| Theme | Live presence dot |
|---|---|
| rolr-dark | Pink dot on #1A1D18 card, mono label in `--fg-3` |
| rolr-light | Pink dot on white, mono label in `--fg-muted` |
| lore-light | Falls back to `--accent` (no `--live` token) — pass `tone="accent"` |

## File layout

```
agent/components/live-dot/
├── live-dot.spec.md      ← you are here
└── live-dot.tokens.json
```
