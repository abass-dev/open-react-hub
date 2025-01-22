"use client"

import React, { useState } from "react"
import { SplitText } from "@open-react-hub/split-text"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { PlayCircle } from "lucide-react"

export function SplitTextPreview() {
  const [text, setText] = useState("OpenReactHub Split Text")
  const [delay, setDelay] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">("up")
  const [repeat, setRepeat] = useState(1)
  const [hoverEffect, setHoverEffect] = useState(true)
  const [hoverColor, setHoverColor] = useState("red")
  const [key, setKey] = useState(0)

  const handleAnimate = () => {
    setKey((prevKey) => prevKey + 1)
  }

  return (
    <div className="space-y-6">
      {/* Animation Preview */}
      <Card className="overflow-hidden">
        <CardContent className="p-6 bg-muted">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="icon" onClick={handleAnimate} className="h-8 w-8">
              <PlayCircle className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex items-center justify-center min-h-[160px]">
            <SplitText
              key={key}
              text={text}
              animateByWord={false}
              delay={delay}
              speed={speed}
              direction={direction}
              repeat={repeat}
              highlightOnHover={hoverEffect}
              hoverColor={hoverColor}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-chau-philomene-one text-center"
            />
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div>
          <Label htmlFor="animation-delay" className="text-sm font-medium">
            Animation Delay: {delay}ms
          </Label>
          <Slider
            id="animation-delay"
            min={0}
            max={2000}
            step={100}
            value={[delay]}
            onValueChange={(value: React.SetStateAction<number>[]) => setDelay(value[0])}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="animation-speed" className="text-sm font-medium">
            Animation Speed: {speed.toFixed(1)}x
          </Label>
          <Slider
            id="animation-speed"
            min={0.1}
            max={3}
            step={0.1}
            value={[speed]}
            onValueChange={(value: React.SetStateAction<number>[]) => setSpeed(value[0])}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="animation-direction" className="text-sm font-medium">
            Animation Direction
          </Label>
          <Select
            onValueChange={(value) => setDirection(value as "up" | "down" | "left" | "right")}
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

        <div>
          <Label htmlFor="animation-repeat" className="text-sm font-medium">
            Repeat Count: {repeat === 0 ? "Infinite" : repeat}
          </Label>
          <Slider
            id="animation-repeat"
            min={0}
            max={10}
            step={1}
            value={[repeat]}
            onValueChange={(value: React.SetStateAction<number>[]) => setRepeat(value[0])}
            className="mt-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="hover-effect" className="text-sm font-medium">
            Highlight on Hover
          </Label>
          <Switch id="hover-effect" checked={hoverEffect} onCheckedChange={(checked) => setHoverEffect(checked)} />
        </div>

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
      </div>
    </div>
  )
}

