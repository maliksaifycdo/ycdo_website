'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Menu, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/projects': 'Projects',
  '/admin/hospitals': 'Hospitals',
  '/admin/news': 'News & Articles',
  '/admin/events': 'Events',
  '/admin/gallery': 'Gallery',
  '/admin/donations': 'Donations',
  '/admin/volunteers': 'Volunteers',
  '/admin/appointments': 'Appointments',
  '/admin/contacts': 'Contact Messages',
  '/admin/settings': 'Site Settings',
  '/admin/team': 'Team',
};

function resolveTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  const prefix = Object.keys(pageTitles)
    .filter((k) => k !== '/admin')
    .sort((a, b) => b.length - a.length)
    .find((k) => pathname.startsWith(k));
  return prefix ? pageTitles[prefix] : 'Admin';
}

type Props = {
  onMenuClick: () => void;
};

export default function AdminHeader({ onMenuClick }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const title = resolveTitle(pathname);

  const initials = user?.name
    ? user.name
        .split(/\s+/)
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AD';

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    router.push(ROUTES.LOGIN);
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
        <h1 className="truncate text-lg font-bold text-[#1A3A8F] md:text-xl">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button type="button" variant="ghost" size="icon-sm" className="text-slate-600" aria-label="Notifications">
          <Bell className="size-5" />
        </Button>
        <div className="hidden h-6 w-px bg-slate-200 md:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'flex max-w-[220px] items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100',
              )}
              aria-label="Account menu"
            >
              <Avatar size="sm" className="border border-slate-200">
                <AvatarFallback className="bg-[#1A3A8F] text-xs font-semibold text-white">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden min-w-0 text-left md:block">
                <p className="truncate text-sm font-semibold text-slate-900">{user?.name ?? 'Admin'}</p>
                <p className="truncate text-xs capitalize text-slate-500">{user?.role ?? ''}</p>
              </div>
              <User className="size-4 shrink-0 text-slate-500 md:hidden" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={ROUTES.ADMIN.ROOT}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={ROUTES.ADMIN.SETTINGS}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
