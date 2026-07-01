# OddsBar — spec

> Agent-readable component specification. The Yes/No (or N-way) probability split bar that appears on every market card.

## Purpose

A horizontal bar that shows the current market split as proportional segments — Yes 63% / No 37%, or a 3-way outcome. The canonical "what does the market think" glyph. Fills on mount (`bar_fill`); subsequent odds changes tween segment widths.

## Tokens used

| Token | Where |
|---|---|
| `--up` / `--success` | Yes / leading-outcome segment |
| `--down` / `--danger` | No / trailing segment |
| `--bg-muted` | track (unfilled ground) |
| `--accent-soft` / categorical hues | 3-way segments |
| `--r-pill` / `--r-xs` | bar radius |
| `--motion-duration-entry`, `--motion-ease-reveal` | fill on mount |

## API

```ts
interface OddsBarProps {
  segments: { label: string; pct: number; tone?: 'up' | 'down' | 'accent' | string }[];
  height?: number;          // px, default 8
  showLabels?: boolean;     // render "Yes 63¢ / No 37¢" below. default true
  fillOnMount?: boolean;    // m-bar-fill. default true
}
```

## Anatomy

- A `--bg-muted` track, `height` tall, `border-radius` per size (8px → `--r-xs`, taller → `--r-pill`), `overflow:hidden`.
- Segments are flex children with `width:<pct>%`, colored by tone. No gaps between segments — they read as one measured bar.
- On mount, the filled group animates `scaleX(0)→1` (`.m-bar-fill`, transform-origin left). Odds updates after mount tween `width`, not re-fill.
- Optional labels below: Yes value in `--up`, No value in `--down`, both mono/tabular.

## States

| State | Visual |
|---|---|
| mount | bar measures in from the left |
| live update | segment widths tween (~`--motion-duration-micro`) |
| resolved | winning segment to 100%, others collapse; winner gets `--accent` |
| reduced-motion | no fill animation; correct widths immediately |

## Anti-patterns

- Don't put rounded corners or gaps between internal segments — only the outer track is rounded.
- Don't re-run `bar_fill` on every odds tick; that reads as a glitch. Fill once, then tween.
- Don't rely on color alone — always pair with the labelled cents value.

## Accessibility

- `role="img"` with an `aria-label` summarizing the split ("Yes 63 percent, No 37 percent").
- Segment colors meet 3:1 against the track; labels carry the real numbers.

## Example outputs per theme

| Theme | Yes/No bar |
|---|---|
| rolr-dark | `--up` green / `--down` ember on `#23261F` track |
| rolr-light | `--accent-hover` lime / `#E8B4A8` on parchment track |

## File layout

```
agent/components/odds-bar/
├── odds-bar.spec.md      ← you are here
└── odds-bar.tokens.json
```
