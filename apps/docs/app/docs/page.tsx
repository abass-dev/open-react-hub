import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Documentation | OpenReactHub',
  description: 'Learn how to use OpenReactHub components in your projects',
}

export default function DocsPage() {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-16 text-center">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold lg:text-5xl">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Welcome to the OpenReactHub documentation. Here you&apos;ll find comprehensive guides and documentation to help you start working with OpenReactHub as quickly as possible.
          </p>
        </div>
      </div>
      <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/docs/getting-started" className="group relative rounded-lg border p-6 hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <p className="text-muted-foreground mb-4">Learn how to install and set up OpenReactHub in your project.</p>
          <Button variant="link" className="group pl-0">
            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <Link href="/docs/theming" className="group relative rounded-lg border p-6 hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold mb-2">Theming</h2>
          <p className="text-muted-foreground mb-4">Customize the look and feel of OpenReactHub components.</p>
          <Button variant="link" className="group pl-0">
            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="/docs/components" className="group relative rounded-lg border p-6 hover:shadow-md transition-all">
          <h2 className="text-2xl font-semibold mb-2">Components</h2>
          <p className="text-muted-foreground mb-4">Explore the full range of OpenReactHub components.</p>
          <Button variant="link" className="group pl-0">
            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

