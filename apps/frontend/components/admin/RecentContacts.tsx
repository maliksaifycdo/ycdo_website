'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ContactSubject, type IContact } from '@ycdo/shared';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/constants/routes';
import { useContacts } from '@/hooks/useContacts';
import { formatDate } from '@/utils/helpers';
import { cn } from '@/lib/utils';

const subjectLabel: Record<ContactSubject, string> = {
  [ContactSubject.GENERAL]: 'General',
  [ContactSubject.HEALTHCARE]: 'Healthcare',
  [ContactSubject.DONATION]: 'Donation',
  [ContactSubject.VOLUNTEER]: 'Volunteer',
  [ContactSubject.MEDIA]: 'Media & PR',
};

export default function RecentContacts() {
  const { data, isLoading, isError, refetch } = useContacts();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IContact | null>(null);

  const recent = useMemo(() => {
    const list = data ?? [];
    return [...list]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [data]);

  const openMessage = (c: IContact) => {
    setSelected(c);
    setOpen(true);
  };

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-[#1A3A8F]">Recent Messages</h2>
        <Link href={ROUTES.ADMIN.CONTACTS} className="text-sm font-semibold text-[#C0272D] hover:underline">
          View All
        </Link>
      </div>

      {isError ? (
        <p className="py-8 text-center text-sm text-red-600">
          Could not load messages.{' '}
          <button type="button" className="font-semibold underline" onClick={() => refetch()}>
            Retry
          </button>
        </p>
      ) : isLoading ? (
        <ul className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="rounded-lg border border-slate-100 p-3">
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="mb-1 h-3 w-full" />
              <Skeleton className="h-3 w-20" />
            </li>
          ))}
        </ul>
      ) : recent.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">No messages yet</p>
      ) : (
        <ul className="space-y-2">
          {recent.map((c) => (
            <li key={c._id}>
              <button
                type="button"
                onClick={() => openMessage(c)}
                className="flex w-full items-start gap-3 rounded-lg border border-slate-100 p-3 text-left transition-colors hover:border-[#1A3A8F]/30 hover:bg-slate-50"
              >
                <span
                  className={cn(
                    'mt-1.5 size-2 shrink-0 rounded-full',
                    c.isRead ? 'bg-slate-300' : 'bg-[#C0272D]',
                  )}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900">{c.name}</p>
                  <p className="text-sm text-slate-500">{subjectLabel[c.subject]}</p>
                  <p className="text-xs text-slate-400">{formatDate(c.createdAt)}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
            <DialogDescription>
              {selected ? `${subjectLabel[selected.subject]} · ${formatDate(selected.createdAt)}` : ''}
            </DialogDescription>
          </DialogHeader>
          {selected ? (
            <div className="space-y-2 text-sm">
              <p className="text-slate-600">
                <span className="font-semibold text-slate-800">Email:</span> {selected.email}
              </p>
              {selected.phone ? (
                <p className="text-slate-600">
                  <span className="font-semibold text-slate-800">Phone:</span> {selected.phone}
                </p>
              ) : null}
              <div className="rounded-lg bg-slate-50 p-3 text-slate-800">
                <p className="whitespace-pre-wrap">{selected.message}</p>
              </div>
              <Button type="button" variant="outline" className="mt-2 w-full" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
