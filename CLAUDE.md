# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## CRITICAL DESIGN PATTERNS (READ FIRST)

### 1. NEVER Use Modals for Create/Edit Forms

**ALWAYS navigate to a new page** for create/edit operations. Do NOT use popup modals.

```
/employees              → List page with ModernTable
/employees/new          → Create form page (NEW PAGE)
/employees/[id]         → Detail/View page
/employees/[id]/edit    → Edit form page (NEW PAGE)
```

**Why?**
- Better UX on mobile
- Forms don't get cut off
- Users can bookmark/share URLs
- Better accessibility
- Cleaner code separation

**Example - Add New Button:**
```tsx
// ✅ CORRECT - Navigate to new page
<Link href="/employees/new">
  <Button><Plus className="mr-2 h-4 w-4" />Add Employee</Button>
</Link>

// ❌ WRONG - Don't use modal
<Dialog>
  <DialogTrigger><Button>Add Employee</Button></DialogTrigger>
  <DialogContent><EmployeeForm /></DialogContent>
</Dialog>
```

### 2. Hub Page Pattern (Not Nested Sidebar)

When a module has sub-sections, use **card-based hub pages** instead of deeply nested sidebar menus.

**DON'T:**
```
Sidebar:
├── Payroll
│   ├── Processing    ← Too many submodules
│   ├── Payments
│   ├── History
│   └── Settings
```

**DO:**
```
Sidebar:
├── Payroll  → Opens hub page with navigation cards
```

**Hub Page Example:**
```tsx
// /payroll/page.tsx - Hub page with cards
const payrollOptions = [
  { title: 'Process Payroll', href: '/payroll/processing', icon: Calculator },
  { title: 'Payments', href: '/payroll/payments', icon: CreditCard },
  { title: 'History', href: '/payroll/history', icon: History },
];

export default function PayrollPage() {
  return (
    <PageTransition>
      <PageHeader title="Payroll" />
      <div className="grid gap-6 md:grid-cols-3">
        {payrollOptions.map((option) => (
          <Link key={option.href} href={option.href}>
            <motion.div whileHover={{ scale: 1.02, y: -4 }} className="card">
              <option.icon className="h-6 w-6" />
              <h3>{option.title}</h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </PageTransition>
  );
}
```

### 3. Always Use These Components

| Component | When to Use |
|-----------|-------------|
| `ModernTable` | ALL data lists - never plain HTML tables |
| `StatCard` / `StatCardGrid` | KPI/statistics display |
| `PageHeader` | Top of every page |
| `PageTransition` | Wrap all page content |
| `Skeleton` components | During loading states |
| `EmptyState` | When no data to display |
| `GlassCard` / `SimpleGlassCard` | Card containers |
| `BackLink` | Return navigation on detail/edit pages |

### 4. Loading States with Skeletons

**ALWAYS show skeletons during loading:**

```tsx
import { TableSkeleton, StatCardSkeleton, PageSkeleton } from '@/components/shared';

// Page loading
{loading ? <PageSkeleton /> : <PageContent />}

// Table loading
{loading ? <TableSkeleton rows={5} columns={4} /> : <ModernTable ... />}

// Stats loading
{loading ? (
  <div className="grid gap-4 md:grid-cols-4">
    {[1,2,3,4].map(i => <StatCardSkeleton key={i} />)}
  </div>
) : (
  <StatCardGrid>...</StatCardGrid>
)}
```

### 5. Standard Page Structure

```tsx
// Every list page should follow this structure:
export default function MyModulePage() {
  return (
    <PageTransition>
      {/* 1. Page Header with Add Button */}
      <PageHeader title="Module Name" description="Description">
        <Link href="/module/new">
          <Button><Plus className="mr-2 h-4 w-4" />Add New</Button>
        </Link>
      </PageHeader>

      {/* 2. Stats Cards */}
      <StatCardGrid columns={4}>
        <StatCard label="Total" value={100} />
        <StatCard label="Active" value={80} variant="success" />
        <StatCard label="Pending" value={15} variant="warning" />
        <StatCard label="Inactive" value={5} variant="danger" />
      </StatCardGrid>

      {/* 3. Data Table */}
      <ModernTable
        data={data}
        columns={columns}
        rowActions={rowActions}
        onRowClick={(row) => router.push(`/module/${row.id}`)}
        searchable
        emptyTitle="No records found"
      />
    </PageTransition>
  );
}
```

### 6. Create/Edit Page Structure

```tsx
// /module/new/page.tsx or /module/[id]/edit/page.tsx
export default function CreateModulePage() {
  return (
    <PageTransition>
      {/* Back link to list */}
      <BackLink href="/module" label="Back to List" />

      {/* Page header */}
      <PageHeader title="Create New Item" />

      {/* Form in a card */}
      <SimpleGlassCard className="max-w-2xl p-6">
        <ModuleForm onSuccess={() => router.push('/module')} />
      </SimpleGlassCard>
    </PageTransition>
  );
}
```

---

## Development Commands

### Core Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production app with Turbopack
- `npm run start` - Start production server
- `npm run ci` - Run full CI pipeline (type-check, lint, format)

### Code Quality

