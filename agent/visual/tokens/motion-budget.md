# Motion budget

> Strict per-page maximums. If you exceed budget, reduce — don't compound. Source: `agent/visual/motion/motion.json`.

## Budget table

| Primitive | Max per page | Rationale |
|---|---|---|
| Float (ambient) | **2 areas** | More than 2 floating things competes for attention |
| Snap-Step (scroll scenes) | **3 scenes** | Each snap = one idea; more scenes = unfocused argument |
| Glow Pulse (active elements) | **3 active at once** | More than 3 pulses reads as Christmas tree |
| Trace (chart animations) | **2 charts** | Chart trace is heavy; reading multiple animating charts is hard |
| Magnet (CTA hover/tap) | unlimited | Micro-interaction; no compounding cost |
| Reveal (entry fade-up) | unlimited | Passive, non-competing |

## Reduction order

When you're over budget, remove in this order:

1. **Decorative Float** → reduce to 1
2. **Extra Glow Pulse** → limit to primary CTA only
3. **Additional Snap-Steps** → merge scenes
4. **Trace** → static chart fallback

## Per-theme motion durations

| Theme | `--motion-duration-entry` |
|---|---|
| earth-light, earth-dark (product) | 200ms |
| earth-light, earth-dark (marketing) | 600ms |
| primitive | 300ms |
| kiosk | 200ms (terse, no flourish) |

Themes can override duration but not budget. Budget is a system-wide rule.

## Reduced motion

Respect `prefers-reduced-motion: reduce`:

- Disable: Float, Glow Pulse, Trace
- Keep: Reveal (as instant opacity), Magnet (as instant transform)

Already handled in `agent/visual/motion/motion.css`.

## Anti-patterns

- Continuous spinning loaders as decoration → use static or skeleton
- Parallax on every section → Float in hero only
- Bounce easing → use spring with fast damping
- Slow (>700ms) transitions → keep under 700ms
- Multiple competing focal animations in one section → pick one
- Animation re-trigger on scroll-up → `viewport.once: true`
