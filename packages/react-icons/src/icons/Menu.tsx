import React from 'react';
import { OpenReactHubIconsProps } from '../types';

/**
 * A horizontal menu icon.
 *
 * @example
 * import { MenuIcon } from '@open-react-hub/react-icons';
 *
 * <MenuIcon />
 *
 * @param {Object} props
 * @prop {number} [size=24] - The size of the icon.
 * @prop {string} [color='currentColor'] - The color of the icon.
 * @prop {number} [strokeWidth=2] - The stroke width of the icon.
 */
export const MenuIcon: React.FC<OpenReactHubIconsProps> = ({
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    ...props
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

