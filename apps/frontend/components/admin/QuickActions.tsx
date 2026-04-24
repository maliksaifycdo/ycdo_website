'use client';

import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import { CalendarCheck, Images, Plus } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

const quickActions = [
  { label: 'Add News', icon: Plus, href: ROUTES.ADMIN.NEWS, color: 'bg-[#1A3A8F]' },
  { label: 'Add Event', icon: Plus, href: ROUTES.ADMIN.EVENTS, color: 'bg-[#1A7A3C]' },
  { label: 'View Appointments', icon: CalendarCheck, href: ROUTES.ADMIN.APPOINTMENTS, color: 'bg-[#C0272D]' },
  { label: 'Manage Gallery', icon: Images, href: ROUTES.ADMIN.GALLERY, color: 'bg-purple-600' },
] as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function QuickActions() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-[#1A3A8F]">Quick Actions</h2>
      <motion.div
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {quickActions.map((a) => {
          const Icon = a.icon;
          return (
            <motion.div key={a.label} variants={item}>
              <Link href={a.href}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 rounded-xl px-4 py-6 text-center text-sm font-bold text-white shadow-md',
                    a.color,
                  )}
                >
                  <Icon className="size-6" aria-hidden />
                  {a.label}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
