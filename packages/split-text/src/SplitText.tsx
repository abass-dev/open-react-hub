'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSprings, animated, SpringValue, SpringConfig } from '@react-spring/web';

export interface SplitTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    text: string; // The string to animate
    delay?: number; // Initial animation delay in milliseconds
    repeat?: number; // Number of times the animation should repeat (0 = infinite)
    speed?: number; // Speed multiplier (lower = slower, higher = faster, default = 1)
    easing?: (t: number) => number; // Custom easing function
    direction?: 'up' | 'down' | 'left' | 'right'; // Animation direction
    pause?: boolean; // Pause or resume the animation
    staggerDelay?: number; // Delay between each character animation
    loop?: boolean; // Infinite looping (alternative to repeat={0})
    onComplete?: () => void; // Callback after a single cycle finishes
    highlightOnHover?: boolean; // Highlight each character on hover
    hoverColor?: string; // Custom hover color (optional)
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
    highlightOnHover = false,
    hoverColor = 'red',
    ...props
}: SplitTextProps): React.ReactElement | null {
    const containerRef = useRef<HTMLSpanElement>(null); // Reference for the container element
    const [letterWidths, setLetterWidths] = useState<number[]>([]); // Stores the widths of individual letters
    const [iteration, setIteration] = useState<number>(0); // Tracks the current iteration of the animation

    // Calculate character widths after the component mounts
    useEffect(() => {
        if (containerRef.current) {
            const spans = containerRef.current.children;
            const widths = Array.from(spans).map((span) => span.getBoundingClientRect().width);
            setLetterWidths(widths);
        }
    }, [text]);

    // Re-trigger animation based on `iteration`
    const springs = useSprings(
        text.length,
        text.split('').map((_, index) => ({
            from: { opacity: 0, transform: getTransform(direction, 20) }, // Animation start state
            to: { opacity: 1, transform: getTransform(direction, 0) }, // Animation end state
            delay: delay + index * (staggerDelay / speed), // Dynamic delay between characters
            config: {
                tension: 300 * speed,
                friction: 10 / speed,
                easing: easing || undefined, // Use custom easing if provided
            } as SpringConfig,
            pause, // Pause animation dynamically
            reset: true, // Reset animation for looping
            onRest: index === text.length - 1 ? onComplete : undefined, // Fire onComplete only at the end
        }))
    );

    // Handle repeat or loop logic
    useEffect(() => {
        if (!loop && repeat === 1) return; // No need for additional iterations

        const totalDuration =
            delay + text.length * (staggerDelay / speed) + 500 / speed; // Total time per animation cycle
        const interval = setInterval(() => {
            setIteration((prev) => {
                if (!loop && repeat > 0 && prev + 1 >= repeat) {
                    clearInterval(interval); // Stop when repeat count is reached
                    return prev;
                }
                return prev + 1; // Increment the iteration
            });
        }, totalDuration);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [loop, repeat, delay, text.length, speed, staggerDelay]);

    // Utility to calculate transform based on direction
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
            className={`inline-block ${className}`} // Add custom classes
            aria-label={text}
            {...props}
        >
            {springs.map((spring: { opacity: SpringValue<number>; transform: SpringValue<string> }, index) => (
                <animated.span
                    key={`${index}-${iteration}`} // Use `iteration` to force re-render on repeat
                    style={{
                        ...spring, // Apply the spring animation styles
                        display: 'inline-block',
                        width: letterWidths[index] || 'auto', // Maintain proper spacing for each character
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
                    {text[index] === ' ' ? '\u00A0' : text[index]} {/* Render spaces correctly */}
                </animated.span>
            ))}
        </span>
    );
}
