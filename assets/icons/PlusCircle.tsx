import React, { FC } from 'react';

interface IPlusCircle {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const PlusCircle: FC<IPlusCircle> = ({
    color = 'currentColor',
    size = 16,
    strokeWidth = 2.25,
    ...rest
}) => (
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
);

export default PlusCircle;
