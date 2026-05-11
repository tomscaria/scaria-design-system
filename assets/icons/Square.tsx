import React, { FC } from 'react';

interface ISquare {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const Square: FC<ISquare> = ({
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
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    </svg>
);

export default Square;
