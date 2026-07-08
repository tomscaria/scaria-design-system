---
"@tomscaria/scaria-design-system": patch
---

fix(preset): ship the Tailwind preset as `preset.cjs`

`preset.js` used CommonJS (`module.exports`) while the package is `"type": "module"`, so Node parsed it as ESM and both exported entry points threw — `require('.../preset'|'.../tailwind')` raised `module is not defined in ES module scope`, and `import preset from '.../tailwind'` had no default export. This blocked every Tailwind consumer at `tailwind.config` load. Renaming to `preset.cjs` (and repointing the `./preset` / `./tailwind` exports) makes both `require()` and `import`-default work.
