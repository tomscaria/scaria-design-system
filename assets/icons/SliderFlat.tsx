import React, { FC } from 'react';

interface ISliderFlat {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const SliderFlat: FC<ISliderFlat> = ({
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
        <path d="M1.99999 5H6.66666" />
        <path d="M9.33333 5H14" />
        <path d="M2 11H8" />
        <path d="M10.6667 11H14" />
        <path d="M6.66666 3V7" />
        <path d="M10.6667 9V13" />
    </svg>
);

export default SliderFlat;
