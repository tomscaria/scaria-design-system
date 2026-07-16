# Lore Marketing Variations — Flora motion system + BoTW Lore + UVP prototypes

**Date:** 2026-06-19 · **Status:** Approved direction (4 decisions locked); produce loop starting.
**Grounding:** `inspiration-research` workflow brief (uniswap/phantom/rainbow + BoTW + Flora) + the local `zelda theme/` reference assets.

## Goal
Three stacked layers: (A) **universal motion/visual/UVP kit primitives** every theme re-skins, (B) a **BoTW-evoking Lore marketing skin** (+ 3 light app touches), (C) **clickable prototypes + Flora static/loop variants** for marketing containers and product.

## Locked decisions
1. **BoTW scope:** Lore-only marketing flair + 3 light app touches (activation-glow states, ledger-glyph empty-states/loaders, topographic underlay). Revenant/kiosk/primitive keep their identities + inherit only the universal patterns.
2. **OrbField glyphs:** built with a swappable `glyphSet` — **original Lore ledger-glyphs** (Lore/BoTW) AND **token/coin logos** (finance/revenant themes).
3. **Hero default:** **live component** primary (real Lore card), Flora device-frames for secondary tiles + OG/social exports.
4. **Motion ceiling:** **calm + one crescendo per page** — two motion atoms (`--motion-spring` 400ms `cubic-bezier(.34,1.56,.64,1)` + `--motion-snap` 100ms), springy-on-interaction-only, one full-bleed golden-hour reveal beat. Accessible by default (`prefers-reduced-motion`).

## The convergence (one engine, re-skinned)
The "opaque-coins hover" (dim `opacity:0.25` → lit on group-hover, staggered cascade), the BoTW "dormant slate wakes up," the `<Orbit>` ability wheel, and the activation-glow state are **the same temperature-shift mechanic**. Build once, skin per theme.

## Universal kit primitives (SP-1, theme-agnostic)
Each = a token-skinned component shipping a `/preview/*.html` clickable demo + a Flora static/loop variant.
1. **OrbField** — `{glyphSet, count, blurRange:[5,60], restOpacity:.25, cascade:[40,80,120]ms}`, per-orb links. (Headline interaction.)
2. **Activation-glow state** — idle cool hairline → hover/focus warms amber → success blooms `--accent`. (BoTW + spring-pop, for Lore.)
3. **Hover-to-somewhere** `LeadRow`/`LeadTile` — full-surface link, `--surface`→`--surface-hover` paired tokens, inline preview, navigates.
4. **Hero** — eyebrow + 3-beat display headline + CTA pill + **live-component staged slot**.
5. **GetStarted** — surface-picker cards + staged-product preview + bookended CTA (no tour).
6. Scroll-reveal `AppearOnScroll`, **StatOdometer**, marquee/ticker chip, **section-bridge gradient** (dawn→dusk).

## BoTW → Lore skin (SP-2 design; evoke, never copy — no Hylian/rune font, no game asset)
- **Palette overlay** on Lore tokens: dawn cream `#FDFFE0` → dusk wheat `#E8C268` section-bridge; muted gouache greens (`#92C582`→`#536F50`), atmospheric `#86A5A9`; **activation ramp** dormant Sheikah-cyan `#6FD3E0` → amber `#F0892F` → **resolve to Lore lime** (stays on-brand); guardian-orange `#E2562A` crescendo (sparing).
- **Type:** Lock Serif calm titles (the quiet title card) × Aeonik HUD readouts (spaced caps). The contrast IS the system.
- **Motifs (original, IP-safe):** cut-corner/beveled frames + corner ornaments (per the local assets); **ledger-glyphs** (8–12 SVGs on a 5×5 grid); topographic underlay; rune-slate just-in-time chrome.
- **Motion:** calm-to-epic pacing → one golden-hour crescendo; activation-glow; warm golden-hour shadows.
- **Light app flair only:** activation-glow on interactive states, ledger-glyph empty-states/loaders, faint topographic underlay. Everything painterly stays on marketing pages.

## Decomposition + build order
- **SP-1 Motion+Component kit (code)** → **SP-2 Flora asset pipeline (Style-DNA per theme → batch hero/OG/social + loops)** in parallel → **SP-3 marketing-page assembly** (one earth-light reference page → theme-swap validation).

## The produce loop (the user's `/loop twice`)
- **Round 1 (foundation + proof):** ledger-glyph SVG set, BoTW activation/palette flair layer (`botw-flair.css`), the **OrbField** engine (swappable glyphSet), assembled into one **clickable earth-light BoTW prototype** (`preview/lore-botw-landing.html`: hero + OrbField + activation-glow + cut-corner frames + golden-hour). Render-verified across light/dark.
- **Round 2 (refine + expand):** critique round 1, refine the motion/feel, add the hover-to-somewhere rows + section-bridge + StatOdometer, prove the theme-swap (same page under another theme), and stage the Flora-asset hooks.

## Out of scope (for now)
Actual Flora generation runs (needs the Flora account/credentials — flagged in the founder briefs); full SP-2 batch; non-Lore BoTW theming.
