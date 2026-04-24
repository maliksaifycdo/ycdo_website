'use client';

import { motion } from '@/components/common/MotionDiv';
import { AlertCircle, CalendarCheck, HandHeart, Mail, Users } from 'lucide-react';
import { AppointmentStatus, VolunteerStatus } from '@ycdo/shared';
import type { LucideIcon } from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';
import { useDonationStats } from '@/hooks/useDonations';
import { useUnreadCount } from '@/hooks/useContacts';
import { useVolunteers } from '@/hooks/useVolunteers';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/helpers';

type ChangeType = 'up' | 'down' | 'neutral';

interface StatCardConfig {
  title: string;
  value: string | number;
  change: string;
  changeType: ChangeType;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
} as const;

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

function changeClass(t: ChangeType) {
  if (t === 'up') return 'text-emerald-600';
  if (t === 'down') return 'text-red-600';
  return 'text-slate-500';
}

export default function DashboardStats() {
  const statsQuery = useDonationStats();
  const unreadQuery = useUnreadCount();
  const volunteersQuery = useVolunteers();
  const appointmentsQuery = useAppointments();

  const stats = statsQuery.data;
  const unreadCount = unreadQuery.data ?? 0;
  const volunteers = volunteersQuery.data ?? [];
  const appointments = appointmentsQuery.data ?? [];

  const pendingVolunteers = volunteers.filter((v) => v.status === VolunteerStatus.PENDING).length;
  const pendingAppointments = appointments.filter((a) => a.status === AppointmentStatus.PENDING).length;

  const statCards: StatCardConfig[] = [
    {
      title: 'Total Donations',
      value: statsQuery.isError ? '—' : formatCurrency(stats?.total ?? 0),
      change: 'This month',
      changeType: 'up',
      icon: HandHeart,
      iconBg: 'bg-red-50',
      iconColor: 'text-[#C0272D]',
    },
    {
      title: 'Pending Appointments',
      value: appointmentsQuery.isError ? '—' : pendingAppointments,
      change: 'Needs review',
      changeType: 'neutral',
      icon: CalendarCheck,
      iconBg: 'bg-blue-50',
      iconColor: 'text-[#1A3A8F]',
    },
    {
      title: 'Unread Messages',
      value: unreadQuery.isError ? '—' : unreadCount,
      change: 'Awaiting response',
      changeType: 'neutral',
      icon: Mail,
      iconBg: 'bg-green-50',
      iconColor: 'text-[#1A7A3C]',
    },
    {
      title: 'Pending Volunteers',
      value: volunteersQuery.isError ? '—' : pendingVolunteers,
      change: 'To approve',
      changeType: 'neutral',
      icon: Users,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  const hasError =
    statsQuery.isError || unreadQuery.isError || volunteersQuery.isError || appointmentsQuery.isError;

  const allPending = [statsQuery, unreadQuery, volunteersQuery, appointmentsQuery].every((q) => q.isPending);

  if (allPending) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <Skeleton className="ml-auto h-11 w-11 rounded-full" />
            <Skeleton className="mt-4 h-8 w-24" />
            <Skeleton className="mt-2 h-4 w-32" />
            <Skeleton className="mt-3 h-3 w-28" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {hasError ? (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <AlertCircle className="size-4 shrink-0" />
          <span>Some metrics could not be loaded. Check your connection or try again.</span>
        </div>
      ) : null}

      <motion.div
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="relative rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <div
                className={`absolute right-4 top-4 flex size-11 items-center justify-center rounded-full ${card.iconBg}`}
              >
                <Icon className={`size-5 ${card.iconColor}`} aria-hidden />
              </div>
              <p className="text-3xl font-black tracking-tight text-slate-900">{card.value}</p>
              <p className="mt-1 text-sm text-slate-500">{card.title}</p>
              <p className={`mt-2 text-xs font-medium ${changeClass(card.changeType)}`}>{card.change}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
