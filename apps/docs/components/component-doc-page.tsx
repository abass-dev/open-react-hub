import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from '@open-react-hub/code-block'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'

interface ComponentDocPageProps {
    title: string
    componentName: string
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
    componentName,
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
            <Tabs defaultValue="preview" className="mt-8 w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="installation">Installation</TabsTrigger>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                </TabsList>

                {/* Preview Tab */};
                <TabsContent value="preview" className="mt-6 max-w-[100vw] overflow-hidden">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-chau-philomene-one text-3xl lg:text-4xl">Live Preview</CardTitle>
                            <CardDescription>{`Experiment with the ${componentName} component using the controls below`}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PreviewComponent />

                            {/* Props Table */}
                            {props.length > 0 && (
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold">Props</CardTitle>
                                        <CardDescription>Detailed information about the component's props</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[400px]">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[150px]">Prop</TableHead>
                                                        <TableHead className="w-[150px]">Type</TableHead>
                                                        <TableHead className="w-[100px]">Required</TableHead>
                                                        <TableHead className="w-[150px]">Default</TableHead>
                                                        <TableHead>Description</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {props.map((prop) => (
                                                        <TableRow key={prop.name}>
                                                            <TableCell className="font-medium">{prop.name}</TableCell>
                                                            <TableCell>
                                                                <code className="px-1 py-0.5 rounded bg-muted">{prop.type}</code>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge variant={prop.required ? "default" : "secondary"}>{prop.required ? "Yes" : "No"}</Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                {prop.defaultValue ? (
                                                                    <code className="px-1 py-0.5 rounded bg-muted">{prop.defaultValue}</code>
                                                                ) : (
                                                                    "-"
                                                                )}
                                                            </TableCell>
                                                            <TableCell>{prop.description}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Installation Tab */}
                <TabsContent value="installation" className="mt-6 max-w-[100vw] overflow-hidden">
                    <Card className="overflow-hidden">
                        {/* Basic Installation */}
                        <CardHeader>
                            <CardTitle className='font-chau-philomene-one lg:text-4xl text-3xl'>Installation</CardTitle>
                            <CardDescription>{`Here's how you can install the ${componentName} component in your project:`}</CardDescription>
                        </CardHeader>
                        <CardContent className="max-w-[100vw] pt-2 overflow-hidden">
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
                            <CardTitle className='font-chau-philomene-one lg:text-4xl text-3xl'>Usage</CardTitle>
                            <CardDescription>{`Here's a basic example of how to use the ${componentName} component in your project:`}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 overflow-hidden">
                            <CodeBlock code={usageCode} language="jsx" />
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
        </div >
    )
}
