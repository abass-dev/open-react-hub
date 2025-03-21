'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, FileText, Cpu, Lightbulb, Terminal, Code, Search, TextIcon, CodeSquareIcon, MessageCircle } from 'lucide-react'
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
import { LucideIcon } from 'lucide-react'
import { ThemeAwareLogo } from './ThemeAwareLogo'
import { WebUtilityXIcon } from '@open-react-hub/react-icons'

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
}

interface ComponentGroup {
  title: string
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
}

interface OutOfTheBoxGroup {
  title: string
  items: {
    title: string
    url: string
    icon: any
  }[]
}

const docsNavItems: NavItem[] = [
  { title: 'Introduction', url: '/docs', icon: FileText },
  { title: 'Getting Started', url: '/docs/getting-started', icon: Lightbulb },
  { title: 'Theming', url: '/docs/theming', icon: Package },
  { title: 'CLI', url: '/docs/cli', icon: Terminal },
  { title: 'Developing CLI', url: '/docs/contributing/developing-cli', icon: Code },
  { title: 'Discussions', url: '/discussions', icon: MessageCircle },
]

const componentsNavItems: ComponentGroup[] = [
  {
    title: 'Text Animations',
    items: [
      { title: 'Split Text', url: '/components/text-animations/split-text', icon: TextIcon },
    ]
  },
  {
    title: 'Others',
    items: [
      { title: 'Code Block', url: '/components/code-block', icon: CodeSquareIcon },
    ]
  },
]


const OutOfTheBoxNavItems: OutOfTheBoxGroup[] = [
  {
    title: 'Web Tools',
    items: [
      { title: 'WebUtilityX', url: 'https://apps.abassdev.com', icon: WebUtilityXIcon },
    ]
  }
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="h-full" side="right">
      <SidebarHeader className="border-b px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2" aria-label="Go to OpenReactHub home">
          <ThemeAwareLogo />
        </Link>
        <div className="lg:hidden p-2" aria-hidden="true">
          <Cpu className="h-5 w-5" />
        </div>
      </SidebarHeader>
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
                {componentsNavItems.map((group) => (
                  <SidebarMenuItem key={group.title}>
                    <React.Fragment>
                      <SidebarGroupLabel className="text-sm font-medium px-2 py-1">{group.title}</SidebarGroupLabel>
                      <SidebarMenu>
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === item.url}
                              className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 ${pathname === item.url ? 'bg-accent text-primary' : 'hover:bg-accent'
                                }`}
                            >
                              <Link href={item.url} aria-current={pathname === item.url ? 'page' : undefined}>
                                {item.icon && <item.icon className="h-4 w-4" aria-hidden="true" />}
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </React.Fragment>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-semibold px-2 mt-6">Out of the Box</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {OutOfTheBoxNavItems.map((group) => (
                  <SidebarMenuItem key={group.title}>
                    <React.Fragment>
                      <SidebarGroupLabel className="text-sm font-medium px-2 py-1">{group.title}</SidebarGroupLabel>
                      <SidebarMenu>
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === item.url}
                              className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 ${pathname === item.url ? 'bg-accent text-primary' : 'hover:bg-accent'
                                }`}
                            >
                              <Link href={item.url} aria-current={pathname === item.url ? 'page' : undefined}>
                                {item.icon && <item.icon className="h-4 w-4" aria-hidden="true" />}
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </React.Fragment>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  )
}