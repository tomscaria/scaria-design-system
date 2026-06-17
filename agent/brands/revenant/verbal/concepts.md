# revenant — concepts

> Named ideas the brand owns. Capitalize on first reference per surface. These are not glossary entries — they are the spine of the product. Use them as nouns, not as decoration.

## Lifecycle stages

### Birth
A strategy enters Birth when a model has been fit to a defined regime and the CMA-ES sweep has produced a candidate parameter set. Birth is a hypothesis, not a position. Lives in the research repo, not the trading venue.

**Usage:** "Born on Tuesday's regime classifier. Sweep cost: $14."

### Canary
The strategy is paper-traded live with venue-accurate fees and slippage at the size we'd run it. Canary is the first time the strategy meets reality. Typically runs 2–8 weeks depending on regime velocity.

**Usage:** "Moved to Canary on June 4. Calibration holding within 1.2σ of backtest."

### Apex
The Canary cleared its calibration bar and graduates to live capital. Apex strategies appear in the public **Strategy Hall**. Live calibration plots track Apex strategies in near-real-time on rswarm.ai.

**Usage:** "Apex as of last week. Two weeks of live data on the dashboard."

### Revenant
An Apex strategy retired from live trading but kept resurrectable. A Revenant strategy is on the Bench but its parameters, sweep history, and regime definition are preserved. If the regime re-emerges, the Revenant can be Re-Canaried.

**Usage:** "Retired to Revenant in Q1; regime came back this month, Re-Canaried it Monday."

The lifecycle vocabulary is the **single most important brand asset**. It must appear unmodified across product UI, marketing pages, research notes, Discord, and code identifiers.

## Operating concepts

### Prior Updating
The act of refitting a model on new in-regime data while preserving the prior structure. The right term for what people sloppily call "fine-tuning." When a Canary's calibration drifts, the question is whether Prior Updating restores it or whether the regime changed.

### CMA-ES sweep
The optimizer we run for parameter search. Always name it explicitly. The sweep cost (dollars to run, not just compute time) is a published number per strategy.

### Regime
A market state with a coherent statistical signature. Strategies are defined per regime, not in the abstract. A strategy that performs across regimes is suspicious until proven; usually it's an artifact of the backtest period.

### Calibration plot
The primary artifact. Shows realized vs. expected distributions for the strategy's key signal over time. Updated in near-real-time for Apex strategies, end-of-day for Canary, daily snapshot for the dashboard.

### Honest backtest
A backtest that includes venue-accurate fees, slippage at the relevant size, and full out-of-sample validation. Distinguished from a casual backtest by these three line items being shown explicitly.

### Bench
Where strategies retire to. Lower than Revenant — a Bench strategy is not preserved for re-promotion. A strategy moves to Bench when its underlying regime has demonstrably collapsed or the edge has degraded past tolerance. Bench is public.

### Strategy Hall
The public list of Apex strategies. Each entry shows lifecycle origin date, current calibration, fees model, and venue list.

### Sweep cost
The dollar cost of running one CMA-ES sweep. Published per strategy. Quant readers care about this; institutional readers don't. That asymmetry is a brand signal.

## Concept usage rules

- **First reference per surface: capitalize.** Subsequent references: lowercase is fine.
- **Don't gloss them.** The reader who needs CMA-ES defined is not in our audience.
- **Don't translate them for press.** If a journalist asks for plain-English versions, give them an artifact (calibration plot) and let the artifact do the explaining.
- **Don't soften them.** "Bench" sounds harsh. That's the point. Strategy retirement is honest, not a euphemism.
- **Don't add new lifecycle stages without founder sign-off.** The four-stage lifecycle is the spine.
