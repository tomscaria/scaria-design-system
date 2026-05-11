import React, { FC } from 'react';

interface IChevronLeft {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const ChevronLeft: FC<IChevronLeft> = ({
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
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

export default ChevronLeft;
