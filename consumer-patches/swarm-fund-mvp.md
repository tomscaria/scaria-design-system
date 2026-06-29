# Consumer patch — swarm-fund-mvp

> Apply after Phase 0 (`revenant-light` + `revenant-dark` themes authored) and after Revenant verbal layer is locked in. This patch is what the local Claude session executes to bring swarm-fund-mvp onto the atomic kit.
>
> **Out of cloud MCP scope** — push from the local Mac, not from this session.

## 0. Prereqs (verify before touching code)

```sh
# 1. Kit linked, not installed-from-npm
cd ~/scaria/lore-design-system
pnpm link --global
cd ~/scaria/swarm-fund-mvp
pnpm link --global @tomscaria/lore-design-system

# 2. Peer deps satisfied
node -e "const p = require('./package.json'); console.log({react: p.dependencies.react, rd: p.dependencies['react-dom'], tw: p.devDependencies.tailwindcss || p.dependencies.tailwindcss});"
# Expect: react >=18, react-dom >=18, tailwindcss >=3.4

# 3. Phase 0 themes exist and are uncommented in styles.css
grep 'revenant-light\|revenant-dark' ~/scaria/lore-design-system/styles.css
# Expect two @import lines, NOT commented

# 4. Detect the consumer stack
test -f apps/web/next.config.js && echo "Next.js" || (test -f vite.config.ts && echo "Vite") || echo "Unknown — stop and inspect"
```

If any check fails, **stop and report**. Do not proceed with patches.

## 1. Stack-aware paths

The agent should detect which apply to swarm-fund-mvp. Most likely **Next.js App Router** based on the rswarm.ai marketing surface + product app pattern.

| Concern | Next.js App Router | Vite + React |
|---|---|---|
| Tailwind config | `tailwind.config.{js,ts}` at repo root | same |
| Root CSS | `app/globals.css` | `src/index.css` |
| `data-theme` attribute | `app/layout.tsx` `<html>` element | `index.html` `<html>` or `App.tsx` wrapper |
| Font loading | `app/layout.tsx` via `next/font` | `@import url(...)` in root CSS |
| Marketing pages | `app/(marketing)/...` route group | `src/pages/marketing/...` |
| Product pages | `app/(app)/...` route group | `src/pages/app/...` |

If stack is Next.js, also note: **rswarm.ai may be a separate route group OR a separate app under `apps/`**. Check before assuming.

## 2. File-by-file changes

### 2.1 `tailwind.config.{js,ts}`

Add the preset. Keep existing `content` array (the kit doesn't ship one — it's per-consumer).

```diff
  module.exports = {
+   presets: [require('@tomscaria/lore-design-system/preset')],
    content: [
      './app/**/*.{ts,tsx,mdx}',
      './components/**/*.{ts,tsx}',
    ],
    theme: {
      extend: {
-       // existing local fontSize / color extensions — REMOVE if they conflict with the preset
      },
    },
  };
```

**Remove** any local definitions of: `fontSize` (display-*, body-*), `colors` (brand, accent, fg, bg, line), `boxShadow` (token-shaped), `borderRadius` (token-shaped). The preset wins for these. Keep app-specific extensions that don't conflict.

### 2.2 Root CSS (`app/globals.css` or `src/index.css`)

Prepend the kit import, **before** any local layer declarations:

```diff
+ @import '@tomscaria/lore-design-system/styles';
+
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
```

Remove any local CSS-var definitions that duplicate kit tokens (`--bg`, `--fg`, `--brand`, `--accent`, `--fs-*`, `--lh-*`, `--motion-*`, `--sp-section-*`, `--r-*`, `--shadow-*`, `--font-*`). The kit is now the source.

### 2.3 Root layout — set theme + expression

**Next.js App Router** (`app/layout.tsx`):

```diff
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
-     <html lang="en">
+     <html lang="en" data-theme="revenant-light" data-expression="product">
        <body>{children}</body>
      </html>
    );
  }
```

**For the marketing route group** (`app/(marketing)/layout.tsx` or wherever rswarm.ai lives):

```tsx
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-expression="marketing">
      {children}
    </div>
  );
}
```

The `data-expression` cascades, so this overrides the root's `product` setting only inside the marketing tree. Dark-mode toggle (if present) flips `data-theme` between `revenant-light` and `revenant-dark`; expression is independent.

### 2.4 Fonts

**If Phase 0 chose Revenant fonts that differ from Lore's set** (Aeonik / Lock Serif / Aeonik Mono), the local session must:

1. Add the new `.woff2` files to `~/scaria/lore-design-system/agent/visual/fonts/`.
2. Reference them in `agent/themes/revenant-light/colors_and_type.css` via `--font-{sans,display,mono}`.
3. Have the consumer load them — Next.js: `next/font/local` in `app/layout.tsx`. Vite: `@font-face` in root CSS.

Defer until Phase 0 names the fonts. Do not pre-load Lore's fonts as a placeholder — the brand identity must be deliberate.

### 2.5 Lifecycle vocabulary migration

The code currently uses ad-hoc names for strategy states. Replace with the brand-canonical lifecycle nouns. Grep + rename:

```sh
# Find current vocabulary
grep -rEi 'draft|candidate|pilot|production|retired|deprecated|killed' src/ apps/ --include='*.{ts,tsx,md}'
```

