import { forwardRef, type HTMLAttributes, type ReactNode, type CSSProperties } from 'react';
import clsx from 'clsx';
import type { StatDelta } from '../types';

export interface StatStripProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns; renders as grid-template-columns. Default infers from children count. */
  columns?: number;
}

/**
 * Horizontal strip of stat cells separated by hairline rules. The first cell
 * may be marked `accent` to act as the orange brand hero metric.
 */
export const StatStrip = forwardRef<HTMLDivElement, StatStripProps>(
  ({ columns, className, style, children, ...rest }, ref) => {
    const gridStyle: CSSProperties | undefined = columns
      ? { ...style, gridTemplateColumns: `repeat(${columns}, 1fr)` }
      : style;
    return (
      <div
        ref={ref}
        className={clsx('stat-strip', className)}
        style={gridStyle}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
StatStrip.displayName = 'StatStrip';

export interface StatCellProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  /** `pos` (green), `neg` (red), or omit for muted neutral. */
  deltaTone?: StatDelta;
  /** Render as the accent (orange) hero cell. At most ONE per StatStrip. */
  accent?: boolean;
}

export const StatCell = forwardRef<HTMLDivElement, StatCellProps>(
  ({ label, value, delta, deltaTone, accent, className, ...rest }, ref) => {
    const deltaClass = clsx(
      'delta',
      deltaTone === 'pos' && 'pos',
      deltaTone === 'neg' && 'neg',
    );
    return (
      <div
        ref={ref}
        className={clsx('stat-cell', accent && 'accent-cell', className)}
        {...rest}
      >
        <span className="label">{label}</span>
        <span className="value">{value}</span>
        {delta != null ? <span className={deltaClass}>{delta}</span> : null}
      </div>
    );
  },
);
StatCell.displayName = 'StatCell';
