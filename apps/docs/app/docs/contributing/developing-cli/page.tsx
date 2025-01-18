import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'Advanced CLI Contribution | OpenReactHub',
  description: 'Advanced guide for contributing to the OpenReactHub CLI',
}

export default function AdvancedCLIContributionPage() {
  return (
    <div className="container mx-auto py-6 px-16 lg:py-10">
      <h1 className="text-4xl font-bold mb-4">Advanced CLI Contribution</h1>
      <p className="text-xl text-muted-foreground mb-8">
        This guide covers advanced topics for contributing to the OpenReactHub CLI,
        including architecture, advanced features, testing, and performance optimization.
      </p>

      <Tabs defaultValue="architecture" className="space-y-8">
        <TabsList defaultValue="architecture">
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="advanced-features">Advanced Features</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="space-y-4">
          <h2 className="text-2xl font-semibold">CLI Architecture</h2>
          <p>The OpenReactHub CLI is built with a modular architecture to ensure extensibility and maintainability:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Core module: Handles the main CLI logic and command routing</li>
            <li>Command modules: Separate modules for each CLI command (e.g., add, create, build)</li>
            <li>Utility modules: Shared utilities for file operations, network requests, etc.</li>
            <li>Configuration module: Manages CLI and project configuration</li>
          </ul>
          <p className="mt-4">When contributing, consider which module your changes belong to and maintain separation of concerns.</p>
        </TabsContent>

        <TabsContent value="advanced-features" className="space-y-4">
          <h2 className="text-2xl font-semibold">Implementing Advanced Features</h2>
          <p>When adding new features to the CLI, consider the following:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Plugin system: Implement a plugin architecture for extensibility</li>
            <li>Custom generators: Create generators for new component types or project structures</li>
            <li>Integration with version control systems: Enhance Git integration for smoother workflows</li>
            <li>Dependency management: Improve handling of package dependencies and version conflicts</li>
          </ul>
          <p className="mt-4">Example of implementing a plugin system:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`
import { PluginManager } from './plugin-manager';

export class CLICore {
  private pluginManager: PluginManager;

  constructor() {
    this.pluginManager = new PluginManager();
  }

  async loadPlugins() {
    await this.pluginManager.loadPlugins();
  }

  async executeCommand(command: string, args: string[]) {
    const plugin = this.pluginManager.getPluginForCommand(command);
    if (plugin) {
      return await plugin.execute(args);
    }
    // Fall back to built-in commands
  }
}
            `}</code>
          </pre>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <h2 className="text-2xl font-semibold">Advanced Testing Strategies</h2>
          <p>Implement comprehensive testing for the CLI:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Unit tests: Test individual functions and modules</li>
            <li>Integration tests: Test interaction between different CLI components</li>
            <li>E2E tests: Test full CLI workflows in a simulated environment</li>
            <li>Snapshot testing: Use snapshot tests for command output consistency</li>
          </ul>
          <p className="mt-4">Example of an integration test:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`
import { CLICore } from '../src/core';
import { AddCommand } from '../src/commands/add';

describe('Add Command Integration', () => {
  let cli: CLICore;
  let addCommand: AddCommand;

  beforeEach(() => {
    cli = new CLICore();
    addCommand = new AddCommand(cli);
  });

  it('should add a component and update project configuration', async () => {
    const result = await addCommand.execute(['ui/button']);
    expect(result.success).toBe(true);
    expect(cli.getProjectConfig().components).toContain('ui/button');
  });
});
            `}</code>
          </pre>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <h2 className="text-2xl font-semibold">Performance Optimization</h2>
          <p>Optimize the CLI's performance for better user experience:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Lazy loading: Implement lazy loading for commands and plugins</li>
            <li>Caching: Use intelligent caching for network requests and file operations</li>
            <li>Parallel processing: Utilize worker threads for CPU-intensive tasks</li>
            <li>Incremental builds: Implement incremental build support for faster rebuilds</li>
          </ul>
          <p className="mt-4">Example of implementing lazy loading for commands:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>{`
import { Command } from 'commander';

export class LazyCommandLoader {
  private commandCache: Map<string, any> = new Map();

  async loadCommand(commandName: string): Promise<Command> {
    if (this.commandCache.has(commandName)) {
      return this.commandCache.get(commandName);
    }

    const CommandClass = await import(\`./commands/\${commandName}\`);
    const command = new CommandClass.default();
    this.commandCache.set(commandName, command);
    return command;
  }
}
            `}</code>
          </pre>
        </TabsContent>
      </Tabs>

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Contributing Guidelines</h2>
        <p>
          When contributing advanced features or optimizations to the OpenReactHub CLI,
          please adhere to the following guidelines:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Follow the existing code style and architecture</li>
          <li>Write comprehensive tests for new features and optimizations</li>
          <li>Document your changes thoroughly, including inline comments and updating relevant documentation</li>
          <li>Consider backwards compatibility when making changes to existing features</li>
          <li>Optimize for both performance and developer experience</li>
        </ul>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-2">CLI Documentation</h3>
          <p className="text-muted-foreground mb-4">Review the full CLI documentation for more context.</p>
          <Button asChild variant="outline">
            <Link href="/docs/cli" className="flex items-center">
              View CLI Docs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold mb-2">GitHub Repository</h3>
          <p className="text-muted-foreground mb-4">Contribute directly on our GitHub repository.</p>
          <Button asChild variant="outline">
            <Link href="https://github.com/openreacthub/cli" className="flex items-center">
              View on GitHub
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

