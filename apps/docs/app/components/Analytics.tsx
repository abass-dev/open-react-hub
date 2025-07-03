'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
    interface Window {
        gtag: (
            type: 'event' | 'config' | 'consent' | 'js' | 'set',
            googleAnalyticsId: string,
            options?: {
                page_path?: string;
                [key: string]: any;
            }
        ) => void;
        dataLayer: any[];
    }
}

interface AnalyticsProps {
    GA_MEASUREMENT_ID?: string
    ADS_ID?: string
}

export default function Analytics({ GA_MEASUREMENT_ID, ADS_ID }: AnalyticsProps) {
    useEffect(() => {
        // Initialize dataLayer if it doesn't exist
        if (typeof window !== 'undefined' && !window.dataLayer) {
            window.dataLayer = []
        }
    }, [])

    // Don't render anything if no IDs are provided
    if (!GA_MEASUREMENT_ID && !ADS_ID) {
        console.warn('Analytics: No measurement IDs provided')
        return null
    }

    return (
        <>
            {/* Google Analytics */}
            {GA_MEASUREMENT_ID && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                        strategy="afterInteractive"
                        onLoad={() => {
                            console.log('Google Analytics loaded successfully')
                        }}
                        onError={(e) => {
                            console.error('Failed to load Google Analytics:', e)
                        }}
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        onError={(e) => {
                            console.error('Google Analytics configuration error:', e)
                        }}
                    >
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
            `}
                    </Script>
                </>
            )}

            {/* Google Ads */}
            {ADS_ID && (
                <>
                    <Script
                        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${ADS_ID}`}
                        strategy="afterInteractive"
                        crossOrigin="anonymous"
                        onLoad={() => {
                            console.log('Google Ads loaded successfully')
                        }}
                        onError={(e) => {
                            console.error('Failed to load Google Ads:', e)
                        }}
                    />
                    <Script
                        id="google-ads-init"
                        strategy="afterInteractive"
                        onError={(e) => {
                            console.error('Google Ads initialization error:', e)
                        }}
                    >
                        {`
              window.adsbygoogle = window.adsbygoogle || [];
            `}
                    </Script>
                </>
            )}
        </>
    )
}