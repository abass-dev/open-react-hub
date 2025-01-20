'use client';

import React, { useEffect, useState } from 'react';
import { useTrail, animated, config } from '@react-spring/web';

type AnimationStyle = 'wave' | 'cascade' | 'bounce' | 'glitch' | 'fade';

interface TextAnimationProps {
  text: string;
  style?: AnimationStyle;
  delay?: number;
  color?: string;
  className?: string;
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#';

function getRandomGlitchChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

export function TextAnimation({ 
  text, 
  style = 'cascade',
  delay = 0,
  color = 'currentColor',
  className = ''
}: TextAnimationProps) {
  const items = text.split('');
  const [isVisible, setIsVisible] = useState(false);
  const [glitchText, setGlitchText] = useState(items);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Configure animation based on style
  const getAnimationConfig = () => {
    switch (style) {
      case 'wave':
        return {
          from: { y: 0 },
          to: { y: isVisible ? [0, -10, 0] : 0 },
          config: { mass: 1, tension: 180, friction: 12 },
          loop: true
        };
      case 'bounce':
        return {
          from: { y: -20, opacity: 0, scale: 0.8 },
          to: { y: isVisible ? 0 : -20, opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 },
          config: { mass: 2, tension: 300, friction: 20 }
        };
      case 'glitch':
        return {
          from: { opacity: 0, y: 20 },
          to: { opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 },
          config: config.gentle
        };
      case 'fade':
        return {
          from: { opacity: 0, x: -20 },
          to: { opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 },
          config: config.molasses
        };
      case 'cascade':
      default:
        return {
          from: { opacity: 0, y: 50, rotateX: 90 },
          to: { opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50, rotateX: isVisible ? 0 : 90 },
          config: { mass: 1, tension: 280, friction: 20 }
        };
    }
  };

  const trail = useTrail(items.length, {
    ...getAnimationConfig(),
    delay: index => delay + (index * 30)
  });

  // Glitch effect
  useEffect(() => {
    if (style === 'glitch' && isVisible) {
      const intervalId = setInterval(() => {
        setGlitchText(items.map((char, i) => 
          Math.random() > 0.95 ? getRandomGlitchChar() : char
        ));
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [style, isVisible, items]);

  return (
    <span 
      className={`inline-flex ${className}`}
      style={{ 
        color,
        perspective: '1000px',
        display: 'inline-flex',
        flexWrap: 'nowrap'
      }}
    >
      {trail.map(({ opacity, y, rotateX, scale = 1, ...rest }, index) => (
        <animated.span
          key={index}
          style={{
            opacity,
            transform: style === 'wave' 
              ? y.to(value => `translateY(${value}px)`)
              : y.to((value) => 
                  `translateY(${value}px) 
                   rotateX(${rotateX}deg) 
                   scale(${scale})`
                ),
            display: 'inline-block',
            whiteSpace: 'pre',
            willChange: 'transform, opacity',
            ...rest
          }}
        >
          {style === 'glitch' ? glitchText[index] : items[index]}
        </animated.span>
      ))}
    </span>
  );
}