'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { ProjectCategory, type IProject } from '@ycdo/shared';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import CrudModal from '@/components/admin/CrudModal';
import DataTable, { type DataColumn } from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateProject, useDeleteProject, useProjects, useUpdateProject } from '@/hooks/useProjects';

const categories = Object.values(ProjectCategory);

const schema = z.object({
  title: z.string().min(1),
  category: z.nativeEnum(ProjectCategory),
  description: z.string().min(1),
  impactStat: z.string().min(1),
  location: z.string().min(1),
  order: z.coerce.number().int().min(0),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof schema>;
const FORM_ID = 'admin-project-form';

const catLabel: Record<ProjectCategory, string> = {
  [ProjectCategory.HEALTHCARE]: 'Healthcare',
  [ProjectCategory.EDUCATION]: 'Education',
  [ProjectCategory.FOOD]: 'Food',
  [ProjectCategory.WATER]: 'Water',
  [ProjectCategory.COMMUNITY]: 'Community',
  [ProjectCategory.ORPHAN]: 'Orphan',
};

export default function AdminProjectsPage() {
  const { data = [], isLoading, isError, refetch } = useProjects();
  const createMut = useCreateProject();
  const updateMut = useUpdateProject();
  const deleteMut = useDeleteProject();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<IProject | null>(null);
  const [deleteItem, setDeleteItem] = useState<IProject | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      title: '',
      category: ProjectCategory.HEALTHCARE,
      description: '',
      impactStat: '',
      location: '',
      order: 0,
      isActive: true,
    },
  });

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = form;
  const isActive = watch('isActive');
  const category = watch('category');

  useEffect(() => {
    if (editItem) {
      reset({
        title: editItem.title,
        category: editItem.category,
        description: editItem.description,
        impactStat: editItem.impactStat,
        location: editItem.location,
        order: editItem.order ?? 0,
        isActive: editItem.isActive,
      });
    } else if (isAddOpen) {
      reset({
        title: '',
        category: ProjectCategory.HEALTHCARE,
        description: '',
        impactStat: '',
        location: '',
        order: 0,
        isActive: true,
      });
    }
  }, [editItem, isAddOpen, reset]);

  const onSubmit = async (v: FormValues) => {
    const payload = {
      title: v.title,
      category: v.category,
      description: v.description,
      impactStat: v.impactStat,
      location: v.location,
      order: v.order,
    };
    try {
      if (editItem) {
        await updateMut.mutateAsync({ id: editItem._id, dto: { ...payload, isActive: v.isActive } });
        toast.success('Project updated');
      } else {
        await createMut.mutateAsync(payload);
        toast.success('Project created');
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

  const columns: DataColumn<IProject & Record<string, unknown>>[] = [
    { key: 'title', label: 'Title' },
    {
      key: 'category',
      label: 'Category',
      render: (row) => <Badge variant="outline">{catLabel[row.category]}</Badge>,
    },
    { key: 'impactStat', label: 'Impact' },
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

  const rows = (data as (IProject & Record<string, unknown>)[]) ?? [];

  return (
    <div className="space-y-6">
      <PageHeader title="Projects" actionLabel="Add New" onAction={() => setIsAddOpen(true)} />
      {isError ? (
        <p className="text-sm text-red-600">
          <button type="button" className="underline" onClick={() => refetch()}>
            Retry
          </button>
        </p>
      ) : null}
      <DataTable columns={columns} data={rows} isLoading={isLoading} onEdit={setEditItem} onDelete={setDeleteItem} searchable searchKeys={['title', 'location']} />

      <CrudModal
        isOpen={isAddOpen || !!editItem}
        onClose={() => {
          setIsAddOpen(false);
          setEditItem(null);
        }}
        title={editItem ? 'Edit Project' : 'Add Project'}
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
            <Label>Category</Label>
            <Select value={category} onValueChange={(v: string) => setValue('category', v as ProjectCategory)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {catLabel[c]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea {...register('description')} className="mt-1" rows={4} />
            {errors.description ? <p className="mt-1 text-xs text-red-600">{errors.description.message}</p> : null}
          </div>
          <div>
            <Label>Impact stat</Label>
            <Input {...register('impactStat')} className="mt-1" />
          </div>
          <div>
            <Label>Location</Label>
            <Input {...register('location')} className="mt-1" />
          </div>
          <div>
            <Label>Order</Label>
            <Input type="number" {...register('order')} className="mt-1" />
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={isActive} onCheckedChange={(c: boolean) => setValue('isActive', c)} id="p-active" />
            <Label htmlFor="p-active">Active</Label>
          </div>
        </form>
      </CrudModal>

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete project?"
        description="This cannot be undone."
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
