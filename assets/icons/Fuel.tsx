import { FC } from 'react';

interface IFuel {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
    className?: string;
}

const Fuel: FC<IFuel> = ({
    color = 'currentColor',
    size = 16,
    strokeWidth = 1.5,
    className,
    ...rest
}) => (
    <svg
        width={size}
        height={size}
        stroke={color}
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...rest}
    >
        <path d="M9.83334 14.6668V2.66683C9.83334 2.31321 9.69286 1.97407 9.44281 1.72402C9.19277 1.47397 8.85363 1.3335 8.50001 1.3335H4.50001C4.14638 1.3335 3.80724 1.47397 3.5572 1.72402C3.30715 1.97407 3.16667 2.31321 3.16667 2.66683V14.6668M9.83333 8.66683H11.1667C11.5203 8.66683 11.8594 8.80731 12.1095 9.05735C12.3595 9.3074 12.5 9.64654 12.5 10.0002V11.3335C12.5 11.6871 12.6405 12.0263 12.8905 12.2763C13.1406 12.5264 13.4797 12.6668 13.8333 12.6668C14.187 12.6668 14.5261 12.5264 14.7761 12.2763C15.0262 12.0263 15.1667 11.6871 15.1667 11.3335V6.5535C15.1668 6.37755 15.1321 6.20333 15.0646 6.04085C14.9971 5.87838 14.8981 5.73087 14.7733 5.60683L12.5 3.3335M3.16667 6H9.83334M2.5 14.6665H10.5" />
    </svg>
);

export default Fuel;
