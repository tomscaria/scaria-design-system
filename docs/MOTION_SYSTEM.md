# Motion System — Lore

> Extracted from `lore_brand_motion.figma.md` §5–§8

---

## 1. Motion purpose gate

Every motion element **must** satisfy at least one:

| Purpose | Definition | Example |
|---|---|---|
| **Orientation** | Where am I in the story? | Snap-Step scroll locks |
| **Proof** | Show product behavior | Chart line drawing in |
| **Delight** | Subtle polish | Floating hero card drift |

If a motion element satisfies **none** → remove it.

---

## 2. Motion primitives (exhaustive list)

Only these six primitives are approved. Do not invent new ones.

### 2.1 Float (ambient)

Subtle vertical drift or parallax on hero objects. Page feels alive without demanding attention.

```tsx
<motion.div
  animate={{ y: [0, -8, 0] }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <HeroCard />
</motion.div>
```

### 2.2 Snap-Step (scroll)

Scroll locks briefly at key beats. Each snap = one idea. Scene animates, then releases.

```tsx
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.6 }}
  transition={{ duration: 0.6 }}
>
  {/* One idea per snap */}
</motion.section>
```

### 2.3 Reveal (entry)

Fade in + slight rise (8–16px) + optional blur-to-sharp. Establishes hierarchy and pacing.

```tsx
<motion.div
  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true }}
  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  {children}
</motion.div>
```

### 2.4 Trace (data)

Chart lines draw in, numbers count up, skeleton → real data. Provides credibility and proof.

```tsx
{/* SVG path draw-in */}
<motion.path
  d={chartPath}
  initial={{ pathLength: 0 }}
  whileInView={{ pathLength: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  stroke="hsl(var(--lime))"
  strokeWidth={2}
  fill="none"
/>

{/* Number count-up */}
<motion.span
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  onViewportEnter={() => animateCount(0, 42_000_000)}
>
  {formattedValue}
</motion.span>
```

### 2.5 Magnet (CTA)

Subtle magnetic pull on hover/touch. Firm press feedback. Interaction confidence.

```tsx
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="bg-primary text-primary-foreground"
>
  Get started
</motion.button>
```

### 2.6 Glow Pulse (accent)

Soft lime glow on active cards, selected tabs, primary CTA. Never continuous everywhere.

```tsx
<motion.div
  animate={{
    boxShadow: [
      "0 0 0px hsl(var(--lime) / 0)",
      "0 0 20px hsl(var(--lime) / 0.15)",
      "0 0 0px hsl(var(--lime) / 0)",
    ],
  }}
  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  className="bg-card border border-border rounded-lg"
>
  {children}
</motion.div>
```

---

## 3. Timing constants

### Durations

| Category | Range | Default | Usage |
|---|---|---|---|
| Micro (hover, press) | 120–180ms | `0.15s` | Button hover, tab switch |
| Entry (reveal) | 300–450ms | `0.4s` | Scroll-triggered fade-in |
| Scene (transition) | 500–700ms | `0.6s` | Stage tab change, snap-step |

### Easing

| Name | Value | Usage |
|---|---|---|
| Spring (default) | `{ type: "spring", stiffness: 400, damping: 25 }` | Interactions, CTA |
| Spring (soft) | `{ type: "spring", stiffness: 260, damping: 20 }` | Float, ambient |
| Ease out | `[0.25, 0.46, 0.45, 0.94]` | Reveal entries |
| Linear | `"linear"` | Never use as primary easing |

### Rules

- **Spring-based** easing preferred. Fast settle, no long or slow easings.
- **One focal animation per section.** If two elements compete → remove the weaker one.
- Stagger children by `0.08–0.12s` max.

```tsx
// Stagger container
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## 4. Motion budget (hard limits)

Per page maximums — if exceeded, reduce motion starting with decorative elements.

| Primitive | Max per page |
|---|---|
| Float (ambient) | **2 areas** |
| Snap-Step (scroll scenes) | **3 scenes** |
| Glow Pulse (active elements) | **3 active at once** |
| Trace (chart animations) | **2 charts** |
| Magnet (CTA) | Unlimited (micro-interaction) |
| Reveal (entry) | Unlimited (passive, non-competing) |

### Reduction priority

When over budget, remove in this order:

1. Decorative Float → reduce to 1
2. Extra Glow Pulse → limit to primary CTA only
3. Additional Snap-Steps → merge scenes
4. Trace → static chart fallback

---

## 5. Viewport & scroll rules

| Rule | Value |
|---|---|
| `viewport.once` | `true` (default — animate once) |
| `viewport.amount` | `0.3` for tall sections, `0.6` for compact |
| Scroll direction | Vertical only. No horizontal scroll sections. |
| Reduced motion | Respect `prefers-reduced-motion`. Disable Float, Glow Pulse, Trace. Keep Reveal as instant opacity. |

### Reduced motion helper

```tsx
import { useReducedMotion } from "framer-motion";

function RevealWrapper({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: shouldReduce ? 0 : 0.4 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 6. Anti-patterns (explicitly wrong)

| ❌ Don't | ✅ Do instead |
|---|---|
| Continuous spinning loaders as decoration | Static or skeleton states |
| Parallax on every section | Float in hero only (max 2 areas) |
| Bounce easing | Spring with fast damping |
| Slow (>700ms) transitions | Keep under 700ms |
| Multiple competing focal animations | One focal animation per section |
| Glow on every card simultaneously | Glow on active/selected card only |
| Animation on scroll-up (re-triggering) | `viewport.once: true` |
