import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ElementType,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import type { ButtonSize, ButtonVariant } from '../types';

type CommonButtonProps = {
  /**
   * Visual hierarchy.
   * - `accent` — exactly ONE per view (Atlas pattern). Solid orange, brand hero.
   * - `primary` — strong outline, second tier.
   * - `outline` — neutral outline, third tier.
   * - `ghost` — text-only, fourth tier.
   * - `danger` — destructive action.
   */
  variant?: ButtonVariant;
  /** Vertical size. Default md (40px tall). */
  size?: ButtonSize;
  /** Optional accent pill (e.g. "FREE", "NEW") rendered to the right of children. */
  pill?: ReactNode;
};

type ButtonAsButton = CommonButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
};
type ButtonAsAnchor = CommonButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const sizeClass: Record<ButtonSize, string | null> = {
  sm: 'btn-sm',
  md: null,
  lg: 'btn-lg',
};

/**
 * Tiered button hierarchy matching the kit CSS. Renders as <button> by default;
 * pass `as="a"` for a link styled as a button (use for CTAs that navigate).
 *
 * Atlas rule: at most ONE `variant="accent"` per view. Everything else tiers
 * down to primary → outline → ghost.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const {
    variant = 'primary',
    size = 'md',
    pill,
    className,
    children,
    as,
    ...rest
  } = props as CommonButtonProps & { as?: ElementType; className?: string; children?: ReactNode };

  const classes = clsx(
    'btn',
    `btn-${variant}`,
    sizeClass[size],
    className,
  );

  const content = (
    <>
      {children}
      {pill != null ? <span className="pill">{pill}</span> : null}
    </>
  );

  if (as === 'a') {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
});
