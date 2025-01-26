import mixpanel from 'mixpanel-browser';
import packageJson from '../package.json';

interface TrackingConfig {
    projectToken?: string;
    debug?: boolean;
    enableTracking?: boolean;
}

class PackageTracker {
    private static instance: PackageTracker;
    private static PROJECT_TOKEN = '';
    private initialized = false;

    private constructor() { }

    static getInstance() {
        if (!PackageTracker.instance) {
            PackageTracker.instance = new PackageTracker();
        }
        return PackageTracker.instance;
    }

    static setProjectToken(token: string) {
        PackageTracker.PROJECT_TOKEN = token;
    }

    private initialize(config: TrackingConfig = {}) {
        if (!PackageTracker.PROJECT_TOKEN) {
            console.warn('Mixpanel project token not set');
            return;
        }

        try {
            mixpanel.init(PackageTracker.PROJECT_TOKEN, {
                debug: config.debug || false,
                track_pageview: true,
                persistence: 'localStorage'
            });
            this.initialized = true;
        } catch (error) {
            console.warn('Tracking initialization failed', error);
        }
    }

    trackPackageUsage(metadata: Record<string, any> = {}) {
        if (!this.initialized) {
            this.initialize();
        }

        try {
            mixpanel.track('package_used', {
                package_name: packageJson.name,
                package_version: packageJson.version,
                ...metadata
            });
        } catch { }
    }
}

export const packageTracker = PackageTracker.getInstance();
export { PackageTracker };