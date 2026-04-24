'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import type { IGalleryItem } from '@ycdo/shared';
import { GalleryCategory, GalleryItemType } from '@ycdo/shared';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import CrudModal from '@/components/admin/CrudModal';
import DataTable, { type DataColumn } from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateGalleryItem, useDeleteGalleryItem, useGallery, useUpdateGalleryItem } from '@/hooks/useGallery';
import { formatDate } from '@/utils/helpers';

const schema = z.object({
  url: z.string().min(1, 'URL required').refine((s) => /^https?:\/\//i.test(s), 'Must start with http(s)://'),
  caption: z.string().min(1),
  category: z.nativeEnum(GalleryCategory),
  type: z.enum(['image', 'video']),
  date: z.string().min(1),
  eventTag: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;
const FORM_ID = 'admin-gallery-form';

export default function AdminGalleryPage() {
  const { data = [], isLoading, isError, refetch } = useGallery();
  const createMut = useCreateGalleryItem();
  const updateMut = useUpdateGalleryItem();
  const deleteMut = useDeleteGalleryItem();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<IGalleryItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<IGalleryItem | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: '',
      caption: '',
      category: GalleryCategory.COMMUNITY,
      type: 'image',
      date: new Date().toISOString().slice(0, 10),
      eventTag: '',
    },
  });

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = form;
  const category = watch('category');
  const type = watch('type');

  useEffect(() => {
    if (editItem) {
      reset({
        url: editItem.url,
        caption: editItem.caption,
        category: editItem.category,
        type: editItem.type,
        date: editItem.date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
        eventTag: editItem.eventTag ?? '',
      });
    } else if (isAddOpen) {
      reset({
        url: '',
        caption: '',
        category: GalleryCategory.COMMUNITY,
        type: 'image',
        date: new Date().toISOString().slice(0, 10),
        eventTag: '',
      });
    }
  }, [editItem, isAddOpen, reset]);

  const onSubmit = async (v: FormValues) => {
    const dto = {
      url: v.url,
      caption: v.caption,
      category: v.category,
      type: v.type as GalleryItemType,
      date: new Date(v.date).toISOString(),
      eventTag: v.eventTag || undefined,
    };
    try {
      if (editItem) {
        await updateMut.mutateAsync({ id: editItem._id, dto });
        toast.success('Item updated');
      } else {
        await createMut.mutateAsync(dto);
        toast.success('Item added');
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

  const columns: DataColumn<IGalleryItem & Record<string, unknown>>[] = [
    {
      key: 'url',
      label: 'Thumbnail',
      render: (row) => (
        <div className="relative size-[60px] overflow-hidden rounded-md border border-slate-200 bg-slate-50">
          <Image src={row.url} alt="" width={60} height={60} unoptimized className="size-[60px] object-cover" />
        </div>
      ),
    },
    { key: 'caption', label: 'Caption' },
    {
      key: 'category',
      label: 'Category',
      render: (row) => <Badge variant="secondary">{row.category}</Badge>,
    },
    {
      key: 'type',
      label: 'Type',
      render: (row) => <Badge variant="outline">{row.type}</Badge>,
    },
    {
      key: 'date',
      label: 'Date',
      render: (row) => <span className="text-slate-600">{formatDate(row.date)}</span>,
    },
  ];

  const rows = (data as (IGalleryItem & Record<string, unknown>)[]) ?? [];

  return (
    <div className="space-y-6">
      <PageHeader title="Gallery" actionLabel="Add New" onAction={() => setIsAddOpen(true)} />
      {isError ? (
        <button type="button" className="text-sm text-red-600 underline" onClick={() => refetch()}>
          Retry
        </button>
      ) : null}
      <DataTable columns={columns} data={rows} isLoading={isLoading} onEdit={setEditItem} onDelete={setDeleteItem} searchable searchKeys={['caption', 'category', 'eventTag']} />

      <CrudModal
        isOpen={isAddOpen || !!editItem}
        onClose={() => {
          setIsAddOpen(false);
          setEditItem(null);
        }}
        title={editItem ? 'Edit gallery item' : 'Add gallery item'}
        isLoading={createMut.isPending || updateMut.isPending}
        formId={FORM_ID}
      >
        <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Image / media URL</Label>
            <Input {...register('url')} className="mt-1" placeholder="https://…" />
            {errors.url ? <p className="mt-1 text-xs text-red-600">{errors.url.message}</p> : null}
          </div>
          <div>
            <Label>Caption</Label>
            <Input {...register('caption')} className="mt-1" />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={(v: string) => setValue('category', v as GalleryCategory)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(GalleryCategory).map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Type</Label>
            <Select value={type} onValueChange={(v: string) => setValue('type', v as 'image' | 'video')}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">image</SelectItem>
                <SelectItem value="video">video</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Date</Label>
            <Input type="date" {...register('date')} className="mt-1" />
          </div>
          <div>
            <Label>Event tag</Label>
            <Input {...register('eventTag')} className="mt-1" />
          </div>
        </form>
      </CrudModal>

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete gallery item?"
        description="This cannot be undone."
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
