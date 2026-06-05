# Type scale

> Per-theme. Was global, refactored as part of Move 1. Each theme defines its own values for the variables below.

## Scale tokens (CSS vars)

| Token | Role | Lore-light default |
|---|---|---|
| `--fs-display-xl` / `--lh-display-xl` / `--tracking-display-xl` | Hero headline (marketing) | 96px / 0.95 / -0.035em |
| `--fs-display-lg` / `--lh-display-lg` / `--tracking-display-lg` | Page hero | 72px / 1.0 / -0.03em |
| `--fs-display-md` / `--lh-display-md` / `--tracking-display-md` | Section hero | 56px / 1.05 / -0.025em |
| `--fs-display-sm` / `--lh-display-sm` / `--tracking-display-sm` | Card hero | 40px / 1.1 / -0.02em |
| `--fs-header-xl` | Major section heading | 32px / 1.15 / -0.015em |
| `--fs-header-lg` | Subsection heading | 24px / 1.2 / -0.01em |
| `--fs-header-md` | Card title | 20px / 1.25 / -0.005em |
| `--fs-header-sm` | Item title | 18px / 1.3 / 0 |
| `--fs-header-caps` | All-caps label / eyebrow | 12px / 1 / 0.075em |
| `--fs-body-lg` | Lede body | 18px / 1.55 |
| `--fs-body-md` | Default body | 16px / 1.55 |
| `--fs-body-sm` | Caption | 14px / 1.5 |
| `--fs-body-xs` | Micro (footnotes, monospace data) | 12px / 1.45 |

## Weight tokens

| Token | Role |
|---|---|
| `--fw-regular` | Body weight |
| `--fw-medium` | Emphasis (button labels, table headers) |
| `--fw-bold` | Display + headers |

## Family tokens

| Token | Role |
|---|---|
| `--font-sans` | Body, UI, navigation |
| `--font-display` | Hero + heading display (only used on h1/h2/display-* classes) |
| `--font-mono` | Code, numerics, tabular data |

## Marketing vs product

The `data-expression="marketing"` axis upscales display tokens — typical bump:
- `--fs-display-xl` 96px → 120px
- `--fs-display-lg` 72px → 96px
- `--fs-display-md` 56px → 72px

Body and header tokens stay constant across expressions. Only the display tier amplifies for marketing.

## Numeric handling

All numeric data (money, percentages, AUM, etc.) must use tabular figures + slashed zero:

```css
font-variant-numeric: tabular-nums slashed-zero;
font-feature-settings: "ss01";
```

The `.t-numeric` class applies this. Use it on `<span>` wrapping any monetary or quantitative value.

## Rules

1. **`.t-display-*`, `.t-header-*`, `.t-body-*` classes** read these vars. Don't hardcode `font-size` in component CSS.
2. **Tailwind `text-display-lg` / `text-body-md` / etc.** also resolves to these vars (when `preset.js` Move 1 lands).
3. **Don't invent new tiers** without adding a token. If you need 18px display, the answer is `--fs-header-sm`, not a one-off.
