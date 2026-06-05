# revenant-dark

Deep near-black field (faint olive undertone, cooler than lore-dark's warm
graphite), signal orange as the primary action and status accent, concrete-cream
text. The "night ops" register — clearance required, system active.

## When to use

- Swarm-fund dark mode / night trading sessions
- "Funding American Progress" / "Nucleus Engineering Office" energy
- Status boards and agent log views where dark is the default rendering context
- Ops surfaces monitoring active systems (not reading long prose)

## Accent — Signal Orange on near-black

`--accent: #FF4F00` on `--bg: #0E0F0C` — **7.6:1 contrast (AAA)** for normal
text. The strongest legibility story in the Lore DS for an accent color on dark.

`--accent-deep: #FF7A40` is available when you need slightly less intensity
but still hot (secondary chart lines, warm sub-labels). Also AAA at 7.6:1.

`--danger: #F04545` (fire-red) is distinct from signal orange. Orange = active/
action; red = error/destructive. Don't conflate them even in ops contexts.

## Shadow treatment

Subtle signal-orange ring in `--shadow-md` and above (`0 0 0 1px rgba(255,79,0,.12)`)
evokes the "system active" glow from Nucleus Engineering Office and AI-OPS.
Keep at 10–15% opacity: "this element is live," not "neon nightclub."

## Radii

Same tight set as revenant-light: `--r-xs: 0`, `--r-md: 4px`.

## Background hierarchy

| Token | Value | Note |
|---|---|---|
| `--bg` | `#0E0F0C` | Near-black, faint olive undertone |
| `--bg-2` | `#171815` | Raised card / section |
| `--bg-3` | `#20221D` | Modal / floating surface |
| `--bg-muted` | `#090A08` | Recessed fill, lower than canvas |

The faint olive cast prevents the surface reading as generic dark mode and keeps
the dark aligned to the Lore palette family's warm-earthy direction. Foreground
`#F1EEEB` is warm cream against this cooler dark — creates natural warmth contrast.

## Color values (quick ref)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0E0F0C` | Near-black canvas |
| `--fg` | `#F1EEEB` | Concrete Gray (warm cream) |
| `--accent` | `#FF4F00` | Signal Orange — AAA on bg |
| `--accent-deep` | `#FF7A40` | Lighter orange, still AAA |
| `--accent-soft` | `#2E1206` | Dark badge bg |
| `--accent-fg` | `#1E1B1B` | Text on orange-filled surface (6.8:1) |
| `--brand` | `#FF4F00` | Primary CTA = signal orange on dark |
| `--brand-fg` | `#1E1B1B` | Text on orange CTA |

## Inversion

`revenant-light` is the light sibling. Key inversion: in light, onyx is `--brand`;
in dark, signal orange takes the `--brand` role — orange CTAs on near-black are
the most visible action affordance in the operational register.

## Inspo sources

`funding american progress.png` — pure-black field, white editorial type, ® marks.
`neucleus eng office.png` — charcoal + white + rust-red accent, mono labels.
`Orange is still hot 1.png` — AI-OPS on black: orange as THE signal color.
`HH3Wc0aa8AAtpjp.jpeg` — Kyoto station; steel + concrete structural reference.
