import mixpanel from 'mixpanel-browser';
import React, { FC, ReactNode } from 'react';
import packageJson from '../package.json';



// In your trackIconUsage method:

interface TrackingConfig {
    projectToken?: string;
    debug?: boolean;
    enableTracking?: boolean;

}

class IconTracker {
    private static PROJECT_TOKEN = process.env.MIXPANEL_PROJECT_TOKEN || '';
    private initialized = false;
    private config: TrackingConfig = {
        projectToken: '',
        debug: false,
        enableTracking: true
    };

    initialize(config: TrackingConfig = {}) {
        this.config = {
            ...this.config,
            ...config,
            projectToken: config.projectToken || IconTracker.PROJECT_TOKEN
        };

        try {
            mixpanel.init(this.config.projectToken, {
                debug: this.config.debug,
                track_pageview: true,
                persistence: 'localStorage',
                opt_out_tracking_by_default: false
            });
            this.initialized = true;
        } catch (error) {
            console.warn('Tracking initialization failed', error);
        }
    }

    private static detectEnvironment() {
        return {
            framework: typeof window !== 'undefined' && (window as any).React ? 'React' : 'Unknown',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
            language: typeof navigator !== 'undefined' ? navigator.language : 'N/A'
        };
    }

    trackIconUsage(iconName: string, metadata: Record<string, any> = {}) {
        if (!this.initialized) {
            this.initialize();
        }

        try {
            mixpanel.track('icon_used', {
                icon_name: iconName,
                package_version: packageJson.version,
                auto_tracked: true,
                environment: IconTracker.detectEnvironment(),
                ...metadata
            });
        } catch { }
    }

    createTrackedIcon(IconComponent: FC<any>, iconName: string): FC<any> {
        return (props: any) => {
            this.trackIconUsage(iconName, {
                props: Object.keys(props)
            });
            return <IconComponent {...props} />;
        };
    }

    identifyUser(userId: string, userProperties?: Record<string, any>) {
        try {
            mixpanel.identify(userId);
            if (userProperties) {
                mixpanel.people.set(userProperties);
            }
        } catch { }
    }

    optIn() {
        this.config.enableTracking = true;
        mixpanel.opt_in_tracking();
    }

    optOut() {
        this.config.enableTracking = false;
        mixpanel.opt_out_tracking();
    }
}

export const iconTracker = new IconTracker();