# Flora base pipeline

Brand-token-driven generation of the **Layer B** pictorial bases (per `docs/REVENANT_PRIMITIVE_SYSTEM.md`).
Bases are generated **once** and committed under `bases/<brand>/` — shipped pages reference them statically,
never a live API call.

## ROLR-ready by construction
Every prompt in `manifest.mjs` interpolates brand-token placeholders (`{{style}}`, `{{register}}`,
`{{material}}`, `{{label}}`, `{{accent}}`). Re-skinning to another brand = swap the token file. Two paths:

- **`generate <brand>`** — fresh generation with that brand's tokens (full quality).
- **`variant <brand> --from revenant`** — the cheap "tiny tweak" path: i2i-recolours the existing
  Revenant bases into the new brand (new palette / corners / line only, labels preserved). ~$0.05–0.18 each.

The code primitive layer (annotation / frame / data / form) is already token-driven, so it re-skins for **$0**;
this pipeline only handles the raster/3D bases.

## Usage
```sh
export FLORA_API_KEY=$(grep ^FLORA_API_KEY= ~/scaria/swarm-fund-mvp/swarm-fund-mvp/.env | cut -d= -f2-)
node flora-pipeline.mjs generate revenant --only hero --variants 1 --cap 30   # draft a category
node flora-pipeline.mjs generate revenant --variants 3 --cap 80               # full hard pass, 3 picks each
node flora-pipeline.mjs variant  rolr     --from revenant --cap 30            # spin the ROLR variant
```
Resume-safe (cached ids skipped) · spend tracked against `--cap` (USD) · `--dry` to preview the worklist.

## Models (from the Flora /models catalogue)
- `t2i-gemini-3-pro` (Nano Banana Pro) — rich plates with correct in-prompt text.
- `t2i-recraft-v4-1-vector-t2i` — editable SVG vectors (logos, schematics).
- `is2i-ideogram-character` — consistent lifecycle character set.
- `i2i-gemini-3-pro` — the recolour/variant path.

Rate ≈ $0.0009/credit. The rule that governs everything: **a model never owns text that must be exact** —
exact labels/specs come from the code primitive layer, composited over these bases.
