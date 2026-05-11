import React, { FC } from 'react';

interface IPlus {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const Plus: FC<IPlus> = ({ color = 'currentColor', size = 16, strokeWidth = 3, ...rest }) => (
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
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export default Plus;
