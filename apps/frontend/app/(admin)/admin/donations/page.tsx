'use client';

import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { Download } from 'lucide-react';
import DataTable, { type DataColumn } from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDonations, useDonationStats, useUpdateDonationStatus } from '@/hooks/useDonations';
import { formatDate } from '@/utils/helpers';
import type { IDonation } from '@ycdo/shared';
import { DonationStatus } from '@ycdo/shared';

function statusBadge(status: DonationStatus) {
  if (status === DonationStatus.COMPLETED) {
    return <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">completed</Badge>;
  }
  if (status === DonationStatus.PENDING) {
    return <Badge className="bg-amber-500 text-white hover:bg-amber-500">pending</Badge>;
  }
  return <Badge className="bg-red-600 text-white hover:bg-red-600">failed</Badge>;
}

function toCsv(rows: IDonation[]) {
  const headers = ['donorName', 'email', 'phone', 'amount', 'campaign', 'method', 'isZakat', 'status', 'createdAt'];
  const esc = (v: unknown) => {
    const s = v == null ? '' : String(v);
    if (s.includes('"') || s.includes(',') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = [headers.join(',')];
  for (const r of rows) {
    const rec = r as unknown as Record<string, unknown>;
    lines.push(headers.map((h) => esc(rec[h])).join(','));
  }
  return lines.join('\n');
}

export default function AdminDonationsPage() {
  const { data, isLoading, isError, refetch } = useDonations(1, 500);
  const { data: stats, isLoading: statsLoading } = useDonationStats();
  const updateStatus = useUpdateDonationStatus();
  const list = data?.data ?? [];

  const rows = useMemo(() => list as (IDonation & Record<string, unknown>)[], [list]);

  const exportCsv = () => {
    const csv = toCsv(list);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Download started');
  };

  const columns: DataColumn<IDonation & Record<string, unknown>>[] = [
    { key: 'donorName', label: 'Donor' },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => <span className="font-medium tabular-nums">{row.amount.toLocaleString()}</span>,
    },
    {
      key: 'campaign',
      label: 'Campaign',
      render: (row) => <Badge variant="secondary">{row.campaign}</Badge>,
    },
    {
      key: 'method',
      label: 'Method',
      render: (row) => <Badge variant="outline">{row.method}</Badge>,
    },
    {
      key: 'isZakat',
      label: 'Zakat?',
      render: (row) => (row.isZakat ? <span className="text-emerald-700">Yes</span> : <span className="text-slate-400">No</span>),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <div className="flex flex-wrap items-center gap-2">
          {statusBadge(row.status)}
          <Select
            value={row.status}
            onValueChange={async (v: string) => {
              try {
                await updateStatus.mutateAsync({ id: row._id, status: v as DonationStatus });
                toast.success('Status updated');
              } catch {
                toast.error('Update failed');
              }
            }}
            disabled={updateStatus.isPending}
          >
            <SelectTrigger className="h-8 w-[130px]" aria-label="Change status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(DonationStatus).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (row) => formatDate(row.createdAt),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title="Donations" subtitle="Read-only ledger — update payment status when needed." />
        <Button type="button" variant="outline" className="shrink-0 gap-2 self-start border-[#1A3A8F] text-[#1A3A8F]" onClick={exportCsv}>
          <Download className="size-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total amount (completed)</p>
          <p className="mt-1 text-2xl font-black text-[#1A3A8F]">
            {statsLoading ? '—' : (stats?.total ?? 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total count (completed)</p>
          <p className="mt-1 text-2xl font-black text-[#1A3A8F]">{statsLoading ? '—' : stats?.count ?? 0}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">This month (completed)</p>
          <p className="mt-1 text-2xl font-black text-[#1A3A8F]">
            {statsLoading ? '—' : (stats?.thisMonth ?? 0).toLocaleString()}
          </p>
        </div>
      </div>

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
        searchKeys={['donorName', 'email', 'campaign', 'method', 'status']}
      />
    </div>
  );
}
