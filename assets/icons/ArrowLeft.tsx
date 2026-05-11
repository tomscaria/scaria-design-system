import { FC } from 'react';

interface IArrowLeft {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
    className?: string;
}
const ArrowLeft: FC<IArrowLeft> = ({
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
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

export default ArrowLeft;
