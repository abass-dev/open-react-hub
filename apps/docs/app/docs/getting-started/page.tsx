import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeBlock from '@/components/code-block'

export const metadata: Metadata = {
  title: 'Getting Started | OpenReactHub',
  description: 'Learn how to get started with OpenReactHub, an open-source React and Next.js component library',
}

export default function GettingStartedPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Getting Started with OpenReactHub</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Welcome to OpenReactHub! This guide will help you set up and start using our open-source React and Next.js component library in your projects.
      </p>

      <Tabs defaultValue="quickstart" className="space-y-8">
        <TabsList>
          <TabsTrigger value="quickstart">Quickstart</TabsTrigger>
          <TabsTrigger value="manual-setup">Manual Setup</TabsTrigger>
          <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
        </TabsList>

        <TabsContent value="quickstart" className="space-y-4">
          <h2 className="text-2xl font-bold">Quickstart</h2>
          <p>The fastest way to get started with OpenReactHub is to use our CLI tool. Follow these steps:</p>

          <ol className="list-decimal list-inside space-y-4">
            <li>
              <p>Install the OpenReactHub CLI globally:</p>
              <CodeBlock
                code="npm install -g @open-react-hub/cli"
                language="bash"
              />
            </li>
            <li>
              <p>Create a new project:</p>
              <CodeBlock
                code="orh create my-openreacthub-app"
                language="bash"
              />
              <p className="mt-2 text-sm text-muted-foreground">This command will create a new Next.js project with OpenReactHub pre-configured.</p>
            </li>
            <li>
              <p>Navigate to your project directory:</p>
              <CodeBlock
                code="cd my-openreacthub-app"
                language="bash"
              />
            </li>
            <li>
              <p>Start the development server:</p>
              <CodeBlock
                code="npm run dev"
                language="bash"
              />
            </li>
          </ol>

          <p className="mt-4">
            That's it! Your new OpenReactHub project is now running at <code className="bg-muted px-1 py-0.5 rounded">http://localhost:3000</code>.
          </p>

          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">What's Included</h3>
            <p>The created project comes with an example component that demonstrates how to use OpenReactHub components:</p>
            <CodeBlock
              code={`
import { Button } from '@open-react-hub/core';

export default function MyComponent() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Button variant="primary">Click me!</Button>
    </div>
  );
}
              `}
              language="jsx"
            />
            <p>This component is already imported and used in your <code className="bg-muted px-1 py-0.5 rounded">src/app/page.tsx</code> file.</p>
          </div>
        </TabsContent>

        <TabsContent value="manual-setup" className="space-y-4">
          <h2 className="text-2xl font-bold">Manual Setup</h2>
          <p>If you prefer to set up OpenReactHub manually in an existing project, follow these steps:</p>

          <ol className="list-decimal list-inside space-y-4">
            <li>
              <p>Install the core OpenReactHub package:</p>
              <CodeBlock
                code="npm install @open-react-hub/core"
                language="bash"
              />
            </li>
            <li>
              <p>Install peer dependencies (if not already installed):</p>
              <CodeBlock
                code="npm install react react-dom next"
                language="bash"
              />
            </li>
            <li>
              <p>Create or update your <code className="bg-muted px-1 py-0.5 rounded">tailwind.config.js</code> file:</p>
              <CodeBlock
                code={`
const { openReactHubPreset } = require('@open-react-hub/core/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@open-react-hub/**/*.js',
  ],
  presets: [openReactHubPreset],
}
                `}
                language="javascript"
              />
            </li>
            <li>
              <p>Import the OpenReactHub styles in your <code className="bg-muted px-1 py-0.5 rounded">globals.css</code> file:</p>
              <CodeBlock
                code={`
@import '@open-react-hub/core/styles.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
                `}
                language="css"
              />
            </li>
          </ol>

          <p className="mt-4">
            You can now start using OpenReactHub components in your project!
          </p>
        </TabsContent>

        <TabsContent value="next-steps" className="space-y-4">
          <h2 className="text-2xl font-bold">Next Steps</h2>
          <p>Now that you have OpenReactHub set up, here are some next steps to explore:</p>

          <ul className="list-disc list-inside space-y-2">
            <li>Check out our <Link href="/components" className="text-primary hover:underline">component library</Link> to see what's available</li>
            <li>Learn about <Link href="/docs/theming" className="text-primary hover:underline">theming and customization</Link></li>
            <li>Explore <Link href="/docs/cli" className="text-primary hover:underline">advanced CLI usage</Link> for managing your project</li>
            <li>Read our <Link href="/docs/best-practices" className="text-primary hover:underline">best practices guide</Link> for building with OpenReactHub</li>
          </ul>

          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Example Usage</h3>
            <p>Here's a quick example of how to use an OpenReactHub component in your project:</p>
            <CodeBlock
              code={`
import { Button } from '@open-react-hub/core';

export default function MyComponent() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Button variant="primary">Click me!</Button>
    </div>
  );
}
              `}
              language="jsx"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-2">Explore Components</h3>
          <p className="text-muted-foreground mb-4">Discover the full range of components available in OpenReactHub.</p>
          <Button asChild variant="outline">
            <Link href="/components" className="flex items-center">
              View Components
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-2">Read the Docs</h3>
          <p className="text-muted-foreground mb-4">Dive deeper into OpenReactHub's features and capabilities.</p>
          <Button asChild variant="outline">
            <Link href="/docs" className="flex items-center">
              Explore Documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

