# revenant-dark

Deep near-black field (faint olive undertone, cooler than lore-dark's warm
graphite), signal orange as the primary action and status accent, concrete-cream
text. The "night ops" register — clearance required, system active.

## When to use

- Swarm-fund dark mode / night trading sessions
- "Funding American Progress" / "Nucleus Engineering Office" energy
- Status boards and agent log views where dark is the default rendering context
- Ops surfaces monitoring active systems (not reading long prose)

## Brand vs accent — orange is reserved, not the default

`--brand` is a **neutral concrete-cream fill** (`#F1EEEB`, onyx text = 14.8:1 AAA),
NOT orange. Primary CTAs read as the calm, dependable default. Signal orange is
`--accent`, reserved for exactly **ONE hero action or metric per view** (e.g. the
single "Promote" lifecycle escalation, or the Fleet-NAV stat). This mirrors the
Atlas reference — one saturated orange "CONTACT US" over an otherwise inked layout —
and keeps orange's "active state / system signal" meaning intact.

> Deliberate deviation from lore-dark, which collapses `--brand` onto its accent
> (chartreuse). Revenant doesn't, because signal orange carries semantic load
> (it literally means "live / act here" in the source palette) that a pure
> identity hue like chartreuse does not. Spending it on every button would
> dilute the one color that's supposed to pop. Revenant's rule, both modes:
> **brand = strongest neutral inverse of the surface; accent = signal orange, reserved.**

## Accent — Signal Orange on near-black

`--accent: #FF4F00` on `--bg: #0E0F0C` measures **5.8:1** — AA at normal size,
AAA for large/bold. For small orange TEXT use `--accent-deep: #FF7A40` (**7.4:1**,
AAA). Do not set body copy in raw `#FF4F00`.

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
| `--brand` | `#F1EEEB` | Primary CTA = neutral cream (onyx text 14.8:1) |
| `--brand-fg` | `#1E1B1B` | Text on cream CTA |
| `--accent` | `#FF4F00` | Signal Orange — 5.8:1 (AA / AAA-large), reserved for one hero |
| `--accent-deep` | `#FF7A40` | Small-text-safe orange — 7.4:1 (AAA) |
| `--accent-soft` | `#2E1206` | Dark badge bg |
| `--accent-fg` | `#1E1B1B` | Text on orange-filled surface (5.2:1 AA) |

## Inversion

`revenant-light` is the light sibling. The themes are symmetric: both set
`--brand` to the strongest neutral inverse of their surface (onyx on light,
cream on dark) and both reserve signal orange as `--accent`. Only the surface,
foreground, and shadow treatment flip.

## Inspo sources

`funding american progress.png` — pure-black field, white editorial type, ® marks.
`neucleus eng office.png` — charcoal + white + rust-red accent, mono labels.
`Orange is still hot 1.png` — AI-OPS on black: orange as THE signal color.
`HH3Wc0aa8AAtpjp.jpeg` — Kyoto station; steel + concrete structural reference.
