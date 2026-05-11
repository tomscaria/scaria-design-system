import React, { FC } from 'react';

interface IChevronRight {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const ChevronRight: FC<IChevronRight> = ({
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
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

export default ChevronRight;
