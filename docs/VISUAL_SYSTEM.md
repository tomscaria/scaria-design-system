# Visual System — Lore

> Extracted from `lore_brand_motion.figma.md` §2, §17, §18, §19

---

## 1. Color token table

All values are HSL. Tokens are defined in `src/index.css` and mapped in `tailwind.config.ts`.

### Core semantic tokens

| Token | Light mode | Dark mode | Tailwind class |
|---|---|---|---|
| `--background` | `0 0% 98%` | `0 0% 4%` | `bg-background` |
| `--foreground` | `0 0% 9%` | `0 0% 98%` | `text-foreground` |
| `--card` | `0 0% 100%` | `0 0% 7%` | `bg-card` |
| `--card-foreground` | `0 0% 9%` | `0 0% 98%` | `text-card-foreground` |
| `--primary` | `82 70% 40%` | `82 89% 62%` | `bg-primary` / `text-primary` |
| `--primary-foreground` | `0 0% 98%` | `0 0% 4%` | `text-primary-foreground` |
| `--secondary` | `0 0% 94%` | `0 0% 12%` | `bg-secondary` |
| `--secondary-foreground` | `0 0% 20%` | `0 0% 70%` | `text-secondary-foreground` |
| `--muted` | `0 0% 92%` | `0 0% 15%` | `bg-muted` |
| `--muted-foreground` | `0 0% 42%` | `0 0% 62%` | `text-muted-foreground` |
| `--accent` | `82 70% 40%` | `82 89% 62%` | `bg-accent` |
| `--accent-foreground` | `0 0% 98%` | `0 0% 4%` | `text-accent-foreground` |
| `--border` | `0 0% 85%` | `0 0% 20%` | `border-border` |
| `--input` | `0 0% 85%` | `0 0% 20%` | `border-input` |
| `--ring` | `82 70% 40%` | `82 89% 62%` | `ring-ring` |
| `--destructive` | `0 84.2% 60.2%` | `0 84.2% 60.2%` | `bg-destructive` |

### Custom tokens

| Token | Light mode | Dark mode | Tailwind class |
|---|---|---|---|
| `--lime` | `82 85% 35%` | `82 100% 55%` | `text-lime` / `bg-lime` |
| `--lime-muted` | `82 60% 30%` | `82 60% 45%` | `text-lime-muted` / `bg-lime-muted` |
| `--surface-elevated` | `0 0% 96%` | `0 0% 8%` | `bg-surface-elevated` |
| `--text-primary` | `0 0% 9%` | `0 0% 98%` | — (use `text-foreground`) |
| `--text-secondary` | `0 0% 20%` | `0 0% 75%` | — (use `text-secondary-foreground`) |
| `--text-tertiary` | `0 0% 35%` | `0 0% 60%` | — (use `text-muted-foreground`) |

### Data-coding colors (contextual, not in CSS tokens)

| Purpose | Color | Usage |
|---|---|---|
| Location: LA | Purple (`hsl(270 60% 55%)`) | Location pills |
| Location: SF | Orange (`hsl(25 90% 55%)`) | Location pills |
| Location: Remote | Blue (`hsl(210 70% 55%)`) | Location pills |
| Positive delta | Lime (use `--lime`) | Performance charts |
| Negative delta | Red (use `--destructive`) | Performance charts |

---

## 2. Contrast rules

### Minimum ratios (WCAG AA)

| Pairing | Required ratio | Status |
|---|---|---|
| `--foreground` on `--background` | ≥ 4.5:1 | ✅ Both modes |
| `--primary` on `--primary-foreground` | ≥ 4.5:1 | ✅ Both modes |
| `--muted-foreground` on `--background` | ≥ 4.5:1 | ✅ Both modes |
| `--lime` on `--background` (dark) | ≥ 4.5:1 | ✅ |
| `--secondary-foreground` on `--secondary` | ≥ 4.5:1 | ✅ Both modes |

### Text hierarchy contrast

