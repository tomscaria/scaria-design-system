# Migration patch — `tomscaria/lore-institutional`

> 🟡 **Out of MCP scope.** Patch written for the user to apply locally. This is the **marketing-expression Lore consumer** for LP / capital-allocator audiences.

## Prereqs

- `@tomscaria/scaria-design-system@^0.1.0` published
- Local checkout at `~/scaria/lore-institutional/`
- Flora harvest decision made (lift vs. replace — see `harvest-instructions/lore-institutional.md`)
- Branch: `claude/unify-lore-components-0GPeV`

## Migration strategy

`lore-institutional` is a marketing surface — the migration should land it on `data-expression="marketing"` (heavier type, more section padding, longer entry motion).

If Flora is **lifted** into the kit: the migration removes Flora from `lore-institutional` and pulls it from `agent/components/marketing/flora/`. If Flora is **replaced**: this PR removes Flora and rebuilds the affected surfaces using kit primitives.

## Patch

### 1. `package.json`

```diff
 {
   "dependencies": {
+    "@tomscaria/scaria-design-system": "^0.1.0",
   }
 }
```

### 2. Tailwind config

```ts
import preset from "@tomscaria/scaria-design-system/preset";
export default { presets: [preset] };
```

### 3. Root styles

```css
@import '@tomscaria/scaria-design-system/styles';
```

### 4. `<html>` defaults — Lore + MARKETING expression

```html
<html data-theme="lore-light" data-expression="marketing">
```

Per-surface override is possible — if a route is a product-shaped surface (admin dashboard), set `data-expression="product"` on that route's layout.

### 5. Voice + verbal layer

Use Lore's verbal layer. Lean on `agent/brands/lore/verbal/messaging.md` for institutional-tone section (formal, citation-heavy, numbers backed by chain artifacts).

### 6. Smoke test

- [ ] Marketing expression engages: larger type, more section padding, longer entry motion
- [ ] Lime accent appears once per viewport max
- [ ] Lock Serif loads at display sizes
- [ ] No "Web3" / "DeFi" / "crypto fund" appearing in copy
- [ ] Onchain transparency claims paired with verifiable artifacts

## Risks

- **Flora coupling.** Choose lift vs replace before starting.
- **Type scale shift.** Marketing expression has bigger type than product. Some sections may need layout tweaks.
- **Out of MCP scope.** Documentation-only patch.
