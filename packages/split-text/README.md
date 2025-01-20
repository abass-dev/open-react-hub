# OpenReactHub Split Text Animation

A React component for animating text by splitting it into individual characters, part of the OpenReactHub library collection.

## About OpenReactHub

OpenReactHub is a curated collection of open-source React libraries and components. Visit [OpenReactHub](https://orh.abassdev.com) for more amazing React resources!

---

## Installation

```bash
npm install @open-react-hub/split-text-animation @react-spring/web
```

or

```bash
yarn add @open-react-hub/split-text-animation @react-spring/web
```

---

## Usage

Here’s an example of how to use the `SplitText` component:

```jsx
import { SplitText } from '@open-react-hub/split-text-animation';

function MyComponent() {
  return (
    <SplitText 
      text="Hello, OpenReactHub!" 
      delay={500} 
      speed={1.5} 
      direction="left" 
      repeat={3} 
      highlightOnHover={true} 
      hoverColor="blue" 
    />
  );
}
```

---

## Props

| Prop               | Type                                | Default      | Description                                                                 |
|--------------------|-------------------------------------|--------------|-----------------------------------------------------------------------------|
| `text`             | `string`                           | (required)   | The text to animate.                                                       |
| `className`        | `string`                           | `''`         | Additional CSS classes for styling the container.                          |
| `delay`            | `number`                           | `0`          | Delay (in milliseconds) before the animation starts.                       |
| `speed`            | `number`                           | `1`          | Multiplier for the animation speed. Higher = faster, lower = slower.       |
| `easing`           | `(t: number) => number`            | `undefined`  | A custom easing function for the animation curve (e.g., `t => t * t`).     |
| `direction`        | `'up' | 'down' | 'left' | 'right'`  | `'up'`      | Direction from which the animation starts.                                 |
| `pause`            | `boolean`                          | `false`      | Pauses or resumes the animation dynamically.                               |
| `repeat`           | `number`                           | `1`          | Number of times the animation repeats. Use `0` for infinite repeats.       |
| `staggerDelay`     | `number`                           | `30`         | Delay (in milliseconds) between animating each character.                  |
| `loop`             | `boolean`                          | `false`      | Enables infinite animation looping (alternative to `repeat={0}`).          |
| `onComplete`       | `() => void`                       | `undefined`  | Callback function that fires when a single animation cycle completes.      |
| `highlightOnHover` | `boolean`                          | `false`      | Enables hover effects for individual characters.                           |
| `hoverColor`       | `string`                           | `'red'`      | Specifies the color of characters on hover (requires `highlightOnHover`).  |

---

## How it Works

The `SplitText` component splits the input text into individual characters and animates each character separately using `@react-spring/web`. This creates smooth, staggered animations that can be fully customized.

### Key Features:
- **Animation Speed:** Adjust with the `speed` prop for faster or slower animations.
- **Direction Control:** Use the `direction` prop to animate text from `up`, `down`, `left`, or `right`.
- **Hover Effects:** Enable character-level hover effects with `highlightOnHover` and set custom colors with `hoverColor`.
- **Repeats & Loops:** Control how many times the animation repeats with `repeat` or enable infinite loops with `loop`.
- **Custom Easing:** Pass a custom easing function with the `easing` prop for advanced control over the animation curve.

### Example Use Cases:
1. **Basic Animation**:
   ```jsx
   <SplitText text="Hello, OpenReactHub!" />
   ```
2. **Fast Left-Slide Animation**:
   ```jsx
   <SplitText text="Fast Animation!" direction="left" speed={2} />
   ```
3. **Hover Effect with Infinite Loop**:
   ```jsx
   <SplitText 
     text="Hover Me!" 
     highlightOnHover={true} 
     hoverColor="blue" 
     loop={true} 
   />
   ```

---

## Contributing

Contributions are welcome! If you have ideas for new features or encounter any bugs, please submit an issue or pull request on GitHub.

---

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use it in your projects.

---

## Author

Abass Dev - [GitHub](https://github.com/abass-dev)

This component is part of the [OpenReactHub](https://orh.abassdev.com) collection.

---

## Changelog

### v1.5.0
- Added `speed` prop to adjust animation speed.
- Added `direction` prop to control animation direction.
- Added `easing` prop for custom easing functions.
- Added `repeat` and `loop` props for animation cycles.
- Added `highlightOnHover` and `hoverColor` props for hover effects.
- Introduced `pause` prop to dynamically pause or resume animations.
- Improved documentation and examples.
- 