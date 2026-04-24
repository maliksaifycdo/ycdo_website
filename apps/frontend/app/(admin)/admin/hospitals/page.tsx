'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import type { IHospital } from '@ycdo/shared';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import CrudModal from '@/components/admin/CrudModal';
import DataTable, { type DataColumn } from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useCreateHospital, useDeleteHospital, useHospitals, useUpdateHospital } from '@/hooks/useHospitals';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  phone: z.string().min(1, 'Required'),
  timings: z.string().min(1, 'Required'),
  services: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

const FORM_ID = 'admin-hospital-form';

export default function AdminHospitalsPage() {
  const { data = [], isLoading, isError, refetch } = useHospitals();
  const createMut = useCreateHospital();
  const updateMut = useUpdateHospital();
  const deleteMut = useDeleteHospital();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<IHospital | null>(null);
  const [deleteItem, setDeleteItem] = useState<IHospital | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      name: '',
      address: '',
      city: 'Multan',
      phone: '',
      timings: '',
      services: '',
      lat: 30.1575,
      lng: 71.5249,
      isActive: true,
    },
  });

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = form;
  const isActive = watch('isActive');

  useEffect(() => {
    if (editItem) {
      reset({
        name: editItem.name,
        address: editItem.address,
        city: editItem.city,
        phone: editItem.phone,
        timings: editItem.timings,
        services: editItem.services?.join(', ') ?? '',
        lat: editItem.coordinates?.lat ?? 30.1575,
        lng: editItem.coordinates?.lng ?? 71.5249,
        isActive: editItem.isActive,
      });
    } else if (isAddOpen) {
      reset({
        name: '',
        address: '',
        city: 'Multan',
        phone: '',
        timings: '',
        services: '',
        lat: 30.1575,
        lng: 71.5249,
        isActive: true,
      });
    }
  }, [editItem, isAddOpen, reset]);

  const onSubmit = async (v: FormValues) => {
    const services = v.services
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = {
      name: v.name,
      address: v.address,
      city: v.city,
      phone: v.phone,
      timings: v.timings,
      services,
      coordinates: { lat: v.lat, lng: v.lng },
    };
    try {
      if (editItem) {
        await updateMut.mutateAsync({ id: editItem._id, dto: { ...payload, isActive: v.isActive } });
        toast.success('Hospital updated');
      } else {
        await createMut.mutateAsync({ ...payload, services: services.length ? services : ['General'] });
        toast.success('Hospital created');
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

  const columns: DataColumn<IHospital & Record<string, unknown>>[] = [
    { key: 'name', label: 'Hospital Name' },
    { key: 'address', label: 'Address' },
    { key: 'phone', label: 'Phone' },
    { key: 'timings', label: 'Timings' },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) =>
        row.isActive ? (
          <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">Active</Badge>
        ) : (
          <Badge variant="secondary" className="bg-slate-200 text-slate-700">
            Inactive
          </Badge>
        ),
    },
  ];

  const rows = (data as (IHospital & Record<string, unknown>)[]) ?? [];

  return (
    <div className="space-y-6">
      <PageHeader title="Hospitals" subtitle="Manage hospital network" actionLabel="Add New" onAction={() => setIsAddOpen(true)} />
      {isError ? (
        <p className="text-sm text-red-600">
          Failed to load.{' '}
          <button type="button" className="underline" onClick={() => refetch()}>
            Retry
          </button>
        </p>
      ) : null}
      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        onEdit={setEditItem}
        onDelete={setDeleteItem}
        searchable
        searchKeys={['name', 'address', 'phone']}
      />

      <CrudModal
        isOpen={isAddOpen || !!editItem}
        onClose={() => {
          setIsAddOpen(false);
          setEditItem(null);
        }}
        title={editItem ? 'Edit Hospital' : 'Add Hospital'}
        isLoading={createMut.isPending || updateMut.isPending}
        formId={FORM_ID}
      >
        <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input {...register('name')} className="mt-1" />
            {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
          </div>
          <div>
            <Label>Address</Label>
            <Textarea {...register('address')} className="mt-1" rows={2} />
            {errors.address ? <p className="mt-1 text-xs text-red-600">{errors.address.message}</p> : null}
          </div>
          <div>
            <Label>City</Label>
            <Input {...register('city')} className="mt-1" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input {...register('phone')} className="mt-1" />
            {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
          </div>
          <div>
            <Label>Timings</Label>
            <Input {...register('timings')} placeholder="Mon-Sat: 9AM-5PM" className="mt-1" />
          </div>
          <div>
            <Label>Services (comma-separated)</Label>
            <Input {...register('services')} className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Latitude</Label>
              <Input type="number" step="any" {...register('lat')} className="mt-1" />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input type="number" step="any" {...register('lng')} className="mt-1" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={isActive} onCheckedChange={(c: boolean) => setValue('isActive', c)} id="h-active" />
            <Label htmlFor="h-active">Active</Label>
          </div>
        </form>
      </CrudModal>

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete hospital?"
        description="This cannot be undone."
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
