import { FC } from 'react';

interface IChevronDown {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
    className?: string;
}
const ChevronDown: FC<IChevronDown> = ({
    color = 'currentColor',
    size = 16,
    strokeWidth = 3,
    className,
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
        className={className}
        {...rest}
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

export default ChevronDown;