| Level | Dark mode | Light mode |
|---|---|---|
| Primary text | `#FAFAFA` (`--foreground`) | `#171717` (`--foreground`) |
| Secondary text | `#BFBFBF` (`--text-secondary`) | `#333333` (`--text-secondary`) |
| Tertiary / disabled | `#999999` (`--text-tertiary`) | `#595959` (`--text-tertiary`) |
| Muted / caption | `#9E9E9E` (`--muted-foreground`) | `#6B6B6B` (`--muted-foreground`) |

### Rules

1. **Never** place lime text on lime backgrounds.
2. **Never** use `text-white` or `text-black` directly — always use semantic tokens.
3. Small text (< 14px) requires 4.5:1. Large text (≥ 18px bold) requires 3:1.
4. Interactive elements must have a visible focus ring using `--ring`.

---

## 3. Accent usage rules (strict)

Lime / accent is **only** permitted on:

| Element | Allowed | Example |
|---|---|---|
| Primary CTA button | ✅ | `bg-primary text-primary-foreground` |
| Active tab indicator | ✅ | `border-b-2 border-primary` |
| Key metric value | ✅ | `text-lime` on AUM figure |
| Chart accent line | ✅ | Recharts `stroke="hsl(var(--lime))"` |
| Glow pulse on active card | ✅ | `shadow-[0_0_20px_hsl(var(--lime)/0.15)]` |
| Background fill | ❌ | Never use `bg-lime` as a section background |
| Body text | ❌ | Never color paragraphs lime |
| Decorative borders | ❌ | Borders use `--border` token |

---

## 4. Component usage examples

### Card (dark mode default)

```tsx
<div className="bg-card border border-border rounded-lg p-6">
  <h3 className="text-foreground text-lg font-semibold">Card Title</h3>
  <p className="text-muted-foreground text-sm mt-1">Description text.</p>
  <span className="text-lime text-2xl font-bold mt-4 block">$42M</span>
</div>
```

### Metric pill

```tsx
<span className="bg-lime/10 text-lime text-xs font-medium px-2 py-0.5 rounded-full">
  +12.4 %
</span>
```

### Section label

```tsx
<span className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
  Performance
</span>
```

### Primary CTA

```tsx
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Start watching
</Button>
```

### Location pill

```tsx
{/* LA */}
<span className="bg-purple-500/15 text-purple-400 text-xs px-2 py-0.5 rounded-full">
  Los Angeles
</span>

{/* SF */}
<span className="bg-orange-500/15 text-orange-400 text-xs px-2 py-0.5 rounded-full">
  San Francisco
</span>
```

### Elevated surface

```tsx
<div className="bg-surface-elevated border border-border/50 rounded-lg p-4">
  {/* Content on slightly raised surface */}
</div>
```

---

## 5. Typography

| Role | Font | Weight | Size | Class |
|---|---|---|---|---|
| Hero headline | Inter | 700 | 2.5–3rem | `text-4xl font-bold` |
| Section headline | Inter | 600 | 1.25–1.5rem | `text-xl font-semibold` |
| Card title | Inter | 600 | 1rem | `text-base font-semibold` |
| Body | Inter | 400 | 0.875rem | `text-sm` |
| Caption / label | Inter | 500 | 0.75rem | `text-xs font-medium` |
| Section label | Inter | 500 | 0.75rem | `text-xs tracking-[0.15em] uppercase` |
| Metric value | Inter | 700 | 1.5–2rem | `text-2xl font-bold` |

---

## 6. Spacing scale

Follow Tailwind's 4px base. Key values used in the system:

| Token | Pixels | Usage |
|---|---|---|
| `p-4` | 16px | Card inner padding (compact) |
| `p-6` | 24px | Card inner padding (standard) |
| `p-8` | 32px | Section padding |
| `gap-4` | 16px | Card grid gap |
| `gap-6` | 24px | Section content gap |
| `py-16` | 64px | Section vertical padding |
| `my-12` | 48px | Section separator margin |

---

## 7. Border radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 2px | Pills, tags |
| `rounded` | 4px | Small inputs |
| `rounded-md` | 4px | Buttons |
| `rounded-lg` | 6px | Cards, containers |
| `rounded-full` | 9999px | Avatars, circular pills |
