# MarketCard — spec

> Agent-readable component specification. The repeating unit of the book: a question, an odds bar, the Yes/No prices, and volume.

## Purpose

`MarketCard` is the most-repeated component in ROLR. It states a yes/no question, shows the current split (`OddsBar`), the two prices (`OutcomeChip`-style), and a volume readout. It composes the smaller primitives into the standard list row used on both surfaces.

## Composition

```
MarketCard
├── question            (--fg, --fs-body-md / --fw-medium)
├── OddsBar             (Yes/No split, fills on mount)
├── prices              Yes <cents> (--up)  ·  No <cents> (--down)   [mono]
└── meta                "$1.2m vol"  (--font-mono, --fg-muted)   + optional LiveDot
```

## Tokens used

| Token | Where |
|---|---|
| `--bg-2` | card fill |
| `--line` | card border |
| `--fg` / `--fg-muted` | question / meta |
| `--up` / `--down` | Yes / No prices |
| `--r-lg` | card radius |
| `--shadow-sm` | resting elevation |
| `--motion-duration-micro` | hover warm |

## API

```ts
interface MarketCardProps {
  question: string;
  yes: number; no: number;          // cents, 0-100
  volumeLabel: string;              // "$1.2m vol"
  live?: boolean;                   // show LiveDot in meta
  resolvesIn?: string;              // optional countdown ("2d 04:11")
  onClick?: () => void;
}
```

## States

| State | Visual |
|---|---|
| default | `--bg-2`, `1px --line`, `--shadow-sm` |
| hover | surface → `--bg-muted` (one step warmer); `.m-magnet` press |
| live | pulsing `LiveDot` in meta |
| resolving-soon | countdown chip; leader gets `↗` |
| resolved | bar to 100%, winning price highlighted `--accent` |

## Anti-patterns

- Don't drop a colored left-border accent rail on the card — that vocabulary is explicitly not used (see foundations).
- Don't animate the card on every price tick; only the `OddsBar` segments tween.
- Keep the question to one or two lines; truncate with `text-wrap: pretty`, never shrink the type below `--fs-body-sm`.

## Accessibility

- The whole card is one actionable target when `onClick` is set — a real `<button>`/`<a>` wrapping the content.
- Prices are conveyed in text (`Yes 63¢`), not by the bar color alone.

## Example outputs per theme

| Theme | Card |
|---|---|
| arcade-dark | `#1A1D18` card, `#2C2F28` border, green/ember prices |
| arcade-light | white card, parchment border, deep-lime / ember prices |

## File layout

```
agent/components/market-card/
├── market-card.spec.md      ← you are here
└── market-card.tokens.json
```
