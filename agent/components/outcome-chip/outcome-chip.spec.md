# OutcomeChip — spec

> Agent-readable component specification. A compact pill showing one outcome's price and recent direction — "Korea 59¢", "Nor 98¢ ↗".

## Purpose

The smallest tradeable unit on screen: an outcome label + its current cents + an optional up/down delta arrow. Used in featured-market legends, resolving-soon rows, and big-moves lists. Tappable to open the order ticket.

## Tokens used

| Token | Where |
|---|---|
| `--bg` / `--bg-2` | chip fill |
| `--line` | chip border |
| `--fg` / `--fg-2` | label + price |
| `--up` / `--down` | delta arrow + value |
| categorical swatch | outcome key dot (3-way markets) |
| `--font-mono` | the cents value |
| `--r-sm` | chip radius |

## API

```ts
interface OutcomeChipProps {
  label: string;
  cents: number;                 // 0-100
  delta?: number;                // signed; renders ↗/↘ in --up/--down
  keyColor?: string;             // small square swatch for multi-outcome legends
  selected?: boolean;            // outlined in --accent
  size?: 'sm' | 'md';            // default 'sm'
}
```

## Anatomy

- Inline-flex pill: optional key swatch (9px rounded square) · label (`--fg-2`) · cents (mono, `--fw-bold`, `--fg`) · optional delta (arrow glyph + number in `--up`/`--down`).
- Background `--bg` (inset) or `--bg-2` (raised), `1px --line` border, `--r-sm`.
- `selected` swaps border to `--accent` at 2px.
- Hover: surface one step warmer (`--bg` → `--bg-muted`); press uses `.m-magnet`.

## States

| State | Visual |
|---|---|
| default | bordered pill, mono price |
| rising | `↗` + delta in `--up` |
| falling | `↘` + delta in `--down` |
| selected | `--accent` 2px border |
| settled-win | fill `--accent-soft`, price → 100¢ |
| settled-loss | `--fg-muted` price, no delta |

## Anti-patterns

- Don't color the whole chip by direction — color only the delta/arrow; the chip stays neutral.
- Don't show a delta without a sign and arrow; the arrow is the redundancy for color-blind users.
- Don't exceed two sizes; if you need a big outcome display, use `LiveStat display="serif"`.

## Accessibility

- The arrow glyph (↗/↘) is the non-color signal for direction.
- Tappable chips are real `<button>`s with an accessible name combining label + price.

## Example outputs per theme

| Theme | Rising outcome |
|---|---|
| rolr-dark | `Nor 98¢ ↗` — price `--fg`, arrow `--up` green on `#16190F` |
| rolr-light | `Alg 65¢ ↗` — arrow `--accent-deep`, chip on white |

## File layout

```
agent/components/outcome-chip/
├── outcome-chip.spec.md      ← you are here
└── outcome-chip.tokens.json
```
