'use client'

import React, { useState } from 'react'
import { SplitText } from '@open-react-hub/split-text'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function SplitTextPreview() {
  const [text, setText] = useState('OpenReactHub Split Text')
  const [delay, setDelay] = useState(0)
  const [key, setKey] = useState(0)

  const handleAnimate = () => {
    setKey(prevKey => prevKey + 1)
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6 bg-muted flex items-center justify-center min-h-[200px]">
          <SplitText
            key={key}
            text={text}
            delay={delay}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-chau-philomene-one text-center"
          />
        </CardContent>
      </Card>
      <div className="space-y-4">
        <div>
          <Label htmlFor="preview-text" className="text-sm font-medium">Text</Label>
          <Input
            id="preview-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to animate"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="animation-delay" className="text-sm font-medium">Animation Delay (milliseconds)</Label>
          <Input
            id="animation-delay"
            type="number"
            min={0}
            step={100}
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
        <Button onClick={handleAnimate} className="w-full">Animate</Button>
      </div>
    </div>
  )
}

