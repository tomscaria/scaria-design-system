# Button — spec

> Agent-readable component specification. Source of truth for the Button primitive across themes + expressions.

## Purpose

The button is the primary affordance for user action. Three intents: `primary` (default), `secondary`, `destructive`. Three sizes: `sm`, `md` (default), `lg`.

## Tokens used

| Token | Where |
|---|---|
| `--brand` | primary fill |
| `--brand-hover` | primary hover |
| `--brand-fg` | primary text |
| `--accent` | when intent="accent" (hero CTA) |
| `--accent-fg` | text on accent |
| `--bg-2` | secondary fill |
| `--fg` | secondary text |
| `--line` | secondary border |
| `--danger` | destructive border, text |
| `--r-md` | corner radius |
| `--fs-body-md`, `--fw-medium` | label |
| `--motion-duration-micro`, `--motion-ease-interaction` | hover transition |

## API

```ts
interface ButtonProps {
  intent?: 'primary' | 'accent' | 'secondary' | 'destructive' | 'ghost';  // default 'primary'
  size?: 'sm' | 'md' | 'lg';                                                // default 'md'
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  asChild?: boolean;       // composes with Radix Slot
  children: React.ReactNode;
}
```

## Variants — class composition

```tsx
// Built with cva()
const button = cva(
  'inline-flex items-center justify-center font-medium rounded-md transition-all duration-micro ease-interaction focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        primary:     'bg-brand text-brand-foreground hover:bg-brand-hover',
        accent:      'bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm',
        secondary:   'bg-card text-foreground border border-border hover:bg-muted',
        destructive: 'bg-transparent text-destructive border border-destructive/40 hover:bg-destructive/10',
        ghost:       'bg-transparent text-foreground hover:bg-muted',
      },
      size: {
        sm: 'text-body-sm h-8 px-3 gap-1.5',
        md: 'text-body-md h-10 px-4 gap-2',
        lg: 'text-body-lg h-12 px-6 gap-2.5',
      },
      fullWidth: { true: 'w-full' },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  }
);
```

## States

| State | Visual change |
|---|---|
| `:hover` | brand-hover / accent-hover / muted (per intent) |
| `:active` | scale(0.97) via .m-magnet utility if mounted |
| `:focus-visible` | ring-accent, 2px, with 2px offset |
| `disabled` | opacity 40%, cursor not-allowed |
| `loading` | spinner replaces icon slot; label dims |

## Anti-patterns

- Don't use accent intent more than once per visible viewport (see `tokens/accent-usage.md`)
- Don't put a destructive button next to a primary as siblings in the same row — they read as competing equals; destructive should be visually subordinate
- Don't override `radius` or `font-size` inline; if you need a different size, add a `size` variant instead

## Accessibility

- Always render `<button>` (not `<div>`) unless `asChild` composes with a link
- `disabled` must include `aria-disabled` (Radix Slot handles)
- `loading` must include `aria-busy="true"` and preserve label for screen readers
- Focus ring must be visible at AAA contrast on every theme background

## Example outputs per theme

| Theme | Primary CTA visual |
|---|---|
| lore-light | Graphite fill, lime text |
| lore-dark | Lime fill, graphite text (because brand inverts) |
| primitive | Black fill, white text |
| kiosk | Black fill, yellow text, hard-offset shadow, 0px radius |

The same `<Button intent="primary">` element renders all four correctly without any prop change — only the active `data-theme` differs.

## File layout

```
agent/components/button/
├── button.spec.md      ← you are here
├── button.tsx          ← the React implementation (lifted from existing DS)
├── button.tokens.json  ← machine-readable token consumption manifest
└── button.stories.tsx  ← Storybook stories per intent + size + theme
```
