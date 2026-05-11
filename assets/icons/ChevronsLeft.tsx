import React, { FC } from 'react';

interface IChevronsLeft {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const ChevronsLeft: FC<IChevronsLeft> = ({
    color = 'currentColor',
    size = 16,
    strokeWidth = 3,
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
        <polyline points="11 17 6 12 11 7" />
        <polyline points="18 17 13 12 18 7" />
    </svg>
);

export default ChevronsLeft;
