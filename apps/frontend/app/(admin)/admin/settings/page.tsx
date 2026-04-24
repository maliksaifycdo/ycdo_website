'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import PageHeader from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSettings, useUpdateSetting } from '@/hooks/useSettings';
import type { ISetting } from '@ycdo/shared';

const optionalUrl = z.union([z.literal(''), z.string().url('Must be a valid URL')]);

const schema = z.object({
  contact_phone: z.string().min(1),
  contact_email: z.string().email(),
  contact_address: z.string().min(1),
  contact_working_hours: z.string(),
  bank_account_title: z.string().min(1),
  bank_name: z.string().min(1),
  bank_account_number: z.string().min(1),
  bank_iban: z.string().min(1),
  facebook_url: optionalUrl,
  twitter_url: optionalUrl,
  instagram_url: optionalUrl,
  youtube_url: optionalUrl,
});

type FormValues = z.infer<typeof schema>;

const EMPTY: FormValues = {
  contact_phone: '',
  contact_email: '',
  contact_address: '',
  contact_working_hours: '',
  bank_account_title: '',
  bank_name: '',
  bank_account_number: '',
  bank_iban: '',
  facebook_url: '',
  twitter_url: '',
  instagram_url: '',
  youtube_url: '',
};

function mapSettingsToForm(settings: ISetting[]): FormValues {
  const byKey = Object.fromEntries(settings.map((s) => [s.key, s.value])) as Record<string, string>;
  return {
    contact_phone: byKey.contact_phone ?? '',
    contact_email: byKey.contact_email ?? '',
    contact_address: byKey.contact_address ?? '',
    contact_working_hours: byKey.contact_working_hours ?? '',
    bank_account_title: byKey.bank_account_title ?? '',
    bank_name: byKey.bank_name ?? '',
    bank_account_number: byKey.bank_account_number ?? '',
    bank_iban: byKey.bank_iban ?? '',
    facebook_url: byKey.facebook_url ?? '',
    twitter_url: byKey.twitter_url ?? '',
    instagram_url: byKey.instagram_url ?? '',
    youtube_url: byKey.youtube_url ?? '',
  };
}

export default function AdminSettingsPage() {
  const { data: settings = [], isLoading, isError, refetch } = useSettings();
  const updateMut = useUpdateSetting();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY,
  });

  const { register, handleSubmit, reset, formState: { errors } } = form;

  useEffect(() => {
    if (settings.length) reset(mapSettingsToForm(settings));
  }, [settings, reset]);

  const patchKeys = async (keys: (keyof FormValues)[]) => {
    const vals = form.getValues();
    for (const key of keys) {
      const value = vals[key]?.trim() ?? '';
      await updateMut.mutateAsync({ key: String(key), dto: { value } });
    }
  };

  const onSaveContact = handleSubmit(async () => {
    try {
      await patchKeys(['contact_phone', 'contact_email', 'contact_address', 'contact_working_hours']);
      toast.success('Contact settings saved');
    } catch {
      toast.error('Save failed');
    }
  });

  const onSaveBank = handleSubmit(async () => {
    try {
      await patchKeys(['bank_account_title', 'bank_name', 'bank_account_number', 'bank_iban']);
      toast.success('Bank details saved');
    } catch {
      toast.error('Save failed');
    }
  });

  const onSaveSocial = handleSubmit(async () => {
    try {
      await patchKeys(['facebook_url', 'twitter_url', 'instagram_url', 'youtube_url']);
      toast.success('Social links saved');
    } catch {
      toast.error('Save failed');
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Site settings" />
        <p className="text-sm text-slate-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <PageHeader title="Site settings" subtitle="Update public contact, banking, and social information." />
      {isError ? (
        <button type="button" className="text-sm text-red-600 underline" onClick={() => refetch()}>
          Retry
        </button>
      ) : null}

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-[#1A3A8F]">Contact</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <Label>Phone number</Label>
            <Input {...register('contact_phone')} className="mt-1" />
            {errors.contact_phone ? <p className="mt-1 text-xs text-red-600">{errors.contact_phone.message}</p> : null}
          </div>
          <div className="sm:col-span-1">
            <Label>Email address</Label>
            <Input {...register('contact_email')} className="mt-1" />
            {errors.contact_email ? <p className="mt-1 text-xs text-red-600">{errors.contact_email.message}</p> : null}
          </div>
          <div className="sm:col-span-2">
            <Label>Office address</Label>
            <Textarea {...register('contact_address')} className="mt-1" rows={3} />
            {errors.contact_address ? <p className="mt-1 text-xs text-red-600">{errors.contact_address.message}</p> : null}
          </div>
          <div className="sm:col-span-2">
            <Label>Working hours</Label>
            <Input {...register('contact_working_hours')} className="mt-1" placeholder="Mon–Sat: 9:00–17:00" />
          </div>
        </div>
        <Button type="button" className="bg-[#C0272D] text-white hover:bg-[#9B1B20]" disabled={updateMut.isPending} onClick={onSaveContact}>
          {updateMut.isPending ? 'Saving…' : 'Save contact section'}
        </Button>
      </section>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-[#1A3A8F]">Bank details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Account title</Label>
            <Input {...register('bank_account_title')} className="mt-1" />
            {errors.bank_account_title ? <p className="mt-1 text-xs text-red-600">{errors.bank_account_title.message}</p> : null}
          </div>
          <div>
            <Label>Bank name</Label>
            <Input {...register('bank_name')} className="mt-1" />
          </div>
          <div>
            <Label>Account number</Label>
            <Input {...register('bank_account_number')} className="mt-1" />
          </div>
          <div className="sm:col-span-2">
            <Label>IBAN</Label>
            <Input {...register('bank_iban')} className="mt-1" />
            {errors.bank_iban ? <p className="mt-1 text-xs text-red-600">{errors.bank_iban.message}</p> : null}
          </div>
        </div>
        <Button type="button" className="bg-[#C0272D] text-white hover:bg-[#9B1B20]" disabled={updateMut.isPending} onClick={onSaveBank}>
          {updateMut.isPending ? 'Saving…' : 'Save bank section'}
        </Button>
      </section>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-[#1A3A8F]">Social media</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Facebook URL</Label>
            <Input {...register('facebook_url')} className="mt-1" />
            {errors.facebook_url ? <p className="mt-1 text-xs text-red-600">{errors.facebook_url.message}</p> : null}
          </div>
          <div className="sm:col-span-2">
            <Label>Twitter / X URL</Label>
            <Input {...register('twitter_url')} className="mt-1" />
            {errors.twitter_url ? <p className="mt-1 text-xs text-red-600">{errors.twitter_url.message}</p> : null}
          </div>
          <div className="sm:col-span-2">
            <Label>Instagram URL</Label>
            <Input {...register('instagram_url')} className="mt-1" />
            {errors.instagram_url ? <p className="mt-1 text-xs text-red-600">{errors.instagram_url.message}</p> : null}
          </div>
          <div className="sm:col-span-2">
            <Label>YouTube URL</Label>
            <Input {...register('youtube_url')} className="mt-1" />
            {errors.youtube_url ? <p className="mt-1 text-xs text-red-600">{errors.youtube_url.message}</p> : null}
          </div>
        </div>
        <Button type="button" className="bg-[#C0272D] text-white hover:bg-[#9B1B20]" disabled={updateMut.isPending} onClick={onSaveSocial}>
          {updateMut.isPending ? 'Saving…' : 'Save social section'}
        </Button>
      </section>
    </div>
  );
}
