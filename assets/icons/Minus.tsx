import React, { FC } from 'react';

interface IMinus {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const Minus: FC<IMinus> = ({ color = 'currentColor', size = 16, strokeWidth = 2.25, ...rest }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 8 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.33333 1H6.66667"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        />
    </svg>
);

export default Minus;
