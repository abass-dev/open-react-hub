import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeBlock from '@open-react-hub/code-block'

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
        {/* Make TabsList scrollable on mobile */}
        <div className="overflow-x-auto pb-2">
          <TabsList defaultValue="installation" className="w-full sm:w-auto">
            <TabsTrigger value="installation" className="text-sm">Installation</TabsTrigger>
            <TabsTrigger value="usage" className="text-sm">Usage</TabsTrigger>
            <TabsTrigger value="commands" className="text-sm">Commands</TabsTrigger>
            <TabsTrigger value="component-installation" className="text-sm whitespace-nowrap">Component Installation</TabsTrigger>
          </TabsList>
        </div>

        {/* Adjust content padding and spacing for mobile */}
        <TabsContent value="installation" className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Installation</h2>
          <p className="text-sm sm:text-base">To install the OpenReactHub CLI globally, run the following command in your terminal:</p>
          <div className="w-full overflow-x-auto">
            <CodeBlock isCommandLine code='npm install -g @open-react-hub/cli' />
          </div>
          <p className="text-sm sm:text-base">Alternatively, you can use the CLI without global installation using npx.</p>
        </TabsContent>

        <TabsContent value="usage" className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Usage</h2>
          <p className="text-sm sm:text-base">Once installed, you can use the CLI by running the <code>orh</code> command:</p>
          <div className="w-full overflow-x-auto">
            <pre className="bg-muted p-2 sm:p-4 rounded-md text-sm">
              <code>orh [command] [options]</code>
            </pre>
          </div>
          <p className="text-sm sm:text-base">For example, to add a component:</p>
          <div className="w-full overflow-x-auto">
            <pre className="bg-muted p-2 sm:p-4 rounded-md text-sm">
              <code>orh add ui/split-text</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="commands" className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Commands</h2>
          <ul className="space-y-3 sm:space-y-4">
            <li>
              <h3 className="text-lg sm:text-xl font-semibold">add</h3>
              <p className="text-sm sm:text-base">Add a new component to your project</p>
              <div className="w-full overflow-x-auto">
                <pre className="bg-muted p-2 sm:p-4 rounded-md text-sm">
                  <code>orh add [component-name]</code>
                </pre>
              </div>
              <p className="text-sm sm:text-base mt-2">To add a component from a specific source (e.g., GitHub):</p>
              <div className="w-full overflow-x-auto">
                <pre className="bg-muted p-2 sm:p-4 rounded-md text-sm">
                  <code>orh add github [component-name]</code>
                </pre>
              </div>
            </li>
            <li>
              <h3 className="text-lg sm:text-xl font-semibold">help</h3>
              <p className="text-sm sm:text-base">Display help information</p>
              <div className="w-full overflow-x-auto">
                <pre className="bg-muted p-2 sm:p-4 rounded-md text-sm">
                  <code>orh help [command]</code>
                </pre>
              </div>
            </li>
          </ul>
        </TabsContent>

        <TabsContent value="component-installation" className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Component Installation</h2>
          <p className="text-sm sm:text-base">There are multiple ways to install and use OpenReactHub components:</p>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold">1. Direct npm installation</h3>
            <div className="w-full overflow-x-auto">
              <pre className="bg-muted p-2 sm:p-4 rounded-md text-sm">
                <code>npm install @open-react-hub/split-text</code>
              </pre>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold">2. Using npx without global installation</h3>
            <div className="w-full overflow-x-auto">
              <CodeBlock isCommandLine code='npx @open-react-hub/split-text add ui/split-text' />
            </div>
            <p className="text-sm sm:text-base">To add from a specific source (e.g., GitHub):</p>
            <div className="w-full overflow-x-auto">
              <pre className="bg-muted p-2 sm:p-4 rounded-md text-sm">
                <code>npx @open-react-hub/split-text add github ui/split-text</code>
              </pre>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold">3. Using the global CLI</h3>
            <p className="text-sm sm:text-base">After installing the CLI globally, you can use:</p>
            <div className="w-full overflow-x-auto">
              <pre className="bg-muted p-2 sm:p-4 rounded-md text-sm">
                <code>orh add ui/split-text</code>
              </pre>
            </div>
            <p className="text-sm sm:text-base">Or to add from a specific source:</p>
            <div className="w-full overflow-x-auto">
              <pre className="bg-muted p-2 sm:p-4 rounded-md text-sm">
                <code>orh add github ui/split-text</code>
              </pre>
            </div>
          </div>
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