- `npm run lint` - Fix linting issues automatically
- `npm run lint:check` - Check linting without fixing
- `npm run type-check` - TypeScript type checking without build
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without fixing

### Analysis

- `npm run analyze` - Analyze bundle size with ANALYZE=true

## Architecture Overview

### Route Groups & Layouts

This Next.js 15 app uses route groups with distinct layouts:

- **`(public)`** - Landing page, accessible without auth
- **`(auth)`** - Login, signup, forgot-password with centered auth layout
- **`(protected)`** - Dashboard and settings with sidebar layout

Each route group has its own layout component that defines the UI structure.

### Animation Architecture

The app uses a **server-side rendering + client component animation** pattern:

**Pages are server-side rendered** for SEO and performance, while animations are isolated in reusable client components:

- `AnimatedPage` - Generic page transitions (horizontal, vertical, fade)
- `AnimatedDashboard` - Dashboard-specific animations with staggered cards
- `AnimatedLanding` - Landing page hero and scroll-triggered sections

**Pattern:** Pages import animation wrapper components instead of being client components themselves.

#### Hybrid Animation Approach

The app uses a **hybrid animation strategy** combining Tailwind CSS and Framer Motion for optimal performance:

**Use Tailwind CSS for:**

- ✅ **Simple hover effects** - `hover:scale-105`, `hover:-translate-y-0.5`
- ✅ **Basic transitions** - `transition-all duration-150 ease-out`
- ✅ **State changes** - `active:scale-[0.98]`, `focus:ring-2`

**Use Framer Motion for:**

- ✅ **Complex page transitions** - Entry/exit animations with coordinated timing
- ✅ **Scroll-triggered animations** - `useInView` with staggered reveals
- ✅ **Multi-step sequences** - Orchestrated animation chains
- ✅ **Physics-based animations** - Spring animations and advanced easing

**Example Pattern:**

```tsx
// Good: Hybrid approach
<motion.div
  className='transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg'
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay }}
>
  {children}
</motion.div>
```

**Benefits:**

- **Better performance** - CSS transitions are hardware-accelerated
- **Smaller bundle** - Less JavaScript for simple interactions
- **Progressive enhancement** - Hover effects work without JavaScript
- **Consistent timing** - Standardized duration classes (`duration-150`, `duration-300`)

### Authentication System

Mock authentication system with Zustand state management:

- **AuthStore** - Zustand store in `src/lib/auth-store.ts`
- **AuthInitializer** - Client component that runs auth check on app load
- **Persistent storage** - User state persisted with Zustand middleware
- **Cookie-based tokens** - Uses secure cookies for token storage
- **Selectors** - Individual action selectors (`useLogin`, `useLogout`, `useSignup`) + data selectors (`useUser`, `useAuthLoading`)

**TODO markers** indicate where real API integration should replace mock implementations.

### UI Component System

Built on **Radix UI + Tailwind + shadcn/ui** foundation:

- **Base components** in `src/components/ui/` (Button, Card, Input, etc.)
- **Form validation** with React Hook Form + Zod
- **Notifications** with Sonner toast system
- **Icons** from Lucide React

### State Management

- **Global state** - Zustand for authentication and shared state
- **Authentication** - Zustand store with persistence middleware
- **Forms** - React Hook Form with Zod validation
- **UI state** - Component-level useState
- **Animations** - Framer Motion with useInView hooks

## Key Patterns

### Form Handling

All forms follow the same pattern:

1. Zod schema for validation (`src/lib/validations/`)
2. React Hook Form with zodResolver
3. Custom hook for submission logic (`useAuthForm`)
4. Animated error states with Framer Motion

### State Management with Zustand

When adding new global state:

1. Create stores in `src/lib/` directory
2. Use `create()` function with TypeScript interfaces
3. Add persist middleware for data that should survive page refreshes
4. Create optimized selectors for better performance
5. Keep actions in the store, handle navigation in components

### Animation Implementation

When adding animations:

1. Keep pages server-side rendered
2. Create reusable animated wrapper components
3. Use `useInView` for scroll-triggered animations
4. Implement consistent enter/exit transitions

### File Organization

- **Route handlers** - Pages in app directory (server-side)
- **Reusable components** - `src/components/`
- **Animation components** - `src/components/ui/animated-*`
- **Business logic** - `src/lib/` and `src/hooks/`
- **Type definitions** - `src/types/`
- **Validation schemas** - `src/lib/validations/`

## Code Quality Standards

### Pre-commit Hooks

Husky + lint-staged automatically:

- Fixes ESLint issues
- Formats code with Prettier
- Runs on staged files only

### TypeScript

- Strict mode enabled
- Proper type definitions in `src/types/`
- No any types allowed
- Export types from components when needed

### Import Organization

Uses ESLint import/order rules for consistent import ordering with automatic fixing via `npm run lint`.

## Technology Stack

### Core Framework

- **Next.js 15** with App Router
- **React 19** with latest features
- **TypeScript 5** with strict configuration

### State Management

- **Zustand 5** for global state management
- **Persist middleware** for state persistence

### Styling & UI

- **Tailwind CSS 4** for styling
- **Radix UI** for accessible components
- **Framer Motion 12** for animations
- **Lucide React** for icons

