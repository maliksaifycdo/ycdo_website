'use client';

import Link from 'next/link';
import { DonationCampaign, DonationStatus, PaymentMethod } from '@ycdo/shared';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ROUTES } from '@/constants/routes';
import { useDonations } from '@/hooks/useDonations';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { cn } from '@/lib/utils';

const campaignLabel: Record<DonationCampaign, string> = {
  [DonationCampaign.HEALTHCARE]: 'Healthcare',
  [DonationCampaign.EDUCATION]: 'Education',
  [DonationCampaign.FOOD]: 'Food',
  [DonationCampaign.WATER]: 'Water',
};

const methodLabel: Record<PaymentMethod, string> = {
  [PaymentMethod.JAZZCASH]: 'JazzCash',
  [PaymentMethod.EASYPAISA]: 'EasyPaisa',
  [PaymentMethod.BANK_TRANSFER]: 'Bank',
};

function statusBadge(status: DonationStatus) {
  switch (status) {
    case DonationStatus.COMPLETED:
      return <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">Completed</Badge>;
    case DonationStatus.FAILED:
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return (
        <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-900">
          Pending
        </Badge>
      );
  }
}

export default function RecentDonations() {
  const { data, isLoading, isError, refetch } = useDonations(1, 8);
  const rows = data?.data ?? [];

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-[#1A3A8F]">Recent Donations</h2>
        <Link href={ROUTES.ADMIN.DONATIONS} className="text-sm font-semibold text-[#C0272D] hover:underline">
          View All
        </Link>
      </div>

      {isError ? (
        <p className="py-8 text-center text-sm text-red-600">
          Could not load donations.{' '}
          <button type="button" className="font-semibold underline" onClick={() => refetch()}>
            Retry
          </button>
        </p>
      ) : isLoading ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : rows.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">No donations yet</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((d) => (
              <TableRow key={d._id}>
                <TableCell className="font-medium">{d.donorName}</TableCell>
                <TableCell>{formatCurrency(d.amount)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-slate-200">
                    {campaignLabel[d.campaign]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn('bg-slate-100 text-slate-800')}>
                    {methodLabel[d.method]}
                  </Badge>
                </TableCell>
                <TableCell>{statusBadge(d.status)}</TableCell>
                <TableCell className="text-slate-600">{formatDate(d.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
