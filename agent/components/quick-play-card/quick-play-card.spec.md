# QuickPlayCard — spec

> Agent-readable component specification. The games-first launcher tile: a game's live state + a one-tap Play CTA.

## Purpose

`QuickPlayCard` is the casual surface's hero affordance — a tile that surfaces a game (Tick, Bingo, Pool), its live state (price sparkline, pot, score), live presence, and a single lime "Play →" CTA. It is what "games first, one tap to play" looks like.

## Composition

```
QuickPlayCard
├── eyebrow        game + market   ("Tick · BTC")   [mono, --accent-deep]
├── title          one-line hook   ("Up or down, every 15s")
├── live region    Sparkline | LiveStat pot | live score      (varies by game)
├── presence       LiveDot + "12,940 playing now"   (--live)
└── cta            "Play →"        (--accent fill, --accent-fg text)
```

## Tokens used

| Token | Where |
|---|---|
| `--brand` (graphite) / `--bg-2` | tile surface (dark Tick tile vs light card) |
| `--accent` / `--accent-deep` | eyebrow, Play CTA |
| `--accent-fg` | Play CTA text |
| `--live` | presence dot |
| `--r-xl` | tile radius |

## API

```ts
interface QuickPlayCardProps {
  game: 'tick' | 'bingo' | 'pool';
  eyebrow: string; title: string;
  playersLabel: string;             // "12,940"
  potLabel?: string;                // Bingo/Pool
  scoreLabel?: string;              // Pool ("Q3 78-74")
  ctaLabel?: string;                // default "Play →"
  onPlay?: () => void;
}
```

## States

| State | Visual |
|---|---|
| tick | dark tile, streaming `Sparkline`, lime CTA |
| bingo | board thumbnail (`SquaresGrid`), pot via `LiveStat`, countdown |
| pool | live score `LiveDot`, pot, "5 from The Degens" |
| hover | `.m-magnet`; CTA darkens ~10% |
| reduced-motion | static spark, static presence dot |

## Anti-patterns

- One lime Play CTA per card — lime is the play color; don't also color the eyebrow CTA-bright.
- Don't stack three live elements competing for the eye; lead with one (spark OR pot OR score).
- Keep the CTA a real button with a clear name ("Play Tick"), not just an arrow.

## Accessibility

- `onPlay` target is a labelled `<button>`.
- Presence/score conveyed in text beside the `LiveDot`.

## Example outputs per theme

| Theme | Tick tile |
|---|---|
| arcade-dark | graphite tile on `#1A1D18` card, lime CTA |
| arcade-light | graphite Tick tile on warm-white screen, lime CTA |

## File layout

```
agent/components/quick-play-card/
├── quick-play-card.spec.md      ← you are here
└── quick-play-card.tokens.json
```
