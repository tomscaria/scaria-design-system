# Color roles

> Semantic color tokens, what each means, where each is allowed. Per the Lore visual system.

## Surface

| Token | Role |
|---|---|
| `--bg` | Page background — the default surface beneath everything |
| `--bg-2` | Raised card / panel surface (one step elevated from `--bg`) |
| `--bg-3` | Floating surface (modals, popovers, two steps elevated) |
| `--bg-muted` | Dim background variant (recessed sections, disabled fields) |
| `--bg-inverted` | The opposite-mode background (used for inverted callouts) |

## Foreground (text + ink)

| Token | Role |
|---|---|
| `--fg` | Primary text on `--bg` |
| `--fg-2` | Secondary text (body copy where `--fg` is for headings) |
| `--fg-3` | Tertiary text (captions, footnotes) |
| `--fg-muted` | Disabled / placeholder text |
| `--fg-inverted` | Text on `--bg-inverted` |

## Line

| Token | Role |
|---|---|
| `--line` | Default border / divider |
| `--line-2` | Subtler divider (e.g. inside cards) |
| `--line-strong` | Emphasis border (selected, hovered, table headers) |

## Brand

| Token | Role |
|---|---|
| `--brand` | The primary action surface — button fill, key affordances |
| `--brand-hover` | Brand on hover |
| `--brand-fg` | Text on `--brand` (paired for AA contrast) |

## Accent

The hero brand color. Strict usage rules — see `accent-usage.md`.

| Token | Role |
|---|---|
| `--accent` | Hero accent (Lore lime by default; `HSL 82 100% 55%`) |
| `--accent-hover` | Accent on hover |
| `--accent-deep` | Legible-on-light variant for text |
| `--accent-soft` | Tinted background variant (chips, soft fills) |
| `--accent-fg` | Text on `--accent` |

## Semantic state

| Token | Role |
|---|---|
| `--success` | Positive state (savings, growth, success ticks) |
| `--info` | Informational / link blue |
| `--warn` | Caution (rate change, warning labels) — never red |
| `--danger` | Destructive action, error state |

## Rules

1. **Never reference a hex directly** in component code. Always go through a CSS var. If a value doesn't exist, add a token, don't inline.
2. **Never use raw `text-white` or `text-black`.** Use `--fg`, `--fg-inverted`, `--bg`, `--bg-inverted`.
3. **`--accent` is not background fill.** See `accent-usage.md` for the strict list.
4. **`--brand` and `--accent` may share a value** (lore-dark), or differ (lore-light: brand = graphite, accent = lime). Don't conflate them in code.
