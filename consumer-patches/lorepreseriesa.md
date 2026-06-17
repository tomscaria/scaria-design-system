# Migration patch — `tomscaria/lorepreseriesa`

> Vite SPA, standalone Tailwind config, single `src/index.css`. Currently runs a dark-themed Lore palette inlined into `index.css`.

## Prereqs

- `@tomscaria/lore-design-system@^0.1.0` published or `pnpm link --global`'d
- Local checkout at `~/scaria/lorepreseriesa/`
- Branch: `claude/unify-lore-components-0GPeV` (per session policy)
- Motion harvest from this repo into the kit has happened (`harvest-instructions/lorepreseriesa.md`) — otherwise the kit's motion vocabulary may not match what `lorepreseriesa` lives with today

## Patch

### 1. `package.json`

Add the dep. Remove `tailwindcss-animate` only if the kit's motion utilities cover the same surface (likely yes; verify on smoke test).

```diff
 {
   "dependencies": {
+    "@tomscaria/lore-design-system": "^0.1.0",
     "react": "^18.3.1",
     ...
   },
   "devDependencies": {
     "tailwindcss": "^3.4.17",
-    "tailwindcss-animate": "^1.0.7",
     "@tailwindcss/typography": "^0.5.16",
     ...
   }
 }
```

### 2. `tailwind.config.ts`

Replace the entire `theme.extend.colors` block (it duplicates what the kit's preset provides). Keep custom non-kit additions (typography plugin config, content paths).

```ts
import type { Config } from "tailwindcss";
import preset from "@tomscaria/lore-design-system/preset";

export default {
  presets: [preset],
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
```

### 3. `src/index.css`

Replace the inlined `:root` token block with the kit's styles. Keep the Inter font import (or move to `agent/visual/fonts/_README.md` harvest list).

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import '@tomscaria/lore-design-system/styles';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Set `data-theme` + `data-expression` on `<html>`

`lorepreseriesa` is a teaser/marketing surface. Default it to lore-light + marketing.

```html
<!-- index.html -->
<html lang="en" data-theme="lore-light" data-expression="marketing">
```

If a "dark mode" toggle exists today, repoint it to flip `data-theme` between `lore-light` and `lore-dark` instead of `class="dark"`.

### 5. Lockfile

```sh
cd ~/scaria/lorepreseriesa
pnpm install
```

`lorepreseriesa` has both `bun.lock` AND `package-lock.json` AND `bun.lockb` in the current state — pick the canonical lockfile and remove the others before regen.

### 6. Smoke test

- [ ] Build: `pnpm build` (or `bun run build`) — should complete without DS-related errors
- [ ] Dev: `pnpm dev` — open localhost, the hero loads with lime CTA, parchment surface, graphite type
- [ ] Visual regression: compare deployed Vercel preview against current production
- [ ] Toggle `data-theme="lore-dark"` in dev
- [ ] Confirm `tailwindcss-animate` removal didn't break any animations

### 7. Commit + push

```sh
git checkout -b claude/unify-lore-components-0GPeV
git add -A
git commit -m "feat: migrate to @tomscaria/lore-design-system"
git push -u origin claude/unify-lore-components-0GPeV
```

Open as **draft PR** until the kit is actually published. After publish, mark ready-for-review.

## Risks

- **Motion divergence.** If the motion harvest from `lorepreseriesa` into the kit hasn't happened yet, motion characteristics may shift.
- **Vercel build env.** Confirm Vercel can resolve `@tomscaria/lore-design-system` from the public npm registry.
- **Bun lockfile.** The repo has multiple lockfiles. Canonicalize on one.