Mapping:

| Existing (likely) | Replace with | Notes |
|---|---|---|
| draft, candidate, prototype | `Birth` | Strategy born from a fit + sweep |
| pilot, paper, paper-trade | `Canary` | Live-shaped paper trading |
| production, live, deployed | `Apex` | Live capital |
| retired, archived, paused | `Revenant` | Resurrectable |
| killed, removed, dead | `Bench` | Not resurrectable; public list |

Rename:
- Type definitions (`type StrategyState = 'birth' | 'canary' | 'apex' | 'revenant' | 'bench'`)
- DB column values or enum values (migration required if DB-backed — flag for founder, don't auto-migrate)
- UI labels (badges, filters, dashboard column headers)
- URL slugs where they appear (`/strategies/apex`, `/bench`)

**Do not rename** internal-only codenames (MiroFish, etc.) — those are not lifecycle words.

### 2.6 Banned-phrase copy audit

Grep consumer for banned phrases from `agent/brands/revenant/verbal/voice.md`:

```sh
cd ~/scaria/swarm-fund-mvp
grep -rni -E 'fine-?tun|AI hedge fund|democratize|empower|unlock|revolutionar|game.?chang|unprecedented|schedule a demo|talk to sales|solution' \
  --include='*.{ts,tsx,md,mdx}' \
  src/ app/ content/ 2>/dev/null
```

For each hit, replace per `voice.md` discipline:

| Banned | Replace with |
|---|---|
| fine-tuning, fine-tune | Prior Updating *or* CMA-ES sweep (pick by context) |
| AI hedge fund | research lab that ships tools |
| democratize quant | (delete the phrase; show the tool) |
| empower, unlock | (delete; rewrite to name the actual capability) |
| revolutionary, game-changing, unprecedented | (delete; show the artifact) |
| schedule a demo, talk to sales | Open the tool / Run the sweep / Check the calibration |
| solution | the actual noun (tool, sweep, model, dataset) |

If any hit can't be rewritten without losing meaning, surface it — don't paper over it.

### 2.7 Cross-venue language (internal-only term leak)

```sh
grep -rni 'cross-?venue' src/ app/ content/ --include='*.{ts,tsx,md,mdx}'
```

Externally: "venue-aware execution" or describe the mechanism. Internal docs / comments: leave alone.

## 3. Calibration plot formatting

The calibration plot is the brand's primary artifact. Spec:

- Axes labeled with units, not abbreviations (`Realized P&L (bps)`, not `R`).
- Show fees + slippage assumptions as a caption, not a tooltip.
- Use `--accent` for the realized line, `--fg-muted` for the expected band.
- Plot background = `--bg`, not white-on-white.
- Use kit's `--motion-duration-entry` for any reveal animation; don't author bespoke.

If an existing chart component (D3 or Recharts) doesn't conform, surface it as a follow-up — don't blanket-rewrite in this patch.

## 4. Smoke test (browser)

```sh
pnpm install
pnpm dev
```

Open the app. Manually verify:

- [ ] **Revenant aesthetic visible** — not Lore's parchment + lime; the Phase 0 palette + type shows up.
- [ ] **`data-theme` switching works** — toggle to dark, surfaces invert, type identity holds.
- [ ] **Marketing vs product rhythm differs** — navigate to a marketing route, section padding + display sizes are larger; navigate to product, tighter.
- [ ] **Lifecycle vocabulary renders** — a strategy detail page shows "Apex" / "Canary" / "Birth" / "Revenant" / "Bench" as appropriate.
- [ ] **No banned phrases** in any rendered text (run the grep again on built output if possible).
- [ ] **Calibration plot reads correctly** — axes labeled, fees shown, accent line uses theme color.
- [ ] **No FOUC** — theme applies on first paint (kit imports are pre-Tailwind in root CSS).
- [ ] **No regressed routes** — walk the app, no broken layouts from removed local tokens.

## 5. Commit + PR

```sh
cd ~/scaria/swarm-fund-mvp
git checkout -b claude/atomic-kit-migration
git add -A
git commit -m "Adopt @tomscaria/lore-design-system atomic kit (revenant-light/dark)"
git push -u origin claude/atomic-kit-migration
gh pr create --draft --title "Adopt atomic kit — Revenant themes" --body-file _migration-notes.md
```

PR body should include:
- Banned-phrase audit grep output (before + after).
- Lifecycle vocabulary rename diff summary.
- Screenshots of marketing + product expression side-by-side.
- Open questions for founder review.

## 6. Rollback plan

The kit is `pnpm link`ed, not installed. To roll back:

```sh
cd ~/scaria/swarm-fund-mvp
pnpm unlink --global @tomscaria/lore-design-system
git checkout main -- tailwind.config.* app/globals.css app/layout.tsx
pnpm install
```

Local-only — no published-package coordination needed.

## 7. Out of scope for this patch

- DB migration of strategy-state enum values (flag for founder).
- D3 chart blanket-rewrite (separate carve-out).
- Marketing copywriting beyond banned-phrase substitution (founder authors hero copy).
- npm publish of the kit (deferred per `PRIORITY_THIS_SESSION.md`).
- swarm-fund-mvp DB schema / Prisma changes (out of DS scope).
