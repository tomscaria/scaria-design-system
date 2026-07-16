# LiveStat — spec

> Agent-readable component specification. A numeric readout that updates in real time: count-up money/players, a streaming latency chip, a live pot.

## Purpose

`LiveStat` renders a number that changes while you watch — a pot growing, players joining, latency reporting, a balance. It standardizes the two behaviors the ROLR surfaces use constantly: **count** (ease the displayed value toward a target) and the **mono tabular** treatment that keeps digits from jittering.

## Tokens used

| Token | Where |
|---|---|
| `--font-mono` | latency, players, volume, countdown |
| `--font-display` | hero values (pot, balance) — Lock Serif |
| `--up` / `--down` | optional delta color |
| `--live` | optional leading `LiveDot` |
| `--motion-duration-pop` | flash on change |

## API

```ts
interface LiveStatProps {
  value: number;
  format?: 'money' | 'int' | 'cents' | 'duration';  // default 'int'
  display?: 'mono' | 'serif';     // mono (readout) | serif (hero). default 'mono'
  countOnChange?: boolean;        // ease toward new value. default true
  popOnChange?: boolean;          // m-pop flash on change. default false
  delta?: number;                 // optional signed change, colored --up/--down
  live?: boolean;                 // prefix a pulsing LiveDot. default false
}
```

## Behavior

- **count** — on value change, animate the rendered digits from old → new over ~`--motion-duration-pop` to ~600ms for big jumps; always `font-variant-numeric: tabular-nums slashed-zero`.
- **pop** — when `popOnChange`, apply `.m-pop` to the value on change (settlement totals, a square claimed).
- **format** — `money` → `$1,240`, `cents` → `63¢`, `duration` → `2d 04:11`, `int` → `12,940`.

## States

| State | Visual |
|---|---|
| idle | static tabular number |
| counting | digits tween; width fixed (tabular) |
| changed (pop) | brief scale overshoot via `.m-pop` |
| reduced-motion | jump straight to new value, no count, no pop |

## Anti-patterns

- Never use a proportional font for a value that updates — digits reflow and jitter. Always mono/tabular.
- Don't count-animate a `duration` countdown every second (it's already ticking) — only count money/player jumps.
- Don't pair count + pop on the same high-frequency value; pick one.

## Accessibility

- Live regions: wrap rapidly-updating values in `aria-live="off"` (too chatty for SR otherwise); expose a static summary elsewhere.
- Reduced motion: no count, no pop — show the value.

## Example outputs per theme

| Theme | Hero pot |
|---|---|
| arcade-dark | Lock Serif `--accent` lime on `--bg-muted` |
| arcade-light | Lock Serif `--fg` graphite; mono readouts in `--fg-muted` |

## File layout

```
agent/components/live-stat/
├── live-stat.spec.md      ← you are here
└── live-stat.tokens.json
```
