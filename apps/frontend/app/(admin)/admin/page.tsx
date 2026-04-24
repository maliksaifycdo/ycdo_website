'use client';

import DashboardStats from '@/components/admin/DashboardStats';
import QuickActions from '@/components/admin/QuickActions';
import RecentContacts from '@/components/admin/RecentContacts';
import RecentDonations from '@/components/admin/RecentDonations';
import { useAuthStore } from '@/store/authStore';

export default function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="mt-1 text-slate-600">
          Welcome back{user?.name ? <>, {user.name}</> : null}
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]">
        <div className="min-w-0 lg:max-w-none">
          <RecentDonations />
        </div>
        <div className="min-w-0">
          <RecentContacts />
        </div>
      </div>

      <QuickActions />
    </div>
  );
}