### Forms & Validation

- **React Hook Form** for form handling
- **Zod** for schema validation
- **@hookform/resolvers** for integration

### Development Tools

- **Turbopack** for fast builds and dev server
- **ESLint** with comprehensive rule set
- **Prettier** with Tailwind plugin
- **Husky** for Git hooks

## Page File Organization Guidelines

To maintain clean, maintainable code and prevent bloated page files, follow these architectural patterns:

### Page File Structure

**Page files should ONLY contain:**

- Metadata exports (`metadata`, `generateMetadata`)
- Server component wrapper with minimal logic
- Animation wrapper (if needed)
- Direct child component import

```tsx
// ✅ GOOD - Clean page file
import type { Metadata } from 'next';

import { DashboardContent } from '@/components/dashboard/dashboard-content';
import { AnimatedDashboard } from '@/components/ui/animated-dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Welcome to your dashboard.',
};

export default function DashboardPage() {
  return (
    <AnimatedDashboard>
      <DashboardContent />
    </AnimatedDashboard>
  );
}
```

### What NOT to Put in Page Files

❌ **Avoid in page files:**

- Complex business logic
- Multiple component definitions
- Data fetching logic
- Form handling
- State management
- Heavy computation
- Multiple imports from different domains

```tsx
// ❌ BAD - Bloated page file
export default function BadPage() {
  const [state, setState] = useState();
  const { data } = useSWR('/api/data');

  const handleSubmit = async data => {
    // Complex form logic...
  };

  const complexCalculation = () => {
    // Heavy computation...
  };

  return <div>{/* Lots of JSX and logic */}</div>;
}
```

### Component Organization Patterns

#### 1. Content Components Pattern

Create dedicated content components for complex pages:

```
src/components/dashboard/
├── dashboard-content.tsx    # Main content logic
├── dashboard-sidebar.tsx    # Sidebar component
├── dashboard-layout.tsx     # Layout wrapper
└── index.ts                 # Barrel exports
```

#### 2. Feature-Based Organization

Group related components by feature:

```
src/components/settings/
├── profile-settings.tsx
├── security-settings.tsx
├── notification-settings.tsx
└── settings-layout.tsx
```

#### 3. Separation of Concerns

**Pages** → Route definition + metadata
**Layouts** → Structure + navigation  
**Components** → UI + interaction logic
**Hooks** → Reusable logic
**Utils** → Pure functions
**Store** → State management

### Animation Integration

Use animation wrapper components to keep pages clean:

```tsx
// Animation wrapper (client component)
// src/components/ui/animated-page.tsx
'use client';
import { motion } from 'framer-motion';

export function AnimatedPage({ children, animation = 'fade' }) {
  return <motion.div {...animationProps}>{children}</motion.div>;
}

// Page file (server component)
import { AnimatedPage } from '@/components/ui/animated-page';
import { PageContent } from '@/components/page-content';

export default function Page() {
  return (
    <AnimatedPage animation='slide-horizontal'>
      <PageContent />
    </AnimatedPage>
  );
}
```

### Best Practices Summary

1. **Keep pages thin** - Maximum 30 lines for complex pages
2. **Use barrel exports** - Clean imports with `index.ts` files
3. **Separate client/server logic** - Use proper component boundaries
4. **Extract custom hooks** - Move reusable logic to hooks
5. **Create layout components** - Don't repeat structure
6. **Use proper TypeScript** - Export types from dedicated files
7. **Always run CI after changes** - Execute `npm run ci` to ensure type safety, linting, and formatting before considering work complete

### Code Organization Checklist

Before adding code to a page file, ask:

- [ ] Is this metadata or routing logic? → Keep in page
- [ ] Is this UI structure/layout? → Move to layout component
- [ ] Is this business logic? → Move to custom hook
- [ ] Is this reusable? → Move to shared component
- [ ] Is this data fetching? → Move to data layer
- [ ] Is this complex? → Break into smaller components

Following these patterns ensures maintainable, testable, and scalable code architecture.

## Settings Layout Convention

The settings section uses a **dedicated layout pattern** to eliminate code duplication and ensure consistency.

### Settings Directory Structure

```
src/app/(protected)/dashboard/settings/
├── layout.tsx              # Settings layout wrapper (applies to all settings pages)
├── page.tsx                # General settings (main settings page)
├── profile/page.tsx        # Profile settings
├── security/page.tsx       # Security settings
└── notifications/page.tsx  # Notification settings
```

### Layout Architecture

#### Settings Layout (`settings/layout.tsx`)

**Purpose:** Automatically applies `SettingsLayout` component to all settings pages

```tsx
import type { Metadata } from 'next';
import { SettingsLayout } from '@/components/settings/settings-layout';

export const metadata: Metadata = {
  title: {
    template: '%s | Settings', // Creates "Profile | Settings", "Security | Settings", etc.
    default: 'Settings',
  },
  description: 'Manage your account settings and preferences.',
};

export default function SettingsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
```

#### Individual Settings Pages

**Pattern:** Clean, focused pages that only render their specific component

