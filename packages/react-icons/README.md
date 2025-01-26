# @open-react-hub/react-icons

A lightweight, customizable React icon library.

## Installation
```bash
npm install @open-react-hub/react-icons
```

## Usage
```jsx
import { Menu, Code } from "@open-react-hub/react-icons";

function MyComponent() {
  return (
    <div>
      <Menu size={32} color="blue" />
      <Code strokeWidth={3} />
    </div>
  );
}
```

## Props
- `size`: Icon size in pixels (default: 24)
- `color`: Icon color (default: currentColor)
- `strokeWidth`: Line thickness (default: 2)
