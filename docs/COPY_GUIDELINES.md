# Copy Guidelines — Lore

> Extracted from `lore_brand_motion.figma.md` §12, §21, §10

---

## Section-by-section copy rules

### Hero
- **Headline:** 6–10 words. Declarative. No questions.
- **Subhead:** 1 sentence, ≤ 20 words. Clarifies the headline with a concrete detail.
- No paragraph copy in the hero — visuals carry the weight.

### Product Cards (max 3)
- **Card title:** 2–4 words. Noun-led.
- **Card body:** 1–2 sentences. State what the product does, then one proof point.

### Stage (Demo Viewport)
- **Tab labels:** 1–3 words each. Action- or object-oriented ("Invest", "Web3 Wallet", "CEX Listing").
- **Bullet copy inside tabs:** Short fragments, not full sentences. Each bullet ≤ 8 words.

### Proof (Charts / Flows)
- **Chart titles:** Factual labels ("Monthly AUM Growth", "Holdings Breakdown").
- **Annotations:** Numbers only. No adjectives.
- **Flow descriptions:** Present tense, step-by-step. Example: "User taps Buy. Order fills onchain. Portfolio updates."

### Reputation / Trust
- **Leaderboard labels:** Name + metric. No commentary.
- **Partner strip:** Logo-only preferred. If text is needed, company name only. No descriptions.

### CTA Endcap
- **Headline:** ≤ 6 words. Imperative or declarative.
- **Button label:** 2–3 words. Verb + object ("Start watching", "See the portfolio", "Join waitlist").
- **No body copy.** The page has already made the argument.

---

## Copy length limits

| Element | Max words |
|---|---|
| Hero headline | 10 |
| Hero subhead | 20 |
| Card title | 4 |
| Card body | 30 |
| Tab label | 3 |
| Tab bullet | 8 |
| CTA headline | 6 |
| CTA button | 3 |
| Chart title | 5 |
| Metric label | 3 |

---

## Proof pairing rule

Every claim must appear within visual proximity of its proof:

| Claim type | Required proof |
|---|---|
| Performance | Chart with time axis |
| AUM / volume | Live or recent number with date |
| User count | Exact figure, not "thousands" |
| Security | Audit name + link |
| Team credibility | Title + years of experience |

---

## Voice rules (enforced — see also `docs/VOICE_AND_TONE.md`)

### Sentence length
- **≤ 15 words per sentence.** Split at commas if needed.
- Declarative over imperative. State what the product does.

### Punctuation
- **No em-dashes (—).** Replace by job:
  - Pause/pivot → period + short fragment.
  - Bridging two ideas → period.
  - Aside → commas or parentheses.
  - Second clause expands first → colon.
- **No semicolons** unless joining two genuinely paired short clauses.
- **No exclamation marks** in body copy (max 1 per page in a CTA only).
- **Oxford comma** always.

### Banned words
`revolutionary`, `disruptive`, `game-changing`, `next-gen`, `empower`, `unlock potential`, `democratize`, `WAGMI`, `LFG`, `moon`, `alpha`, `degen`, `synergy`, `ecosystem play`, `reimagine`, `paradigm shift`, `web3 revolution`

### Headline formula
```
[Concrete noun] + [present-tense verb] + [measurable outcome]
```
Examples:
- "A single portfolio. Rebalanced monthly. Verifiable in real time."
- "Three products. One account. Zero custody risk."

### AI fingerprint anti-patterns (strip aggressively)
- "It's not just X, it's Y" structure
- Aggressive parallel triplets (mix pairs and quads)
- "X is the new Y" framing
- Adjective stacking ("dynamic, results-driven, passionate")

---

## Formatting conventions

### Numbers
- Always use digits for values ≥ 2: "3 products", "12-month CAGR", "$42M AUM"
- Spell out "one" and "zero"
- Use abbreviations for large numbers: K, M, B
- Include units: "$1.2M", "1,200 wallets"
- Percentages: no space before % sign ("34%")

### Dates & time
- Relative preferred: "Monthly", "Every 30 days"
- If absolute: "Jan 2025" format

### Technical terms
- Write "onchain" (one word, lowercase) not "on-chain" or "on chain"
- "DeFi" not "Defi" or "defi"
- "CEX" and "DEX" always capitalized
- "LTP" / "LTPs" for Liquid Tokenized Portfolios

---

## Markdown export format

When copy is exported via the "Copy Markdown" button, it must follow this structure:

```markdown
## [Section Name]

[Body copy]

- Bullet 1
- Bullet 2

| Metric | Value |
|---|---|
| AUM | $42M |
```

- No HTML tags in exported markdown
- Tables for any structured data
- Single blank line between sections
