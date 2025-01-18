import { CodeBlockPreview } from '@/components/code-block-preview'
import ComponentDocPage from '@/components/component-doc-page'

const codeBlockProps = [
    {
        name: 'code',
        type: 'string',
        description: 'The code content to be displayed in the block.',
        required: true
    },
    {
        name: 'language',
        type: 'string',
        description: 'Programming language for syntax highlighting. Supported languages include typescript, javascript, jsx, tsx, css, python, java, json, bash, markdown.',
        defaultValue: '"typescript"'
    },
    {
        name: 'showLineNumbers',
        type: 'boolean',
        description: 'Whether to show line numbers in the code block.',
        defaultValue: 'true'
    },
    {
        name: 'showCopyButton',
        type: 'boolean',
        description: 'Whether to show the copy button.',
        defaultValue: 'true'
    },
    {
        name: 'showLanguageLabel',
        type: 'boolean',
        description: 'Whether to show the language label in the header.',
        defaultValue: 'true'
    },
    {
        name: 'theme',
        type: '"light" | "dark"',
        description: 'Color theme for the code block.',
        defaultValue: '"dark"'
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes to apply to the container.'
    },
    {
        name: 'isCommandLine',
        type: 'boolean',
        description: 'Whether to render the code block as a command-line interface.',
        defaultValue: 'false'
    },
    {
        name: 'commandLine',
        type: 'CommandLineConfig',
        description: 'Configuration for command-line interface display, including user, host, path, and prompts.',
        defaultValue: '{ user: "user", host: "localhost", path: "~", basePrompt: "", continuationPrompt: "→ " }'
    }
]

const usageExample = `import { CodeBlock } from '@/components/ui/code-block'

function MyComponent() {
  const code = \`const greeting = "Hello, World!";
console.log(greeting);\`

  return (
    <CodeBlock
      code={code}
      language="javascript"
      showLineNumbers={true}
      theme="dark"
    />
  )
}`

const commandLineExample = `import { CodeBlock } from '@/components/ui/code-block'

function MyComponent() {
  return (
    <CodeBlock
      code="$ npm install package-name
Installing dependencies...
$ npm start"
      isCommandLine={true}
      commandLine={{
        user: "dev",
        host: "localhost",
        path: "~/project"
      }}
    />
  )
}`

export default function CodeBlockPage() {
    return (
        <ComponentDocPage
            title="Code Block Component"
            description="A feature-rich code block component with syntax highlighting, line numbers, copy functionality, and command-line interface support."
            installCommand={`orh add ui/code-block\n// OR \nnpx @open-react-hub/cli add @open-react-hub/code-block\n// OR \nyarn add @open-react-hub/code-block\n// OR\nnpm install @open-react-hub/code-block`}
            usageCode={`${usageExample}\n\n// Command-line interface example:\n${commandLineExample}`}
            PreviewComponent={CodeBlockPreview}
            props={codeBlockProps}
            metadata={{
                title: 'Code Block Component',
                description: 'Documentation for the CodeBlock component in OpenReactHub'
            }}
        />
    )
}