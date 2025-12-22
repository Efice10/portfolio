'use client';

import { AppFooter } from '@/components/layouts/app-footer';
import { AppSidebar } from '@/components/layouts/app-sidebar';
import { HeaderUser } from '@/components/layouts/header-user';
import { NotificationBell } from '@/components/shared';
import { ThemeToggle } from '@/components/theme-toggle';
import { DynamicBreadcrumb } from '@/components/ui/dynamic-breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

// Mock user data - should come from auth context in real app
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/avatars/user.jpg',
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-card/80 backdrop-blur-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <div className='transition-transform duration-150 ease-out hover:scale-110 active:scale-95'>
              <SidebarTrigger className='-ml-1' />
            </div>
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4'
            />
            <DynamicBreadcrumb />
          </div>
          <div className='flex items-center gap-2 px-4'>
            <NotificationBell />
            <ThemeToggle />
            <HeaderUser user={userData} />
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 pb-8'>{children}</main>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
