# Migration patch — `refractor-labs/prysm-squads-mvp`

> Turborepo monorepo. Existing internal DS at `packages/design-system-vite`. Primary consumer is `packages/lore-webapp`. This is the **highest-stakes** consumer (Signal Labs sale target).

## Prereqs

- `@tomscaria/lore-design-system@^0.1.0` published or `pnpm link --global`'d
- Local checkout at `~/scaria/prysm-squads-mvp/`
- Branch: `claude/unify-lore-components-0GPeV`
- **Pattern harvest** from `packages/design-system-vite` into the kit has happened (`harvest-instructions/prysm-squads-mvp.md`)

## Migration strategy: dual-DS during transition

Don't rip out `packages/design-system-vite` in one PR. Run dual-DS:

1. **Phase A** — Add `@tomscaria/lore-design-system` alongside the internal DS. `lore-webapp` imports from BOTH during transition.
2. **Phase B** — Per-component migration: as each kit component matches an internal DS component, switch the import. Track in `packages/lore-webapp/MIGRATION.md`.
3. **Phase C** — Once `lore-webapp` has zero internal-DS imports, mark `packages/design-system-vite` deprecated.

This patch covers **Phase A** only. Phases B and C are per-component PRs that follow.

## Patch (Phase A)

### 1. Add dep to the consuming apps

```diff
 // packages/lore-webapp/package.json
 {
   "dependencies": {
+    "@tomscaria/lore-design-system": "^0.1.0",
     "@refractor-labs/design-system-vite": "workspace:*",
     ...
   }
 }
```

### 2. Update Tailwind config for `lore-webapp`

```ts
// packages/lore-webapp/tailwind.config.ts (or .js)
import type { Config } from "tailwindcss";
import preset from "@tomscaria/lore-design-system/preset";

export default {
  presets: [preset],
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  prefix: "",
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
```

### 3. Import root styles in `lore-webapp`

```css
/* packages/lore-webapp/src/styles/globals.css */
@import '@tomscaria/lore-design-system/styles';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Keep the existing @layer base block UNTIL Phase B completes — internal DS
   components still depend on the old CSS var names. The kit's vars are
   additive at this stage. */
```

### 4. Set `data-theme` + `data-expression`

For App Router (`app/layout.tsx`):

```tsx
<html lang="en" data-theme="lore-light" data-expression="product">
```

Set to `lore-dark` if that's the current canonical theme for the Prysm experience.

### 5. Lockfile

```sh
cd ~/scaria/prysm-squads-mvp
pnpm install
```

### 6. Smoke test

- [ ] `turbo build` — full monorepo build clean
- [ ] `turbo build --filter=lore-webapp`
- [ ] `turbo test`
- [ ] `turbo dev --filter=lore-webapp` — key surfaces render
- [ ] Visual diff against current staging
- [ ] CI: pre-existing `pr.yaml` failure — see plan risks

### 7. Commit + push

```sh
git checkout -b claude/unify-lore-components-0GPeV
git add -A
git commit -m "feat: Phase A — add @tomscaria/lore-design-system to lore-webapp"
git push -u origin claude/unify-lore-components-0GPeV
```

Open as **draft PR** until kit is published.

## Risks

- **CSS var name collisions** between internal DS (`--background`) and kit (`--bg`). Audit before Phase A merge.
- **CVA divergence.** Do the pattern harvest before starting Phase B.
- **Pre-existing CI failure.** Get the failure log and fix, OR make the failing job non-blocking.
- **Bundle size regression** — verify post-migration.

## Phase B planning

1. **Button** — straight swap
2. **Card / Surface primitives** — kit needs these added first
3. **Form primitives** — kit needs these added first
4. **Domain components** — reskin in place
5. **Charts** — defer until Thomas OS harvest completes
