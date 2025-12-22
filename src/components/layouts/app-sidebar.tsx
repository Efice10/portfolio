'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Building2,
  HelpCircle,
  LayoutDashboard,
  type LucideIcon,
  Settings,
  Sparkles,
  Users,
  FileText,
  Bell,
  FolderKanban,
} from 'lucide-react';

import { TeamSwitcher } from '@/components/layouts/team-switcher';
import { NavBubbleItem } from '@/components/shared';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

// Types
interface NavItemType {
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: string;
}

interface NavSection {
  label: string;
  items: NavItemType[];
}

// Mock company data
const companyData = [
  {
    name: 'Acme Inc',
    logo: Building2,
    plan: 'Enterprise',
  },
];

// Navigation structure - FLAT, no nested submodules
// Settings/submodules should use hub pages with cards
const navigationSections: NavSection[] = [
  {
    label: 'Main',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Team',
        url: '/team',
        icon: Users,
      },
      {
        title: 'Projects',
        url: '/projects',
        icon: FolderKanban,
      },
      {
        title: 'Documents',
        url: '/documents',
        icon: FileText,
      },
      {
        title: 'Notifications',
        url: '/notifications',
        icon: Bell,
      },
    ],
  },
  {
    label: 'Other',
    items: [
      {
        title: 'Settings',
        url: '/dashboard/settings',
        icon: Settings,
      },
    ],
  },
];

// AI Feature item (special styling)
const aiFeatureItem: NavItemType = {
  title: 'AI Assistant',
  url: '/ai',
  icon: Sparkles,
  badge: 'Beta',
};

// Help item
const helpItem: NavItemType = {
  title: 'Help & Support',
  url: '/help',
  icon: HelpCircle,
};

// Navigation item component - simplified, no nested items
function NavItem({ item }: { item: NavItemType }) {
  const pathname = usePathname();
  const isActive = pathname === item.url || pathname.startsWith(`${item.url  }/`);

  return (
    <SidebarMenuItem>
      <NavBubbleItem>
        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title} className="neon-hover">
          <Link href={item.url}>
            {item.icon && <item.icon className='h-4 w-4' />}
            <span>{item.title}</span>
            {item.badge && (
              <span className='ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'>
                {item.badge}
              </span>
            )}
          </Link>
        </SidebarMenuButton>
      </NavBubbleItem>
    </SidebarMenuItem>
  );
}

// AI Feature special button
function AIFeatureButton({ item }: { item: NavItemType }) {
  const pathname = usePathname();
  const isActive = pathname === item.url;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
        className={cn(
          'group relative overflow-hidden',
          'bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-violet-500/10',
          'hover:from-violet-500/20 hover:via-fuchsia-500/20 hover:to-violet-500/20',
          'border border-violet-500/20'
        )}
      >
        <Link href={item.url}>
          {item.icon && (
            <item.icon className='h-4 w-4 text-violet-500 dark:text-violet-400' />
          )}
          <span className='bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text font-medium text-transparent dark:from-violet-400 dark:to-fuchsia-400'>
            {item.title}
          </span>
          {item.badge && (
            <span className='ml-auto rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-600 dark:text-violet-400'>
              {item.badge}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={companyData} />
      </SidebarHeader>
      <SidebarContent>
        {navigationSections.map((section, index) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map(item => (
                <NavItem key={item.url} item={item} />
              ))}
            </SidebarMenu>
            {index < navigationSections.length - 1 && <SidebarSeparator />}
          </SidebarGroup>
        ))}

        {/* AI Feature - Special Section */}
        <SidebarGroup>
          <SidebarGroupLabel>AI Features</SidebarGroupLabel>
          <SidebarMenu>
            <AIFeatureButton item={aiFeatureItem} />
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Help & Support */}
        <SidebarGroup>
          <SidebarMenu>
            <NavItem item={helpItem} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
