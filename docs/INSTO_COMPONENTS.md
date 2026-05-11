# `insto` — Component & Primitive Catalog

Components and primitives that emerged from the [`lore-institutional`](https://github.com/tomscaria/lore-institutional) build. These are NOT in the existing Lore UI kit (`lore-app/`, `lore-landing/`) — they're new additions specific to the institutional theme.

Every entry below has a canonical implementation file you can lift from the lore-institutional repo. Adapt the imports for your codebase, but the structural patterns are battle-tested.

---

## Primitives

### 1. `<BentoTile>`

Single bento-grid tile. The atomic unit for FundOS-style product pages.

- **Implementation:** `src/components/accounts/BentoTile.tsx` (~60 LOC)
- **Props:**
  ```ts
  {
    eyebrow: string;      // "01 · CUSTODY" — uppercase, gold-accent
    title: string;        // ≤8 words, leading-snug
    body: string;         // ≤25 words, muted-foreground
    visual: ReactNode;    // SVG mockup, table fragment, or icon block
    wide?: boolean;       // If true: visual beside body (md+). Else stacked.
    index?: number;       // For stagger animation
    className?: string;
  }
  ```
- **Structure:**
  ```
  ┌──────────────────────────────────┐
  │ EYEBROW (gold, tracking-wider)   │   ← stacked variant
  │ Title                            │
  │ Body sentence one. Body two.     │
  │ ┌──────────────────────────────┐ │
  │ │  Visual                      │ │
  │ └──────────────────────────────┘ │
  └──────────────────────────────────┘

  ┌──────────────────────┬──────────┐
  │ EYEBROW              │ Visual   │   ← wide variant (one tile spans 2 cols)
  │ Title                │          │
  │ Body                 │          │
  └──────────────────────┴──────────┘
  ```
- **Animation:** Entry: `opacity 0→1, y 12→0`, 400ms, `viewport once: true, margin: -60px`. Staggered via `index * 0.05`s delay.
- **When to use:** Building a product-page bento grid. Pair with `<TileVisuals>` for the visual slot.

### 2. `<TileVisuals>` — visual building blocks

Library of mini-mockups designed to slot inside `<BentoTile>` or audience-tile grids. Distinguishable institutional graphics that aren't phone mockups.

- **Implementation:** `src/components/accounts/TileVisuals.tsx` (~240 LOC, multiple exports)
- **Catalog:**
  - `<CodeSnippetCard>` — terminal-style card with mono code + traffic-light dots. Use for DeFi/API integrations.
  - `<SpotTickerCard>` — institutional ticker: pair label, price in mono, 24h delta in gold. Use for CEX/exchange contexts.
  - `<RegistryTable>` — 4-row mono table fragment with account IDs, asset, units. Use for custody/registry contexts.
  - `<IssuanceFlow>` — 3-node vertical flow: Fund → Lore → Investors with arrow connectors. Use for asset-manager/tokenization contexts.
  - `<AllowlistDiagram>` — concentric circles with center investor count. Use for compliance perimeter contexts.
- **Common style:** All use `card-surface` border, Geist Mono for numbers, gold accent for highlights, framer-motion subtle entry.

### 3. `<FundManagerConsole>`

The marquee institutional mockup — a believable fund-manager admin dashboard. Used in the dual-prototype hero. NOT a real product — a styled representation.

- **Implementation:** `src/components/visuals/FundManagerConsole.tsx` (~190 LOC)
- **Structure:**
  ```
  ┌─────────────────────────────────────────────────────┐
  │ Lore Console · [Fund Manager]  Brazil·BRL ▾ ● Live │  ← header bar
  ├─────────────────────────────────────────────────────┤
  │ TOTAL AUM    │ ACTIVE LTPS │ INVESTORS              │  ← KPI row (3 cards)
  │ $847.3M      │ 14          │ 312                    │
  │ +12.4% YTD   │ 2 launching │ +28 this month         │
  ├─────────────────────────────────────────────────────┤
  │ AUM · LAST 90 DAYS                     +18.7%       │
  │ ╱╲       ╱─╲                                        │  ← sparkline
  │   ╲─────╱   ╲─────╲╱──╱╲─────────────╱─             │
  ├─────────────────────────────────────────────────────┤
  │ LTP        NAV    24h    AUM      Investors        │  ← positions table
  │ LORE25-BR  1.0847 +0.42% $187.3M  47               │
  │ LORE25-IN  1.1203 +0.31% $142.8M  38               │
  │ EMG-BLUE   0.9821 −0.12% $98.4M   29               │
  │ STBL-LATAM 1.0091 +0.08% $76.2M   64               │
  │ DEFI-CORE  1.4231 +1.24% $63.1M   21               │
  └─────────────────────────────────────────────────────┘
  ```
- **Animations:**
  - KPI numbers tick ±$0.4M / ±1 every 4.5–7s (`useState` + `setInterval`)
  - Sparkline draws on mount via `motion.path` `pathLength: 0→1`
  - Table rows fade-in with row-index stagger
  - Status dot pulses opacity `0.5→1→0.5` every 2s
- **Typography:** Numbers in `font-mono` (Geist Mono). Labels in regular Geist.
- **Palette:** `bg-card` outer, `bg-muted/40` header strip, gold accent (`hsl(var(--accent))`) for positive deltas + chart fill + sparkline stroke.
- **When to use:** As the hero visual for any insto deploy. The dashboard is the most distinctive single asset of the theme.

### 4. `<LiveStatusPill>` (inlined pattern)

Small primitive: pulsing emerald dot + "Live" label. Used in console headers, status strips, "Currently raising" indicators.

- **Pattern** (not yet extracted to a component):
  ```tsx
  <div className="flex items-center gap-1.5">
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-emerald-500"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <span className="text-[11px] text-muted-foreground">Live</span>
  </div>
  ```
- **Variants:** swap `bg-emerald-500` for `bg-accent` (gold) for "in progress", or `bg-destructive` (red) for "paused/error".
- **Lift to component:** worth extracting if reused 3+ times in a project.

### 5. `<InstitutionalSparkline>` (inlined SVG pattern)

Mini line chart with path-draw animation. Used in console AUM chart, could be reused for any time-series visual.

- **Pattern:** Pure SVG with `motion.path` for draw-on-mount + `<linearGradient>` for area fill.
  ```tsx
  <svg viewBox="0 0 100 30" className="w-full h-16" preserveAspectRatio="none">
    <defs>
      <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.28" />
        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
      </linearGradient>
    </defs>
    <motion.path d={fillPath} fill="url(#fillGrad)" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6, duration:0.8}} />
    <motion.path d={chartPath} fill="none" stroke="hsl(var(--accent))" strokeWidth="0.7" strokeLinecap="round"
      initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.4, ease:"easeInOut"}} />
  </svg>
  ```
- **No recharts dependency.** Raw SVG keeps bundle light.
- **When to use:** any time-series institutional visual. Don't use recharts for these — overkill + heavier styling work.

---

## Page-level sections

### 6. `<AccountsSection>` — "Three pillars" institutional credibility pattern

Three-card section establishing institutional credibility immediately after the hero. Lifts directly from Superstate FundOS structure.

- **Implementation:** `src/components/sections/AccountsSection.tsx` (~73 LOC)
- **Structure:**
  ```
  CUSTODIAL ACCOUNTS  ← eyebrow

  Three accounts. One platform. Built for fund managers.
  ───────────────────────────────────────────────────
  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │ [icon]       │ │ [icon]       │ │ [icon]       │
  │ Qualified    │ │ Compliance,  │ │ Extend your  │
  │ custody.     │ │ built in.    │ │ brokerage.   │
  │              │ │              │ │              │
  │ 2-3 short    │ │ ...          │ │ ...          │
  │ sentences.   │ │              │ │              │
  └──────────────┘ └──────────────┘ └──────────────┘
  ```
- **3-pillar formula** (lift the structure, customize per product):
  1. **What we hold** (qualified custody / segregated / 1:1 backed)
  2. **How we comply** (compliance built-in / KYC at partner)
  3. **How we slot in** (extend, don't rebuild — Zerohash IKBR pattern)
- **When to use:** Right after the hero on any insto landing page. This section answers "Lore is *what kind of thing*" in 10 seconds.

### 7. `<AudienceTileGrid>` — Superstate audience-separation pattern

Replacement for the consumer "4 tabs of phone mockups" pattern. After a universal hero, EXPLICITLY tile each audience or partner type. Don't tab between them.

- **Implementation:** `src/components/sections/PartnerModelsSection.tsx` (~280 LOC, reframed from 1336)
- **Structure (2×2 grid):**
  ```
  DISTRIBUTION  ← eyebrow

  Four partner types. One settlement layer.
  ─────────────────────────────────────────────────────
  ┌─────────────────────────┐ ┌─────────────────────────┐
  │ DEFI PROTOCOLS          │ │ REGIONAL CEXS           │
  │ Native LTP integrations │ │ Listed as institutional │
  │ across major chains.    │ │ spot markets.           │
  │ ┌────────────────────┐  │ │ ┌────────────────────┐  │
  │ │ <CodeSnippetCard>  │  │ │ │ <SpotTickerCard>   │  │
  │ └────────────────────┘  │ │ └────────────────────┘  │
  │ Learn more →            │ │ Learn more →            │
  └─────────────────────────┘ └─────────────────────────┘
  ┌─────────────────────────┐ ┌─────────────────────────┐
  │ EM FINTECHS             │ │ ASSET MANAGERS          │
  │ White-label custody...  │ │ Tokenize private funds  │
  │ <RegistryTable>         │ │ <IssuanceFlow>          │
  └─────────────────────────┘ └─────────────────────────┘
  ```
- **Per-tile structure:** eyebrow (gold, tracking-wider) + headline (≤8 words) + body (1-2 sentences ≤15 words) + visual (NOT a phone) + text-link "Learn more →" (no button — institutional CTA convention).
- **Grid:** `grid-cols-1 md:grid-cols-2` for 4 tiles. `md:grid-cols-3` for 3 tiles (Superstate homepage pattern).
- **Mobile behavior:** stacks single-column at `<md`. Each tile's visual scales down gracefully.

### 8. `<DualPrototypeHero>` (layout pattern)

Hero layout that shows BOTH sides of a two-sided platform: institutional surface (left, dominant) + consumer-facing surface (right, secondary). The institutional buyer sees their world AND what flows downstream.

- **Implementation:** `src/components/sections/HeroSection.tsx` (composition pattern, not a standalone component)
- **Structure:**
  ```
  [logo]
  Move emerging-market funds onchain.
  [Read TLDR Pitch ↗]
  ┌─────────────────────────────────────────────────────┐
  │ Lore is the qualified-custody platform for EM       │
  │ fund managers. Partners own the customer. Lore...   │
  └─────────────────────────────────────────────────────┘

  ┌─────────────────────────────────┐  ┌─────────┐
  │ <FundManagerConsole>            │  │ <Phone> │
  │   ~62% width                    │  │  ~25%   │
  │                                 │  │         │
  └─────────────────────────────────┘  └─────────┘
  FUND MANAGER CONSOLE                INVESTOR EXPERIENCE
  ```
- **Container:** `max-w-7xl` (wider than typical `max-w-5xl` — needs room for both surfaces).
- **Inner layout:** `flex flex-col md:flex-row items-stretch md:items-center justify-center gap-8 md:gap-6 lg:gap-10`.
- **Left (console):** `flex-1 ... w-full md:max-w-[640px]`.
- **Right (phone):** `hidden sm:flex shrink-0 w-64 lg:w-72` — **explicit width is REQUIRED.** If your phone mockup uses `w-full max-w-sm` internally, leaving the wrapper without an explicit width collapses it to 0. (We hit this bug — documented as a gotcha in `insto-notes.md`.)
- **Captions:** small `text-[10px] uppercase tracking-[0.18em] text-muted-foreground` under each panel.
- **Subhead below:** ties the two surfaces — "One platform, two surfaces. Fund managers operate from the Lore Console. Their investors transact through partner brokerages and apps."
- **When to use:** Whenever the product is two-sided (operator + end-user). For purely B2B products, skip the phone and use a console-only hero.

### 9. `<InlineAppendix>` — single-URL diligence pattern

Replacement for `/about` + `/team` + `/security` + `/faq` route sprawl. Collapse all deeper-detail sections inline at the bottom of the homepage using native `<details>`. Investors keep one tab open.

- **Implementation:** `src/pages/Index.tsx` (bottom of file, ~50 LOC of `<details>` blocks)
- **Structure:**
  ```tsx
  <section className="max-w-5xl mx-auto px-6 lg:px-16 py-16 border-t border-border/40">
    <h2 className="text-2xl font-semibold mb-6 text-foreground">Appendix</h2>
    <div className="space-y-3">
      <details className="card-surface group">
        <summary className="cursor-pointer p-4 font-medium text-foreground select-none flex items-center justify-between">
          Product mechanics
          <span className="text-muted-foreground text-sm group-open:rotate-180 transition-transform">▾</span>
        </summary>
        <div className="border-t border-border/40 p-4">
          <Suspense fallback={null}><HowItWorksSection /></Suspense>
        </div>
      </details>
      {/* ...one <details> per cluster — group related sections */}
    </div>
  </section>
  ```
- **Recommended clusters** (6–8 groups):
  - Product mechanics
  - Architecture (SDKs + partner integrations)
  - Distribution roadmap (phase plan, regional breakdown)
  - Market context (timing, jurisdictions)
  - Unit economics + sensitivity
  - Team extended (full bios)
  - FAQ
  - Long-form appendix (legal disclosures, audit reports, etc.)
- **Native `<details>`** — no JS state required. Browser handles open/close. Works without JS enabled. Accessibility-friendly.
- **Chevron rotation** via `group-open:rotate-180` Tailwind utility.

### 10. `<BentoProductPage>` — Superstate FundOS-pattern product page

Full deep-product page using bento grid. Used for `/accounts` route.

- **Implementation:** `src/pages/Accounts.tsx` (~166 LOC) + the `<BentoTile>` + `<TileVisuals>` primitives
- **Structure:**
  ```
  ← Back to overview
  FUNDOS  ← eyebrow

  FundOS for emerging-market managers.    ← H1 (≤8 words)

  Custody, tokenization, distribution, and reporting in one
  institutional platform. Built for fund managers who need rails
  local brokerages cannot deliver.

  ┌─────────────┬─────────────┬─────────────┐
  │ $847.3M     │ 14          │ 312         │  ← 3-stat strip
  │ ASSETS UM   │ ACTIVE LTPS │ VERIFIED... │
  └─────────────┴─────────────┴─────────────┘

  ┌───────────────────────────┐ ┌──────────────┐
  │ 01 · CUSTODY (wide tile)  │ │ 02 · COMP.   │
  │ Qualified custody, segr.  │ │ A regulated  │
  │ <RegistryTable visual>    │ │ perimeter.   │
  └───────────────────────────┘ │ <Allowlist>  │
                                └──────────────┘
  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │ 03 · TOKEN.  │ │ 04 · DISTR.  │ │ 05 · INVEST. │
  │ ...          │ │ ...          │ │ ...          │
  └──────────────┘ └──────────────┘ └──────────────┘
  ┌──────────────────────────────────────────────┐
  │ 06 · REPORTING                               │
  │ Statements and audit pack.                   │
  └──────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────┐
  │ Ready to bring your fund onchain?            │
  │ [Book a fund-operations call]                │  ← CTA card
  └──────────────────────────────────────────────┘
  ```
- **Numbered eyebrows** (01 · CUSTODY, 02 · COMPLIANCE) — institutional convention, like a prospectus.
- **One wide tile per page** for visual rhythm (don't make every tile the same size).
- **6 tiles is the sweet spot** — fewer feels thin, more feels like a feature dump.

---

## Edge / serverless

### 11. OG image template (Edge function)

Production-tested template for generating institutional-styled link-preview images via `@vercel/og`.

- **Implementation:** `api/og.tsx` (~120 LOC)
- **Runtime:** `edge` (Node runtime crashed in our deploy — Edge is the canonical runtime for @vercel/og)
- **Structure:**
  - 1200×630
  - Dark `#1f1f1f` background (preserves contrast even on dark mode email clients)
  - "LORE" wordmark top-left (Geist 600, 32px) — adapt to your brand
  - Centered headline ≤80 chars (Geist 500, 60px, line-height 1.15)
  - Bottom 3-stat strip with dividers — anchor your canonical numbers here
- **Gotchas we hit:**
  - **JSX needs `api/tsconfig.json`** with `"jsx": "react-jsx"`. Without it: TS17004 errors during deploy.
  - **Don't fetch Google Fonts** in the handler. Edge runtime returned 200 with empty body when font fetches silently failed. Drop custom fonts — system fallback works and is more reliable.
  - **Handler signature must accept Request:** `export default function handler(_request: Request) { ... }` — even if unused. Without the param, the function returns empty.
- **Cache headers:** `public, max-age=86400, stale-while-revalidate=604800` — OG images don't change often; cache aggressively.

---

## Utilities / conventions (not full components)

### 12. White-SVG `invert` pattern

Already documented in [`insto-notes.md`](./insto-notes.md#1-white-fill-svgs-need-invert). Add `invert: true` flag to logo data arrays; conditionally apply `brightness-0 invert` Tailwind classes. Battle-tested on: Polychain, Multicoin, NorthIsland, SeedClub, Axelar, Apple, Wyre, Workday, OKX, Base, Mantle, Lightspark.

### 13. Modal overlay weight

Already documented. Replace shadcn default `bg-black/80` overlay with `bg-foreground/40 backdrop-blur-sm`. Apply to all four: `dialog`, `alert-dialog`, `drawer`, `sheet`.

### 14. Mock-data canonical anchors

Pick one set, use everywhere. Our anchors: `$847.3M AUM · 14 LTPs · 312 investors`. LTP naming convention: `LORE25-{COUNTRY}`, `EMG-*`, `STBL-*`, `DEFI-*`. Don't carry over `$LORE25H`/`$SOLECO`-style consumer tickers.

---

## What's still missing (could be future additions)

These patterns came up in `lore-institutional` but were one-offs we didn't formalize. If reuse demand emerges, lift them:

| Pattern | Where it lives | Lift effort |
|---|---|---|
| Numbered eyebrow ("01 · CUSTODY") | `BentoTile` consumer | Add `numbered?: boolean` prop |
| 3-stat horizontal strip with dividers | `Accounts.tsx`, OG image | New `<StatStrip>` primitive |
| `card-surface` clickable hover state | scattered Tailwind | Codify as `[data-clickable]` on `.card-surface` |
| Section ordering manifest pattern | `Index.tsx` `SECTION_ANCHORS` | New layout primitive `<SectionManifest>` |
| Caption-under-mockup pattern | `HeroSection`, dual-prototype | New `<MockupCaption>` primitive |
| Eyebrow-uppercase-tracking pattern | every section | Codify as `.eyebrow` utility class |

If you build any of these into a real component, contribute it back here.
