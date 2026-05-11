# Theme: `insto` (Institutional)

The institutional sibling of `lore-light`. Built and battle-tested in the [`lore-institutional`](https://github.com/tomscaria/lore-institutional) teaser site. Use when the audience is institutional fund managers, VC partners, asset allocators, or capital strategics — not retail consumers.

## When to use

| Surface | Theme |
|---|---|
| Consumer neobank app (Save/Spend/Send/Invest tabs) | `lore-light` |
| Marketing site for the consumer product | `lore-light` |
| Pitch deck for a B2C investor | `lore-light` |
| **Institutional teaser site (fund managers, asset managers)** | **`insto`** |
| **Fund-operations console / admin dashboard** | **`insto`** |
| **Pitch deck for institutional investors or partners** | **`insto`** |
| **Partner-facing documentation (custodial APIs, compliance docs)** | **`insto`** |

Litmus test: if the page is showing AUM numbers, compliance perimeters, or fund-manager workflows, use `insto`. If it's showing a balance widget, an asset feed, or a P2P payment screen, use `lore-light`.

## Palette anchor

| Token | Value | Role |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-muted` | `#F3F1EE` (warm grey-300) | Subtle section bg, badges |
| `--fg` | `#1F1F1F` (soft-black, never pure black) | Body text |
| `--fg-3` | `#767676` | Muted text, captions |
| `--line` | `#D7D7D7` | Borders |
| `--brand` | `#1F1F1F` (soft-black) | Primary CTA bg |
| `--brand-fg` | `#FFFFFF` | Primary CTA text |
| `--accent` | `#C2AA84` (gold-500) | Inline emphasis, sparklines, accent badges |
| `--accent-soft` | `#F5ECDA` (gold-300) | Soft-tinted chip bg |
| `--accent-fg` | `#1F1F1F` (soft-black on gold) | Text on accent-bg badges (passes AA) |
| `--danger` | `#C82929` | Negative/limited/problem emphasis (e.g., "$20B accessible AUM" vs "$5T tokenized universe") |
| `--info` | `#517AB7` | Focus ring, blue links |

Sourced from Superstate's design tokens at `https://www.superstate.com/_app/immutable/assets/0.COmy4cyT.css` (specifically their gold-300/500/700, grey-300/500/700, and link-500). Adapted for our brand and Lore-Institutional positioning.

## Typography

- **Sans**: Geist (Vercel, open-source) loaded via Google Fonts. Aeonik fallback for projects that don't load Geist.
- **Mono**: Geist Mono. Aeonik Mono fallback. Used aggressively for numbers, tickers, account IDs — institutional cue.
- **Display**: Geist (no separate display family — institutional sites don't need Lock Serif's BotW-fantasy ornament).

If recreating on the codebase, add to your CSS or `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap">
```

## Voice rules (override the default Lore voice)

The default Lore voice is "confident, plainspoken, zero crypto-bro." For `insto`, tighten further:

- **≤15 words per sentence.** Fragments preferred over commas.
- **Declarative, not imperative.** "Lore owns the rails" not "Discover how Lore can transform..."
- **Bloomberg-terminal × onchain-native register.** Numbers in mono. Claims paired with proof points.
- **Banned words** (in addition to the consumer banned-word list): revolutionary, disruptive, game-changing, empower, unlock, democratize, WAGMI, LFG, moon, alpha, synergy, reimagine, paradigm shift, web3 revolution, next-gen, ecosystem play.
- **Headline formula**: `[concrete noun] + [present-tense verb] + [measurable outcome]`. E.g., "Move emerging-market funds onchain."
- **CTAs are operations-led, not founder-led.** "Book a fund-operations call" not "Book a meeting with our CEO."

## Component patterns (battle-tested in `lore-institutional`)

These are the recurring patterns that emerged from building the institutional teaser. Lift them rather than re-deriving:

### 1. White-fill SVGs need `invert`
Logos designed against dark backgrounds (Polychain, Multicoin, NorthIsland, SeedClub, Base, Mantle, Apple, Wyre, Workday, OKX, Axelar — most VC and ex-employer logos) are `fill="white"` SVGs. On the white insto bg they vanish.

Fix: Tailwind `invert` (or `brightness-0 invert` for combined effect) on the `<img>` element. Tag the data with `invert: true` per-logo, conditionally apply class:
```tsx
{ name: "Polychain", logo: polychainLogo, invert: true }
// <img className={`... ${logo.invert ? 'brightness-0 invert' : ''}`} />
```

**Skip invert** on logos with mixed fills (e.g., Citi `#040303` wordmark + white accent) or brand-color fills (e.g., Sui `#4DA2FF`, Monad `#8B5CF6`) — inverting corrupts them.

### 2. Modal overlay weight
Default shadcn `bg-black/80` overlay is too heavy for institutional light theme. Use `bg-foreground/40 backdrop-blur-sm`. Matches Stripe/Linear/Notion pattern.

```tsx
// shadcn dialog/alert-dialog/drawer/sheet overlay
"fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm ..."
```

### 3. `--destructive` is a TEXT color, not a bg
`--destructive` must be saturated (e.g., `#C82929`) — most callers use `text-destructive` for negative-emphasis text. Don't accidentally set it to a light bg-color hex value (e.g., `#F8F1F1`); use `--danger-soft` for that.

### 4. Hero pattern: dual-prototype
Institutional teasers benefit from showing BOTH sides of the platform: fund-manager dashboard (60-65% width, left) + investor surface (25-30%, right). Captions under each: "FUND MANAGER CONSOLE" / "INVESTOR EXPERIENCE". Mobile stacks vertically.

If the right-side mockup uses `w-full max-w-sm` internally (as `<ProductDemoMockup>` does), the wrapper MUST have an explicit width — `w-64 lg:w-72` works. Otherwise `w-full` resolves to 0px inside a `shrink-0` flex item.

### 5. Audience separation via tile grid, not tabs
Per the Superstate pattern: after a universal hero, show explicit audience tiles in a grid (one tile per partner type / audience segment) — DON'T tab between them. Each tile gets:
- Eyebrow (uppercase tracking-wider, gold-accent)
- Headline (≤8 words, partner-led)
- Body (1-2 sentences, ≤15 words each)
- A small DESKTOP-feeling visual (never a phone, unless it's specifically a B2B2C investor surface)
- "Learn more →" text-link (no button — institutional)

Grid: `grid-cols-1 md:grid-cols-2` for 4 tiles; `md:grid-cols-3` for 3 tiles.

### 6. Inline appendices with `<details>`, single-URL diligence
Institutional investors open ONE tab during diligence, not many. Don't split content across `/about`, `/team`, `/security`, `/faq` routes. Collapse the deeper-detail sections inline at the bottom of the homepage using native `<details>` elements:

```tsx
<details className="card-surface group">
  <summary className="cursor-pointer p-4 font-medium select-none">
    Product mechanics
  </summary>
  <div className="border-t border-border/40 p-4">
    <HowItWorksSection />
  </div>
</details>
```

Group appendices into ~6-8 logical clusters: Product mechanics, Architecture, Roadmap, Market context, Unit economics, Team extended, FAQ, Long-form.

### 7. Anchor mock data to canonical numbers
Pick ONE set of mock-data anchor numbers and use them everywhere on the site. For `lore-institutional` we used `$847.3M AUM · 14 LTPs · 312 investors` — every section, every chart, every mockup reconciled to those. Plausibility through consistency.

LTP naming convention: `LORE25-{COUNTRY}` for country baskets, `EMG-*` for thematics, `STBL-*` for stablecoin strategies, `DEFI-*` for crypto-native. Drop consumer-coded tickers like `$LORE25H`, `$SOLECO`, `$CRYPTO10`.

## Reference implementation

See [`tomscaria/lore-institutional`](https://github.com/tomscaria/lore-institutional) — the canonical reference build. Specifically:
- `src/index.css` — token mapping for Tailwind/shadcn
- `src/components/sections/HeroSection.tsx` — dual-prototype hero
- `src/components/visuals/FundManagerConsole.tsx` — institutional dashboard mockup pattern
- `src/components/sections/AccountsSection.tsx` — 3-pillar institutional credibility section
- `src/pages/Accounts.tsx` — Superstate-FundOS-pattern bento product page
- `src/components/sections/PartnerModelsSection.tsx` — audience-tile pattern (4 partner types, no phones)
- `NARRATIVE_ARC.md` — IA brief showing how to structure an institutional pitch

## What NOT to do on `insto`

- Don't use the `lore-light` chartreuse/lime accent — gold-500 is the insto accent
- Don't use Lock Serif display font — too BotW-fantasy for institutional
- Don't carry over `lore-light` decorative ornament (parchment textures, BotW iconography) — keep it Bloomberg-clean
- Don't tab between audiences — tile them
- Don't use phone mockups for B2B partner-type illustration — use desktop console cards
- Don't say "revolutionary" or any other banned word
- Don't use lime accents from the original Lore palette (`#B7D740`, `#97B600`) — they're consumer-coded
