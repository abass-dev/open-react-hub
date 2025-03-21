import React, { useState } from 'react';
import { OpenReactHubIconsProps } from '../types';

/**
 * The ORH icon component.
 *
 * This component renders the ORH logo as an SVG. It supports hover effects and
 * can be styled using the `className` prop.
 *
 * @example
 * <OrhIcon size={40} className="text-blue-500" />
 *
 * @param {object} props Component props
 * @param {number} [props.size=24] The size of the icon
 * @param {string} [props.className] The CSS class name to apply to the icon
 */
export const OrhIcon: React.FC<OpenReactHubIconsProps> = ({ size = 24, className, ...props }) => {
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
            viewBox="0 0 500 500"
            className={`transition-colors duration-200 ${isHovered ? 'text-gray-100' : 'currentColor'} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)">
                <path
                    fill="currentColor"
                    d="M2442 4869 c-459 -44 -934 -246 -1297 -552 -741 -624 -1028 -1649 -720 -2572 202 -605 638 -1102 1210 -1380 320 -156 613 -230 962 -242 l173 -6 2 254 3 254 107 7 c305 19 532 75 773 193 216 105 363 213 532 388 262 273 433 620 495 1002 17 105 16 456 -1 560 -78 485 -338 916 -727 1208 -301 226 -652 347 -1081 374 l-103 6 0 259 0 258 -122 -1 c-68 -1 -160 -5 -206 -10z
          m328 -713 l0 -203 -132 -6 c-241 -11 -430 -60 -626 -162 -385 -201 -649 -541 -750 -969 -24 -101 -27 -130 -27 -316 0 -223 9 -290 66 -462 194 -595 758 -996 1401 -998 l67 0 3 158 3 157 125 6 c135 7 182 16 304 55 154 49 294 134 420 254 310 295 427 722 310 1135 -108 380 -412 677 -800 781 -71 19 -135 28 -229 33 l-130 6 0 160 0 160 130 -1 c208 -2 373 -44 580 -145 418 -204 715 -603 797 -1069 17 -97 16 -383 -1 -480 -51 -286 -186 -551 -389 -762 -189 -196 -407 -327 -662 -398 -116 -32 -245 -50 -357 -50 l-103 0 0 -200 0 -200 -105 0 c-275 0 -531 59 -782 180 -1006 484 -1368 1718 -781 2664 262 423 702 732 1189 837 130 28 211 36 357 38 l122 1 0 -204z m0 -831 l0 -105 88 0 c429 0 772 -396 713 -823 -51 -362 -361 -637 -720 -637 l-81 0 0 -101 0 -102 -117 6 c-65 3 -147 12 -183 21 -540 130 -853 690 -676 1208 46 134 107 237 200 336 190 201 410 299 679 301 l97 1 0 -105z"
                />
            </g>
        </svg>
    );
};
