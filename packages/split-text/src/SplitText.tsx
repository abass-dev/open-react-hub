'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSprings, animated, SpringValue, SpringConfig } from '@react-spring/web';

export interface SplitTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    text: string;
    delay?: number;
    repeat?: number;
    speed?: number;
    easing?: (t: number) => number;
    direction?: 'up' | 'down' | 'left' | 'right';
    pause?: boolean;
    staggerDelay?: number;
    loop?: boolean;
    onComplete?: () => void;
    highlightOnHover?: boolean;
    hoverColor?: string;
    animateByWord?: boolean; // New prop to control animation mode
}

export function SplitText({
    text,
    className = '',
    delay = 0,
    repeat = 1,
    speed = 1,
    easing,
    direction = 'up',
    pause = false,
    staggerDelay = 30,
    loop = false,
    onComplete,
    highlightOnHover = true,
    hoverColor = 'red',
    animateByWord = false, // Default to character animation
    ...props
}: SplitTextProps): React.ReactElement | null {
    const containerRef = useRef<HTMLSpanElement>(null);
    const [elementWidths, setElementWidths] = useState<number[]>([]);
    const [iteration, setIteration] = useState<number>(0);

    // Split text into either words or characters
    const elements = animateByWord ? text.split(/\s+/) : text.split('');

    // Calculate element widths after the component mounts
    useEffect(() => {
        if (containerRef.current) {
            const spans = containerRef.current.children;
            const widths = Array.from(spans).map((span) => span.getBoundingClientRect().width);
            setElementWidths(widths);
        }
    }, [text, animateByWord]);

    // Animation springs for each element (word or character)
    const springs = useSprings(
        elements.length,
        elements.map((_, index) => ({
            from: { opacity: 0, transform: getTransform(direction, 20) },
            to: { opacity: 1, transform: getTransform(direction, 0) },
            delay: delay + index * (staggerDelay / speed),
            config: {
                tension: 300 * speed,
                friction: 10 / speed,
                easing: easing || undefined,
            } as SpringConfig,
            pause,
            reset: true,
            onRest: index === elements.length - 1 ? onComplete : undefined,
        }))
    );

    // Handle repeat or loop logic
    useEffect(() => {
        if (!loop && repeat === 1) return;

        const totalDuration = delay + elements.length * (staggerDelay / speed) + 500 / speed;
        const interval = setInterval(() => {
            setIteration((prev) => {
                if (!loop && repeat > 0 && prev + 1 >= repeat) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, totalDuration);

        return () => clearInterval(interval);
    }, [loop, repeat, delay, elements.length, speed, staggerDelay]);

    function getTransform(direction: 'up' | 'down' | 'left' | 'right', value: number) {
        switch (direction) {
            case 'up':
                return `translateY(-${value}px)`;
            case 'down':
                return `translateY(${value}px)`;
            case 'left':
                return `translateX(-${value}px)`;
            case 'right':
                return `translateX(${value}px)`;
            default:
                return `translateY(-${value}px)`;
        }
    }

    return (
        <span
            ref={containerRef}
            className={`inline-block ${className}`}
            aria-label={text}
            {...props}
        >
            {springs.map((spring: { opacity: SpringValue<number>; transform: SpringValue<string> }, index) => (
                <animated.span
                    key={`${index}-${iteration}`}
                    style={{
                        ...spring,
                        display: 'inline-block',
                        width: elementWidths[index] || 'auto',
                        ...(highlightOnHover
                            ? {
                                cursor: 'pointer',
                                transition: 'color 0.2s ease, transform 0.2s ease',
                            }
                            : {}),
                    }}
                    onMouseEnter={() => {
                        if (highlightOnHover) {
                            const element = containerRef.current?.children[index] as HTMLElement;
                            if (element) {
                                element.style.color = hoverColor;
                                element.style.transform = 'scale(1.2)';
                            }
                        }
                    }}
                    onMouseLeave={() => {
                        if (highlightOnHover) {
                            const element = containerRef.current?.children[index] as HTMLElement;
                            if (element) {
                                element.style.color = '';
                                element.style.transform = '';
                            }
                        }
                    }}
                >
                    {animateByWord ? elements[index] : elements[index] === ' ' ? '\u00A0' : elements[index]}
                    {animateByWord && index < elements.length - 1 ? '\u00A0' : ''}
                </animated.span>
            ))}
        </span>
    );
}