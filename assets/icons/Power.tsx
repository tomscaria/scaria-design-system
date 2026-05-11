import React, { FC } from 'react';

interface IPower {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const Power: FC<IPower> = ({ color = 'currentColor', size = 16, strokeWidth = 2.25, ...rest }) => (
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
        className="feather feather-power"
    >
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
        <line x1="12" y1="2" x2="12" y2="12"></line>
    </svg>
);

export default Power;
