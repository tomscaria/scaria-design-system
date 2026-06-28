// Flora asset manifest — the Revenant hard-pass scope (image-only: no video/audio).
// Prompts interpolate brand-token placeholders {{style}} {{register}} {{material}} {{label}} {{accent}}
// so the SAME manifest re-skins for any brand (ROLR) by swapping the token file.
// model ids per the Flora /models catalogue. NBP = t2i-gemini-3-pro (rich + correct in-prompt text);
// Recraft Vector = editable SVG; Ideogram Character = consistent character set.

const HERO = "t2i-gemini-3-pro";
const VECTOR = "t2i-recraft-v4-1-vector-t2i";
const CHAR = "is2i-ideogram-character";

export const manifest = [
  // ── hero plates (rich, marketing + form bases) ─────────────────────────────
  { id: "exploded-apparatus", category: "hero", model: HERO, params: { aspect_ratio: "3:4", resolution: "2K" },
    prompt: "Orthographic exploded technical illustration of a stacked autonomous trading-agent module, three-quarter view. Eight thin circuit-board layers separated vertically with fine leader lines and numbered mono labels 01 sensor suite, 02 signal processor, 03 decision core, 04 policy module, 05 routing interface, 06 telemetry bus, 07 power watchdog, 08 chassis housing. {{material}}. {{style}}. {{register}}. Each number 01–08 appears exactly once, in order." },
  { id: "lifecycle-orbit", category: "hero", model: HERO, params: { aspect_ratio: "1:1", resolution: "2K" },
    prompt: "A precision instrument dial visualising an agent lifecycle as orbital data-states: BIRTH at top, OPERATION at centre, TERMINATION at bottom. Concentric engraved rings, a degree graticule 00/45/90/135/180/225/270/315, a dashed transition path, small checkpoint and termination marks. {{style}}. {{register}}." },
  { id: "full-system", category: "hero", model: HERO, params: { aspect_ratio: "4:3", resolution: "2K" },
    prompt: "A full cross-section schematic of a multi-agent trading apparatus drawn as a mechanical organism: a sensor array feeding a compression chamber, a ring of agent chambers, a central allocator pump distributing capital, progressive exit-relief valves, and a feedback calibration loop. Labelled subsystems with tolerances. {{style}}. {{register}}." },
  { id: "population-wall", category: "hero", model: HERO, params: { aspect_ratio: "4:3", resolution: "2K" },
    prompt: "A telemetry wall: a dense regular grid of agent status cells — most filled 'active', some marked terminated, a few 'init' — with engraved column readouts, uptime and latency figures and tolerances down the side. {{style}}." },

  // ── editable vectors (diagrams that must stay crisp / themeable) ────────────
  { id: "apparatus-schematic", category: "vector", model: VECTOR, params: {},
    prompt: "Clean technical vector schematic of an autonomous trading apparatus, flat precise line art, labelled subsystems and connectors, an ISO title block. {{style}}." },
  { id: "orbit-vector", category: "vector", model: VECTOR, params: {},
    prompt: "Clean vector lifecycle orbital diagram: concentric rings, BIRTH OPERATION TERMINATION states, a degree tick ring, a dashed transition path. Flat precise line art. {{style}}." },

  // ── lifecycle characters (austere 'specimen' entities, NOT mascots) ─────────
  { id: "char-birth", category: "character", model: CHAR, params: {},
    prompt: "A single austere specimen illustration representing the trading-agent lifecycle stage BIRTH, rendered as a labelled technical artifact / instrument plate — a freshly-initialised module, cool and dormant. Not a cartoon, not a face. A small datum label reads BIRTH. {{style}}." },
  { id: "char-canary", category: "character", model: CHAR, params: {},
    prompt: "A single austere specimen illustration representing the lifecycle stage CANARY — a module under field test, partially energised, one warning indicator lit. Technical artifact plate, not a mascot. Datum label CANARY. {{style}}." },
  { id: "char-apex", category: "character", model: CHAR, params: {},
    prompt: "A single austere specimen illustration representing the lifecycle stage APEX — a fully-proven module at peak operation, the single accent fully lit. Technical artifact plate, not a mascot. Datum label APEX. {{style}}." },
  { id: "char-revenant", category: "character", model: CHAR, params: {},
    prompt: "A single austere specimen illustration representing the lifecycle stage REVENANT — a terminated module returned as archived data, marked and filed, dignified not gory. Technical artifact plate, not a mascot. Datum label REVENANT. {{style}}." },

  // ── logo / wordmark / mark ──────────────────────────────────────────────────
  { id: "wordmark", category: "logo", model: VECTOR, params: {},
    prompt: "A minimal vector wordmark logotype reading {{label}}, technical and monospace-influenced, tight tracking, an underscored datum baseline. {{style}}. Single accent only." },
  { id: "mark-3d", category: "logo", model: HERO, params: { aspect_ratio: "1:1", resolution: "2K" },
    prompt: "A studio 3D render of a small machined apparatus emblem / maker's mark — a precise geometric instrument badge. {{material}}. {{style}}. A single accent anodised detail." },

  // ── app illustration bases (restrained, for empty/loader/success) ───────────
  { id: "empty-graveyard", category: "app", model: HERO, params: { aspect_ratio: "4:3", resolution: "1K" },
    prompt: "A small restrained empty-state illustration: a quiet archive 'graveyard' of retired agent records as filed index cards in a metal drawer, one card pulled. Minimal, lots of negative space. {{style}}." },
  { id: "loader-orbit", category: "app", model: HERO, params: { aspect_ratio: "1:1", resolution: "1K" },
    prompt: "A small minimal loader motif: a single thin orbital ring with one traveling node and a centre datum, lots of negative space, centred. {{style}}." },
  { id: "success-apex", category: "app", model: HERO, params: { aspect_ratio: "1:1", resolution: "1K" },
    prompt: "A small minimal success motif: an agent reaching APEX shown as a clean checkmark drawn as a datum-target triangle inside a ring. Minimal, centred. {{style}}." },

  // ── social / OG ─────────────────────────────────────────────────────────────
  { id: "og-apparatus", category: "og", model: HERO, params: { aspect_ratio: "16:9", resolution: "2K" },
    prompt: "A wide social/OG hero of the apparatus exploded module on the left and clear negative space on the right for a title. {{style}}. {{register}}." },
];
