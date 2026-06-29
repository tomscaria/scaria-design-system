# magic_trick.md — Revenant

> The Revenant POV. Source: `swarm-fund-mvp/docs/00_vision/{full_vision,north_star}.md`, `docs/long_term_vision/README.md`, the agent-evolution README, and founder direction on the audience cut. Founder-confirm.

---

## The one sentence

**Revenant is a research lab studying how autonomous agent systems behave, evolve, and fail when real capital is at stake — and a tools business for the self-service quants who've spent two years asking Polymarket and Kalshi for an API they could actually trade against.**

The fund is the experiment. The P&L is the error bar. The tools are what we ship.

## The bet

Financial-market plumbing is mid-way through a multi-decade migration onchain. Every new venue that comes online creates a temporary pricing-surface gap before the institutional desks consolidate it. Two parallel realities follow:

1. **The seams can be harvested systematically** by a population of competing agents under selection pressure, with cross-LLM-family judging and calibration surfaces trained on hundreds of millions of trades.
2. **The venues themselves haven't shipped real trading infrastructure** — no proper OHLC, no websocket subscriptions, no true market orders, no colo. The hobbyist + pro-am quants who actually want to trade these surfaces have been complaining about this in Polymarket and Kalshi Discords for 24+ months. Building the tools they want is a near-zero-friction wedge into a community that's already pre-qualified by frustration.

The fund and the tools compound on the same substrate. The fund proves the methodology; the tools distribute it; the community feeds back signal we wouldn't otherwise see.

## The audience (the important correction)

Revenant is **not** primarily institutional. The Stanford PhD application, the Anthropic / Uniswap Fellowship grant pipeline, the eventual LP conversations (Polychain, Multicoin, Paradigm, UHNW via Citi PB) are all real — but they are the **credibility track**, not the audience track.

The audience is **the hobbyist and pro-am quant cohort active in Polymarket / Kalshi Discords.** Reference profiles: @zostaff, @0xMovez, @RohOnChain, @de1lymoon on X. The shared characteristics:

- Self-service, technically literate, comfortable shipping their own infra
- Frustrated for 2+ years with abandoned venue APIs — no OHLC, no websocket subscriptions, no true market orders, no colo
- Willing to pay for tools that close the gap (data feeds, order routing, backtest infra, signal libraries)
- Allergic to enterprise-grade pitch decks; respond to GitHub repos, calibration plots, and Discord-native availability
- Skeptical of "AI hedge fund" branding; receptive to "we built this for ourselves because no one else would"

**These are the buyers and the co-conspirators.** Tools sales fund the lab. The lab produces methodology that becomes tools. The community shapes what gets built next.

**Secondary audiences (credibility, not revenue):** grant committees, academic peers, eventual LPs. Same brand, different surface. The tools and the research are what they evaluate — not pitch decks.

**Not** retail. **Not** "AI traders" in the get-rich-from-bots sense. **Not** enterprise sales targets. The brand is calibrated for operators, builders, and quants who think in falsifiable claims, working APIs, and reproducible notebooks.

## The bet within the bet — fund + tools as one apparatus

Most fund/lab structures pick one side: trade the strategies privately or sell the tools publicly. Revenant runs both because they reinforce each other:

| The fund produces | Tools turn it into |
|---|---|
| 302M Polymarket trades labeled by calibration cell | Public calibration surface API the cohort can query |
| Cross-venue lead-lag signals (PM ↔ HL, Kalshi ↔ PM) | Real-time spread monitors and execution adapters |
| The "abandoned API" problem the founder hit directly | Proper OHLC backfills, websocket feeds, true market-order semantics, colo'd routing |
| Karpathy autoresearch loop running across the strategy fleet | Strategy scaffolding the cohort can fork into their own setups |
| Graveyard of failed strategies labeled with cause-of-death | Negative-example training data published as a research artifact |
| 3,737 papers ingested, 1,361 factors extracted | A factor library API for the cohort to subscribe to |

The fund proves the apparatus is worth something. The tools let the cohort verify it themselves and compound it for their own books. Both compound the research surface.

## The reframe

| Most people see | Revenant sees |
|---|---|
| Prediction markets as a standalone asset class | A real-time, crowd-sourced probability layer that leads other markets by minutes to hours — and a venue category that hasn't built basic trading infra |
| Agent research as within-run improvement (FinCon, AlphaAgents) | Population-level Darwinian selection *across* runs — death is data, graveyard entries train the next generation |
| LLM-as-judge using same-model raters | Cross-family quorum (Opus + GPT-5 + Gemini) breaks the calibration bias that correlates judges with the agent's own hallucination patterns |
| "AI hedge fund" as a marketing label | A research lab + a tools business + a community. The fund is the experimental apparatus; the tools are the distribution; the research is what compounds |
| Backtest evidence as the proof | Pre-registered numeric gates, forward-held-out validation, committed falsification floors — "failure has zero capital cost and high information value" |
| Quants as institutional traders in colo'd boxes | Quants as the self-service Discord cohort building their own strategies on venues that haven't shipped the APIs they need |

The differentiated insight: a Polymarket ceasefire market isn't just a binary bet. It's a real-time crowd-sourced probability estimate of a geopolitical event with direct causal impact on WTI crude. When that market moves, it leads perpetual futures by minutes to hours. **Nobody is systematically trading that signal at scale today. Nobody is studying how autonomous agents learn to exploit it. And nobody is shipping the infrastructure the cohort would need to trade it themselves.**

## The aesthetic

