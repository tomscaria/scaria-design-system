import React, { FC } from 'react';

interface IDeposit {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const Deposit: FC<IDeposit> = ({
    color = 'currentColor',
    size = 16,
    strokeWidth = 2.25,
    ...rest
}) => (
    <svg
        width={size}
        height={size}
        stroke={color}
        strokeWidth={strokeWidth}
        viewBox="0, 0, 24, 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
            stroke="#6D6982"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M5.5 9L8 11L10.5 9"
            stroke="#6D6982"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <circle cx="8" cy="3.75" r="2.5" stroke="#6D6982" stroke-width="1.5" />
    </svg>
);

export default Deposit;
