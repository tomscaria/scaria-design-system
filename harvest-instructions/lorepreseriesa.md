# Harvest from `tomscaria/lorepreseriesa` (was `lore-teaser-prea`)

> Status: ✅ **unblocked.** The repo is in MCP scope and a local checkout exists at `~/scaria/lorepreseriesa/`. Harvest can run any time.

## What to harvest

Per the plan: **motion system + Playground rule set.** This is the marketing-expression motion vocabulary that defines how Lore-branded landing surfaces feel.

## Inspection commands

```sh
# Find motion-related files
find ~/scaria/lorepreseriesa -type f \( -name "*motion*" -o -name "framer-*" \) | grep -v node_modules

# Find Playground / scene files
find ~/scaria/lorepreseriesa -type d -iname "playground*"
find ~/scaria/lorepreseriesa/src -name "*Scene*" -o -name "*scene*"

# Inspect motion-related code
grep -rln "framer-motion" ~/scaria/lorepreseriesa/src
grep -rln "MotionConfig\|AnimatePresence\|useScroll" ~/scaria/lorepreseriesa/src
```

## Lift targets and destinations

| Source path (lorepreseriesa) | Destination (this kit) | Notes |
|---|---|---|
| `src/components/visuals/*.tsx` | `agent/visual/artifacts/web/*.tsx` | Motion-heavy hero/section components |
| Framer Motion variants files (TBD) | `agent/visual/motion/variants/*.ts` | Reusable motion config |
| Playground / scene files (TBD) | `agent/playground/` | Rule set for marketing-expression motion |
| Any custom CSS scroll-driven animations | `agent/visual/motion/scroll.css` | Append-only to motion.css if scroll-driven anims exist |

## Post-harvest

1. Confirm the motion durations + curves in lifted files match `agent/visual/motion/motion.json`. If they differ, reconcile (likely the lorepreseriesa values are the canonical lived-experience values; update motion.json to match).
2. Refactor any hard-coded colors to CSS vars.
3. Update `agent/visual/motion/_README.md` with the new artifact paths.
4. Bump minor version + add changeset.

## Bidirectional dependency

`lorepreseriesa` is **also a consumer** of this kit (post-publish). After the motion harvest, the migration patch in `consumer-patches/lorepreseriesa.md` updates the repo to consume the kit instead of carrying motion in-tree.