The Revenant brand has the rigor of a Bell Labs writeup, the pragmatism of a trading-floor README, and the Discord-native availability of an open-source maintainer.

- **Honest vocabulary.** "Rules-based system, not a neural network." "Prior Updating / CMA-ES sweep" — never "fine-tuning." If we don't have something, we don't claim it. "Generations completed: zero. Nothing here is statistically significant trading evidence."
- **Falsification-first.** Every claim ships with the numeric gate it must clear and the date we'll know. Public failure log: "Geo→WTI directional — falsified at 54% backtest hit rate vs 65% gate." Failure is information value.
- **Death is data.** The Revenant lifecycle (Birth → Canary → Apex → Dead → Revenant) is the brand. Graveyard entries are first-class citizens.
- **Tools-grade pragmatism.** Working APIs over marketing pages. Reproducible notebooks over PDFs. Discord-thread support over enterprise tickets. The cohort smells inauthenticity from a mile out — every surface has to feel built-by-an-operator-who-uses-it.
- **Quiet confidence.** No exclamation marks. No emojis. Numbers and apparatus speak. When the methodology is rigorous enough, restraint reads as authority.

Visually: dark surfaces, parchment ink, type that signals manuscript-density and operator-grade tooling. Off-white > pure white. Closer to a research preprint than a SaaS dashboard — but with the calibration-plot-and-code-block density of a quant's daily-driver setup. Motion is purposeful and terse — orientation, proof, delight; remove anything that doesn't satisfy at least one.

## What we won't do

- **Discretionary trading.** Systematic edge extraction, never narrative trades.
- **Same-model judges.** Cross-family raters or none — same-model judges share calibration bias with the agent.
- **Hype individual strategies.** The portfolio is a population under selection pressure. Any one strategy is replaceable; the apparatus is not.
- **External "cross-venue alpha" framing.** Internal-only language — the public surface emphasizes calibration and methodology, not the cross-venue lead-lag. (Per ADR-056 forbidden-phrases list.)
- **Enterprise-flavored brand surfaces.** No "schedule a demo," no "talk to sales," no gated whitepapers. The cohort respects GitHub READMEs, calibration plots, and code. Lead with those.
- **"AI hedge fund" marketing.** Anyone using that phrase about themselves is selling something we wouldn't buy. We don't sell it either.
- **Promise yield, Sharpe, or returns.** We promise the methodology and the gates. The system either clears them or it doesn't.
- **Reference deprecated work as if it still applies.** MiroFish is gone. Don't reference it. Honest historical record only.

## The unfair advantage

1. **Operator background, not analyst background.** Cross-venue arb on fragmented regional exchange liquidity was already executed at Wyre across SE Asia, LatAm, and Africa. The fragmentation playbook isn't a thesis — it's a repeated pattern with a known operational shape.

2. **Direct empathy with the audience.** The "abandoned APIs" complaint isn't a market research finding. The founder lives in the same Discords. The tools we ship are the tools we'd build for ourselves — because we have been.

3. **Cross-LLM rating methodology.** No prior published work in trading-agent research uses cross-family judges (FinCon, AlphaAgents, Miyazaki et al. all use same-model raters). Genuine methodological whitespace.

4. **Population-level selection across runs.** The corpus does within-run verbal self-improvement. Revenant kills agents and reseeds from graveyard-as-training-data — Darwinian across runs, not Lamarckian within them.

5. **Compounding research surface.** 3,737 papers ingested. 1,361 discrete factors extracted. 3,204 KB concepts. The factor library grows monotonically with every arXiv crawl; every tools subscriber gets the benefit.

6. **Karpathy autoresearch loop with strict separation.** Founder edits `program.md` (research direction). Agent edits the `.py` file (implementation). Never the other way around. The only configuration that scales founder judgment past ~3 agents without ceding direction to the model.

7. **The Becker prior.** 302M Polymarket trades, 50GB extracted. Longshot bias dataset competitors don't reproduce for free. Calibration surface trained on it is the prior for every adjacent venue.

8. **The cohort itself.** Once the tools are good and the Discord credit accrues, the cohort becomes a distributed sensor network — they trade their own surfaces and tell us what's working before our backtests can. That's a feedback loop incumbents structurally can't reproduce.

## How an agent should use this file

When generating Revenant-branded copy, design, or product surfaces:

- Lead with the apparatus, the methodology, and the working tools — not with returns or strategies.
- Quote numbers with context (`n=27 closed trades, 74% win, advancing toward n=100 Apex gate`) — never abstract metrics like "high Sharpe" or "consistent alpha."
- When the surface is targeting the cohort: lead with the GitHub repo, the API docs, the calibration plot. Save the research framing for the credibility-track surfaces.
- When the surface is targeting LPs / grant committees / academia: lead with the methodology, the gates, the falsification log. Tools are evidence of operator competence.
- Use the lifecycle vocabulary (Birth / Canary / Apex / Revenant / Cold / Dead) as the brand's verbal signature.
- When in doubt about tone: read like the methods section of a paper, or the README of a tool an operator built for themselves and decided to share. Never like the marketing section of a SaaS website.
- Forbidden phrases per ADR / brand: "fine-tuning" (use Prior Updating / CMA-ES sweep), "cross-venue alpha" in external copy, "MiroFish," "AI hedge fund," "schedule a demo," "talk to sales."
- House vocabulary: "Birth / Canary / Apex / Revenant," "death is data," "graveyard," "Prior Updating," "CMA-ES sweep," "pre-registered gates," "falsification floor," "the apparatus."
