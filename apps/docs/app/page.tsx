import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Book, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        Welcome to <span className="text-primary">OpenReactHub</span>
      </h1>
      <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
        An open-source React and Next.js component library designed to help you build beautiful, accessible, and performant user interfaces.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Button asChild size="lg" className="text-lg">
          <Link href="/docs/getting-started">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="text-lg">
          <Link href="/components">
            Explore Components
          </Link>
        </Button>
      </div>
      <div className="grid gap-8 mt-20 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
        <FeatureCard
          icon={Code}
          title="Accessible"
          description="Built with accessibility in mind, following WCAG guidelines."
        />
        <FeatureCard
          icon={Zap}
          title="Customizable"
          description="Easy to customize with Tailwind CSS and CSS variables."
        />
        <FeatureCard
          icon={Book}
          title="Open Source"
          description="Free to use and modify under the MIT license."
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description } : any) {
  return (
    <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg transition-all hover:shadow-xl">
      <div className="p-3 bg-primary/10 rounded-full">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground text-center">{description}</p>
    </div>
  )
}

