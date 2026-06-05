# Spacing rhythm

> Two parallel systems: **primitive** (pixel-grid building blocks) and **rhythm** (semantic, per-theme, per-expression).

## Primitive scale

Pixel-anchored, 4px grid. Brand-wide, not per-theme. Use for component-internal spacing where the value is mechanical (padding inside a button, gap between two icons).

| Token | Value |
|---|---|
| `--sp-1` | 1px |
| `--sp-2` | 2px |
| `--sp-4` | 4px |
| `--sp-8` | 8px |
| `--sp-12` | 12px |
| `--sp-16` | 16px |
| `--sp-24` | 24px |
| `--sp-32` | 32px |
| `--sp-48` | 48px |
| `--sp-64` | 64px |
| `--sp-96` | 96px |
| `--sp-128` | 128px |

Tailwind utility: `p-sp16`, `gap-sp24`, etc.

## Rhythm tokens (per-theme, per-expression)

Semantic. Vary per theme and per expression. Use for layout-level spacing where the *meaning* matters (separation between sections, gap inside a stack).

| Token | Role |
|---|---|
| `--sp-section-y` | Vertical spacing between major sections of a page |
| `--sp-section-x` | Horizontal page gutter |
| `--sp-stack-xs` / `-sm` / `-md` / `-lg` / `-xl` | Vertical gaps inside a content stack |
| `--sp-inline-xs` / `-sm` / `-md` / `-lg` | Horizontal gaps within a row |

## Why two systems

Section spacing in `lore-light + marketing` (160px) is fundamentally different from section spacing in `lore-light + product` (48px) — but the *primitive* 16px stays 16px in both. Without two systems, you'd either over-spec primitives (every padding becomes per-theme, exhausting) or under-spec rhythm (everything compresses in product, becomes wrong).

## Reference values

| Theme | Expression | section-y | stack-xl |
|---|---|---|---|
| lore-light | product | 48px | 64px |
| lore-light | marketing | 160px | 96px |
| primitive | product | 72px | 56px |
| kiosk | product | 64px | 96px |
| kiosk | marketing | 200px | 96px |

## Rules

1. **Component-internal padding/gap** → use primitive (`--sp-*`).
2. **Section / page-level layout** → use rhythm (`--sp-section-*`, `--sp-stack-*`).
3. **Never use Tailwind's built-in spacing scale** (`p-4`, `gap-6`) inside components. Always go through tokens.
