# @open-react-hub/code-block

A feature-rich, customizable code block component for React applications with support for syntax highlighting, line numbers, command-line interface simulation, and themes.

## Features

- 🎨 Syntax highlighting for multiple programming languages
- 📝 Optional line numbers with toggle functionality
- 🌙 Light and dark theme support
- 💻 Command-line interface simulation
- 📋 One-click code copying
- 🎯 Customizable prompts and styling
- ⚡ Built with performance in mind
- 🎯 TypeScript support out of the box

## Installation

```bash
npm install @open-react-hub/code-block
# or
yarn add @open-react-hub/code-block
# or 
pnpm add @open-react-hub/code-block
```

## Dependencies

This package requires the following peer dependencies:

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "lucide-react": "^0.263.1",
  "prismjs": "^1.29.0"
}
```

## Basic Usage

```jsx
import { CodeBlock } from '@open-react-hub/code-block';

function App() {
  const code = `function hello() {
  console.log("Hello, World!");
}`;

  return (
    <CodeBlock 
      code={code} 
      language="javascript"
    />
  );
}
```

## Command-Line Mode

```jsx
import { CodeBlock } from '@open-react-hub/code-block';

function Terminal() {
  const commands = `$ npm install @open-react-hub/code-block
Installing dependencies...
✓ Done!
$ npm start`;

  return (
    <CodeBlock 
      code={commands}
      isCommandLine={true}
      commandLine={{
        user: "dev",
        host: "localhost",
        path: "~/project"
      }}
    />
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | Required | The code or text content to display |
| `language` | `string` | `'typescript'` | Programming language for syntax highlighting |
| `showLineNumbers` | `boolean` | `true` | Show/hide line numbers |
| `showCopyButton` | `boolean` | `true` | Show/hide copy button |
| `showLanguageLabel` | `boolean` | `true` | Show/hide language label |
| `theme` | `'light'` \| `'dark'` | `'dark'` | Color theme |
| `className` | `string` | `''` | Additional CSS classes |
| `isCommandLine` | `boolean` | `false` | Enable command-line interface mode |
| `commandLine` | `CommandLineConfig` | See below | Command-line configuration |

### CommandLineConfig Interface

```typescript
interface CommandLineConfig {
  user?: string;          // Username in prompt
  host?: string;          // Hostname in prompt
  path?: string;          // Current path in prompt
  basePrompt?: string;    // Custom base prompt
  continuationPrompt?: string;  // Prompt for continued lines
  lines?: LineConfig[];   // Pre-configured lines
}

interface LineConfig {
  content: string;        // Line content
  isOutput?: boolean;     // Is this line command output?
  isContinuation?: boolean;  // Is this a continuation line?
  customPrompt?: string;  // Custom prompt for this line
}
```

## Supported Languages

The component supports syntax highlighting for the following languages out of the box:
- TypeScript
- JavaScript
- JSX/TSX
- CSS
- Python
- Java
- JSON
- Bash
- Markdown
- Shell Session

## Styling

The component uses Tailwind CSS classes internally and can be customized using the `className` prop. The component respects dark/light mode and automatically adjusts its appearance.

### Theme Customization

```jsx
<CodeBlock
  code={code}
  theme="light"
  className="my-8 shadow-lg"
/>
```

## Command-Line Mode Examples

### Basic Terminal

```jsx
<CodeBlock
  code="$ ls -la
total 24
drwxr-xr-x  5 user  group  160 Jan 14 10:00 ."
  isCommandLine={true}
/>
```

### Custom Prompt

```jsx
<CodeBlock
  code="$ npm start"
  isCommandLine={true}
  commandLine={{
    basePrompt: "➜",
    continuationPrompt: "→"
  }}
/>
```

## Best Practices

1. **Language Specification**: Always specify the correct language for proper syntax highlighting:
```jsx
<CodeBlock code={code} language="python" />
```

2. **Theme Consistency**: Match the theme with your application's color scheme:
```jsx
<CodeBlock code={code} theme={isDarkMode ? 'dark' : 'light'} />
```

3. **Command-Line Configuration**: When using command-line mode, provide meaningful prompt information:
```jsx
<CodeBlock
  code={commands}
  isCommandLine={true}
  commandLine={{
    user: "dev",
    host: "server",
    path: "/var/www"
  }}
/>
```

## Performance Considerations

- The component uses React's `useState` and `useEffect` hooks efficiently
- Syntax highlighting is performed using Prism.js
- Line numbers are virtualized for better performance with large code blocks

## Accessibility

- Proper ARIA labels and roles are implemented
- Keyboard navigation support for copy functionality
- High contrast ratios for better readability
- Screen reader friendly content structure

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT © [OpenReactHub](https://github.com/abass-dev/open-react-hub)