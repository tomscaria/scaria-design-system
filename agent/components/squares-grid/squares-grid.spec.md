# SquaresGrid — spec

> Agent-readable component specification. The live cell grid behind Bingo (markets board) and Pool (office squares) — claimed cells, and one live winning cell that glows and moves.

## Purpose

`SquaresGrid` is a grid of small cells where some are claimed/active and, in live games, exactly one cell is the current winner — marked with `win_glow` and re-marked as the game scores. It backs two ROLR games: Bingo (a board of outcomes) and Pool (an N×N squares grid against a live sports score).

## Tokens used

| Token | Where |
|---|---|
| `--bg-muted` / dark cell | empty cell |
| `--accent` / `--win` | claimed / winning cell |
| `--win` | win-glow ring + glow |
| `--r-xs` | cell radius |
| `--motion-duration-live`, `--motion-ease-ambient` | win-glow pulse |

## API

```ts
interface SquaresGridProps {
  cols: number; rows: number;
  cells: { state: 'empty' | 'claimed' | 'mine' | 'winning' }[];   // row-major
  winningIndex?: number;          // gets m-win-glow; overrides cell state
  cellGap?: number;               // px, default 3
  cellRadius?: number;            // px, default 3
}
```

## Anatomy

- CSS grid, `cols × rows`, `gap:cellGap`, each cell `aspect-ratio:1`, `border-radius:cellRadius`.
- `empty` = muted ground; `claimed`/`mine` = `--accent`; `winning` = `--win` fill + `.m-win-glow`.
- Exactly one `winningIndex` at a time. When the live score changes, move the index — the glow follows.

## States

| State | Visual |
|---|---|
| empty | `--bg-muted` (dark) / `--accent-soft` (light) |
| claimed | `--accent` solid |
| mine | `--accent` + subtle ring |
| winning | `--win` + `m-win-glow` (the single live cell) |
| settled | freeze glow on the final winning cell |

## Anti-patterns

- Never more than one `winning` cell — the whole point is a single live leader (`win_glow` budget = 1 per board).
- Don't animate every claimed cell; claims are static fills, only the winner pulses.
- Keep cells square (`aspect-ratio:1`) — don't let grid stretch distort them.

## Accessibility

- The winning cell's meaning is also in adjacent text (score, "winning cell: B3"), not glow alone.
- Reduced motion: winning cell uses a static 2px `--win` ring instead of the pulse.

## Example outputs per theme

| Theme | Pool grid |
|---|---|
| arcade-dark | `#2E4329` cells, `--accent` claims, lime win-glow |
| arcade-light | dark-tile grid inside the Pool card; lime claims + glow |

## File layout

```
agent/components/squares-grid/
├── squares-grid.spec.md      ← you are here
└── squares-grid.tokens.json
```
