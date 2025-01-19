import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ArrowRight, TextIcon } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Components | OpenReactHub',
    description: 'Explore the components available in the OpenReactHub library',
}

const components = [
    { name: 'Text Animations', description: 'Components for animating and manipulating text.', icon: TextIcon, url: '/components/text-animations/split-text' },
]

export default function ComponentsPage() {
    return (
        <div className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block text-4xl font-extrabold tracking-tight lg:text-5xl">Components</h1>
                    <p className="text-xl text-muted-foreground">
                        Explore the components available in the OpenReactHub library. Each component is designed to be accessible, customizable, and easy to use.
                    </p>
                </div>
            </div>
            <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                {components.map((component) => (
                    <Card key={component.name} className="flex flex-col transition-shadow hover:shadow-lg">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl">{component.name}</CardTitle>
                                <component.icon className="w-8 h-8 text-primary" />
                            </div>
                            <CardDescription className="mt-2">{component.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="mt-auto pt-4">
                            <Button asChild variant="outline" className="w-full">
                                <Link href={component.url} className="flex items-center justify-center">
                                    View Details
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {components.length === 0 && (
                <div className="text-center mt-8">
                    <p className="text-xl text-muted-foreground">No components are currently available. Check back soon for updates!</p>
                </div>
            )}
        </div>
    )
}
