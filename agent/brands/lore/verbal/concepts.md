# Concepts — Lore's vocabulary

> Internal vocabulary so agents and humans use the same words consistently. Many of these are house terms; treat as authoritative.

## Core product terms

- **LTP (Liquid Tokenized Portfolio)** — Lore's product wrapper. Bundles multiple onchain assets (and increasingly tokenized equities, cash, etc.) into a single Portfolio Token holders can mint, redeem, and trade. Liquid = redeemable in real time, not gated by manager NAV cycles.
- **Portfolio Token** — the ERC-20 (or equivalent) that represents a holder's share of an LTP.
- **Basis / Cash legs** — the two-sided composition of an LTP. Basis is the productive side (assets); Cash is the reserve side. Ratios are part of the LTP methodology.
- **Methodology** — the rule set governing what an LTP holds, in what weights, rebalanced when. Public, versioned, on-chain.
- **Rebalance** — periodic adjustment of holdings to match methodology weights. Monthly cadence default.
- **NAV (Net Asset Value)** — per-token value of the LTP. Published continuously on-chain, not end-of-day.
- **Mint / Redeem** — primary creation and destruction of Portfolio Tokens. Mint = deposit basis assets, get Portfolio Tokens; Redeem = burn Portfolio Tokens, withdraw basis.

## Distribution terms

- **Distribution partner (or partner)** — a fintech, broker, or wallet that whitelabels Lore. They own the surface; we run the rail.
- **Whitelabel** — partner's brand on the user-visible surface; Lore infrastructure underneath.
- **Wealth tab** — the embedded invest/savings surface inside a partner's product. The thing Lore enables.
- **SDK** — the technical packet a partner integrates to ship a wealth tab. JS, mobile.

## Settlement / infra terms

- **Onchain settlement** — funds move on-chain at the moment of transaction, no T+2 wait.
- **MPC custody** — multi-party computation wallet for asset custody. Private keys are sharded across parties; no single point of compromise.
- **Settlement chain** — the blockchain a particular LTP settles on. Currently Solana primary; EVM coming.
- **Verifiable** — the onchain provenance can be independently audited by anyone with a chain explorer. Use this word when describing on-chain transparency.

## Tone terms (how we describe ourselves)

- **Portfolio infrastructure** (not "investment platform")
- **Wealth infrastructure** (when broader than just portfolios)
- **Embedded** (the modifier; we are embedded finance for portfolios)
- **Onchain** (one word, lowercase; the rail)

## Tone terms (how we describe outcomes)

- "Verifiable in real time" — for transparency claims
- "Rebalanced monthly across [N] asset classes" — for diversification claims
- "Zero custody risk" / "Zero counterparty risk" — for custody claims (with footnote naming MPC)
- "Onchain-native" — for built-on-blockchain claims

## Words to avoid

See `voice.md` banned list. Specifically for this concept domain:

- "Web3" — implementation detail, not positioning
- "Crypto fund" — wrong category (we're an embedded portfolio platform)
- "DeFi" — we touch DeFi but aren't selling to the DeFi audience
- "Tokenized fund" — too generic; we're specifically *Liquid* Tokenized Portfolios
