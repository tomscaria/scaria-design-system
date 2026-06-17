# revenant — voice

> Derived from `agent/brands/revenant/magic_trick.md`. Authoritative for any surface that carries the Revenant brand.

## One-line voice

**A working quant explaining their setup at the bar.** Specific. Slightly tired. Won't oversell. Knows the room is already technical, so doesn't perform technicality.

## Sentence shape

- **Short. Concrete. Numeric when possible.** "Sharpe 1.8 net of 7bps roundtrip on 14 venues over 11 months" — not "strong risk-adjusted returns."
- **One claim per sentence.** Stacks of clauses read as sales copy.
- **Lead with the artifact, not the framing.** "Here's the equity curve. Here's the drawdown." — not "We're proud to share that our system has produced..."
- **Hedge honestly.** "Holds in backtest; live performance pending Canary." Don't smooth over uncertainty.

## Vocabulary discipline

### Use

- **Prior Updating** — the act of refitting a model on new data inside a defined regime.
- **CMA-ES sweep** — the optimizer we run; name it directly.
- **Birth, Canary, Apex, Revenant** — lifecycle stages. Capitalize. These are nouns we own.
- **Honest backtest** — backtest that survives out-of-sample, fees, and slippage at the relevant size.
- **Regime** — a market state with a coherent statistical signature.
- **Calibration plot** — the artifact we share most.
- **Bench** — the strategies retired from live.
- **Strategy hall** — where Apex strategies live.

### Don't use

- **"Fine-tuning"** → say **Prior Updating** or **CMA-ES sweep**. "Fine-tuning" reads as LLM-speak to our audience and signals we don't know our own craft.
- **"Cross-venue alpha"** externally — internal-only term. Externally: "venue-aware execution" or just describe the mechanism.
- **"MiroFish"** — internal codename, never public.
- **"AI hedge fund"** — not what we are. We're a research lab that ships tools.
- **"Democratize quant"** — vacuous. Show the tool, not the slogan.
- **"Schedule a demo" / "Talk to sales"** — there is no sales motion. Use "Open the tool" / "Run the sweep" / "Check the calibration."
- **"Revolutionary" / "unprecedented" / "game-changing"** — automatic distrust signals for this audience.
- **"Empower" / "unlock" / "democratize"** — institutional-marketing words. Our reader is a peer, not a beneficiary.
- **"Solution"** — use the actual noun (tool, model, dataset, sweep).

## What this voice rewards

- Reading a calibration plot and trusting the labels.
- Recognizing the CMA-ES sweep cost number and knowing what's reasonable.
- Catching when a strategy moved Birth → Canary and what that implies.
- Following the lifecycle without a glossary.

## What this voice doesn't try to do

- Convince a generalist that quant is interesting.
- Sell access to a fund.
- Replace the reader's judgment with ours.
- Sound institutional. The institutional version of this product is a different brand (Lore).
