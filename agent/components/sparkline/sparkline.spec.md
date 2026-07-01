# Sparkline — spec

> Agent-readable component specification. A small streaming line chart for live price (Tick) and featured-market outcome history.

## Purpose

`Sparkline` draws a compact `<svg>` polyline of a value's recent history. Two modes: **static** (a fixed series, e.g. featured-market outcome lines) and **streaming** (the `stream` liveness primitive — a new point appended ~every second, the window scrolls, the line recolors `--up`/`--down` vs the prior value, and a leading dot marks "now").

## Tokens used

| Token | Where |
|---|---|
| `--up` / `--down` | line + leading dot color (vs previous value) |
| categorical hues | multi-series featured lines |
| `--motion-*` | streaming cadence is JS-driven (see motion.json `stream`) |

## API

```ts
interface SparklineProps {
  series: number[] | { points: number[]; color: string }[];
  width?: number; height?: number;   // viewBox units
  streaming?: boolean;               // append + scroll on an interval
  windowSize?: number;               // points kept when streaming (default 30)
  leadingDot?: boolean;              // mark the latest point. default = streaming
  tone?: 'auto' | string;            // 'auto' = --up/--down vs previous
}
```

## Anatomy

- `<svg preserveAspectRatio="none">` with one `<polyline>` per series, `stroke-width:2`, round joins/caps, `fill:none`.
- Streaming: keep a fixed-length array; each tick `push` the new value and `shift` the oldest, remap Y to the running min/max, re-render. A `<circle>` sits on the latest point.
- Tone `auto`: compare latest vs previous; `--up` if rising, `--down` if falling.

## States

| State | Visual |
|---|---|
| static | drawn once; optional `m-trace` draw-in for credibility |
| streaming | line scrolls left, leading dot pulses with value |
| rising / falling | recolors `--up` / `--down` |
| reduced-motion | render latest window statically, no scroll, no trace |

## Anti-patterns

- Cap at 2-3 streaming sparklines per viewport (motion budget) — more is noise, not signal.
- Don't autoscale Y so aggressively that flat data looks volatile; pad the min/max.
- Don't stream a series the backend isn't actually updating — faking liveness is the core anti-pattern.

## Accessibility

- Decorative by default; pair with a `LiveStat` showing the current value as text.
- Reduced motion: no streaming, no trace.

## Example outputs per theme

| Theme | Tick line |
|---|---|
| rolr-dark | `--accent` lime rising / `#F58D80` falling on `#22251E` |
| rolr-light | same tones; hosted inside the dark Tick tile |

## File layout

```
agent/components/sparkline/
├── sparkline.spec.md      ← you are here
└── sparkline.tokens.json
```
