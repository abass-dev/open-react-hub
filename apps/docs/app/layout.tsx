import './globals.css'
import { Chau_Philomene_One } from 'next/font/google'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: 'OpenReactHub Documentation',
  description: 'Documentation for OpenReactHub, an open-source React and Next.js component library',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  // Optional: Add theme color to match manifest
  themeColor: '#ffffff',
}

const fraunChauPhilomeneOneces = Chau_Philomene_One({
  subsets: ['latin'],
  weight: "400",
  variable: '--font-chau-philomene-one',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunChauPhilomeneOneces.variable} ${GeistSans.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <div className="flex w-full min-h-screen bg-background">
              <div className="hidden h-screen border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block">
                <AppSidebar />
              </div>
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}