# revenant-light

Concrete Gray surface, System Black ink, Signal Orange accent. The operational
register of the Lore design system — field-spec, American industrial, high-stakes.

Named for the Revenant lifecycle stage in swarm-fund: the highest-trust, most
battle-tested autonomous trading agent state. Where lore-light is "launch a
global bank in a day," revenant-light is "machines built to move the nation
forward" (robotics inspo). Same system, different emotional temperature.

## When to use

- Swarm-fund dashboard surfaces, ops-facing tooling
- Any surface where the Revenant trading lifecycle is front-and-center
- "Field specification / tested" aesthetic — status boards, agent logs, allocation tables
- Not for general retail or fintech surfaces — use `lore-light` for those

## Accent — Signal Orange (`#FF4F00`, Pantone 1655C)

Signal orange is the **active state / system signal** color from the designmaxxing
palette spec. It is not a decorative warm; it means "this is live / action required."

**Use raw `--accent` (#FF4F00) for:**
- Icon fills and border accents
- Large display type (≥24px bold) when impact is the goal
- Filled badge / chip backgrounds (pair with `--accent-fg` = onyx for legibility)
- Active indicator lines, progress bars, chart emphasis

**Use `--accent-deep` (#8A2D00) for:**
- Any body-size orange text on the concrete background (7.4:1 — AAA)
- Link text, inline labels that must read as signal-colored
- Small label text

**Never use raw `--accent` for paragraph text** — the #FF4F00 / #F1EEEB pairing
fails AA at small sizes (2.1:1). Use the *-deep variant for text, same discipline
as chartreuse in lore-light.

## Type stack — dual register

The operational feel comes from **mono-in-the-data**, not mono-everywhere. None of
the reference imagery (Atlas, Nucleus, Machine-Age) sets prose or headlines in mono;
they confine monospace to labels, IDs, and status stamps. Revenant does the same:

- **Mono (Aeonik Mono):** tabular numerics, unit IDs, timestamps, log lines, status
  chrome, uppercase micro-labels — anything that reads as machine output or needs a
  fixed-width column. Mono micro-labels sit at **10px min** (9px mono caps under-resolve).
- **Sans (Aeonik):** prose, navigation, buttons, panel/section titles. Base body **14px**.
- **Display (Lock Serif):** reserved for an editorial hero headline *if a surface has
  one* — a status dashboard usually doesn't, so serif simply won't appear there.

Whole-page mono was tried and rejected: monospace destroys word-shape (the cue that
makes prose fast to read) and blows out line length — a real legibility tax on a
surface an operator stares at for hours. See `preview/theme-revenant.html` — toggle
**Mono·Data ↔ Mono·All** (keys `S`/`F`) to compare the two registers live.

The register is a **layout decision, not a theme token** — the theme keeps
`--font-sans`/`--font-mono`/`--font-display` identical to lore-* so components
re-skin for free; surfaces opt into the mono register via class.

## Radii

Zero-to-minimal corner rounding: `--r-xs: 0`, `--r-md: 4px`. Intentional.
Rounded corners = consumer app; sharp corners = precision instrument.

## Shadow treatment

Flat offset shadows (no Gaussian blur): a 2–4px offset with zero blur reads as
"construction drawing annotation." Characteristic of AI-OPS, Atlas Advanced
Research, and robotics inspo set.

## Inversion

`revenant-dark` is the dark sibling. Both share signal orange as `--accent`.
Where revenant-light uses onyx (#1E1B1B) as `--brand` (primary CTA), revenant-dark
promotes signal orange to `--brand` — orange CTAs glow against near-black.

## Color values (quick ref)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F1EEEB` | Concrete Gray (surface / background field) |
| `--fg` | `#1E1B1B` | System Black |
| `--accent` | `#FF4F00` | Signal Orange (Pantone 1655C) |
| `--accent-deep` | `#8A2D00` | Orange, text-safe on bg (7.4:1 — AAA) |
| `--accent-soft` | `#FFE8D8` | Orange tint for chip/badge bg |
| `--accent-fg` | `#1E1B1B` | Text on signal-orange filled surface (6.8:1) |
| `--brand` | `#1E1B1B` | Primary CTA surface (onyx, neutral — never orange) |
| `--brand-fg` | `#F1EEEB` | Text on onyx CTA |
| `--bg-muted` | `#D2CCC3` | Sidebar / recessed fill — sharpened to a perceptible 1.38:1 step |
| `--line` | `#B7B0A7` | Primary divider — 1.86:1, a visible rule not a whisper |

## Brand rule

`--brand` = the strongest neutral inverse of the surface (onyx here), `--accent` =
signal orange, reserved for ONE hero action/metric per view. Same rule in
revenant-dark (where `--brand` becomes cream). Orange is never the brand fill —
it would dilute the "system signal" meaning. See the dark readme for the full
rationale and the deliberate deviation from lore-dark.

## Inspo sources

`designmaxxing 1.png` — three-color palette spec card (the canonical reference).
`designmaxxing 2.png` — orange + acid yellow; confirms chartreuse secondary.
`atlast advanced research.png` — concrete bg + black type + orange CTA.
`robotics 1.png`, `robotics 2.png` — concrete bg + orange + grid typography.
`machine age modern.jpeg` — cream serif display; editorial register.
`Orange is still hot 1.png` — AI-OPS brand card (operational vocabulary source).
