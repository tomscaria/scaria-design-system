---
"@tomscaria/consumer-fintech-design-system": minor
---

Add the OrbField interaction + the BoTW Lore marketing flair layer.

- `./orbfield` (+ `./orbfield.js`) — the theme-agnostic "opaque coins" hover-reveal (Uniswap-style), seeded scatter + cascade, swappable `glyphSet` (ledger | logos). Now part of the global `./styles` bundle, so consumers auto-get it on upgrade.
- `./botw` — opt-in Lore marketing flair overlay scoped under `[data-flair="botw"]`: activation-glow (`.activate` cyan→amber→lime), `.cut-frame` bevels + corner ornaments, `.goldenhour`, `.topo-underlay`, `--motion-spring`/`--motion-snap`.
- `./glyphs/ledger` — 12 original "ledger alphabet" SVG marks (`#lg-01`…`#lg-12`).
