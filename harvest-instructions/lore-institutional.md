# Harvest from `tomscaria/lore-institutional`

> Status: 🟡 **blocked on access.** `lore-institutional` is not in current MCP scope. The plan notes "Flora framework confirmed YES" per founder, so this harvest is intended.

## What to harvest

Per the plan: **Flora framework.** This is the institutional-side marketing/motion layer. Treat as the restart point for marketing-expression surfaces targeting LPs / capital allocators.

## Decision: lift vs. replace

The plan offers two options:

- **Lift** — pull Flora into `agent/components/marketing/flora/` as a first-class subsystem
- **Replace** — let Flora die; rebuild the marketing artifact in `agent/visual/artifacts/web/` from scratch

Founder direction needed at lift time. Defaults:
- If Flora is mostly motion + scene composition: **lift** into `agent/components/marketing/flora/`
- If Flora is mostly content + layout that's tightly coupled to specific copy: **replace** with the new artifact pattern

## Inspection commands (when access is granted)

```sh
find ~/scaria/lore-institutional -type d -iname "flora*"
find ~/scaria/lore-institutional/src -name "*Flora*"
grep -rln "Flora" ~/scaria/lore-institutional/src 2>/dev/null
grep -E '("react-three|@react-three|three|gsap|lottie")' ~/scaria/lore-institutional/package.json
```

## Lift targets (if lifting)

| Source path | Destination | Notes |
|---|---|---|
| Flora root component | `agent/components/marketing/flora/flora.tsx` | Plus spec + tokens manifest |
| Flora scenes | `agent/components/marketing/flora/scenes/*.tsx` | |
| Flora variants / motion configs | `agent/visual/motion/variants/flora.ts` | Reconcile with motion.json |

## Anti-patterns

- ❌ Lifting Flora without the diff audit against `lore-institutional` HEAD
- ❌ Lifting Flora as a black box that consumers can only render but not customize
- ❌ Lifting without writing the spec — agents can't introspect what Flora does without it
