'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Check, Trash2, X } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import DataTable, { type DataColumn } from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDeleteVolunteer, useUpdateVolunteerStatus, useVolunteers } from '@/hooks/useVolunteers';
import { formatDate } from '@/utils/helpers';
import type { IVolunteer } from '@ycdo/shared';
import { VolunteerStatus } from '@ycdo/shared';

function statusBadge(status: VolunteerStatus) {
  if (status === VolunteerStatus.APPROVED) {
    return <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">approved</Badge>;
  }
  if (status === VolunteerStatus.PENDING) {
    return <Badge className="bg-amber-500 text-white hover:bg-amber-500">pending</Badge>;
  }
  return <Badge className="bg-red-600 text-white hover:bg-red-600">rejected</Badge>;
}

export default function AdminVolunteersPage() {
  const { data = [], isLoading, isError, refetch } = useVolunteers();
  const updateStatus = useUpdateVolunteerStatus();
  const deleteMut = useDeleteVolunteer();
  const [deleteItem, setDeleteItem] = useState<IVolunteer | null>(null);

  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      await deleteMut.mutateAsync(deleteItem._id);
      toast.success('Removed');
      setDeleteItem(null);
    } catch {
      toast.error('Delete failed');
    }
  };

  const columns: DataColumn<IVolunteer & Record<string, unknown>>[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'skills',
      label: 'Skills',
      render: (row) => <span className="max-w-[200px] truncate text-sm text-slate-600">{(row.skills ?? []).join(', ')}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => statusBadge(row.status),
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
          {row.status === VolunteerStatus.PENDING ? (
            <>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="text-emerald-600 hover:bg-emerald-50"
                aria-label="Approve"
                disabled={updateStatus.isPending}
                onClick={async () => {
                  try {
                    await updateStatus.mutateAsync({ id: row._id, status: VolunteerStatus.APPROVED });
                    toast.success('Approved');
                  } catch {
                    toast.error('Failed');
                  }
                }}
              >
                <Check className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="text-red-600 hover:bg-red-50"
                aria-label="Reject"
                disabled={updateStatus.isPending}
                onClick={async () => {
                  try {
                    await updateStatus.mutateAsync({ id: row._id, status: VolunteerStatus.REJECTED });
                    toast.success('Rejected');
                  } catch {
                    toast.error('Failed');
                  }
                }}
              >
                <X className="size-4" />
              </Button>
            </>
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

  const rows = data as (IVolunteer & Record<string, unknown>)[];

  return (
    <div className="space-y-6">
      <PageHeader title="Volunteers" subtitle="Review applications — no new entries from admin." />
      {isError ? (
        <button type="button" className="text-sm text-red-600 underline" onClick={() => refetch()}>
          Retry
        </button>
      ) : null}
      <DataTable columns={columns} data={rows} isLoading={isLoading} hideActions searchable searchKeys={['name', 'email', 'phone']} />

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete volunteer?"
        description="This removes the application record permanently."
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
