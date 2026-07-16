# Consumer migration patches

> Per-consumer patches for migrating off ad-hoc DS setups to `@tomscaria/consumer-fintech-design-system`. Apply **after** the package is published to npm (or via a workspace `file:` dependency during local dev).

## Prereqs

1. **`@tomscaria/consumer-fintech-design-system` is published** (or locally linked via `pnpm link --global` / `file:` dep)
2. **Local dev machine** — every consumer's lockfile must be regenerated (`pnpm install` or `npm install`). This step cannot run from a sandbox environment.

## Migration order

| # | Consumer | Repo | MCP scope | Status |
|---|---|---|---|---|
| 1 | `prysm-squads-mvp` | `refractor-labs/prysm-squads-mvp` | ✅ in scope | Signal Labs sale target — highest stakes |
| 2 | `swarm-fund-mvp` | `tomscaria/swarm-fund-mvp` | ❌ out of scope | Consumer of revenant-* themes (pending Phase 0) |
| 3 | `lorepreseriesa` | `tomscaria/lorepreseriesa` | ✅ in scope | Uses marketing expression |
| 4 | `lore-institutional` | `tomscaria/lore-institutional` | ❌ out of scope | Uses marketing expression; possibly via Flora harvest |
| 5 | `lore-as-a-service` | `refractor-labs/lore-as-a-service` | ✅ in scope | **Parked** per plan |

## Common migration shape (every consumer)

1. **Add the dep**:
   ```json
   { "dependencies": { "@tomscaria/consumer-fintech-design-system": "^0.1.0" } }
   ```
2. **Update Tailwind config** to use the preset:
   ```ts
   import preset from "@tomscaria/consumer-fintech-design-system/preset";
   export default { presets: [preset], content: [...] };
   ```
3. **Import root styles** (replaces ad-hoc `@layer base { :root { --bg: ... } }` blocks):
   ```css
   @import "@tomscaria/consumer-fintech-design-system/styles";
   ```
4. **Set `data-theme` (and optionally `data-expression`) on `<html>`**:
   ```tsx
   <html data-theme="earth-light" data-expression="product">
   ```
5. **Remove local shadcn copies** that the kit replaces (only as components ship — currently only `button` is in the kit).
6. **Regenerate lockfile locally** + commit.
7. **Smoke-test** — visual diff on a few representative pages.

## Per-consumer patches

- [`prysm-squads-mvp.md`](./prysm-squads-mvp.md)
- [`swarm-fund-mvp.md`](./swarm-fund-mvp.md) (out of scope — written for the user to apply)
- [`lorepreseriesa.md`](./lorepreseriesa.md)
- [`lore-institutional.md`](./lore-institutional.md) (out of scope)
- [`lore-as-a-service.md`](./lore-as-a-service.md) (parked, written for completeness)

## What's intentionally NOT in these patches

- ❌ Component-level migrations beyond `button` — only ships once each component is in the kit
- ❌ Theme switching at the route level — leave per-app routing logic alone
- ❌ Removing tailwindcss-animate / other Tailwind plugins — let each consumer keep theirs
- ❌ Lockfile updates — regen locally per consumer
