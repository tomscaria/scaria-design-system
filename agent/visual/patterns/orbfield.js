/* ============================================================
   orbfield.js — mount the "OrbField" hover-reveal constellation
   ------------------------------------------------------------
   Vanilla, no deps. ESM export + a window global fallback so it
   works in a <script type="module"> or a plain <script>.

   Pairs with ./orbfield.css. This module only LAYS OUT the orbs
   (seeded scatter + depth blur + cascade delays) and injects the
   glyph markup; all theming/animation lives in the CSS via tokens.

   Usage (module):
     import { mountOrbField } from './orbfield.js';
     mountOrbField(document.querySelector('.orbfield'), {
       glyphSet: 'ledger',
       spritePath: '/assets/ledger-glyphs.svg',
       glyphs: ['lg-01','lg-02','lg-03', ...],   // sprite symbol ids
       links:  ['/markets/btc','/markets/eth', ...],
       count: 18,
     });

   Usage (logos):
     mountOrbField(el, {
       glyphSet: 'logos',
       glyphs: ['/logos/btc.svg','/logos/eth.svg', ...],  // <img> srcs
       links:  ['/markets/btc', ...],
     });

   Usage (no module — global):
     <script src="./orbfield.js"></script>
     <script>window.mountOrbField(el, {...});</script>
   ============================================================ */

/* ── mulberry32 — tiny deterministic PRNG ──
   Seeded so the scatter is STABLE across reloads. Returns a
   function yielding floats in [0, 1). */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Linear map of x in [inMin,inMax] → [outMin,outMax]. */
function lerpMap(x, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  const t = (x - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

/**
 * Scatter `count` orb-links into `el`.
 *
 * @param {HTMLElement} el  the .orbfield container (sized by you)
 * @param {Object} opts
 * @param {'ledger'|'logos'} [opts.glyphSet='ledger']
 * @param {number}   [opts.count=18]      number of orbs to place
 * @param {string[]} [opts.glyphs=[]]     sprite ids (ledger) OR img srcs (logos)
 * @param {string[]} [opts.links=[]]      hrefs, one per orb (cycled if short)
 * @param {string}   [opts.spritePath]    sprite url for the ledger <use href>
 * @param {[number,number]} [opts.blurRange=[5,40]]  max blur px for smallest..pre-clamped
 * @param {number}   [opts.cascade=240]   total cascade window (ms) across all orbs
 * @param {number}   [opts.seed=1337]     PRNG seed (stable layout)
 * @param {[number,number]} [opts.sizeRange=[28,64]] orb px size (min..max)
 * @returns {HTMLElement} el
 */
function mountOrbField(el, opts) {
  if (!el) throw new Error('mountOrbField: target element is required');
  opts = opts || {};

  const glyphSet  = opts.glyphSet || 'ledger';
  const count     = opts.count != null ? opts.count : 18;
  const glyphs    = Array.isArray(opts.glyphs) ? opts.glyphs : [];
  const links     = Array.isArray(opts.links) ? opts.links : [];
  const spritePath = opts.spritePath || '';
  const blurRange = opts.blurRange || [5, 40];
  const cascade   = opts.cascade != null ? opts.cascade : 240;
  const seed      = opts.seed != null ? opts.seed : 1337;
  const sizeRange = opts.sizeRange || [28, 64];

  const [sizeMin, sizeMax] = sizeRange;
  const [blurMin, blurMax] = blurRange;

  const rand = mulberry32(seed);

  // Clear any prior mount (idempotent re-mount).
  el.replaceChildren();

  // Track placed centers (in %) so we can avoid heavy overlap.
  const placed = []; // { x, y, r } where r is a %-ish radius proxy
  const MARGIN = 6;          // keep orbs off the very edges (%)
  const SPAN   = 100 - MARGIN * 2;
  const MAX_TRIES = 24;      // rejection-sampling attempts per orb

  const frag = document.createDocumentFragment();
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const XLINK_NS = 'http://www.w3.org/1999/xlink';

  for (let i = 0; i < count; i++) {
    // Depth: a 0..1 factor. Bigger orbs = "closer" = sharper.
    const depth = rand();                       // 0 (far/small/blurry) → 1 (near/big/sharp)
    const size  = Math.round(lerpMap(depth, 0, 1, sizeMin, sizeMax));
    // Smaller = blurrier: invert depth for blur.
    const blur  = +lerpMap(depth, 0, 1, blurMax, blurMin).toFixed(2);

    // The orb's footprint as a rough % of the field (assume ~square-ish field).
    // Used only for overlap rejection — does not need to be exact.
    const rPct = lerpMap(size, sizeMin, sizeMax, 4, 9);

    // Seeded scatter with light overlap rejection.
    let x = 0, y = 0, ok = false;
    for (let t = 0; t < MAX_TRIES; t++) {
      x = MARGIN + rand() * SPAN;
      y = MARGIN + rand() * SPAN;
      ok = true;
      for (let p = 0; p < placed.length; p++) {
        const dx = x - placed[p].x;
        const dy = y - placed[p].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // require centers be at least the sum of radii * a slack factor apart
        if (dist < (rPct + placed[p].r) * 0.85) { ok = false; break; }
      }
      if (ok) break;
    }
    placed.push({ x, y, r: rPct });

    // Staggered cascade delay + a little jitter so it doesn't feel mechanical.
    const baseDelay = (i * cascade) / Math.max(1, count);
    const jitter    = (rand() - 0.5) * (cascade / Math.max(1, count)) * 0.6;
    const delay     = Math.max(0, Math.round(baseDelay + jitter));

    // ── build the orb link ──
    const a = document.createElement('a');
    a.className = 'orb';
    a.href = links.length ? links[i % links.length] : '#';

    // Inline positioning + per-orb custom props the CSS consumes.
    a.style.left = x.toFixed(3) + '%';
    a.style.top = y.toFixed(3) + '%';
    a.style.width = size + 'px';
    a.style.height = size + 'px';
    // Center the orb on its (x, y) point.
    a.style.marginLeft = -(size / 2) + 'px';
    a.style.marginTop = -(size / 2) + 'px';
    a.style.setProperty('--orb-blur', blur + 'px');
    a.style.setProperty('--orb-delay', delay + 'ms');

    // Glyph content.
    const glyph = glyphs.length ? glyphs[i % glyphs.length] : '';
    const label = String(glyph).replace(/^.*[/#]/, '').replace(/\.[a-z0-9]+$/i, '');

    if (glyphSet === 'logos') {
      const img = document.createElement('img');
      img.src = glyph;
      img.loading = 'lazy';
      img.alt = label || 'logo';
      a.setAttribute('aria-label', label || 'logo');
      a.appendChild(img);
    } else {
      // 'ledger' — inject an SVG that <use>s the sprite symbol.
      const svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-hidden', 'true');
      const use = document.createElementNS(SVG_NS, 'use');
      const ref = (spritePath || '') + '#' + glyph;
      use.setAttribute('href', ref);
      // Legacy fallback for older renderers that only honor xlink:href.
      use.setAttributeNS(XLINK_NS, 'xlink:href', ref);
      svg.appendChild(use);
      a.appendChild(svg);
      a.setAttribute('aria-label', label || 'glyph');
    }

    frag.appendChild(a);
  }

  el.appendChild(frag);
  return el;
}

/* ── exports ── ESM named export + window global fallback. */
export { mountOrbField };
export default mountOrbField;

if (typeof window !== 'undefined') {
  window.mountOrbField = mountOrbField;
}