```tsx
import type { Metadata } from 'next';
import { ProfileSettings } from '@/components/settings/profile-settings';

export const metadata: Metadata = {
  title: 'Profile', // Will become "Profile | Settings" via template
  description: 'Manage your public profile information and personal details.',
};

export default function ProfileSettingsPage() {
  return <ProfileSettings />; // No layout wrapper needed!
}
```

### Benefits of This Convention

#### Developer Experience

- **DRY Principle** - No repeated `<SettingsLayout>` imports in every page
- **Automatic consistency** - All settings pages inherit the same layout
- **Easy maintenance** - Layout changes apply to all settings pages
- **Clean code** - Pages focus only on their specific content

#### SEO & Performance

- **Template metadata** - Consistent title patterns across settings
- **Page-specific descriptions** - Each page has unique meta description
- **Layout caching** - React can cache the shared layout component
- **Better navigation** - Consistent sidebar state across settings

### Adding New Settings Pages

To add a new settings page:

1. **Create the settings component** in `src/components/settings/`:

   ```tsx
   // src/components/settings/billing-settings.tsx
   export function BillingSettings() {
     return <div>Billing content</div>;
   }
   ```

2. **Create the page file** in the settings directory:

   ```tsx
   // src/app/(protected)/dashboard/settings/billing/page.tsx
   import type { Metadata } from 'next';
   import { BillingSettings } from '@/components/settings/billing-settings';

   export const metadata: Metadata = {
     title: 'Billing',
     description: 'Manage your billing information and subscription.',
   };

   export default function BillingSettingsPage() {
     return <BillingSettings />;
   }
   ```

3. **Update navigation** in `settings-layout.tsx` to add the new page to the sidebar

**That's it!** The layout, animations, and navigation are automatically applied.

### Settings Component Architecture

Settings components should use the **animated settings components** for consistency:

```tsx
import {
  AnimatedSettings,
  AnimatedSettingsCard,
  AnimatedSettingsForm,
  AnimatedSettingsSection,
} from '@/components/ui/animated-settings';

export function MySettings() {
  return (
    <div className='space-y-6'>
      <AnimatedSettingsCard>
        <h2 className='text-2xl font-bold'>My Settings</h2>
        <p className='text-muted-foreground'>Description</p>
      </AnimatedSettingsCard>

      <AnimatedSettingsForm onSubmit={handleSubmit}>
        {/* Form content */}
      </AnimatedSettingsForm>
    </div>
  );
}
```

### Migration from Old Pattern

