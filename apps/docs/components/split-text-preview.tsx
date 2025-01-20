'use client';

import React, { useState } from 'react';
import { SplitText } from '@open-react-hub/split-text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export function SplitTextPreview() {
  const [text, setText] = useState('OpenReactHub Split Text');
  const [delay, setDelay] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('up');
  const [repeat, setRepeat] = useState(1);
  const [hoverEffect, setHoverEffect] = useState(false);
  const [hoverColor, setHoverColor] = useState('red');
  const [key, setKey] = useState(0);

  const handleAnimate = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="space-y-6">
      {/* Animation Preview */}
      <Card className="overflow-hidden">
        <CardContent className="p-6 bg-muted flex items-center justify-center min-h-[200px]">
          <SplitText
            key={key} // Force re-render to restart animation
            text={text}
            delay={delay}
            speed={speed}
            direction={direction}
            repeat={repeat}
            highlightOnHover={hoverEffect}
            hoverColor={hoverColor}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-chau-philomene-one text-center"
          />
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="space-y-4">
        {/* Text Input */}
        <div>
          <Label htmlFor="preview-text" className="text-sm font-medium">
            Text
          </Label>
          <Input
            id="preview-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to animate"
            className="mt-1"
          />
        </div>

        {/* Animation Delay */}
        <div>
          <Label htmlFor="animation-delay" className="text-sm font-medium">
            Animation Delay (milliseconds)
          </Label>
          <Input
            id="animation-delay"
            type="number"
            min={0}
            step={100}
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value, 10) || 0)}
            className="mt-1"
          />
        </div>

        {/* Speed Input */}
        <div>
          <Label htmlFor="animation-speed" className="text-sm font-medium">
            Animation Speed (Multiplier)
          </Label>
          <Input
            id="animation-speed"
            type="number"
            min={0.1}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value) || 1)}
            className="mt-1"
          />
        </div>

        {/* Direction Selector */}
        <div>
          <Label htmlFor="animation-direction" className="text-sm font-medium">
            Animation Direction
          </Label>
          <Select
            onValueChange={(value) => setDirection(value as 'up' | 'down' | 'left' | 'right')}
            defaultValue={direction}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="up">Up</SelectItem>
              <SelectItem value="down">Down</SelectItem>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Repeat Selector */}
        <div>
          <Label htmlFor="animation-repeat" className="text-sm font-medium">
            Repeat Count (0 for infinite)
          </Label>
          <Input
            id="animation-repeat"
            type="number"
            min={0}
            step={1}
            value={repeat}
            onChange={(e) => setRepeat(parseInt(e.target.value, 10) || 0)}
            className="mt-1"
          />
        </div>

        {/* Hover Effects */}
        <div className="flex items-center justify-between">
          <Label htmlFor="hover-effect" className="text-sm font-medium">
            Highlight on Hover
          </Label>
          <Switch
            id="hover-effect"
            checked={hoverEffect}
            onCheckedChange={(checked) => setHoverEffect(checked)}
          />
        </div>

        {/* Hover Color */}
        {hoverEffect && (
          <div>
            <Label htmlFor="hover-color" className="text-sm font-medium">
              Hover Color
            </Label>
            <Input
              id="hover-color"
              type="text"
              value={hoverColor}
              onChange={(e) => setHoverColor(e.target.value)}
              placeholder="Enter a color (e.g., blue, #123456)"
              className="mt-1"
            />
          </div>
        )}

        {/* Animate Button */}
        <Button onClick={handleAnimate} className="w-full">
          Animate
        </Button>
      </div>
    </div>
  );
}
