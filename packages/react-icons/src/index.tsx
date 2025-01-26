import { packageTracker, PackageTracker } from './PackageTracker';
import { OpenReactHubIconsProps } from './types';

PackageTracker.setProjectToken('1234567890abcdef');

packageTracker.trackPackageUsage({
    environment: 'production',
    project_type: 'react',
});

export { MenuIcon } from './icons/Menu';
export { CodeIcon } from './icons/Code';
export { OrhIcon } from './icons/OrhIcon';
export { WebUtilityXIcon } from './icons/WebUtilityXIcon';


export type { OpenReactHubIconsProps as default }