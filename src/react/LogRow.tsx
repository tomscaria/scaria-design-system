import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import type { LogTag } from '../types';

export interface LogRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Timestamp (rendered in mono, fixed-width column). */
  timestamp: ReactNode;
  /** Tag label (FILL, EXIT, WARN, etc.). */
  tag: ReactNode;
  /** Tag semantic color. */
  tone?: LogTag;
  /** Free-form message body. Wrap highlighted spans in <span className="hl"> for accent. */
  message: ReactNode;
}

/**
 * One row of a live tape / event log. Three columns: timestamp · tag · message.
 * Designed to stack densely inside a Panel.
 */
export const LogRow = forwardRef<HTMLDivElement, LogRowProps>(
  ({ timestamp, tag, tone, message, className, ...rest }, ref) => (
    <div ref={ref} className={clsx('log-row', className)} {...rest}>
      <span className="log-ts">{timestamp}</span>
      <span className={clsx('log-tag', tone)}>{tag}</span>
      <span className="log-msg">{message}</span>
    </div>
  ),
);
LogRow.displayName = 'LogRow';
