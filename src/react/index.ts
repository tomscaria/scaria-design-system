/**
 * Lore design system — React component layer.
 *
 * Thin wrappers over the kit CSS classes (see preview/_revenant-kit.css and
 * preview/_primitives.css). Each component emits a className; the CSS does
 * all the visual work.
 *
 * Usage:
 *   import { Panel, Button, StatStrip, StatCell, Badge, LogRow, SysHeader, LiveDot } from '@tomscaria/lore-design-system';
 *   import '@tomscaria/lore-design-system/css';     // tokens + theme blocks
 *   import '@tomscaria/lore-design-system/css/kit'; // component classes
 *
 *   <body data-theme="revenant-dark">
 *     <SysHeader wordmark="LORE® REVENANT" status={<LiveDot />} />
 *     <Panel>
 *       <PanelHeader title="Latest Decision" trailing="LIVE" />
 *       <PanelBody>...</PanelBody>
 *     </Panel>
 *   </body>
 */

export { Panel, PanelHeader, PanelBody } from './Panel';
export type { PanelProps, PanelHeaderProps } from './Panel';

export { Button } from './Button';
export type { ButtonProps } from './Button';

export { StatStrip, StatCell } from './StatStrip';
export type { StatStripProps, StatCellProps } from './StatStrip';

export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { LogRow } from './LogRow';
export type { LogRowProps } from './LogRow';

export { SysHeader, LiveDot } from './SysHeader';
export type { SysHeaderProps } from './SysHeader';
