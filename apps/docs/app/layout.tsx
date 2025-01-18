import './globals.css'
import { Chau_Philomene_One, Inter, Roboto } from 'next/font/google'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: 'OpenReactHub Documentation',
  description: 'Documentation for OpenReactHub, an open-source React and Next.js component library',
}


const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

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

