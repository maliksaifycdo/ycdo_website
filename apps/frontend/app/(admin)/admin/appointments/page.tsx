'use client';

import toast from 'react-hot-toast';
import { Check, X } from 'lucide-react';
import DataTable, { type DataColumn } from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppointments, useUpdateAppointmentStatus } from '@/hooks/useAppointments';
import { formatDate } from '@/utils/helpers';
import type { IAppointment } from '@ycdo/shared';
import { AppointmentStatus } from '@ycdo/shared';

function statusBadge(status: AppointmentStatus) {
  if (status === AppointmentStatus.CONFIRMED) {
    return <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">confirmed</Badge>;
  }
  if (status === AppointmentStatus.PENDING) {
    return <Badge className="bg-amber-500 text-white hover:bg-amber-500">pending</Badge>;
  }
  return <Badge className="bg-red-600 text-white hover:bg-red-600">cancelled</Badge>;
}

export default function AdminAppointmentsPage() {
  const { data = [], isLoading, isError, refetch } = useAppointments();
  const updateStatus = useUpdateAppointmentStatus();

  const columns: DataColumn<IAppointment & Record<string, unknown>>[] = [
    { key: 'patientName', label: 'Patient' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'hospitalName',
      label: 'Hospital',
      render: (row) => row.hospitalName ?? row.hospitalId,
    },
    { key: 'department', label: 'Department' },
    {
      key: 'preferredDate',
      label: 'Date',
      render: (row) => formatDate(row.preferredDate),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => statusBadge(row.status),
    },
    {
      key: '_actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex justify-end gap-1">
          {row.status === AppointmentStatus.PENDING ? (
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="text-emerald-600 hover:bg-emerald-50"
              aria-label="Confirm"
              disabled={updateStatus.isPending}
              onClick={async () => {
                try {
                  await updateStatus.mutateAsync({ id: row._id, status: AppointmentStatus.CONFIRMED });
                  toast.success('Confirmed');
                } catch {
                  toast.error('Failed');
                }
              }}
            >
              <Check className="size-4" />
            </Button>
          ) : null}
          {row.status === AppointmentStatus.PENDING || row.status === AppointmentStatus.CONFIRMED ? (
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              className="text-red-600 hover:bg-red-50"
              aria-label="Cancel"
              disabled={updateStatus.isPending}
              onClick={async () => {
                try {
                  await updateStatus.mutateAsync({ id: row._id, status: AppointmentStatus.CANCELLED });
                  toast.success('Cancelled');
                } catch {
                  toast.error('Failed');
                }
              }}
            >
              <X className="size-4" />
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  const rows = data as (IAppointment & Record<string, unknown>)[];

  return (
    <div className="space-y-6">
      <PageHeader title="Appointments" subtitle="Confirm or cancel requests from the public form." />
      {isError ? (
        <button type="button" className="text-sm text-red-600 underline" onClick={() => refetch()}>
          Retry
        </button>
      ) : null}
      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        hideActions
        searchable
        searchKeys={['patientName', 'phone', 'department', 'hospitalName', 'hospitalId']}
      />
    </div>
  );
}
