'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import {
  Users,
  FolderKanban,
  FileText,
  Clock,
  Plus,
  ArrowRight,
  Calendar,
  Bell,
  Settings,
} from 'lucide-react';

import {
  PageHeader,
  PageTransition,
  StatCard,
  StatCardGrid,
  SimpleGlassCard,
  LiveActivityTimeline,
  type Activity,
} from '@/components/shared';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Demo activity data
const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'new_hire',
    title: 'New team member joined',
    description: 'Alice Johnson joined the Engineering team',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    user: { name: 'Alice Johnson' },
  },
  {
    id: '2',
    type: 'leave_approved',
    title: 'Leave request approved',
    description: 'Carol White - 3 days annual leave',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    user: { name: 'Carol White' },
  },
  {
    id: '3',
    type: 'document_uploaded',
    title: 'Document uploaded',
    description: 'Q4 Report has been uploaded',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    user: { name: 'Bob Smith' },
  },
  {
    id: '4',
    type: 'profile_update',
    title: 'Profile updated',
    description: 'David Brown updated his profile',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    user: { name: 'David Brown' },
  },
];

// Quick stats
const stats = {
  totalMembers: 24,
  activeProjects: 8,
  pendingTasks: 12,
  upcomingEvents: 3,
};

// Helper
function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
}

export default function DashboardPage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Page Header */}
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's an overview of your workspace."
        >
          <Link href="/team/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </Link>
        </PageHeader>

        {/* Stats Cards */}
        <StatCardGrid columns={4}>
          <StatCard
            label="Total Members"
            value={stats.totalMembers}
            icon={Users}
            variant="info"
            trend={{ value: '+12%', direction: 'up' }}
          />
          <StatCard
            label="Active Projects"
            value={stats.activeProjects}
            icon={FolderKanban}
            variant="success"
          />
          <StatCard
            label="Pending Tasks"
            value={stats.pendingTasks}
            icon={Clock}
            variant="warning"
          />
          <StatCard
            label="Upcoming Events"
            value={stats.upcomingEvents}
            icon={Calendar}
            variant="primary"
          />
        </StatCardGrid>

        {/* Quick Actions - Hub Page Pattern */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/team">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-lg cursor-pointer transition-shadow"
              >
                <div className="inline-flex rounded-xl p-3 mb-4 bg-blue-500/10">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Team Members</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  View and manage your team members
                </p>
                <span className="text-sm text-primary font-medium inline-flex items-center">
                  View Team <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </motion.div>
            </Link>

            <Link href="/projects">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-lg cursor-pointer transition-shadow"
              >
                <div className="inline-flex rounded-xl p-3 mb-4 bg-emerald-500/10">
                  <FolderKanban className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Projects</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Track project progress and tasks
                </p>
                <span className="text-sm text-primary font-medium inline-flex items-center">
                  View Projects <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </motion.div>
            </Link>

            <Link href="/documents">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-lg cursor-pointer transition-shadow"
              >
                <div className="inline-flex rounded-xl p-3 mb-4 bg-violet-500/10">
                  <FileText className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Documents</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Access and manage documents
                </p>
                <span className="text-sm text-primary font-medium inline-flex items-center">
                  View Documents <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Two Column Layout: Activity + Quick Links */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <LiveActivityTimeline
              activities={recentActivities}
              title="Recent Activity"
              maxItems={4}
            />
          </div>

          {/* Quick Links */}
          <div>
            <SimpleGlassCard className="p-6">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="rounded-lg bg-gray-500/10 p-2">
                    <Settings className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Settings</p>
                    <p className="text-xs text-muted-foreground">Configure preferences</p>
                  </div>
                </Link>

                <Link
                  href="/notifications"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="rounded-lg bg-amber-500/10 p-2">
                    <Bell className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Notifications</p>
                    <p className="text-xs text-muted-foreground">View all notifications</p>
                  </div>
                </Link>

                <Link
                  href="/team/new"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <Plus className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Add Member</p>
                    <p className="text-xs text-muted-foreground">Invite new team member</p>
                  </div>
                </Link>
              </div>
            </SimpleGlassCard>

            {/* Team Preview */}
            <SimpleGlassCard className="p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Team</h3>
                <Link href="/team" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="flex -space-x-2">
                {['Alice J', 'Bob S', 'Carol W', 'David B'].map((name, i) => (
                  <Avatar key={i} className="h-10 w-10 border-2 border-background">
                    <AvatarFallback className="text-xs">{getInitials(name)}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="h-10 w-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                  +20
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                24 team members across 5 departments
              </p>
            </SimpleGlassCard>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
