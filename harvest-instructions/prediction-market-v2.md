# ROLR harvest — v2: real brand + marketing expression + depth book

> Addendum to `prediction-market.md` (v1). v1 lifted the liveness layer + a `rolr`
> theme pair from the *early* prediction-market exploration (olive-black ground, ember
> primary, lime accent). This v2 pass reconciles the kit with the **shipped ROLR brand**
> — sampled directly from the production desktop app + the rolr.xyz marketing site —
> and adds the marketing expression + the missing depth-book primitive.

## 1. Theme re-skin — `agent/themes/arcade-dark` + `arcade-light` (colors_and_type.css)

The early exploration's palette was wrong for the shipped product. Replaced with the
real brand (sampled hexes):

| role | v1 (exploration) | v2 (shipped) |
|---|---|---|
| brand (primary) | ember `#D9794C` | **indigo `#6664FC`** |
| hero accent | lime `#D4F24B` | (folded away — indigo is the one brand) |
| app dark ground | olive `#16190F` | **`#0B0B0E`** (cool near-black) |
| app light ground | `#FFFBF0` | **`#F3F3F6`** (cool near-white) |
| up / yes / bid | `#7FC08A` | **`#34D17E`** dark · `#0F9D58` light |
| down / no / ask | `#E0794F` | **`#F8567F`** dark · `#E0345F` light |
| live presence | `#FF4D8D` | **`#FF5C8A`** dark · `#E0345F` light |
| category accent | — | **orange `#F2754A` / `#DE4905`** (tiles only, never brand) |

Added a `--series-1..8` categorical ramp for multi-outcome charts + depth books.

## 2. Type — pixel + condensed display faces

The shipped brand layers two display faces over Aeonik. The theme files now ship:

- `--font-display: "Jersey 10"` — the **pixel** face. Marketing section headers
  (`FOUR STEPS…`, `WHAT YOU CAN WIN.`), step numbers, prize amounts, timeline titles.
  (Chosen over Pixelify Sans: Pixelify's `5` reads as `8` at display size — fatal for
  prize numbers. Jersey 10's digits are unambiguous. Closest free match to the brand's
  clean medium-res pixel face; swap to the licensed brand font on integration.)
- `--font-cond: "Anton"` — the **condensed heavy** face for the one giant money number
  (`$25,000,000`).
- `--font-sans: "Aeonik"` — unchanged; all UI + body.

`--font-display` was Lock Serif in lore-*; for ROLR it is the pixel face. `--font-cond`
is new (add to the contract for any brand with a condensed numeral).

## 3. Expressions — `product` (default) + `marketing`

Both theme files now carry a real `[data-expression="marketing"]` block (mirrors the
revenant pattern): larger pixel/condensed display scale, `--bg` → pure black (dark) /
white (light), generous section rhythm, slower 600ms reveals. Marketing pages compose
black/white **alternating sections** + **white cards** + **chrome 3D spot art**
(globe / YES-NO toggle / coins — placeholders here, swap for real renders) + a
**pixel-block skyline** divider. `product` stays compact with 200ms entries.

## 4. New primitive — `agent/components/depth-book`

The order book the kit was missing. Two-sided price ladder, cumulative depth bars
(green bids grow left, rose asks grow right), focused + mini variants, streams live.
`spec.md` + `tokens.json` added; theme-agnostic (consumes `--up`/`--down`/`--*-soft`).

## 5. Reference

`reference/ROLR Theme.dc.html` — a live showcase of the full system: App ⟷ Marketing
expression toggle × Light ⟷ Dark, all four surfaces (Markets home, Leaderboard,
Depth book, Marketing landing) rendering with the liveness motion actually running
(streaming chart, live presence, count-up podium, feed-in activity, depth re-measure,
chrome float, reveal, glow CTA).

## Follow-ups

- Promote `--up` / `--down` / `--live` + `--series-*` into the base semantic set (every
  theme) — market/liveness UIs aren't ROLR-exclusive (carried over from v1).
- License the real ROLR pixel + condensed faces; the kit uses Jersey 10 / Anton as
  drop-in matches.
- Generate real chrome spot art (globe, YES/NO toggle, coins, scales, hourglass) to
  replace the CSS approximations — the Flora `rolr` brand-token file still holds the
  v1 mint-teal placeholder; update it to indigo + chrome material before generating.
