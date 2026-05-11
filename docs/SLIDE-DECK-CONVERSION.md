# Lore Financial Teaser — Slide Deck Structure (31 Slides)

## Overview

A 31-slide interactive pitch deck. Each slide is `100vh` with `overflow: hidden`. Mobile viewports enable internal scroll. Navigation via SlideDeckNav dropdown, keyboard arrows, and URL hash (`#slide-N`).

---

## Slide Map

### SECTION: Intro (slides 1–2)

| # | Title | Content |
|---|-------|---------|
| 1 | Title / Product Mockup | LORE logo + "Internet-native Stripe × BlackRock" + phone mockup showing $LORE25H minting |
| 2 | Legacy ETF Problems | "The ETF was built using legal contracts, and paper rails." + settlement diagram |

### SECTION: Problem (slides 3–5)

| # | Title | Content |
|---|-------|---------|
| 3 | ETF Popularity | 36% projected by 2026, growth chart (1993→2026) |
| 4 | Onchain Universe | Two-column table: Tokenized Liquid Assets vs Internet-Native Tokens |
| 5 | Fragmentation | Stats: 469+ chains, 60% bridge dropoff, $2T+ fragmented liquidity, 200+ DEXs |

### SECTION: LTPs (slides 6–8)

| # | Title | Content |
|---|-------|---------|
| 6 | Introducing LTPs | Full-width green header + Mint → Liquidity Engine → $LORE25H diagram |
| 7 | How LTPs Work | Interactive stage demo + 5 feature cards (One Token, Proof-of-Reserves, Open Mint/Redeem, Best Execution, Segregated Custody) |
| 8 | Product Suite | Portfolio Token showcase: $SOLECO, $LORE25H (featured w/ pie chart), $LBYLD, $BWYLD, $SUIECO, $MAG7 |

### SECTION: Architecture (slides 9–11)

| # | Title | Content |
|---|-------|---------|
| 9 | Architecture Overview | "Like Tether but for ETFs" — Mint flow with multichain tags |
| 10 | Distribution SDKs | 4 SDK cards: Stablecoin Neobanks, CEXs, White-label Partners, Web3 Wallets |
| 11 | Partner Grid | Kraken Anchor Lead + categorized partner logos |

### SECTION: Distribution (slides 12–14)

| # | Title | Content |
|---|-------|---------|
| 12 | Distribution Overview | "Meet users where they already invest" + integration type overview |
| 13 | B2B2C Models | Invest Tab, Web3 Wallet, CEX Listing models with mockups |
| 14 | Phase Details | DeFi Native ($300M) / Regional CEX ($1.5B) / EM Fintechs ($5B) phase cards |

### SECTION: Roadmap (slides 15–17)

| # | Title | Content |
|---|-------|---------|
| 15 | GTM Strategy | Concentric circles: Phase 1 ($300M), Phase 2 ($1.5B), Phase 3 ($5B) |
| 16 | GTM Phase Cards | DeFi/CEX/EM phases with chain icons and status tags |
| 17 | Platform Vision | "The new ceiling is creativity" + floating LTP token bubbles |

### SECTION: Traction (slides 18–19)

| # | Title | Content |
|---|-------|---------|
| 18 | Stats Dashboard | 20 Partners, 6 CEX Listings, 5 LOIs/Anchors, 7+ Wallets |
| 19 | Partner Details | Categorized partner lists (Exchanges, Wallets, Chains, DeFi) with status badges + Active Pipeline |

### SECTION: Market (slides 20–21)

| # | Title | Content |
|---|-------|---------|
| 20 | Why Now Timing | 4 timing drivers + market momentum |
| 21 | EM Market Opportunity | Brazil ($2.9B SAM), India ($1.35B), Vietnam ($1.14B) |

### SECTION: Business Model (slides 22–25)

| # | Title | Content |
|---|-------|---------|
| 22 | Unit Economics | AUM Fees per LTP — $8M/yr at $1B AUM |
| 23 | Sensitivity Analysis | Bear/Base/Bull scenarios |
| 24 | Tech Margins | TradFi vs Lore comparison table |
| 25 | Cost Curve & Use of Funds | SVG cost curve diagram + Use of Funds progress bars ($1.25M bridge) |

### SECTION: Team (slides 26–27)

| # | Title | Content |
|---|-------|---------|
| 26 | Leadership Team (Core) | Thomas, Stewart, Irwin, Louis, Liana |
| 27 | Leadership Team cont. | Operations/Logos — "From Companies Like" strip |

### SECTION: Backers (slide 28)

| # | Title | Content |
|---|-------|---------|
| 28 | Backed by the Best | VC logos (Polychain, Multicoin, North Island, Seed Club) + Angel grid |

### SECTION: CTA (slide 29)

| # | Title | Content |
|---|-------|---------|
| 29 | Let's Talk | Calendar CTA → Book meeting with CEO Thomas Scaria |

### SECTION: Appendix (slides 30–31)

| # | Title | Content |
|---|-------|---------|
| 30 | FAQ | Accordion: What is an LTP, How different from ETFs, Compliance, Who is this for, Revenue model |
| 31 | Appendix Gateway | 5 locked appendix cards + footer |

---

## Technical Notes

- **Navigation:** SlideDeckNav.tsx — dropdown section picker, progress bar, Copy Markdown button
- **Copy Markdown:** Exports all 31 slides with `## Slide N [Section]` headers, cleaned whitespace, datestamp footer
- **URL Hash:** `#slide-N` enables deep-linking and browser back/forward
- **Viewport:** Each slide `height: 100vh`, `overflow: hidden`. Mobile uses internal scroll.
- **No PDF export** — markdown-first strategy for LLM consumption

---

## Design System

See dedicated docs:
- **Visual tokens & colors:** `docs/VISUAL_SYSTEM.md`
- **Motion primitives & timing:** `docs/MOTION_SYSTEM.md`
- **Voice, tone & banned words:** `docs/VOICE_AND_TONE.md`
- **Section-level copy rules:** `docs/COPY_GUIDELINES.md`

---

_Last updated: 2026-02-22 — 31 slides_
