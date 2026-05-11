import React, { FC, ReactNode } from 'react';

interface IIcon {
    color?: string;
    size?: string | number;
    viewBoxSize?: string | number;
    fill?: string;
    strokeWidth?: number;
    children?: ReactNode;
}
const Icon: FC<IIcon> = ({
    color = 'currentColor',
    size = 16,
    viewBoxSize = 24,
    fill = 'none',
    strokeWidth = 2.25,
    children,
    ...rest
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`0, 0, ${viewBoxSize}, ${viewBoxSize}`}
        fill={fill}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
    >
        {children}
    </svg>
);

export default Icon;
