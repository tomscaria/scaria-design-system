import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Recessed variant uses --bg instead of --bg-2 (lower elevation). */
  recessed?: boolean;
}

/**
 * Container with border, background surface, and shadow. The atomic surface
 * unit of the Revenant kit — wrap a PanelHeader + PanelBody inside.
 */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ recessed, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={clsx('panel', recessed && 'recessed', className)}
      {...rest}
    >
      {children}
    </div>
  ),
);
Panel.displayName = 'Panel';

export interface PanelHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Title text (rendered with .panel-title styling).
   * Note: This overrides the native HTML `title` (tooltip) attribute; use
   * `aria-label` if you need to attach an accessibility label to the header.
   */
  title?: ReactNode;
  /** Trailing element (count chip, status indicator, etc.). */
  trailing?: ReactNode;
}

export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ title, trailing, className, children, ...rest }, ref) => (
    <div ref={ref} className={clsx('panel-header', className)} {...rest}>
      {title != null ? <span className="panel-title">{title}</span> : null}
      {children}
      {trailing != null ? <span>{trailing}</span> : null}
    </div>
  ),
);
PanelHeader.displayName = 'PanelHeader';

export const PanelBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} className={clsx('panel-body', className)} {...rest} />
  ),
);
PanelBody.displayName = 'PanelBody';
