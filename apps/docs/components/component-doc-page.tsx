import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from '@open-react-hub/code-block'

interface ComponentDocPageProps {
    title: string
    description: string
    installCommand: string
    usageCode: string
    PreviewComponent: React.ComponentType
    props?: Array<{
        name: string
        type: string
        description: string
        required?: boolean
        defaultValue?: string
    }>
    metadata: {
        title: string
        description: string
    }
}

export const generateMetadata = ({ metadata }: ComponentDocPageProps): Metadata => ({
    title: `${metadata.title} | OpenReactHub`,
    description: metadata.description,
})

export default function ComponentDocPage({
    title,
    description,
    installCommand,
    usageCode,
    PreviewComponent,
    props = [],
}: ComponentDocPageProps) {
    return (
        <div className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold lg:text-5xl">{title}</h1>
                <p className="text-xl text-muted-foreground">{description}</p>
            </div>

            <Tabs defaultValue="preview" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="installation">Installation</TabsTrigger>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Live Preview</CardTitle>
                            <CardDescription>Experiment with the component using the controls below</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PreviewComponent />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="installation" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Installation</CardTitle>
                            <CardDescription>Install the component and its dependencies</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock code={installCommand} isCommandLine />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="usage" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Usage</CardTitle>
                            <CardDescription>Learn how to use the component in your project</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">Here's a basic example of how to use the component:</p>
                            <CodeBlock code={usageCode} language="jsx" />

                            {props.length > 0 && (
                                <>
                                    <h3 className="text-lg font-semibold mt-6">Props</h3>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                        {props.map((prop) => (
                                            <li key={prop.name}>
                                                <code className="text-primary">{prop.name}</code>
                                                {prop.required && <span className="text-red-500">*</span>} ({prop.type})
                                                {prop.defaultValue && <span className="text-muted-foreground"> = {prop.defaultValue}</span>}
                                                : {prop.description}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Explore More Components</CardTitle>
                        <CardDescription>Discover other components available in OpenReactHub</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/components" className="flex items-center justify-center">
                                View Components
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Contribute</CardTitle>
                        <CardDescription>Learn how you can contribute to OpenReactHub</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/docs/contributing" className="flex items-center justify-center">
                                Read Contributing Guide
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}