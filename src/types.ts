/**
 * Shared type unions for the Lore design system.
 * These mirror the `data-theme` attribute values and the CSS modifier classes
 * exposed by the kit stylesheets — keeping them in sync is the contract
 * between this React layer and the underlying CSS.
 */

export type Theme =
  | 'lore-light'
  | 'lore-dark'
  | 'revenant-light'
  | 'revenant-dark'
  | 'kiosk'
  | 'primitive'
  | 'primitive-dark';

export type ButtonVariant = 'accent' | 'primary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type BadgeTone = 'live' | 'canary' | 'shadow' | 'apex';

export type LogTag = 'info' | 'ok' | 'warn' | 'signal';

export type StatDelta = 'pos' | 'neg' | 'neutral';
