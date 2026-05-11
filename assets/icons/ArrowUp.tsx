import React, { FC } from 'react';

interface IArrowUp {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const ArrowUp: FC<IArrowUp> = ({ color = 'currentColor', size = 16, strokeWidth = 3, ...rest }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0, 0, 24, 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
    >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
    </svg>
);

export default ArrowUp;
