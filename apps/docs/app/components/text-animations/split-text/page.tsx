"use client"
import ComponentDocPage from '@/components/component-doc-page'
import { SplitTextPreview } from '@/components/split-text-preview'
import { SplitText} from '@open-react-hub/split-text'


const splitTextProps = [
    {
        name: 'text',
        type: 'string',
        default: `''`,
        description: 'The text to split and animate.',
    },
    {
        name: 'className',
        type: 'string',
        default: `''`,
        description: 'Additional CSS classes for styling the container.',
    },
    {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Initial delay (in milliseconds) before the animation starts.',
    },
    {
        name: 'speed',
        type: 'number',
        default: '1',
        description: 'Multiplier for the animation speed (higher = faster, lower = slower).',
    },
    {
        name: 'easing',
        type: '(t: number) => number',
        default: 'undefined',
        description: 'Custom easing function to control the animation curve.',
    },
    {
        name: 'direction',
        type: `'up' | 'down' | 'left' | 'right'`,
        default: `'up'`,
        description: 'The direction from which the animation starts.',
    },
    {
        name: 'pause',
        type: 'boolean',
        default: 'false',
        description: 'Pauses or resumes the animation.',
    },
    {
        name: 'repeat',
        type: 'number',
        default: '1',
        description: 'Number of times the animation should repeat. Use `0` for infinite repeats.',
    },
    {
        name: 'staggerDelay',
        type: 'number',
        default: '30',
        description: 'Delay (in milliseconds) between animating each character.',
    },
    {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        description: 'Enables infinite animation looping (alternative to `repeat={0}`).',
    },
    {
        name: 'onComplete',
        type: '() => void',
        default: 'undefined',
        description: 'Callback function that fires when a single animation cycle completes.',
    },
    {
        name: 'highlightOnHover',
        type: 'boolean',
        default: 'false',
        description: 'Adds hover effects for each character.',
    },
    {
        name: 'hoverColor',
        type: 'string',
        default: `'red'`,
        description: 'Specifies the color for hover effects (requires `highlightOnHover`).',
    },
];

export default function SplitTextDocPage() {
    return (
        <ComponentDocPage
            componentName="Split Text"
            title="Split Text Component"
            description="A customizable React component for splitting and animating text."
            installCommand="npm install @open-react-hub/split-text @react-spring/web"
            alternativeInstallationCommands={[
    {
        name: 'Using ORH CLI',
        description:
            'This command attempts to install the package using npm. If npm installation fails, it will fall back to GitHub. If both methods fail, the ORH CLI will throw an error exception, providing details about the issue.',
        installCommand: 'orh add ui/split-text',
    },
    {
        name: 'Using npx & ORH CLI',
        installCommand: 'npx @open-react-hub/split-text add @open-react-hub/split-text',
    },
    {
        name: 'Install from GitHub using the ORH Global CLI',
        description:
            'By using this command, the SplitText package will be installed directly from GitHub. However, you may need to install the required dependency `@react-spring/web` manually using `npm install` or `yarn add`.',
        installCommand: 'orh github add ui/split-text',
    },
    {
        name: 'Using Yarn',
        description:
            'Install the SplitText package along with its required dependency `@react-spring/web` using Yarn.',
        installCommand: 'yarn add @open-react-hub/split-text @react-spring/web',
    },
]}

            usageCode={`import { SplitText } from '@open-react-hub/split-text';

function MyComponent() {
  return (
    <SplitText 
      text="This text will be split and animated!" 
      delay={500} 
      speed={1.5} 
      direction="left" 
      repeat={3} 
      highlightOnHover={true} 
      hoverColor="blue" 
    />
  );
}`}
            PreviewComponent={SplitTextPreview}
            props={splitTextProps}
            metadata={{
                title: 'Split Text Component',
                description: 'Documentation for the Split Text component in OpenReactHub',
            }}
        />
    );
}
