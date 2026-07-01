# depth-book

> Status: ✅ harvested (v2). The order-book / market-depth primitive — the bid/ask
> ladder with cumulative resting size. Called out as missing from the v1 ROLR
> harvest; lifted here from the shipped ROLR market-detail surface and re-skinned
> to the real ROLR brand (indigo + green/rose, near-black ground).

A full **limit-order book**: a two-sided price ladder where each row shows resting
size at a price level, with a **cumulative-depth bar** painted behind the numbers
(green growing left from the spread for bids, rose growing right for asks). One
"focused" book renders large with a stat header; secondary markets render as compact
mini-books. Streams live (sizes jitter; depth bars re-measure with a width transition).

## Anatomy

```
depth-book
├── header            market name + sub · last price (colored) · spread        [focused only]
├── stats             24h volume · open interest · 24h trades   (mono)         [focused only]
├── ladder-header     TOTAL SIZE ⇄ · BID | ASK · ⇄ TOTAL SIZE
└── ladder
    └── row ×N
        ├── bid-half  [depth-bar ──► ] total-size · bid-price(--up)
        └── ask-half  ask-price(--down) · total-size [ ◄── depth-bar ]
```

Mini-book = `header` (compact, market-color tinted) + `ladder` only (4–6 rows).

## Props (consumer contract)

| prop | type | notes |
|---|---|---|
| `market` | `{ name, sub?, price, spread, vol?, oi?, trades?, color }` | `color` tints the header + last price (use a `--series-*` or `--down`) |
| `rows` | `Array<{ bidSize, bidPrice, askSize, askPrice }>` | ordered best → worst; component computes cumulative + bar widths |
| `variant` | `"focused" \| "mini"` | focused shows header+stats; mini is compact |
| `live` | `boolean` | when true, size/`depth-bar` updates animate (width transition) |

## Tokens consumed (theme-agnostic — reskins across every theme)

- Surface: `--bg-2` (book body), `--line` / `--line-2` (row rules), `--r-lg`
- Bid side: `--up` (price), `--up-soft` (cumulative depth bar)
- Ask side: `--down` (price), `--down-soft` (cumulative depth bar)
- Ink: `--fg-2` (sizes), `--fg-3` / `--fg-muted` (labels), `--font-mono` (all numerics, tabular)
- Header tint: `color-mix(in srgb, var(--market-color) 16%, var(--bg-2))`
- Motion: `--motion-ease-reveal` for the depth-bar `width` transition (~500ms)

## Behaviour

- **Cumulative depth.** Each row's bar width = (running sum of size from the spread to
  this level) ÷ max(total bid, total ask). Bids fill from center → left; asks center → right.
- **Streaming.** On `live`, resting sizes jitter; bar widths re-measure with a width
  transition (never a hard jump). Prices stay fixed per level.
- **Numerics.** Always `font-variant-numeric: tabular-nums slashed-zero`; prices to one
  decimal on the bid side convention (`19.0¢`), whole cents on the ask (`20¢`) — match
  the source market's tick.

## Anti-patterns

- ❌ Don't color bids/asks with raw hex — use `--up` / `--down` so it reskins (and so the
  dark "olive" v1 look never returns).
- ❌ Don't animate price columns — only sizes + depth bars move. Jumping prices read as glitches.
- ❌ Don't center the depth bars symmetrically — they must grow OUTWARD from the spread
  (bids left, asks right) or the book stops reading as a book.

## a11y

- The ladder is tabular data → expose as a `role="table"` with row/column semantics, or a
  visually-hidden `<table>` mirror. Color is reinforced by side + position, never color alone.
- Respect `prefers-reduced-motion`: drop the depth-bar width transition (snap to final width).

## Per-theme example (focused header last-price + bar fills)

| theme | last price | bid bar | ask bar |
|---|---|---|---|
| `rolr-dark` | `--down` #F8567F | `--up-soft` rgba(52,209,126,.15) | `--down-soft` rgba(248,86,127,.15) |
| `rolr-light` | `--down` #E0345F | `--up-soft` #E4F4EB | `--down-soft` #FBE4EB |
| `lore-dark` | inherits | `--success` soft | `--danger` soft |
