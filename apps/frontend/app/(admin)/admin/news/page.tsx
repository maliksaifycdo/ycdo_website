'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import type { INews } from '@ycdo/shared';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import CrudModal from '@/components/admin/CrudModal';
import DataTable, { type DataColumn } from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useCreateNews, useDeleteNews, useNewsManage, useUpdateNews } from '@/hooks/useNews';
import { formatDate } from '@/utils/helpers';

const schema = z.object({
  title: z.string().min(1),
  body: z.string().min(10),
  author: z.string().min(1),
  category: z.string().min(1),
  tags: z.string(),
  thumbnail: z.string().optional(),
  isPublished: z.boolean(),
});

type FormValues = z.infer<typeof schema>;
const FORM_ID = 'admin-news-form';

export default function AdminNewsPage() {
  const { data, isLoading, isError, refetch } = useNewsManage(1, 100);
  const list = data?.data ?? [];
  const createMut = useCreateNews();
  const updateMut = useUpdateNews();
  const deleteMut = useDeleteNews();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<INews | null>(null);
  const [deleteItem, setDeleteItem] = useState<INews | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      body: '',
      author: 'YCDO Team',
      category: 'general',
      tags: '',
      thumbnail: '',
      isPublished: false,
    },
  });

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = form;
  const isPublished = watch('isPublished');

  useEffect(() => {
    if (editItem) {
      reset({
        title: editItem.title,
        body: editItem.body,
        author: editItem.author,
        category: editItem.category,
        tags: editItem.tags?.join(', ') ?? '',
        thumbnail: editItem.thumbnail ?? '',
        isPublished: editItem.isPublished,
      });
    } else if (isAddOpen) {
      reset({
        title: '',
        body: '',
        author: 'YCDO Team',
        category: 'general',
        tags: '',
        thumbnail: '',
        isPublished: false,
      });
    }
  }, [editItem, isAddOpen, reset]);

  const onSubmit = async (v: FormValues) => {
    const tags = v.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const dto = {
      title: v.title,
      body: v.body,
      author: v.author,
      category: v.category,
      tags,
      thumbnail: v.thumbnail || undefined,
      isPublished: v.isPublished,
    };
    try {
      if (editItem) {
        await updateMut.mutateAsync({ id: editItem._id, dto });
        toast.success('Article updated');
      } else {
        await createMut.mutateAsync(dto);
        toast.success('Article created');
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

  const columns: DataColumn<INews & Record<string, unknown>>[] = [
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'category', label: 'Category' },
    {
      key: 'publishedAt',
      label: 'Published',
      render: (row) => <span className="text-slate-600">{formatDate(row.publishedAt || row.createdAt)}</span>,
    },
    {
      key: 'isPublished',
      label: 'Status',
      render: (row) =>
        row.isPublished ? (
          <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">Published</Badge>
        ) : (
          <Badge variant="secondary">Draft</Badge>
        ),
    },
  ];

  const rows = list as (INews & Record<string, unknown>)[];

  return (
    <div className="space-y-6">
      <PageHeader title="News & Articles" actionLabel="Add New" onAction={() => setIsAddOpen(true)} />
      {isError ? (
        <button type="button" className="text-sm text-red-600 underline" onClick={() => refetch()}>
          Retry
        </button>
      ) : null}
      <DataTable columns={columns} data={rows} isLoading={isLoading} onEdit={setEditItem} onDelete={setDeleteItem} searchable searchKeys={['title', 'author', 'category']} />

      <CrudModal
        isOpen={isAddOpen || !!editItem}
        onClose={() => {
          setIsAddOpen(false);
          setEditItem(null);
        }}
        title={editItem ? 'Edit Article' : 'Add Article'}
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
            <Label>Body</Label>
            <Textarea {...register('body')} className="mt-1" rows={8} />
            {errors.body ? <p className="mt-1 text-xs text-red-600">{errors.body.message}</p> : null}
          </div>
          <div>
            <Label>Author</Label>
            <Input {...register('author')} className="mt-1" />
          </div>
          <div>
            <Label>Category</Label>
            <Input {...register('category')} className="mt-1" />
          </div>
          <div>
            <Label>Tags (comma-separated)</Label>
            <Input {...register('tags')} className="mt-1" />
          </div>
          <div>
            <Label>Thumbnail URL</Label>
            <Input {...register('thumbnail')} className="mt-1" />
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={isPublished} onCheckedChange={(c: boolean) => setValue('isPublished', c)} id="n-pub" />
            <Label htmlFor="n-pub">Published</Label>
          </div>
        </form>
      </CrudModal>

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete article?"
        description="This cannot be undone."
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
