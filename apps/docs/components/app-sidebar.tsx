'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, FileText, Cpu, Lightbulb, Terminal, Code, Search, TextIcon, LucideProps, Code2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

const docsNavItems = [
  { title: 'Introduction', url: '/docs', icon: FileText },
  { title: 'Getting Started', url: '/docs/getting-started', icon: Lightbulb },
  { title: 'Theming', url: '/docs/theming', icon: Package },
  { title: 'CLI', url: '/docs/cli', icon: Terminal },
  { title: 'Developing CLI', url: '/docs/contributing/developing-cli', icon: Code },
]

const componentsNavItems = [
  {
    title: 'Text Animations',
    items: [
      { title: 'Split Text', url: '/components/text-animations/split-text', icon: TextIcon },
    ]
  },
  {
    title: 'Others',
    items: [
      { title: 'Code Block', url: '/components/code-block', icon: Code2 },
    ]
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setMobileOpen] = React.useState(false)

  const toggleMobileSidebar = () => setMobileOpen((prev) => !prev)

  return (
    <Sidebar className="h-full" side="right">
      <SidebarHeader className="border-b px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2" aria-label="Go to OpenReactHub home">
          <Package className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">OpenReactHub</span>
        </Link>
        <button
          className="lg:hidden p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={toggleMobileSidebar}
          aria-label="Toggle sidebar"
        >
          <Cpu className="h-5 w-5" />
        </button>
      </SidebarHeader>
      <div className={`lg:block ${isMobileOpen ? 'block' : 'hidden'}`}>
        <ScrollArea className="flex-1">
          <SidebarContent className="p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9"
                  aria-label="Search documentation and components"
                />
              </div>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel className="text-base font-semibold px-2">Documentation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {docsNavItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 ${pathname === item.url ? 'bg-accent text-primary' : 'hover:bg-accent'
                          }`}
                      >
                        <Link href={item.url} aria-current={pathname === item.url ? 'page' : undefined}>
                          <item.icon className="h-4 w-4" aria-hidden="true" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="text-base font-semibold px-2 mt-6">Components</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {componentsNavItems.map((item) => (
                    <SidebarMenuItem key={item.url || item.title}>
                      {item.url ? (
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.url}
                          className={`flex w-full items-center rounded-lg px-2 py-2 ${pathname === item.url ? 'bg-accent text-primary' : 'hover:bg-accent'
                            }`}
                        >
                          <Link href={item.url} aria-current={pathname === item.url ? 'page' : undefined}>
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      ) : (
                        <React.Fragment>
                          <SidebarGroupLabel className="text-sm font-medium px-2 py-1">{item.title}</SidebarGroupLabel>
                          <SidebarMenu>
                            {item.items.map((subItem) => (
                              <SidebarMenuItem key={subItem.url}>
                                <SidebarMenuButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                  className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 ${pathname === subItem.url ? 'bg-accent text-primary' : 'hover:bg-accent'
                                    }`}
                                >
                                  <Link href={subItem.url} aria-current={pathname === subItem.url ? 'page' : undefined}>
                                    {subItem.icon && <subItem.icon className="h-4 w-4" aria-hidden="true" />}
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </React.Fragment>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </ScrollArea>
      </div>
    </Sidebar>
  )
}

