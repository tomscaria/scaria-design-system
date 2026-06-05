# Token specimens

> Per the Little Plains "HTML Brand" framework, every token lives here as its own introspectable specimen — a self-contained doc an agent can read in isolation to understand one concept (the type scale, the motion system, etc.) without having to parse all of `colors_and_type.css`.

## Status

To be populated. Each file is small (≤ 50 lines) and answers one question.

## Specimens to author

| File | Question it answers |
|---|---|
| `type-scale.md` | What sizes / line heights / weights exist, and where does each apply? |
| `color-roles.md` | What each semantic color token (`--bg`, `--fg`, `--brand`, `--accent`, `--line`, `--success`, etc.) means and where it's allowed |
| `spacing-rhythm.md` | The two spacing systems: primitive (`--sp-4..--sp-128`) and rhythm (`--sp-section-y`, `--sp-stack-*`) |
| `radii.md` | The radii scale and what each step is for (input vs card vs modal vs pill) |
| `shadow-elevation.md` | The shadow ramp and the elevation mental model |
| `font-pairing.md` | When to reach for display, sans, mono — and why |
| `accent-usage.md` | The strict accent-usage rules (where the brand color is allowed, where it's banned) |

## Why per-token specimens, not one big file

When an agent (or human) is generating a single component — say a Button — they only need to know the color roles and the accent rules. They don't need the full type scale. Per-specimen docs let the agent retrieve just the slice that's relevant.

The full doc still lives in `colors_and_type.css` (machine-canonical) and `readme.md` (human overview). Specimens are *facets* of those.
