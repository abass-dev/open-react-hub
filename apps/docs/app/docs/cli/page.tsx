import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'CLI | OpenReactHub',
  description: 'Documentation for the OpenReactHub CLI tool and component installation',
}

export default function CLIPage() {
  return (
    <div className="container mx-auto py-6 px-16 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold lg:text-5xl">OpenReactHub CLI</h1>
          <p className="text-xl text-muted-foreground">
            The OpenReactHub CLI is a powerful tool for creating, managing, and building projects with OpenReactHub components.
          </p>
        </div>
      </div>

      <Tabs defaultValue="installation" className="mt-8">
        <TabsList defaultValue="installation">
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="commands">Commands</TabsTrigger>
          <TabsTrigger value="component-installation">Component Installation</TabsTrigger>
        </TabsList>
        <TabsContent value="installation" className="space-y-4">
          <h2 className="text-2xl font-bold">Installation</h2>
          <p>To install the OpenReactHub CLI globally, run the following command in your terminal:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>npm install -g @open-react-hub/cli</code>
          </pre>
          <p>Alternatively, you can use the CLI without global installation using npx.</p>
        </TabsContent>
        <TabsContent value="usage" className="space-y-4">
          <h2 className="text-2xl font-bold">Usage</h2>
          <p>Once installed, you can use the CLI by running the <code>orh</code> command:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>orh [command] [options]</code>
          </pre>
          <p>For example, to add a component:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>orh add ui/split-text</code>
          </pre>
        </TabsContent>
        <TabsContent value="commands" className="space-y-4">
          <h2 className="text-2xl font-bold">Commands</h2>
          <ul className="space-y-4">
            <li>
              <h3 className="text-xl font-semibold">add</h3>
              <p>Add a new component to your project</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>orh add [component-name]</code>
              </pre>
              <p>To add a component from a specific source (e.g., GitHub):</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>orh add github [component-name]</code>
              </pre>
            </li>
            <li>
              <h3 className="text-xl font-semibold">help</h3>
              <p>Display help information</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>orh help [command]</code>
              </pre>
            </li>
          </ul>
        </TabsContent>
        <TabsContent value="component-installation" className="space-y-4">
          <h2 className="text-2xl font-bold">Component Installation</h2>
          <p>There are multiple ways to install and use OpenReactHub components:</p>
          <h3 className="text-xl font-semibold mt-4">1. Direct npm installation</h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>npm install @open-react-hub/split-text</code>
          </pre>
          <h3 className="text-xl font-semibold mt-4">2. Using npx without global installation</h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>npx @open-react-hub/split-text add ui/split-text</code>
          </pre>
          <p>To add from a specific source (e.g., GitHub):</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>npx @open-react-hub/split-text add github ui/split-text</code>
          </pre>
          <h3 className="text-xl font-semibold mt-4">3. Using the global CLI</h3>
          <p>After installing the CLI globally, you can use:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>orh add ui/split-text</code>
          </pre>
          <p>Or to add from a specific source:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>orh add github ui/split-text</code>
          </pre>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <div className="grid gap-4 mt-4 sm:grid-cols-2">
          <Link href="/docs/getting-started" className="group relative rounded-lg border p-6 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold mb-2">Getting Started Guide</h3>
            <p className="text-muted-foreground mb-4">Learn how to set up and use OpenReactHub in your projects.</p>
            <Button variant="link" className="group pl-0">
              Read Guide <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/components" className="group relative rounded-lg border p-6 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold mb-2">Explore Components</h3>
            <p className="text-muted-foreground mb-4">Discover the full range of components available in OpenReactHub.</p>
            <Button variant="link" className="group pl-0">
              View Components <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

