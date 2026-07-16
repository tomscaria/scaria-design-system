# ActivityFeed — spec

> Agent-readable component specification. A live list where new rows enter at the top — bets placed, squares claimed, members joined.

## Purpose

`ActivityFeed` is the social pulse of a market or squad: a vertically-stacked list where genuinely-new events animate in at the top with `feed_in`. It is how ROLR shows "things are happening here, with other people."

## Tokens used

| Token | Where |
|---|---|
| `--bg-2` / row tint | row surface |
| `--line` | row border |
| `--fg` / `--fg-muted` | actor + action / timestamp |
| `--up` / `--down` / `--accent` | amount or outcome tint |
| `--font-mono` | amounts, relative time |
| `--r-md` | row radius |
| `--motion-duration-entry`, `--motion-ease-reveal` | feed-in |

## API

```ts
interface ActivityRow {
  avatar?: string; actor: string;          // "@irwin"
  action: string;                          // "bought Yes"
  amount?: string;                         // "$40", colored
  tone?: 'up' | 'down' | 'neutral';
  time: string;                            // "2h", relative
  isNew?: boolean;                         // animate in
}
interface ActivityFeedProps {
  rows: ActivityRow[];
  maxVisible?: number;                     // window; older rows drop off
  staggerMs?: number;                      // default 80, cap 120
}
```

## Anatomy

- Column of rows; each row: avatar · actor+action (`--fg`) · amount (mono, toned) · relative time (`--fg-muted`).
- New rows (`isNew`) mount with `.m-feed-in`, staggered newest-first (≤120ms).
- Copy is sentence case with middle-dot separators and relative time: `Proposed by @irwin · 2h ago`.

## States

| State | Visual |
|---|---|
| steady | static list |
| new event | top row rises + fades in (`feed_in`) |
| your event | subtle `--accent-soft` row tint |
| reduced-motion | new rows appear instantly, no rise |

## Anti-patterns

- Only animate genuinely-new rows; never re-run `feed_in` on the whole list on re-render (it flickers).
- Don't stagger beyond 120ms — late rows feel laggy.
- No emoji as the actor avatar fallback in product chrome; use a monogram or spot avatar.

## Accessibility

- `aria-live="polite"` on the feed container so SR users hear new events — but throttle to avoid chatter.
- Amount direction carried by sign + tone, not color alone.

## Example outputs per theme

| Theme | New bet row |
|---|---|
| arcade-dark | `#1A1D18` row, mono `$40` in `--up`, `--fg-muted` time |
| arcade-light | white row, parchment border, deep-lime amount |

## File layout

```
agent/components/activity-feed/
├── activity-feed.spec.md      ← you are here
└── activity-feed.tokens.json
```
