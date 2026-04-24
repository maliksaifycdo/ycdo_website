'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import type { IEvent } from '@ycdo/shared';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import CrudModal from '@/components/admin/CrudModal';
import DataTable, { type DataColumn } from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useCreateEvent, useDeleteEvent, useEvents, useUpdateEvent } from '@/hooks/useEvents';
import { formatDate } from '@/utils/helpers';

const schema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  endDate: z.string().optional(),
  location: z.string().min(1),
  description: z.string().min(1),
  registrationLink: z.string().optional(),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof schema>;
const FORM_ID = 'admin-event-form';

export default function AdminEventsPage() {
  const { data = [], isLoading, isError, refetch } = useEvents();
  const createMut = useCreateEvent();
  const updateMut = useUpdateEvent();
  const deleteMut = useDeleteEvent();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<IEvent | null>(null);
  const [deleteItem, setDeleteItem] = useState<IEvent | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      date: '',
      endDate: '',
      location: '',
      description: '',
      registrationLink: '',
      isActive: true,
    },
  });

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = form;
  const isActive = watch('isActive');

  useEffect(() => {
    if (editItem) {
      reset({
        title: editItem.title,
        date: editItem.date?.slice(0, 10) ?? '',
        endDate: editItem.endDate?.slice(0, 10) ?? '',
        location: editItem.location,
        description: editItem.description,
        registrationLink: editItem.registrationLink ?? '',
        isActive: editItem.isActive,
      });
    } else if (isAddOpen) {
      reset({
        title: '',
        date: '',
        endDate: '',
        location: '',
        description: '',
        registrationLink: '',
        isActive: true,
      });
    }
  }, [editItem, isAddOpen, reset]);

  const onSubmit = async (v: FormValues) => {
    const dto = {
      title: v.title,
      date: new Date(v.date).toISOString(),
      endDate: v.endDate ? new Date(v.endDate).toISOString() : undefined,
      location: v.location,
      description: v.description,
      registrationLink: v.registrationLink || undefined,
      isActive: v.isActive,
    };
    try {
      if (editItem) {
        await updateMut.mutateAsync({ id: editItem._id, dto });
        toast.success('Event updated');
      } else {
        await createMut.mutateAsync(dto);
        toast.success('Event created');
      }
      setIsAddOpen(false);
      setEditItem(null);
    } catch {
      toast.error('Request failed');
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      await deleteMut.mutateAsync(deleteItem._id);
      toast.success('Deleted');
      setDeleteItem(null);
    } catch {
      toast.error('Delete failed');
    }
  };

  const columns: DataColumn<IEvent & Record<string, unknown>>[] = [
    { key: 'title', label: 'Title' },
    {
      key: 'date',
      label: 'Date',
      render: (row) => formatDate(row.date),
    },
    { key: 'location', label: 'Location' },
    {
      key: 'isActive',
      label: 'Active',
      render: (row) =>
        row.isActive ? (
          <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">Yes</Badge>
        ) : (
          <Badge variant="secondary">No</Badge>
        ),
    },
  ];

  const rows = (data as (IEvent & Record<string, unknown>)[]) ?? [];

  return (
    <div className="space-y-6">
      <PageHeader title="Events" actionLabel="Add New" onAction={() => setIsAddOpen(true)} />
      {isError ? (
        <button type="button" className="text-sm text-red-600 underline" onClick={() => refetch()}>
          Retry
        </button>
      ) : null}
      <DataTable columns={columns} data={rows} isLoading={isLoading} onEdit={setEditItem} onDelete={setDeleteItem} searchable searchKeys={['title', 'location']} />

      <CrudModal
        isOpen={isAddOpen || !!editItem}
        onClose={() => {
          setIsAddOpen(false);
          setEditItem(null);
        }}
        title={editItem ? 'Edit Event' : 'Add Event'}
        isLoading={createMut.isPending || updateMut.isPending}
        formId={FORM_ID}
      >
        <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input {...register('title')} className="mt-1" />
            {errors.title ? <p className="mt-1 text-xs text-red-600">{errors.title.message}</p> : null}
          </div>
          <div>
            <Label>Date</Label>
            <Input type="date" {...register('date')} className="mt-1" />
            {errors.date ? <p className="mt-1 text-xs text-red-600">{errors.date.message}</p> : null}
          </div>
          <div>
            <Label>End date (optional)</Label>
            <Input type="date" {...register('endDate')} className="mt-1" />
          </div>
          <div>
            <Label>Location</Label>
            <Input {...register('location')} className="mt-1" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea {...register('description')} className="mt-1" rows={4} />
          </div>
          <div>
            <Label>Registration link</Label>
            <Input {...register('registrationLink')} className="mt-1" />
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={isActive} onCheckedChange={(c: boolean) => setValue('isActive', c)} id="e-active" />
            <Label htmlFor="e-active">Active</Label>
          </div>
        </form>
      </CrudModal>

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete event?"
        description="This cannot be undone."
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
