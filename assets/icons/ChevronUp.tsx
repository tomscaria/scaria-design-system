import { FC } from 'react';

interface IChevronUp {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
    className?: string;
}
const ChevronUp: FC<IChevronUp> = ({
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
        <polyline points="18 15 12 9 6 15" />
    </svg>
);

export default ChevronUp;
