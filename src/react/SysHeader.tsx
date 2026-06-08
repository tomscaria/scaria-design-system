import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

export interface SysHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Wordmark on the left (e.g. "LORE® REVENANT"). */
  wordmark?: ReactNode;
  /** Optional nav rendered to the right of the wordmark. */
  nav?: ReactNode;
  /** Status row content on the right (live dot, clearance level, CTA). */
  status?: ReactNode;
}

/**
 * Top status bar with wordmark, optional nav, and right-aligned status row.
 * Default `<header>` element. Renders the kit's mono uppercase chrome style.
 */
export const SysHeader = forwardRef<HTMLElement, SysHeaderProps>(
  ({ wordmark, nav, status, className, children, ...rest }, ref) => (
    <header ref={ref} className={clsx('sys-header', className)} {...rest}>
      <div className="left">
        {wordmark != null ? (
          typeof wordmark === 'string' ? (
            <a href="#" className="wordmark">{wordmark}</a>
          ) : (
            wordmark
          )
        ) : null}
        {nav}
      </div>
      {status != null ? <div className="status-row">{status}</div> : null}
      {children}
    </header>
  ),
);
SysHeader.displayName = 'SysHeader';

/** Tiny live indicator (pulsing accent dot). Use inside SysHeader status. */
export const LiveDot = ({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={clsx('dot-live', className)} {...rest} />
);
