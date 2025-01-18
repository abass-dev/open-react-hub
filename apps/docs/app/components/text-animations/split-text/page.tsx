import ComponentDocPage from '@/components/component-doc-page'
import { SplitTextPreview } from '@/components/split-text-preview'

const splitTextProps = [
    {
        name: 'text',
        type: 'string',
        description: 'The text to be split and animated.',
        required: true
    },
    {
        name: 'delay',
        type: 'number',
        description: 'The initial delay before the animation starts, in milliseconds.',
        defaultValue: '0'
    },
    {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes to apply to the container span.'
    }
]

export default function SplitTextPage() {
    return (
        <ComponentDocPage
            title="Split Text Component"
            description="A customizable React component for splitting and animating text."
            installCommand="npm install @open-react-hub/split-text @react-spring/web"
            usageCode={`import { SplitText } from '@open-react-hub/split-text';

function MyComponent() {
  return (
    <SplitText text="This text will be split and animated!" delay={0} />
  );
}`}
            PreviewComponent={SplitTextPreview}
            props={splitTextProps}
            metadata={{
                title: 'Split Text Component',
                description: 'Documentation for the Split Text component in OpenReactHub'
            }}
        />
    )
}