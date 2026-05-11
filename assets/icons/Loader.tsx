import React, { FC } from 'react';

interface ILoader {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
}
const Loader: FC<ILoader> = ({ color = 'currentColor', size = 16, strokeWidth = 50, ...rest }) => {
    const _uniqueId = Math.random().toString(36).slice(8);

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 243 242"
            color={color}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                d="M25.0052 121C25.0052 95.5392 35.1194 71.1212 53.1229 53.1177C71.1264 35.1143 95.5444 25 121.005 25C146.466 25 170.884 35.1143 188.887 53.1177C206.891 71.1212 217.005 95.5392 217.005 121"
                stroke={`url(#${`linearGradient0_${_uniqueId}`})`}
                strokeWidth={strokeWidth}
            />
            <path
                d="M217.005 121C217.005 146.461 206.891 170.879 188.887 188.882C170.884 206.886 146.466 217 121.005 217C95.5444 217 71.1264 206.886 53.1229 188.882C35.1194 170.879 25.0052 146.461 25.0052 121"
                stroke={`url(#${`linearGradient1_${_uniqueId}`})`}
                strokeWidth={strokeWidth}
            />
            <defs>
                <linearGradient
                    id={`linearGradient0_${_uniqueId}`}
                    x1="25.0052"
                    y1="25"
                    x2="217.005"
                    y2="25"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopOpacity="0" stopColor={color} />
                    <stop offset="1" stopOpacity="0.5" stopColor={color} />
                </linearGradient>
                <linearGradient
                    id={`linearGradient1_${_uniqueId}`}
                    x1="25.0052"
                    y1="121"
                    x2="217.005"
                    y2="121"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor={color} />
                    <stop offset="1" stopOpacity="0.5" stopColor={color} />
                </linearGradient>
            </defs>

            <animateTransform
                from="0 0 0"
                to="360 0 0"
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1300ms"
            />
        </svg>
    );
};

export default Loader;
