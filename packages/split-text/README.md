# OpenReactHub Split Text Animation

A React component for animating text-animation by splitting it into individual characters, part of the OpenReactHub library collection.

## About OpenReactHub

OpenReactHub is a curated collection of open-source React libraries and components. Visit [OpenReactHub](https://openreacthub.vercel.com) for more amazing React resources!

## Installation

`bash
npm install @open-react-hub/split-text-animation
`

or

`bash
yarn add @open-react-hub/split-text-animation
`

## Usage

`jsx
import { SplitText } from '@open-react-hub/split-text-animation';

function MyComponent() {
  return (
    <SplitText 
      text-animation="Hello, OpenReactHub!" 
      delay={500} 
      animationDuration={800}
      staggerDelay={50}
    />
  );
}
`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text-animation | string | (required) | The text-animation to be animated |
| delay | number | 0 | Delay in milliseconds before the animation starts |
| animationDuration | number | 500 | Duration of each character's animation in milliseconds |
| staggerDelay | number | 30 | Delay between each character's animation start in milliseconds |
| className | string | '' | Additional CSS classes to be applied to the container span |


## How it works

The SplitText component splits the input text-animation into individual characters and animates each character separately using react-spring. This creates a smooth, staggered animation effect. You can customize the animation by adjusting the `delay`, `animationDuration`, and `staggerDelay` props to achieve different effects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

Abass Dev - [GitHub](https://github.com/abass-dev)

---

This component is part of the [OpenReactHub](https://openreacthub.vercel.com) collection.

