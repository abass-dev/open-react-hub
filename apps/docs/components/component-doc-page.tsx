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
    alternativeInstallationCommands?: Array<{
        name: string
        description?: string
        installCommand: string
    }>
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
    alternativeInstallationCommands = [],
    props = [],
}: ComponentDocPageProps) {
    return (
        <div className="flex justify-center flex-col overflow-hidden">
            {/* Header */}
            <div className="flex flex-col px-3 gap-4">
                <h1 className="text-4xl font-bold lg:text-5xl">{title}</h1>
                <p className="text-xl text-muted-foreground">{description}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="preview" className="mt-8 max-w-[100vw] px-3 overflow-hidden">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="installation">Installation</TabsTrigger>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                </TabsList>

                {/* Preview Tab */}
                <TabsContent value="preview" className="mt-6 max-w-[100vw] overflow-hidden">
                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle>Live Preview</CardTitle>
                            <CardDescription>Experiment with the component using the controls below</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PreviewComponent />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Installation Tab */}
                <TabsContent value="installation" className="mt-6 max-w-[100vw] overflow-hidden">
                    <Card className="overflow-hidden">
                        <CardContent className="max-w-[100vw] pt-2 overflow-hidden">
                            {/* Basic Installation */}
                            <h3 className="text-lg font-semibold">Basic Installation</h3>
                            <CodeBlock
                                code={installCommand}
                                isCommandLine={false}
                                overwriteLanguageLabel="Terminal"
                                language="bash"
                                showLineNumbers={false}
                                className="mb-4"
                            />

                            {/* Alternative installation commands */}
                            {alternativeInstallationCommands.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Alternative Installation Methods</h3>
                                    {alternativeInstallationCommands.map((cmd) => (
                                        <div key={cmd.name} className="space-y-2">
                                            <h4 className="text-md font-medium">{cmd.name}</h4>
                                            <p className="text-sm text-muted-foreground">{cmd.description}</p>
                                            <CodeBlock
                                                code={cmd.installCommand}
                                                isCommandLine={false}
                                                overwriteLanguageLabel="Terminal"
                                                language="bash"
                                                showLineNumbers={false}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Usage Tab */}
                <TabsContent value="usage" className="mt-6 max-w-[100vw] overflow-hidden">
                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle>Usage</CardTitle>
                            <CardDescription>Learn how to use the component in your project</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 overflow-hidden">
                            <p className="text-sm text-muted-foreground">
                                Here's a basic example of how to use the component:
                            </p>
                            <CodeBlock code={usageCode} language="jsx" />

                            {/* Props Table */}
                            {props.length > 0 && (
                                <>
                                    <h3 className="text-lg font-semibold mt-6">Props</h3>
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="py-2">Prop</th>
                                                    <th className="py-2">Type</th>
                                                    <th className="py-2">Required</th>
                                                    <th className="py-2">Default</th>
                                                    <th className="py-2">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.map((prop) => (
                                                    <tr key={prop.name} className="border-b">
                                                        <td className="py-2 text-primary font-medium">{prop.name}</td>
                                                        <td className="py-2">{prop.type}</td>
                                                        <td className="py-2">{prop.required ? 'Yes' : 'No'}</td>
                                                        <td className="py-2">
                                                            {prop.defaultValue ? (
                                                                <code className="text-muted-foreground">{prop.defaultValue}</code>
                                                            ) : (
                                                                '-'
                                                            )}
                                                        </td>
                                                        <td className="py-2">{prop.description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Explore & Contribute Section */}
            <div className="mt-12 max-w-[100vw] px-3 overflow-hidden grid gap-6 md:grid-cols-2">
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
