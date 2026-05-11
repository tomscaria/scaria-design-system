import { FC } from 'react';

interface IEthereum {
    size?: string | number;
}

const Ethereum: FC<IEthereum> = ({ size = 16, ...rest }) => (
    <svg
        width={size}
        height={size}
        viewBox="0, 0, 24, 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
    >
        <path
            d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
            fill="#F3F1FD"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 15.4371L16 18.4876L21 15.4368L16 7.2L11 15.4371ZM11 17.5333L16 24.7448L21 17.5333L16 20.521L11 17.5333Z"
            fill="#764EDD"
        />
        <path
            d="M16 30C8.26801 30 2 23.732 2 16H-2C-2 25.9411 6.05887 34 16 34V30ZM30 16C30 23.732 23.732 30 16 30V34C25.9411 34 34 25.9411 34 16H30ZM16 2C23.732 2 30 8.26801 30 16H34C34 6.05887 25.9411 -2 16 -2V2ZM16 -2C6.05887 -2 -2 6.05887 -2 16H2C2 8.26801 8.26801 2 16 2V-2Z"
            fill="white"
        />
    </svg>
);

export default Ethereum;
