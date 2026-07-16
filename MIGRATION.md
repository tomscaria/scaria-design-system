# Migration to 2.0.0

Two renames land in `2.0.0`. **Both are backward-compatible for the theme runtime** —
existing markup keeps working — but the package name change requires a dependency update.

## 1. Package renamed

`@tomscaria/scaria-design-system` → **`@tomscaria/consumer-fintech-design-system`**

Update every import specifier and your `package.json` dependency:

```diff
- "@tomscaria/scaria-design-system": "^1.3.0"
+ "@tomscaria/consumer-fintech-design-system": "^2.0.0"
```
```diff
- import preset from '@tomscaria/scaria-design-system/preset';
+ import preset from '@tomscaria/consumer-fintech-design-system/preset';
```
```diff
- @import '@tomscaria/scaria-design-system/styles';
+ @import '@tomscaria/consumer-fintech-design-system/styles';
```

The GitHub repository URL is unchanged (`github.com/tomscaria/scaria-design-system`);
only the npm package name changed.

## 2. Themes renamed — `lore` → `earth`, `rolr` → `arcade`

| Old | New |
|---|---|
| `data-theme="lore-light"` | `data-theme="earth-light"` |
| `data-theme="lore-dark"` | `data-theme="earth-dark"` |
| `data-theme="rolr-light"` | `data-theme="arcade-light"` |
| `data-theme="rolr-dark"` | `data-theme="arcade-dark"` |

Subpath exports moved the same way (`/themes/lore-light` → `/themes/earth-light`, etc.).
`revenant-*`, `primitive*`, and `kiosk` are unchanged.

### Backward-compat (why nothing breaks immediately)

The old `data-theme="lore-light"` / `lore-dark"` values are shipped as **deprecated
aliases** that resolve to the renamed tokens, so a live product that still emits
`data-theme="lore-light"` (e.g. `prysm-squads-mvp`) renders correctly on `2.0.0`
without any change. These aliases will be **removed in a future major** — migrate your
markup to `earth-*` when convenient. `rolr-*` had no runtime consumer and is renamed
outright to `arcade-*` (no alias).

## Recommended steps for a consumer

1. Bump the dependency to `@tomscaria/consumer-fintech-design-system@^2.0.0`.
2. Update import specifiers (`/preset`, `/styles`, `/themes/*`).
3. Optionally swap `data-theme="lore-*"` → `data-theme="earth-*"` in markup (not required yet — aliases cover it).