**❌ Old Pattern (Don't use):**

```tsx
// DON'T DO THIS - Violates DRY principle
import { SettingsLayout } from '@/components/settings/settings-layout';
import { MySettings } from '@/components/settings/my-settings';

export default function MySettingsPage() {
  return (
    <SettingsLayout>
      {' '}
      {/* ❌ Repeated in every settings page */}
      <MySettings />
    </SettingsLayout>
  );
}
```

**✅ New Pattern (Use this):**

```tsx
// ✅ Clean, DRY pattern
import { MySettings } from '@/components/settings/my-settings';

export default function MySettingsPage() {
  return <MySettings />; // ✅ Layout applied automatically
}
```

This convention ensures **maintainable, consistent settings architecture** across the entire application.

## Deployment Notes

This template is optimized for **Vercel deployment** but can be deployed anywhere that supports Next.js.

Key considerations:

- Uses server-side rendering for better SEO
- Authentication is cookie-based (secure for production)
- All animations are client-side hydrated
- Bundle analysis available with `npm run analyze`

## Modern Table Component System

### Overview

The codebase uses a unified **ModernTable** component for all data tables across main modules. This provides consistent styling, functionality, and user experience.

### Importing ModernTable

```tsx
import {
  ModernTable,
  StatCard,
  type ColumnDef,
  type RowAction,
  type RowHighlight,
} from '@/components/shared';
```

### Column Definition Pattern

Define columns with the `ColumnDef<T>` type:

```tsx
const columns: ColumnDef<MyRecord>[] = [
  {
    id: 'unique-id',
    header: 'Column Header',
    accessorKey: 'fieldName', // Optional: for simple field access
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <span className='font-medium'>{row.fieldName}</span>
      </div>
    ),
    sortable: true, // Optional: enable sorting
    width: '150px', // Optional: fixed width
  },
];
```

### Row Actions Pattern

Define row actions with the `RowAction<T>` type:

```tsx
const rowActions: RowAction<MyRecord>[] = [
  {
    id: 'view',
    label: 'View Details',
    icon: Eye,
    onClick: (record) => {
      window.location.href = `/path/${record.id}`;
    },
  },
  { id: 'divider-1', divider: true }, // Separator
  {
    id: 'delete',
    label: 'Delete',
    icon: Trash2,
    variant: 'destructive', // or 'danger'
    onClick: (record) => console.log('Delete:', record.id),
    hidden: (record) => record.status !== 'Pending', // Conditional visibility
  },
];
```

### Row Highlight Pattern

Use `RowHighlight` type for row color coding:

```tsx
function getRowHighlight(record: MyRecord): RowHighlight {
  if (record.status === 'Approved') return 'success'; // Green
  if (record.status === 'Pending') return 'warning'; // Yellow
  if (record.status === 'Rejected') return 'danger'; // Red
  if (record.status === 'Info') return 'info'; // Blue
  return null; // No highlight
}
```

**Available highlight values:** `'success' | 'warning' | 'danger' | 'info' | 'new' | null`

### ModernTable Usage

```tsx
<ModernTable
  data={filteredRecords}
  columns={columns}
  keyExtractor={(row) => row.id.toString()}
  rowActions={rowActions}
  getRowHighlight={getRowHighlight}
  enableRowHighlight // Shows row colors by default (can be toggled)
  searchable // Enables search bar
  searchPlaceholder='Search records...'
  emptyTitle='No records found'
  emptyDescription='Try adjusting your filters'
  emptyIcon={Search}
  cardRenderer={CardRenderer} // Optional: for card view mode
/>
```

### Card View Renderer

For card view mode, provide a card renderer function:

```tsx
function CardRenderer(record: MyRecord) {
  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-3'>
        <Avatar className='h-12 w-12'>
          <AvatarImage src={record.image} />
          <AvatarFallback>{getInitials(record.name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className='font-semibold'>{record.name}</p>
          <p className='text-sm text-muted-foreground'>{record.position}</p>
        </div>
      </div>
      {/* Additional card content */}
    </div>
  );
}
```

### Complete Example

```tsx
'use client';

import { Eye, Trash2, Search } from 'lucide-react';
import {
  ModernTable,
  StatCard,
  type ColumnDef,
  type RowAction,
  type RowHighlight,
} from '@/components/shared';

interface LeaveRecord {
  id: string;
  type: string;
  dateFrom: string;
  dateTo: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

// Column definitions
const leaveColumns: ColumnDef<LeaveRecord>[] = [
  {
    id: 'id',
    header: 'ID',
    accessorKey: 'id',
    cell: ({ row }) => <span className='font-medium'>{row.id}</span>,
  },
  {
    id: 'type',
    header: 'Type',
    accessorKey: 'type',
  },
  {
    id: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <>
        {formatDate(row.dateFrom)} - {formatDate(row.dateTo)}
      </>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge>{row.status}</Badge>,
  },
];

// Row actions
const leaveRowActions: RowAction<LeaveRecord>[] = [
  {
    id: 'view',
    label: 'View Details',
    icon: Eye,
    onClick: (record) => console.log('View:', record.id),
  },
  {
    id: 'cancel',
    label: 'Cancel',
    icon: Trash2,
    variant: 'destructive',
    onClick: (record) => console.log('Cancel:', record.id),
    hidden: (record) => record.status !== 'Pending',
  },
];

// Row highlight
function getLeaveRowHighlight(record: LeaveRecord): RowHighlight {
  if (record.status === 'Approved') return 'success';
  if (record.status === 'Pending') return 'warning';
  if (record.status === 'Rejected') return 'danger';
  return null;
}

// Usage
function LeaveTabContent() {
  const stats = {
    total: records.length,
    approved: records.filter(r => r.status === 'Approved').length,
    pending: records.filter(r => r.status === 'Pending').length,
  };

  return (
    <div className='space-y-6'>
      {/* Stats Cards */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard label='Total Records' value={stats.total} />
        <StatCard label='Approved' value={stats.approved} variant='success' />
        <StatCard label='Pending' value={stats.pending} variant='warning' />
      </div>

      {/* Table */}
      <ModernTable
        data={records}
        columns={leaveColumns}
        keyExtractor={(row) => row.id}
        rowActions={leaveRowActions}
        getRowHighlight={getLeaveRowHighlight}
        enableRowHighlight
        searchable
        searchPlaceholder='Search leave records...'
        emptyTitle='No leave records'
        emptyDescription='You have no leave records yet'
      />
    </div>
  );
}
```

## StatCard Component

### Usage

```tsx
import { StatCard, StatCardGrid } from '@/components/shared';
import { Clock, CheckCircle2 } from 'lucide-react';

// Basic usage
<StatCard label='Total Days' value={25} />

// With variant (colors the card)
<StatCard label='On Time' value={18} variant='success' />
<StatCard label='Late' value={5} variant='danger' />
<StatCard label='Early' value={2} variant='info' />
<StatCard label='Pending' value={3} variant='warning' />

// With icon
<StatCard label='Completed' value={10} icon={CheckCircle2} variant='success' />

// With trend indicator
<StatCard
  label='Revenue'
  value='$12,450'
  trend={{ value: '+12%', direction: 'up' }}
/>

// Grid layout
<StatCardGrid columns={4}>
  <StatCard label='Total' value={100} />
  <StatCard label='Active' value={85} variant='success' />
  <StatCard label='Pending' value={10} variant='warning' />
  <StatCard label='Inactive' value={5} variant='danger' />
</StatCardGrid>
```

### StatCard Props

```tsx
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  subtitle?: string;
  className?: string;
  animate?: boolean; // Enable animated counter (default: true)
  sparklineData?: number[]; // Mini trend chart data
}
```

## Reference Files for New Features

When creating new modules or features, ALWAYS refer to these existing implementations:

### Main Modules with ModernTable

- **Admin Users**: `src/components/admin/admin-users-content.tsx`
- **Admin Employees**: `src/components/admin/admin-employees-content.tsx`
- **Employees Page**: `src/app/(protected)/employees/page.tsx`
- **My Records**: `src/components/my-records/my-records-content.tsx`
- **Attendance Check-in**: `src/components/apply/apply-attendance-content.tsx`
- **Site Visit**: `src/components/apply/apply-site-visit-content.tsx`

### Shared Components

- **ModernTable**: `src/components/shared/modern-table/index.tsx`
- **StatCard**: `src/components/shared/stat-card.tsx`
- **StatusBadge**: `src/components/shared/status-badge.tsx`
- **FilterBar**: `src/components/shared/filter-bar.tsx`
- **PageHeader**: `src/components/shared/page-header.tsx`
- **GlassCard**: `src/components/shared/glass-card.tsx`
- **EmptyState**: `src/components/shared/empty-state.tsx`

### Component Import Pattern

Always use barrel exports from shared:

```tsx
import {
  PageHeader,
  StatCard,
  StatCardGrid,
  StatusBadge,
  FilterBar,
  ModernTable,
  SimpleGlassCard,
  type ColumnDef,
  type RowAction,
  type RowHighlight,
} from '@/components/shared';
```

## Creating New Module Checklist

When creating a new module with data tables:

1. **Define Types** - Create interface for the data record
2. **Create Column Definitions** - Define `ColumnDef<T>[]` array
3. **Create Row Actions** - Define `RowAction<T>[]` array
4. **Create Row Highlight Function** - Return appropriate `RowHighlight` based on status
5. **Add Stats Section** - Use `StatCard` components for key metrics
6. **Implement ModernTable** - Use with all required props
7. **Add Filters** - Implement search/filter state with appropriate UI
8. **Create Card Renderer** (optional) - For card view mode support

### Workflow Reference

When implementing workflows (apply/approval flows), refer to:

- **Leave Application**: `src/components/apply/apply-leave-content.tsx`
- **Claim Application**: `src/components/apply/apply-claim-content.tsx`
- **Attendance**: `src/components/apply/apply-attendance-content.tsx`
- **Site Visit**: `src/components/apply/apply-site-visit-content.tsx`

### Admin Module Reference

For admin CRUD modules, refer to:

- **User Management**: `src/components/admin/admin-users-content.tsx`
- **Employee Management**: `src/components/admin/admin-employees-content.tsx`

## Design System Patterns

### Glass Card / Modern Card Pattern

```tsx
import { SimpleGlassCard } from '@/components/shared';

const GlassCard = SimpleGlassCard; // Alias for local use

<GlassCard className='p-6'>
  {/* Card content */}
</GlassCard>
```

### Status Badge Pattern

```tsx
import { StatusBadge, getStatusType } from '@/components/shared';

<StatusBadge status={record.status.toLowerCase()} />

// Or with Badge component
function getStatusBadge(status: string) {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    Pending: 'secondary',
    Approved: 'default',
    Rejected: 'destructive',
  };
  return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
}
```

### Filter Header Pattern

For tables with filters above:

```tsx
<GlassCard className='overflow-hidden'>
  {/* Header with filters */}
  <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
    <div className='flex items-center justify-between mb-3'>
      <h3 className='font-semibold'>Records</h3>
      {hasFilters && (
        <Button variant='ghost' size='sm' onClick={clearFilters}>
          <X className='h-3 w-3 mr-1' />
          Clear
        </Button>
      )}
    </div>
    <div className='flex flex-wrap gap-3'>
      {/* Filter controls */}
    </div>
  </div>

  {/* ModernTable inside */}
  <ModernTable ... />
</GlassCard>
```

### Tab Filter Pattern

For pending/completed style filters:

```tsx
<div className='flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800'>
  <button
    onClick={() => setTab('pending')}
    className={cn(
      'px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5',
      tab === 'pending'
        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
    )}
  >
    <Clock className='h-3 w-3' />
    Pending
    <Badge variant='secondary' className='ml-1 h-5 px-1.5 text-xs rounded-full'>
      {pendingCount}
    </Badge>
  </button>
  <button
    onClick={() => setTab('completed')}
    className={cn(
      'px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5',
      tab === 'completed'
        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
    )}
  >
    <CheckCircle2 className='h-3 w-3' />
    Completed
    <Badge variant='secondary' className='ml-1 h-5 px-1.5 text-xs rounded-full'>
      {completedCount}
    </Badge>
  </button>
</div>
```

## Date Formatting Helpers

```tsx
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-MY', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-MY', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
  }).format(amount);
}
```

---

## Modern UI/UX Design System (2025+)

This HR system follows a **futuristic design philosophy** that prioritizes modern aesthetics, smooth interactions, and premium user experience. All new features must adhere to these design principles.

### Design Philosophy

The system aims to feel **premium, intelligent, and modern** - not like a typical admin panel. Key differentiators:

- **Narrative-driven dashboards** - Data tells a story, not just displays numbers
- **Micro-interactions everywhere** - Every hover, click, and scroll feels alive
- **Neo-glassmorphism hybrid** - Modern glass effects without being overwhelming
- **Context preservation** - Users never feel lost during navigation

### Neo-Glassmorphism Hybrid UI

The primary visual style combining soft shadows, subtle glass effects, and depth layers:

**Characteristics:**
- Semi-transparent panels with backdrop blur
- Soft shadows (not harsh drop-shadows)
- Blue/purple/emerald neon accents
- Smooth depth layers
- Rounded corners (8-16px)

**Implementation:**
```tsx
// Glass Card Pattern
<div className="rounded-xl border border-white/10 bg-white/80 backdrop-blur-sm shadow-lg dark:bg-gray-900/80">
  {/* Content */}
</div>

// Use SimpleGlassCard from shared components
import { SimpleGlassCard } from '@/components/shared';

<SimpleGlassCard className="p-6">
  {/* Content */}
</SimpleGlassCard>
```

**Where to apply:**
- Dashboard cards and stat widgets
- Navigation drawers and sidebars
- Modal dialogs and popovers
- Employee profile cards
- KPI summary sections

### Modern Table Design Patterns

Tables are NOT boring data grids - they are interactive, visual dashboards.

**Required Table Features:**
- ✅ **Soft card rows** - Each row feels like a mini-card with hover lift
- ✅ **No heavy borders** - Use spacing and subtle separators
- ✅ **Row hover actions** - Edit/Delete buttons appear on hover
- ✅ **Row highlighting** - Color-coded status (success/warning/danger/info)
- ✅ **Sticky headers** - Always visible when scrolling
- ✅ **Expandable rows** - Click to reveal additional details
- ✅ **Media-rich cells** - Avatars, badges, progress bars, sparklines

**Visual Styling:**
```tsx
// Row styling pattern
<tr className="group transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50">
  <td className="p-4">
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  </td>
</tr>

// Hover actions pattern
<div className="opacity-0 group-hover:opacity-100 transition-opacity">
  <Button variant="ghost" size="sm">Edit</Button>
</div>
```

**Typography:**
- Row text: 14px
- Header text: 13-14px, medium weight
- Secondary text: 12px, muted gray
- Row height: 48-56px
- Cell padding: 12-16px

### Micro-Animations (Required)

Every interaction should have subtle feedback animations:

**Hover Effects:**
```tsx
// Card hover with lift
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  className="transition-shadow hover:shadow-lg"
>

// Button hover
<button className="transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]">
```

**Number Animations:**
- Use ticker/counter animations for KPI values
- Numbers should "roll up" from 0 to actual value
- Use `motion.span` with `animate={{ value }}` pattern

**List Animations:**
```tsx
// Staggered list animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map((item) => (
    <motion.div key={item.id} variants={item}>
      {/* Content */}
    </motion.div>
  ))}
</motion.div>
```

**Page Transitions:**
- Fade + slide for page navigation
- Spring animations for modals/drawers
- 150-300ms duration for most transitions

### Dynamic KPI Cards

KPI cards should be visually engaging, not static:

**Required Features:**
- ✅ Ticker counters (numbers animate)
- ✅ Radial progress rings for completion stats
- ✅ Mini sparkline charts
- ✅ Color-coded alerts (green/yellow/red)
- ✅ Trend indicators (up/down arrows with percentages)
- ✅ Icon integration

```tsx
import { StatCard, StatCardGrid } from '@/components/shared';

<StatCardGrid columns={4}>
  <StatCard
    label="Total Employees"
    value={150}
    icon={Users}
    variant="info"
    trend={{ value: '+5%', direction: 'up' }}
  />
  <StatCard
    label="On Time"
    value="92%"
    icon={CheckCircle2}
    variant="success"
  />
  <StatCard
    label="Late"
    value={12}
    icon={Clock}
    variant="danger"
  />
</StatCardGrid>
```

### Modern Breadcrumb Patterns

Breadcrumbs are navigation AND context indicators:

**Style:**
- Minimal typography with simple separators (`/` or `›`)
- Icons for each module (🏠 Home › 👥 Employees › John Doe)
- Previous levels in low contrast, current page in high contrast
- Hover highlights with animated underlines

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/payroll">Payroll</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Process</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Modern CRUD Patterns

**DO NOT** use traditional modals for create/edit operations. Instead use:

**1. Slide-In Panels / Side Drawers:**
- Forms slide in from the right
- Preserves context of main page
- Width: 400-700px on desktop
- Smooth slide + fade animations

**2. Inline Expand / Accordion:**
- Rows expand inline to show details
- No context lost, lightweight
- Works well for lists

**3. Full-Page Transitions:**
- Smooth slide or fade transitions
- Breadcrumbs show hierarchy
- Back button returns smoothly

```tsx
// Drawer pattern using Sheet component
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetContent className="w-[500px] sm:w-[600px]">
    <SheetHeader>
      <SheetTitle>Edit Employee</SheetTitle>
    </SheetHeader>
    <div className="space-y-4 py-4">
      {/* Form content */}
    </div>
  </SheetContent>
</Sheet>
```

### Interactive Navigation

**Sidebar Navigation:**
- Neon bubble hover effect follows cursor
- Menu items glow softly on hover
- Light ripple animation on click
- Collapsible sections with smooth transitions

```tsx
// NavBubbleItem component for hover effect
import { NavBubbleItem } from '@/components/shared';

<NavBubbleItem>
  <SidebarMenuButton className="neon-hover">
    <Link href={item.url}>
      <item.icon className="h-4 w-4" />
      <span>{item.title}</span>
    </Link>
  </SidebarMenuButton>
</NavBubbleItem>
```

**Hub Page Pattern:**
Use card-based navigation for module landing pages:

```tsx
// Hub page with animated cards
const payrollOptions = [
  { title: 'Process Payroll', href: '/payroll/processing', icon: Calculator, color: 'text-blue-600', bgColor: 'bg-blue-500/10' },
  { title: 'Payments', href: '/payroll/payments', icon: CreditCard, color: 'text-emerald-600', bgColor: 'bg-emerald-500/10' },
  { title: 'History', href: '/payroll/history', icon: History, color: 'text-violet-600', bgColor: 'bg-violet-500/10' },
];

<motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {payrollOptions.map((option) => (
    <Link key={option.href} href={option.href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-lg cursor-pointer"
      >
        <div className={cn('inline-flex rounded-xl p-3 mb-4', option.bgColor)}>
          <option.icon className={cn('h-6 w-6', option.color)} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
        <p className="text-sm text-muted-foreground">{option.description}</p>
      </motion.div>
    </Link>
  ))}
</motion.div>
```

### Color System

**Status Colors:**
- Success: `emerald-500/600` (green)
- Warning: `amber-500/600` (yellow)
- Danger: `rose-500/600` (red)
- Info: `blue-500/600` (blue)
- Primary: `violet-500/600` (purple)

**Module Accent Colors:**
```tsx
// Each module has a signature color
const moduleColors = {
  payroll: { color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
  attendance: { color: 'text-cyan-600', bg: 'bg-cyan-500/10' },
  leave: { color: 'text-green-600', bg: 'bg-green-500/10' },
  claims: { color: 'text-orange-600', bg: 'bg-orange-500/10' },
  employees: { color: 'text-violet-600', bg: 'bg-violet-500/10' },
  settings: { color: 'text-slate-600', bg: 'bg-slate-500/10' },
};
```

**Dark Mode:**
- Use `dark:` variants for all colors
- Glass effects: `dark:bg-gray-900/80`
- Borders: `dark:border-gray-700`
- Text: `dark:text-gray-100`

### Tab-Based Workflows

For multi-status workflows (like payroll processing):

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const statusTabs = [
  { status: 'Pending', total: 5 },
  { status: 'In Process', total: 3 },
  { status: 'Confirmed', total: 8 },
  { status: 'Paid', total: 15 },
];

<Tabs value={activeStatus} onValueChange={setActiveStatus}>
  <TabsList className="w-full justify-start overflow-x-auto">
    {statusTabs.map(tab => (
      <TabsTrigger key={tab.status} value={tab.status}>
        {tab.status} ({tab.total})
      </TabsTrigger>
    ))}
  </TabsList>

  {statusTabs.map(tab => (
    <TabsContent key={tab.status} value={tab.status}>
      {/* Tab content */}
    </TabsContent>
  ))}
</Tabs>
```

### PageHeader Component

Use consistent page headers across all pages:

```tsx
import { PageHeader } from '@/components/shared';

<PageHeader
  title="Process Payroll"
  description="December 2024 • 150 employees"
>
  <Button variant="outline">
    <Settings className="mr-2 h-4 w-4" />
    Settings
  </Button>
</PageHeader>
```

### Design Checklist for New Features

Before submitting a new feature, verify:

- [ ] Uses glass card patterns where appropriate
- [ ] Tables follow modern table design (soft rows, hover actions, media-rich)
- [ ] KPI cards animate and have proper variants
- [ ] Page transitions are smooth (not abrupt)
- [ ] Hover effects on interactive elements
- [ ] Proper color coding for statuses
- [ ] Breadcrumbs show full navigation path
- [ ] Forms use slide-in drawers (not modals) where possible
- [ ] Mobile responsive with stacked cards
- [ ] Dark mode support
- [ ] No heavy borders or boxy grid layouts
- [ ] Consistent spacing (4px grid system)
- [ ] Icons from Lucide React library

### Design Reference Files

When implementing new UI, reference these files:

**Design Documentation:**
- `/prd/ui-ux-design-system/` - Complete design system documentation
- `Futuristic_HR_System_Design_Detailed.md` - Design philosophy
- `modern-table-designs.md` - Table design patterns
- `Modern_Table_Design_Guide.md` - Table implementation guide
- `Modern_Breadcrumb_Design_Guide.md` - Breadcrumb patterns
- `Modern_CRUD_UI_Patterns.md` - CRUD interaction patterns

**Implementation Examples:**
- `src/app/(protected)/payroll/page.tsx` - Hub page with cards
- `src/components/payroll/payroll-processing-content.tsx` - Tab-based workflow
- `src/components/shared/modern-table/` - ModernTable implementation
- `src/components/shared/stat-card.tsx` - KPI card component
- `src/components/layouts/app-sidebar.tsx` - Navigation with hover effects
