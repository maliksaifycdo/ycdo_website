'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { DonationCampaign, PaymentMethod } from '@ycdo/shared';
import { cn } from '@/lib/utils';
import { donationsService } from '@/services/donations.service';

const donationSchema = z.object({
  amount: z.preprocess(
    (v) => (typeof v === 'number' ? v : Number(v)),
    z
      .number()
      .refine((n) => Number.isFinite(n), { message: 'Enter a valid amount' })
      .min(100, 'Min PKR 100'),
  ),
  frequency: z.enum(['one-time', 'monthly']),
  type: z.enum(['sadqa', 'zakat']),
  donorName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  paymentMethod: z.enum(['jazzcash', 'easypaisa', 'bank_transfer']),
});

export type DonationFormValues = z.output<typeof donationSchema>;

const PRESETS = [500, 1000, 2500, 5000, 10000] as const;

const CAMPAIGN_TITLES: Record<DonationCampaign, string> = {
  [DonationCampaign.HEALTHCARE]: 'Emergency Medical Fund',
  [DonationCampaign.EDUCATION]: 'School Supplies Drive',
  [DonationCampaign.FOOD]: 'Monthly Ration Kits',
  [DonationCampaign.WATER]: 'Solar Water Pumps',
};

type Props = {
  selectedCampaign: DonationCampaign | null;
};

