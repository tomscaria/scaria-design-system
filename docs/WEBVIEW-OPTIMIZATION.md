# Lore WebView Optimization Spec

Standard spec for any Lore mini-app that needs to open cleanly inside:
- X in-app browser
- Telegram in-app browser
- WebView containers
- Wallet browsers (Phantom, Solflare, etc.)

**Goal**: fast, readable, thumb-friendly, zero friction.

---

## 1. Layout & Responsiveness

- Mobile-first only (no desktop complexity)
- Max width: 480px
- Centered column layout
- 16px minimum horizontal padding
- Large tap targets (minimum 44px height)
- Sticky bottom primary CTA button
- Avoid hover states entirely
- No dropdowns requiring hover
- No complex sidebars
- No multi-column layouts

## 2. Performance & Load

- No heavy animations
- No autoplay video
- No large background images
- No parallax
- Minimal JS
- Fast first paint (<1.5s perceived load)
- Skeleton loader instead of spinner
- Disable excessive shadow effects

## 3. Typography & Readability

- Font: Inter (fallback system-ui)
- Base font size: 16px
- Headings: 20–24px
- Line height: 1.4–1.6
- High contrast (dark background, light text)
- Avoid tiny secondary labels
- Avoid dense tables

## 4. UI Structure

Structure every page like this:

### Compact Header
- Logo left
- Optional simple action right
- No nav menus

### Hero Section
- Clear 1-sentence value prop
- Supporting 1-line explanation
- Primary CTA button

### Core Content Blocks
- Card-based layout
- Each card max 4–6 lines of text
- Simple icons or emoji ok
- No nested accordions

### Sticky Bottom Action Bar
- Single dominant CTA
- Full width
- High contrast
- Safe area padding (iOS)

## 5. WebView Safety Constraints

- Avoid popups
- Avoid external redirects unless explicit
- Avoid new tabs
- Use same-window navigation
- Detect WebView and hide unnecessary browser UI
- Add safe-area padding for iOS bottom bars

## 6. Forms & Inputs

- Single column forms
- Autofocus first field
- Use native input types (email, number, etc.)
- No multi-step wizard unless absolutely required
- Primary action button always visible

## 7. Dark Mode Default

- Dark background (#0B0B0C)
- Card background (#141416)
- Accent color minimal
- Avoid gradients that break compression in WebView

## 8. Interaction Philosophy

- One main action per screen
- Avoid decision overload
- Remove secondary CTAs unless critical
- Keep scroll depth short

## 9. Optional: Lore Product Page Add-On

When building a Lore product page in WebView mode:
- Portfolio price block with large readable numbers
- Clear mint / buy CTA
- Simple explanation (3 bullet points max)
- Proof-of-reserve badge
- No deep technical diagrams in WebView mode

---

## Tailoring

Specify the screen type (LTP page, Invest tab, Acquihire deck, etc.) to get a production-ready implementation specific to that flow.
