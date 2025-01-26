import React, { useState } from 'react';
import { OpenReactHubIconsProps } from '../types';
import { iconTracker } from '../tracker';

const WebUtilityX: React.FC<OpenReactHubIconsProps> = ({ size = 24, className, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 300 300"
            className={`transition-colors duration-200 ${isHovered ? 'text-gray-100' : 'currentColor'} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <defs>
                <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#333333", stopOpacity: "1" }} />
                    <stop offset="100%" style={{ stopColor: "#000000", stopOpacity: "1" }} />
                </linearGradient>
                <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#cccccc", stopOpacity: "0.4" }} />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <rect width="300" height="300" rx="40" fill="url(#backgroundGradient)" />

            <g transform="translate(150,150) scale(0.6)">
                <path d="M0,-100 L30,-90 L50,-50 L90,-30 L100,0 L90,30 L50,50 L30,90 L0,100 L-30,90 L-50,50 L-90,30 L-100,0 L-90,-30 L-50,-50 L-30,-90 Z"
                    fill="url(#gearGradient)"
                    filter="url(#glow)" />
                <circle cx="0" cy="0" r="40" fill="#000000" />

                <path d="M-60,-20 L-40,20 L-20,-10 L0,20 L20,-10 L40,20 L60,-20"
                    fill="none"
                    stroke="white"
                    fontWeight="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)" />
            </g>

            <text x="150" y="260"
                fontFamily="Arial, sans-serif"
                fontSize="28"
                fontWeight="bold"
                textAnchor="middle"
                fill="white"
                filter="url(#glow)">
                WebUtilityX
            </text>
        </svg>
    );
};

export const WebUtilityXIcon = iconTracker.createTrackedIcon(WebUtilityX, 'WebUtilityXIcon');