export default function DonationForm({ selectedCampaign }: Props) {
  const [activeAmount, setActiveAmount] = useState<number | 'custom'>(1000);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema) as Resolver<DonationFormValues>,
    defaultValues: {
      amount: 1000,
      frequency: 'one-time',
      type: 'sadqa',
      donorName: '',
      email: '',
      phone: '',
      paymentMethod: 'easypaisa',
    },
  });

  const frequency = watch('frequency');
  const type = watch('type');
  const paymentMethod = watch('paymentMethod');
  const amount = watch('amount');

  useEffect(() => {
    if (typeof amount === 'number' && PRESETS.includes(amount as (typeof PRESETS)[number])) {
      setActiveAmount(amount);
    } else if (typeof amount === 'number' && amount > 0 && !PRESETS.includes(amount as (typeof PRESETS)[number])) {
      setActiveAmount('custom');
    }
  }, [amount]);

  const onSubmit = async (data: DonationFormValues) => {
    try {
      await donationsService.create({
        donorName: data.donorName,
        email: data.email,
        phone: data.phone,
        amount: data.amount,
        campaign: selectedCampaign ?? DonationCampaign.HEALTHCARE,
        method: data.paymentMethod as PaymentMethod,
        isZakat: data.type === 'zakat',
      });
      toast.success('Thank you — your donation was recorded.');
      reset({
        amount: 1000,
        frequency: data.frequency,
        type: data.type,
        donorName: '',
        email: '',
        phone: '',
        paymentMethod: data.paymentMethod,
      });
      setActiveAmount(1000);
    } catch {
      toast.error('Could not complete donation. Please try again.');
    }
  };

  const pickPreset = (n: number) => {
    setValue('amount', n, { shouldValidate: true });
    setActiveAmount(n);
  };

  const amountField = register('amount', { valueAsNumber: true });

  return (
    <section className="bg-[#eff4ff] py-24" id="donation-form">
      <div className="mx-auto max-w-4xl px-6">
        {selectedCampaign ? (
          <p className="mb-6 text-center text-sm font-semibold text-[#00236f]">
            Selected campaign:{' '}
            <span className="text-[#b72028]">{CAMPAIGN_TITLES[selectedCampaign]}</span>
          </p>
        ) : (
          <p className="mb-6 text-center text-sm text-slate-600">
            Tip: choose a campaign above, or we will allocate to <strong>Emergency Medical Fund</strong>.
          </p>
        )}

        <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-[#00236f]/5">
          <div className="bg-[#00236f] p-12 text-center">
            <h2 className="mb-2 text-3xl font-black uppercase tracking-tight text-white">Secure Donation Portal</h2>
            <p className="text-lg text-[#91a9ff]/90">Your small act can create big change.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 p-12">
            <div>
              <label className="mb-6 block text-sm font-bold uppercase tracking-widest text-[#00236f]">
                1. Choose Amount (PKR)
              </label>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {PRESETS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => pickPreset(n)}
                    className={cn(
                      'rounded-xl border-2 py-4 text-xl font-black transition-all',
                      activeAmount === n
                        ? 'border-[#fe5553] bg-[#fe5553]/5 text-[#fe5553]'
                        : 'border-slate-300 hover:border-[#fe5553] hover:text-[#fe5553]',
                    )}
                  >
                    {n}
                  </button>
                ))}
                <div className="relative">
                  <input
                    type="number"
                    min={100}
                    step={1}
                    placeholder="Custom"
                    className={cn(
                      'w-full rounded-xl border-2 py-4 px-4 text-xl font-black outline-none focus:border-[#fe5553] focus:ring-2 focus:ring-[#fe5553]',
                      activeAmount === 'custom' ? 'border-[#fe5553] bg-[#fe5553]/5' : 'border-slate-300',
                    )}
                    name={amountField.name}
                    ref={amountField.ref}
                    onBlur={amountField.onBlur}
                    onChange={(e) => {
                      amountField.onChange(e);
                      setActiveAmount('custom');
                    }}
                    onFocus={() => setActiveAmount('custom')}
                  />
                </div>
              </div>
              {errors.amount ? <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p> : null}
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <label className="mb-6 block text-sm font-bold uppercase tracking-widest text-[#00236f]">
                  2. Frequency
                </label>
                <div className="flex rounded-xl bg-[#e5eeff] p-1">
                  <button
                    type="button"
                    onClick={() => setValue('frequency', 'one-time')}
                    className={cn(
                      'flex-1 rounded-lg py-3 font-bold transition-colors',
                      frequency === 'one-time'
                        ? 'bg-white text-[#00236f] shadow-sm'
                        : 'text-slate-600 hover:text-[#00236f]',
                    )}
                  >
                    One-time
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue('frequency', 'monthly')}
                    className={cn(
                      'flex-1 rounded-lg py-3 font-bold transition-colors',
                      frequency === 'monthly'
                        ? 'bg-white text-[#00236f] shadow-sm'
                        : 'text-slate-600 hover:text-[#00236f]',
                    )}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-6 block text-sm font-bold uppercase tracking-widest text-[#00236f]">
                  3. Contribution Type
                </label>
                <div className="flex rounded-xl bg-[#e5eeff] p-1">
                  <button
                    type="button"
                    onClick={() => setValue('type', 'sadqa')}
                    className={cn(
                      'flex-1 rounded-lg py-3 font-bold transition-colors',
                      type === 'sadqa'
                        ? 'bg-white text-[#00236f] shadow-sm'
                        : 'text-slate-600 hover:text-[#00236f]',
                    )}
                  >
                    Sadqa
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue('type', 'zakat')}
                    className={cn(
                      'flex-1 rounded-lg py-3 font-bold transition-colors',
                      type === 'zakat'
                        ? 'bg-white text-[#00236f] shadow-sm'
                        : 'text-slate-600 hover:text-[#00236f]',
                    )}
                  >
                    Zakat
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-6 block text-sm font-bold uppercase tracking-widest text-[#00236f]">
                4. Personal Information
              </label>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <input
                    {...register('donorName')}
                    placeholder="Full Name"
                    className="w-full rounded-xl border-none bg-[#f8f9ff] py-4 px-6 font-medium outline-none ring-slate-200 focus:ring-2 focus:ring-[#00236f]"
                  />
                  {errors.donorName ? (
                    <p className="mt-1 text-xs text-red-600">{errors.donorName.message}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-xl border-none bg-[#f8f9ff] py-4 px-6 font-medium outline-none ring-slate-200 focus:ring-2 focus:ring-[#00236f]"
                  />
                  {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
                </div>
                <div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full rounded-xl border-none bg-[#f8f9ff] py-4 px-6 font-medium outline-none ring-slate-200 focus:ring-2 focus:ring-[#00236f]"
                  />
                  {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-6 block text-sm font-bold uppercase tracking-widest text-[#00236f]">
                5. Payment Method
              </label>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setValue('paymentMethod', 'jazzcash')}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-2xl border-2 p-6 transition-all',
                    paymentMethod === 'jazzcash'
                      ? 'border-[#1A3A8F] bg-[#1A3A8F]/5'
                      : 'border-slate-300 hover:border-[#00236f]',
                  )}
                >
                  <div className="mb-2 h-10 w-16 overflow-hidden rounded bg-slate-100">
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-400 to-red-500 text-xs font-bold text-white">
                      JazzCash
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-xs font-bold uppercase tracking-tighter',
                      paymentMethod === 'jazzcash' ? 'text-[#00236f]' : 'text-slate-600',
                    )}
                  >
                    JazzCash
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setValue('paymentMethod', 'easypaisa')}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-2xl border-2 p-6 transition-all',
                    paymentMethod === 'easypaisa'
                      ? 'border-[#1A3A8F] bg-[#1A3A8F]/5'
                      : 'border-slate-300 hover:border-[#00236f]',
                  )}
                >
                  <div className="mb-2 h-10 w-16 overflow-hidden rounded bg-slate-100">
                    <div className="flex h-full w-full items-center justify-center bg-emerald-500 text-[10px] font-bold text-white">
                      EasyPaisa
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-xs font-bold uppercase tracking-tighter',
                      paymentMethod === 'easypaisa' ? 'text-[#00236f]' : 'text-slate-600',
                    )}
                  >
                    EasyPaisa
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setValue('paymentMethod', 'bank_transfer')}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-2xl border-2 p-6 transition-all',
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#1A3A8F] bg-[#1A3A8F]/5'
                      : 'border-slate-300 hover:border-[#00236f]',
                  )}
                >
                  <div className="mb-2 h-10 w-16 overflow-hidden rounded bg-slate-100">
                    <div className="flex h-full w-full items-center justify-center bg-[#00236f] text-[10px] font-bold uppercase text-white">
                      Bank
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-xs font-bold uppercase tracking-tighter',
                      paymentMethod === 'bank_transfer' ? 'text-[#00236f]' : 'text-slate-600',
                    )}
                  >
                    Transfer
                  </span>
                </button>
              </div>
              {errors.paymentMethod ? (
                <p className="mt-2 text-sm text-red-600">{errors.paymentMethod.message}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-[#fe5553] py-6 text-xl font-black uppercase tracking-widest text-white shadow-xl shadow-[#fe5553]/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting…' : 'Complete Donation'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
