import React, { FC } from 'react';

interface ILock {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const Lock: FC<ILock> = ({ color = 'currentColor', size = 16, strokeWidth = 2.25, ...rest }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
    >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

export default Lock;
