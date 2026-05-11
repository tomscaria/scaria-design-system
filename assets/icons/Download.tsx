import React, { FC } from 'react';

interface IDownload {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const Download: FC<IDownload> = ({
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

export default Download;
