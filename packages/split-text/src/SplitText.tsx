'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSprings, animated, SpringValue, SpringConfig } from '@react-spring/web';

export interface SplitTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    text: string;
    delay?: number;
}

export function SplitText({ text, className = '', delay = 0, ...props }: SplitTextProps): React.ReactElement | null {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const [letterWidths, setLetterWidths] = useState<number[]>([]);

    useEffect(() => {
        setIsMounted(true);
        if (containerRef.current) {
            const spans = containerRef.current.children;
            const widths = Array.from(spans).map((span) => span.getBoundingClientRect().width);
            setLetterWidths(widths);
        }
    }, [text]);

    const springs = useSprings(
        text.length,
        text.split('').map((_, index) => ({
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0px)' },
            delay: delay + index * 30,
            config: { tension: 300, friction: 10 } as SpringConfig,
        }))
    );

    if (!isMounted) {
        return null;
    }

    return (
        <span ref={containerRef} className={`inline-block ${className}`} aria-label={text} {...props}>
            {springs.map((spring: { opacity: SpringValue<number>; transform: SpringValue<string> }, index) => (
                <animated.span
                    key={index}
                    style={{
                        ...spring,
                        display: 'inline-block',
                        width: letterWidths[index] || 'auto',
                    }}
                >
                    {text[index] === ' ' ? '\u00A0' : text[index]}
                </animated.span>
            ))}
        </span>
    );
}

