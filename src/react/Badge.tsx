import { forwardRef, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import type { BadgeTone } from '../types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic tone:
   * - `live`   — accent orange, "active in production"
   * - `canary` — warn, "rolling out"
   * - `shadow` — muted, "running but not consuming"
   * - `apex`   — success, "top-tier / qualified"
   */
  tone?: BadgeTone;
}

/**
 * Small uppercase pill for status. Used heavily in tables and panel headers.
 * Default (no tone) is the neutral outline style.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone, className, ...rest }, ref) => (
    <span
      ref={ref}
      className={clsx('badge', tone, className)}
      {...rest}
    />
  ),
);
Badge.displayName = 'Badge';
