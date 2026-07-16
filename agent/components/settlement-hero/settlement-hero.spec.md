# SettlementHero — spec

> Agent-readable component specification. The win/settlement moment: a big result number that pops in, with one-shot confetti.

## Purpose

`SettlementHero` is the payoff screen — when a market resolves or a crew wins, it shows the outcome ("The crew won."), the amount won as a large `pop`-in number, the settlement detail, and a single burst of `confetti`. It is the one place ROLR is allowed to celebrate.

## Composition

```
SettlementHero
├── eyebrow      "Settled automatically"   [mono, --fg-muted]
├── headline     "The crew won."           [--font-display]
├── amount       LiveStat (serif, popOnChange) "+$3,180"   [--success / --up]
├── detail       "12 winners · $265 each"  [mono, --fg-muted]
└── confetti     one-shot particle burst   (m-confetti)
```

## Tokens used

| Token | Where |
|---|---|
| `--font-display` | headline + amount (Lock Serif) |
| `--up` / `--success` | won amount (green) |
| `--down` / `--danger` | lost variant |
| `--accent`, `--up`, `--down` | confetti particle colors |
| `--motion-duration-pop`, `--motion-ease-pop` | amount pop |

## API

```ts
interface SettlementHeroProps {
  outcome: 'won' | 'lost';
  headline: string;
  amountLabel: string;              // "+$3,180"
  detail?: string;
  confetti?: boolean;               // default = outcome==='won'
  particleCount?: number;           // default 20 (16-24)
}
```

## Behavior

- Mount: screen slides in (`slide_in`), amount pops (`pop`), confetti falls once (`confetti`, `forwards` — does not loop).
- Confetti particles: randomized `left%`, size, duration, delay; colored from `--accent` + `--up` + `--down`; `--m-confetti-distance` set to the screen height.
- `lost` variant: no confetti, amount in `--fg-muted`, calmer copy.

## States

| State | Visual |
|---|---|
| won | green serif amount pops, confetti once |
| lost | muted amount, no confetti |
| reduced-motion | no confetti, no pop — show result statically |

## Anti-patterns

- Confetti is one-shot on this screen only — never ambient, never on a dashboard (motion budget = 1).
- Don't loop the `pop`; it fires once on the amount.
- Keep the headline short and plain — "The crew won.", not an exclamation-mark celebration (no `!` in body, per voice).

## Accessibility

- Confetti is `aria-hidden`; the result is fully in text.
- Reduced motion drops confetti and pop entirely.

## Example outputs per theme

| Theme | Won screen |
|---|---|
| arcade-dark | Lock Serif `--up` amount, lime+green+ember confetti |
| arcade-light | graphite headline, green amount on warm white |

## File layout

```
agent/components/settlement-hero/
├── settlement-hero.spec.md      ← you are here
└── settlement-hero.tokens.json
```
