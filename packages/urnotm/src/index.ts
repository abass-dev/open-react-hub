import { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { getCurrentLocation, getDeviceType, getOrCreateSessionId, getReferrerInfo, getUserIP } from './helpers';
import type { AnalyticsData, LocationData, UrNMContextType } from './types';

// Determine environment variables
const getHostname = () => {
    if (typeof window !== 'undefined') {
        return window.location.hostname;
    }
    return '';
};

const defaultUrNMContext: UrNMContextType = {
    isUrNM: false,
    setIsUrNM: () => { },
    urNMSendAnalytics: async () => false,
    domain: '',
    isDevelopment: false,
    isProduction: false,
    mainRef: { current: null },
};

// Create and export the context
export const UrNMContext = createContext<UrNMContextType>(defaultUrNMContext);

export function useUrNM() {
    return useContext(UrNMContext);
}

interface UrNMProviderProps {
    children: React.ReactNode;
}

export function UrNMProvider({ children }: UrNMProviderProps) {
    const [isUrNM, setIsUrNM] = useState<boolean>(false);
    const [startTime] = useState<number>(typeof window !== 'undefined' ? performance.now() : 0);
    const mainRef = useRef<HTMLElement>(null);

    const [domain, setDomain] = useState<string>('');
    const [isDevelopment, setIsDevelopment] = useState<boolean>(false);
    const [isProduction, setIsProduction] = useState<boolean>(false);

    // Initialize environment variables after mount
    useEffect(() => {
        const hostname = getHostname();
        const isDev = hostname === 'localhost' || hostname.includes('.local') || process.env.NODE_ENV === 'development';
        const isProd = !isDev && process.env.NODE_ENV === 'production';

        setDomain(hostname);
        setIsDevelopment(isDev);
        setIsProduction(isProd);
    }, []);

    const urNMSendAnalytics = useCallback(async (data: Partial<AnalyticsData>): Promise<boolean> => {
        if (typeof window === 'undefined') return false;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_URNOTM_ANALYTICS_API_URL || 'http://localhost:3000/api/urntm-analytics';
            const referrerInfo = getReferrerInfo();

            // Ensure all required data is present
            const enrichedData: AnalyticsData = {
                ...data,
                domain: data.domain || domain,
                event: data.event || 'unknown',
                referrerInfo,
                userAgent: window.navigator.userAgent,
                referrer: document.referrer,
                sessionId: getOrCreateSessionId(),
                deviceType: getDeviceType(),
                timeSpent: Math.round((performance.now() - startTime) / 1000),
            };

            // Validate location data
            if (data.location) {
                const location: LocationData = {
                    city: data.location.city,
                    country: data.location.country,
                    latitude: data.location.latitude,
                    longitude: data.location.longitude,
                };
                enrichedData.location = location;
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(enrichedData),
            });

            if (!response.ok) {
                throw new Error(`Analytics API error: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Error sending analytics:', error);
            return false;
        }
    }, [domain, startTime]);

    useEffect(() => {
        let isSubscribed = true;

        const checkUrNM = async () => {
            if (typeof window === 'undefined' || !domain || !isDevelopment) return;

            try {
                const ip = await getUserIP();
                const response = await fetch(
                    'http://localhost:3000/api/get-urntm-location',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ip }),
                    }
                );

                if (!response.ok) throw new Error('Failed to fetch location data');

                const locationData = await response.json();
                const geoLocation = await getCurrentLocation();

                const location: LocationData = {
                    city: locationData.city || geoLocation?.city,
                    country: locationData.country || geoLocation?.country,
                    latitude: geoLocation?.latitude,
                    longitude: geoLocation?.longitude,
                };

                if (isSubscribed) {
                    await urNMSendAnalytics({
                        domain,
                        event: 'page_view',
                        location,
                        sessionId: getOrCreateSessionId(),
                        referrer: document.referrer,
                        timeSpent: Math.round((performance.now() - startTime) / 1000),
                        deviceType: getDeviceType(),
                        userAgent: navigator.userAgent,
                    });
                }
            } catch (error) {
                console.error('Error in checkUrNM:', error);
            }
        };

        checkUrNM();

        return () => {
            isSubscribed = false;
        };
    }, [domain, isDevelopment, startTime, urNMSendAnalytics]);

    const contextValue = useMemo(() => ({
        isUrNM,
        setIsUrNM,
        urNMSendAnalytics,
        domain,
        isDevelopment,
        isProduction,
        mainRef,
    }), [isUrNM, urNMSendAnalytics, domain, isDevelopment, isProduction]);

    return (
        <UrNMContext.Provider value= { contextValue } >
        { children }
        </UrNMContext.Provider>
    );
}