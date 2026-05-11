import React, { FC } from 'react';

interface IMoreHorizontal {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const MoreHorizontal: FC<IMoreHorizontal> = ({
    color = 'currentColor',
    size = 16,
    strokeWidth = 2,
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
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
);

export default MoreHorizontal;
