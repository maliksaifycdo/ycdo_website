'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from '@/components/common/MotionDiv';
import toast from 'react-hot-toast';
import {
  Building2,
  Calendar,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  HandHeart,
  Images,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Settings,
  Users,
} from 'lucide-react';
import { ADMIN_NAV_LINKS } from '@/constants/brand';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<(typeof ADMIN_NAV_LINKS)[number]['icon'], LucideIcon> = {
  LayoutDashboard,
  FolderKanban,
  Building2,
  Newspaper,
  Calendar,
  Images,
  HandHeart,
  Users,
  CalendarCheck,
  Mail,
  Settings,
};

type Props = {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

function NavList({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-2 py-4">
      {ADMIN_NAV_LINKS.map((item) => {
        const Icon = iconMap[item.icon];
        const active =
          item.href === ROUTES.ADMIN.ROOT
            ? pathname === ROUTES.ADMIN.ROOT
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <motion.div key={item.href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={item.href}
              title={collapsed ? item.label : undefined}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                collapsed && 'justify-center px-2',
                active
                  ? 'border-l-4 border-[#C0272D] bg-white/20 text-white'
                  : 'border-l-4 border-transparent text-white/70 hover:bg-white/10 hover:text-white',
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden />
              {!collapsed ? <span>{item.label}</span> : null}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}

export default function AdminSidebar({ mobileOpen, onMobileOpenChange }: Props) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    router.push(ROUTES.LOGIN);
    onMobileOpenChange(false);
  };

  const widthClass = collapsed ? 'md:w-16' : 'md:w-64';

  return (
    <>
      <aside
        className={cn(
          'hidden h-full shrink-0 flex-col bg-[#1A3A8F] text-white md:flex',
          widthClass,
          'transition-[width] duration-200 ease-out',
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-4">
          {!collapsed ? (
            <div className="min-w-0 pl-1">
              <p className="truncate text-xl font-black tracking-tight">YCDO</p>
              <p className="text-xs text-white/60">Admin Portal</p>
            </div>
          ) : (
            <span className="sr-only">YCDO</span>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-white hover:bg-white/10"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>
        </div>

        <NavList collapsed={collapsed} />

        <div className="mt-auto border-t border-white/10 p-3">
          <div className={cn('mb-3 flex items-center gap-2 rounded-lg px-2 py-2', collapsed && 'justify-center')}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
              {user?.name
                ? user.name
                    .split(/\s+/)
                    .map((p) => p[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()
                : '?'}
            </div>
            {!collapsed ? (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{user?.name ?? 'Admin'}</p>
                <p className="truncate text-xs capitalize text-white/60">{user?.role ?? ''}</p>
              </div>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            className={cn(
              'w-full justify-start gap-2 text-white hover:bg-white/10 hover:text-white',
              collapsed && 'justify-center px-0',
            )}
            title={collapsed ? 'Log out' : undefined}
            onClick={handleLogout}
          >
            <LogOut className="size-4 shrink-0" />
            {!collapsed ? <span>Log out</span> : null}
          </Button>
        </div>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="w-72 border-[#1A3A8F] bg-[#1A3A8F] p-0 text-white [&>button]:text-white">
          <SheetHeader className="border-b border-white/10 px-4 py-4 text-left">
            <SheetTitle className="text-white">YCDO Admin</SheetTitle>
            <p className="text-xs text-white/60">Navigate</p>
          </SheetHeader>
          <div className="flex h-[calc(100vh-5rem)] flex-col">
            <NavList collapsed={false} onNavigate={() => onMobileOpenChange(false)} />
            <div className="mt-auto border-t border-white/10 p-4">
              <p className="mb-2 truncate text-sm font-semibold">{user?.name}</p>
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-start gap-2 text-white hover:bg-white/10"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                Log out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
