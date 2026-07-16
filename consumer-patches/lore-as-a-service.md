# Migration patch — `refractor-labs/lore-as-a-service`

> ⛔ **Parked per the unification plan.** This patch is written for completeness only. Do not apply unless the parking decision changes.

## Status

Per the plan: `refractor-labs/lore-as-a-service` is parked. The current focus is `prysm-squads-mvp` (Signal Labs sale target) + `lorepreseriesa` (motion harvest + teaser surface).

The `docs/brand/` content in `lore-as-a-service` was already ported into this kit (`agent/brands/lore/verbal/voice.md` etc.). The codebase itself isn't being migrated.

## If the parking decision changes

Same shape as the other Lore consumers:

1. Add dep to `package.json` (the relevant consuming app — likely `packages/api` or whichever has UI surfaces)
2. Tailwind preset import
3. `@import '@tomscaria/consumer-fintech-design-system/styles'` in globals
4. `<html data-theme="earth-light" data-expression="product">` for product surfaces
5. Lockfile regen
6. Smoke test

The repo is in MCP scope, so the patch could be applied directly. But don't, unless the parking decision is reversed by founder direction.
