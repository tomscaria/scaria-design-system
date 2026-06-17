# Lore Design System — Architecture Decision Record

> **Status:** finalized 2026-06-16. Scope: token + component + data-viz + distribution
> architecture for a **consumer-fintech** product family (Lore = consumer, Revenant = ops).
> Grounded in an adversarially-verified research pass (17 claims confirmed / 8 refuted);
> citations and confidence are inline. Refuted claims are kept as guardrails so we don't
> over-promise.

---

## Context

Lore is a multi-theme (40+) design system shipped as a private npm package, consumed by
`swarm-fund-mvp`, `Thomas OS`, and `lore-teaser-prea`. An audit (2026-06-16) found the
component layer exceptionally clean (0 hardcoded colors across 51 shadcn primitives) but
surfaced three structural issues this ADR resolves: (1) two token source-of-truths that
drift, (2) gain/loss encoded by color alone, (3) a single-axis categorical palette.

The system is already a **4-layer token cascade**, which research confirms is the right
shape:

```
PRIMITIVE   --p-chartreuse, --p-signal, --p-onyx …      raw values, theme-agnostic   (Tier 1)
SEMANTIC    --bg --fg --accent --success --line …       per-theme meaning            (Tier 2)
CATEGORICAL --cat-1…8, --chart-grid/axis/track          data-viz series, theme-aware (Tier 2.5)
COMPONENT   .btn .viz-bar bg-accent (Tailwind) …        consume Tier-2 only          (Tier 3)
```

The Tier 1→2→3 model is the documented industry pattern; start lean and add the component
tier only as decisions stabilize.¹ Semantic meaning must live in **explicit token
naming**, not folder structure — DTCG groups are organizational only.²

---

## Decisions

### D1 — Single source of truth: DTCG JSON → generate everything *(adopt)*
**Problem:** `tokens/colors_and_type.css` (canonical, has `--cat-*`) and `tokens/tokens.json`
(Figma/Tokens-Studio export) are hand-maintained in parallel and have already drifted —
the JSON lacks the new categorical tokens.

**Decision:** Make a **W3C Design Tokens (DTCG) JSON file the source of truth** and
*generate* the CSS, Tailwind preset, and `tokens.json` from it via **Style Dictionary**.
Pipeline: `Figma / Tokens Studio → DTCG JSON → Style Dictionary → {CSS vars, Tailwind, JSON}`.³

**Grounding & guardrails:**
- DTCG's explicit goal is cross-tool sharing of design properties; it supports composite
  types (typography, shadow, border, gradient) and token references for theming.² *(high)*
- ⚠️ Use the **stable spec `2025.10`** — <https://www.designtokens.org/TR/2025.10/format/>.
  The older `/tr/drafts/format/` URL is explicitly marked "do not implement."²
- ⚠️ A single DTCG file does **not** auto-generate native iOS/Android/Flutter — that needs
  the transform tool (Style Dictionary). Refuted 0-3; don't promise zero-effort cross-platform.²
- ⚠️ The `$`-prefix-mandatory and "explicit `$type` required" claims were refuted (1-2);
  don't treat them as hard spec rules.

**Migration:** non-breaking. Author DTCG → generate → diff generated CSS against the current
hand-authored CSS until byte-stable → flip the build to generated. CSS variables remain the
shipped artifact, so no consumer changes.

---

### D2 — Never encode gain/loss by color alone *(hard requirement — WCAG 2.2 Level A)*
**This is the single highest-priority change.** Audit found `charts.html` (treemap
`#4EAE4E`/`#E14B4B`, candlesticks, deposit/withdrawal bars) signaling direction by **hue only**.

**Decision:** Every positive/negative, gain/loss, up/down, required/error signal **must**
pair color with a redundant non-color cue — a `+/−` sign, ▲▼ / directional icon, text label,
or shape. Enforce as a review rule, not a guideline.

**Grounding:**
- WCAG 2.2 **SC 1.4.1 Use of Color (Level A)**: color must not be the only visual means of
  conveying information. No finance carve-out. *(confirmed 3-0 — strongest finding in the set)*⁴
- Form required/error fields by color only is an explicit failure (Technique F81); pair red
  with asterisk/icon/text. *(2-1)*⁴
- ⚠️ The specific "charts need hue AND lightness + 3:1 supplemental" rule was **refuted 0-3** —
  that exact wording isn't in 1.4.1. Chart contrast is governed by SC 1.4.11 (see D5), not 1.4.1.⁴

**Action:** retrofit the `_dataviz-kit.css` gain/loss patterns + `charts.html` to add
sign/glyph; replace the two hardcoded treemap hexes with `--success`/`--danger`.

---

### D3 — Split the data-viz token layer into three ColorBrewer sub-scales *(extend)*
**Decision:** Keep `--cat-1…8` as the **qualitative** scale (categorical, no order), and add
two more data-viz sub-scales as a dedicated layer separate from UI semantic tokens:
- **Diverging** (`--div-neg`, `--div-mid`, `--div-pos`) — two-sided around a neutral midpoint;
  the natural encoding for **gain/loss around a baseline**.
