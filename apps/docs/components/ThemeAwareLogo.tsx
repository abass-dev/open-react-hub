'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export function ThemeAwareLogo() {
    const { theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch by mounting after client-side hydration
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-[150px] h-[32px]" /> // Placeholder with same dimensions
        )
    }

    return (
        <Image
            src={theme === 'dark' ? '/orh-logo-white.png' : '/orh-logo.png'}
            alt="Open React Hub - Open Source React Components and Documentation"
            width={150}
            height={32}
            priority={true}
            quality={95}
            className="max-w-[150px] h-auto"
        />
    )
}