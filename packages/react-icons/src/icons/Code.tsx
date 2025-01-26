import React from 'react';
import { OpenReactHubIconsProps } from '../types';

/**
 * React functional component representing a code icon.
 * @example
 * import { CodeIcon } from '@open-react-hub/react-icons';
 * <CodeIcon size={32} color="blue" />
 * This component renders an SVG that visually represents code
 * with arrow-like elements pointing in opposite directions.
 * 
 * Props:
 * - size: number (default: 24) - Specifies the width and height of the icon.
 * - color: string (default: 'currentColor') - Specifies the stroke color of the icon.
 * - strokeWidth: number (default: 2) - Specifies the width of the strokes in the icon.
 * - ...props: any - Other props passed to the SVG element.
 */

export const CodeIcon: React.FC<OpenReactHubIconsProps> = ({
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
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);