'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Check, Eye, Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import DataTable, { type DataColumn } from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useContacts, useDeleteContact, useMarkContactAsRead } from '@/hooks/useContacts';
import { formatDate } from '@/utils/helpers';
import type { IContact } from '@ycdo/shared';

const MSG_PREVIEW = 50;

export default function AdminContactsPage() {
  const { data = [], isLoading, isError, refetch } = useContacts();
  const markRead = useMarkContactAsRead();
  const deleteMut = useDeleteContact();
  const [viewItem, setViewItem] = useState<IContact | null>(null);
  const [deleteItem, setDeleteItem] = useState<IContact | null>(null);

  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      await deleteMut.mutateAsync(deleteItem._id);
      toast.success('Deleted');
      setDeleteItem(null);
      if (viewItem?._id === deleteItem._id) setViewItem(null);
    } catch {
      toast.error('Delete failed');
    }
  };

  const columns: DataColumn<IContact & Record<string, unknown>>[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'subject',
      label: 'Subject',
      render: (row) => <Badge variant="secondary">{row.subject}</Badge>,
    },
    {
      key: 'message',
      label: 'Message',
      render: (row) => (
        <span className="text-sm text-slate-600" title={row.message}>
          {row.message.length > MSG_PREVIEW ? `${row.message.slice(0, MSG_PREVIEW)}…` : row.message}
        </span>
      ),
    },
    {
      key: 'isRead',
      label: 'Read',
      render: (row) => (
        <span
          className="inline-block size-2.5 rounded-full"
          style={{ backgroundColor: row.isRead ? '#94a3b8' : '#C0272D' }}
          title={row.isRead ? 'Read' : 'Unread'}
        />
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: '_actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex justify-end gap-1">
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="text-[#1A3A8F] hover:bg-blue-50"
            aria-label="View"
            onClick={() => setViewItem(row)}
          >
            <Eye className="size-4" />
          </Button>
          {!row.isRead ? (
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="text-emerald-600 hover:bg-emerald-50"
              aria-label="Mark read"
              disabled={markRead.isPending}
              onClick={async () => {
                try {
                  await markRead.mutateAsync(row._id);
                  toast.success('Marked read');
                } catch {
                  toast.error('Failed');
                }
              }}
            >
              <Check className="size-4" />
            </Button>
          ) : null}
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="text-red-600 hover:bg-red-50"
            aria-label="Delete"
            onClick={() => setDeleteItem(row)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  const rows = data as (IContact & Record<string, unknown>)[];

  return (
    <div className="space-y-6">
      <PageHeader title="Contact messages" subtitle="View inquiries and mark them as read." />
      {isError ? (
        <button type="button" className="text-sm text-red-600 underline" onClick={() => refetch()}>
          Retry
        </button>
      ) : null}
      <DataTable columns={columns} data={rows} isLoading={isLoading} hideActions searchable searchKeys={['name', 'email', 'subject', 'message']} />

      <Dialog open={!!viewItem} onOpenChange={(open: boolean) => !open && setViewItem(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Message</DialogTitle>
          </DialogHeader>
          {viewItem ? (
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-slate-500">Name</span>
                <p>{viewItem.name}</p>
              </div>
              <div>
                <span className="font-medium text-slate-500">Email</span>
                <p>{viewItem.email}</p>
              </div>
              {viewItem.phone ? (
                <div>
                  <span className="font-medium text-slate-500">Phone</span>
                  <p>{viewItem.phone}</p>
                </div>
              ) : null}
              <div>
                <span className="font-medium text-slate-500">Subject</span>
                <p>{viewItem.subject}</p>
              </div>
              <div>
                <span className="font-medium text-slate-500">Message</span>
                <p className="mt-1 whitespace-pre-wrap rounded-md border border-slate-100 bg-slate-50 p-3">{viewItem.message}</p>
              </div>
              <div>
                <span className="font-medium text-slate-500">Date</span>
                <p>{formatDate(viewItem.createdAt)}</p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete message?"
        description="This cannot be undone."
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