- **Sequential** (`--seq-1…n`) — single-metric ordered progression (heatmaps, density).

**Grounding:** Structure palettes by data type — sequential / diverging / qualitative — the
30-year peer-reviewed ColorBrewer standard adopted by D3/Tableau/matplotlib; diverging maps
to positive/negative-around-baseline, qualitative to category breakdowns. *(confirmed 3-0)*⁵
⚠️ ColorBrewer's "colorblind-safe / print-safe filter" claims were refuted (1-2) — colorblind-
safety remains best practice but is *mandated* here by D2 (no-color-alone), not by the tool.⁵

---

### D4 — Keep brand axes; white-label by overriding primitives *(confirm)*
**Decision:** Lore (consumer/fintech) and Revenant (ops) stay as sibling brand-axes, each
light+dark; the 40-theme switcher *is* the white-label engine. New brands override **Tier-1
primitives** (brand color + type family); Tier-2 semantic, Tier-2.5 categorical, and Tier-3
component tokens inherit automatically via references. Build the missing **Lore marketing
theme** next.

**Grounding:** White-label customization is "almost always color and typography," deliverable
as a per-customer config file (or CMS-surfaced overrides) layered on core semantic tokens —
no component-library fork. *(medium, single authoritative source — strong pattern, not settled law)*¹

---

### D5 — Numeric & contrast contract for financial data *(adopt)*
**Decision:**
- **Baseline AA everywhere:** 4.5:1 normal text, 3:1 large (≥18pt / ≥14pt bold). Apply
  **Non-Text Contrast SC 1.4.11 at 3:1** to chart elements, bars, lines, and gauge tracks —
  text-contrast rules (1.4.6) do **not** cover charts. Compute ratios with full precision
  (4.499:1 fails 4.5:1). *(confirmed 3-0 — best-evidenced area of the research)*⁶
- **AAA stretch for dense numbers:** target 7:1 for balances, statements, transaction amounts
  where the design allows (stretch target, not blanket — AAA can over-constrain brand color). *(3-0)*⁷
- **Numeric type role** (`--type-numeric`): `tabular-nums slashed-zero` for all figures.
  ⚠️ *Honest gap:* tabular-figure typography did **not** survive verification as a cited claim —
  it's well-established best practice here, applied on judgment, not on a research citation.

---

## Open questions (research gaps — flagged, not bluffed)
The research **could not verify** these; treat as follow-ups, not settled:
1. How the named fintech systems (Stripe, Coinbase, Robinhood, Wise, Revolut, Cash App,
   Mercury, Ramp, Monzo, Nubank) *actually* layer tokens/palettes — **no** surviving claim
   cites their real systems. Don't assert "Stripe does X."
2. Dark-mode patterns for financial data (desaturating gain/loss to hold 4.5:1 without
   vibrating on dark) — in scope, no verified claim. (Our lore-dark/revenant-dark work
   addresses this in practice but isn't research-backed.)
3. Concrete regulatory UI bindings (SEC / FCA / EU EAA-2025 / ADA) beyond generic WCAG 2.2 AA.
4. Exact verbatim DTCG 2025.10 section text for composite types / JSON-Pointer references —
   reconfirm against 2025.10 before quoting as normative.

---

## Prioritized actions
1. **D2** — non-color gain/loss across `_dataviz-kit.css` + `charts.html` *(WCAG Level A; do first)*.
2. **D1** — stand up the DTCG → Style Dictionary pipeline; kill the JSON/CSS drift.
3. **D3** — add diverging + sequential data-viz sub-scales.
4. **D5** — promote the numeric/contrast contract into tokens; audit chart elements for 1.4.11.
5. **D4** — build the Lore marketing theme.

---

### Sources
1. Brad Frost, *The Many Faces of Themeable Design Systems* — <https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems/> *(tier model 3-0; white-label 2-1)*
2. W3C Design Tokens Community Group — <https://github.com/design-tokens/community-group> · spec **2025.10** <https://www.designtokens.org/TR/2025.10/format/>
3. Style Dictionary — <https://style-dictionary.com/> · Tokens Studio — <https://tokens.studio/>
4. WCAG 2.2 *Use of Color* (SC 1.4.1, Level A) — <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html>
5. ColorBrewer — <https://colorbrewer2.org/>
6. WCAG 2.2 / WebAIM contrast — <https://www.w3.org/TR/WCAG22/> · <https://webaim.org/articles/contrast/>
7. WCAG 2.2 *Contrast (Enhanced)* (SC 1.4.6, AAA) — <https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html>

*Research method: 6 angles, 26 sources fetched, 95 claims extracted, 25 adversarially verified (17 confirmed / 8 refuted), cost-optimized (Haiku search/verify, Sonnet synthesis), 109 agents.*
