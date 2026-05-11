import React, { FC } from 'react';

interface IArrowsUpDown {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
    css?: any;
}
const ArrowsUpDown: FC<IArrowsUpDown> = ({
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
        <path d="M1.5 4.3L4.3 1.5M4.3 1.5L7.1 4.3M4.3 1.5V12.7M8.90002 11.7L11.7 14.5M11.7 14.5L14.5 11.7M11.7 14.5L11.7 3.3" />
    </svg>
);

export default ArrowsUpDown;
