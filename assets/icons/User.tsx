import React, { FC } from 'react';

interface IUser {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const User: FC<IUser> = ({ color = 'currentColor', size = 16, strokeWidth = 2.25, ...rest }) => (
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
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export default User;
