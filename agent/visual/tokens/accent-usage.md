# Accent usage rules (strict)

> `--accent` is the hero brand color (Lore lime, `HSL 82 100% 55%` in lore themes). It carries semantic weight — overuse dilutes it. These rules are non-negotiable.

## ✅ Allowed

| Element | Pattern |
|---|---|
| Primary CTA button background | `bg-accent text-accent-fg` |
| Active tab indicator | `border-b-2 border-accent` |
| Key metric value | `text-accent` on AUM, ROI, headline number |
| Chart accent line | `stroke="hsl(var(--accent))"` |
| Glow pulse on active card | `box-shadow: 0 0 20px hsl(var(--accent) / 0.15)` |
| Focus ring | `ring-accent` |
| Brand mark / logo color | When the mark itself is monochrome and being rendered in brand color |

## ❌ Forbidden

| Misuse | Why |
|---|---|
| Section background fill (`bg-accent` on a `<section>`) | Floods the brand; nothing else can be hero |
| Body / paragraph text in accent | Unreadable; reads as design error |
| Decorative borders / dividers in accent | Use `--line` or `--line-strong` instead |
| Multiple accent CTAs in the same view | One hero per surface |
| Accent on accent (e.g. accent text on accent bg without `accent-fg`) | Contrast failure |

## Density rule

**Max one accent surface per visible viewport.** If your design has two accent elements competing in the user's eye, one of them is wrong.

Exceptions:
- A single accent CTA + a single `text-accent` metric = OK if they support the same call to action
- Active state on a sidebar (lime indicator) + a CTA elsewhere = OK only if the CTA is below-fold

## Per-theme behavior

The `--accent` value changes per theme but the usage rules don't:

| Theme | Accent value |
|---|---|
| lore-light, lore-dark | Lime `hsl(82 100% 55%)` |
| primitive | Foreground (no separate accent — brand-neutral) |
| kiosk | Electric yellow `hsl(63 100% 58%)` |
| revenant-light, revenant-dark | TBD from inspo |
| berlin | TBD from inspo |

When authoring a new theme, the accent must be capable of carrying these uses. Don't pick something so soft it can't function as a CTA fill.
