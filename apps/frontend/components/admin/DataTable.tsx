'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { Inbox, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type DataColumn<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
};

type Props<T> = {
  columns: DataColumn<T>[];
  data: T[];
  isLoading: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  searchable?: boolean;
  searchKeys?: (keyof T | string)[];
  /** Hide default edit/delete (e.g. custom row actions) */
  hideActions?: boolean;
  pageSize?: number;
};

function getCellValue<T extends Record<string, unknown>>(row: T, key: keyof T | string): unknown {
  if (typeof key === 'string' && key.includes('.')) {
    return key.split('.').reduce<unknown>((acc, k) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[k] : undefined), row as unknown);
  }
  return row[key as keyof T];
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  isLoading,
  onEdit,
  onDelete,
  searchable,
  searchKeys,
  hideActions,
  pageSize = 10,
}: Props<T>) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term || !searchable || !searchKeys?.length) return data;
    return data.filter((row) =>
      searchKeys.some((k) => {
        const v = getCellValue(row, k);
        return v != null && String(v).toLowerCase().includes(term);
      }),
    );
  }, [data, q, searchKeys, searchable]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const slice = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const showActions = !hideActions && (onEdit || onDelete);

  return (
    <div className="space-y-4">
      {searchable ? (
        <Input
          placeholder="Search…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />
      ) : null}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm [-webkit-overflow-scrolling:touch]">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={String(c.key)}>{c.label}</TableHead>
              ))}
              {showActions ? <TableHead className="w-[100px] text-right">Actions</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((c) => (
                      <TableCell key={String(c.key)}>
                        <Skeleton className="h-4 w-full max-w-[120px]" />
                      </TableCell>
                    ))}
                    {showActions ? (
                      <TableCell>
                        <Skeleton className="ml-auto h-8 w-16" />
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              : slice.length === 0
                ? (
                    <TableRow>
                      <TableCell colSpan={columns.length + (showActions ? 1 : 0)} className="h-40 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                          <Inbox className="size-10 opacity-40" />
                          <p className="text-sm font-medium">No records found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                : (
                    slice.map((row, idx) => (
                      <TableRow key={('_id' in row && String(row._id)) || idx}>
                        {columns.map((c) => (
                          <TableCell key={String(c.key)}>
                            {c.render ? c.render(row) : String(getCellValue(row, c.key) ?? '')}
                          </TableCell>
                        ))}
                        {showActions ? (
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              {onEdit ? (
                                <Button
                                  type="button"
                                  size="icon-sm"
                                  variant="ghost"
                                  className="text-[#1A3A8F] hover:bg-blue-50"
                                  aria-label="Edit"
                                  onClick={() => onEdit(row)}
                                >
                                  <Pencil className="size-4" />
                                </Button>
                              ) : null}
                              {onDelete ? (
                                <Button
                                  type="button"
                                  size="icon-sm"
                                  variant="ghost"
                                  className="text-red-600 hover:bg-red-50"
                                  aria-label="Delete"
                                  onClick={() => onDelete(row)}
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              ) : null}
                            </div>
                          </TableCell>
                        ) : null}
                      </TableRow>
                    ))
                  )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && filtered.length > pageSize ? (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            Page {currentPage} of {totalPages} ({filtered.length} records)
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
