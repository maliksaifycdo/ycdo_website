'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BadgeCheck, Clock } from 'lucide-react';
import { z } from 'zod';
import api from '@/services/api';

const scholarshipSchema = z.object({
  name: z.string().min(2, 'Name required'),
  fatherName: z.string().min(2, "Father's name required"),
  cnic: z.string().min(13, 'Valid CNIC required'),
  level: z.enum(['Matriculation', 'Intermediate', 'Undergraduate']),
  institution: z.string().min(2, 'Institution required'),
  lastResult: z
    .string()
    .min(1, 'Last result required')
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 100, 'Result must be 0-100'),
  monthlyIncome: z.string().min(1, 'Income required'),
  phone: z.string().min(10, 'Phone required'),
});

type ScholarshipFormData = z.infer<typeof scholarshipSchema>;

export default function ScholarshipForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ScholarshipFormData>({
    resolver: zodResolver(scholarshipSchema),
  });

  const onSubmit = async (data: ScholarshipFormData) => {
    try {
      await api.post('/volunteers', {
        name: data.name,
        email: `${data.cnic}@scholarship.local`,
        phone: data.phone,
        skills: ['scholarship'],
        availability: `${data.level} | ${data.institution} | Income: ${data.monthlyIncome} | Father: ${data.fatherName} | Result: ${Number(data.lastResult)}%`,
      });
      toast.success('Scholarship application submitted');
      reset();
    } catch {
      toast.error('Submission failed. Please try again.');
    }
  };

  return (
    <section className="bg-slate-100 py-24">
      <div className="container mx-auto px-12">
        <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-[3rem] bg-white shadow-2xl md:flex-row">
          <div className="flex flex-col justify-center bg-[#C0272D] p-12 text-white md:w-1/3">
            <h2 className="mb-6 text-3xl font-black">Apply for a Scholarship</h2>
            <p className="mb-8 opacity-80">Take the first step toward your academic future. Please ensure all details are accurate according to your CNIC and certificates.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <BadgeCheck className="h-5 w-5" />
                <span className="text-sm font-medium">Merit-Based Selection</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">Deadline: Aug 30, 2024</span>
              </div>
            </div>
          </div>

          <div className="p-12 md:w-2/3">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Name</label>
                <input {...register('name')} className="w-full rounded-lg border-none bg-slate-100 p-3 focus:ring-2 focus:ring-[#C0272D]" placeholder="Enter Full Name" />
                {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Father's Name</label>
                <input {...register('fatherName')} className="w-full rounded-lg border-none bg-slate-100 p-3 focus:ring-2 focus:ring-[#C0272D]" placeholder="Father's Full Name" />
                {errors.fatherName ? <p className="mt-1 text-xs text-red-600">{errors.fatherName.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">CNIC Number</label>
                <input {...register('cnic')} className="w-full rounded-lg border-none bg-slate-100 p-3 focus:ring-2 focus:ring-[#C0272D]" placeholder="00000-0000000-0" />
                {errors.cnic ? <p className="mt-1 text-xs text-red-600">{errors.cnic.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Education Level</label>
                <select {...register('level')} className="w-full rounded-lg border-none bg-slate-100 p-3 focus:ring-2 focus:ring-[#C0272D]">
                  <option value="Matriculation">Matriculation</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Undergraduate">Undergraduate</option>
                </select>
                {errors.level ? <p className="mt-1 text-xs text-red-600">{errors.level.message}</p> : null}
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Current Institution</label>
                <input {...register('institution')} className="w-full rounded-lg border-none bg-slate-100 p-3 focus:ring-2 focus:ring-[#C0272D]" placeholder="Name of your School / College / University" />
                {errors.institution ? <p className="mt-1 text-xs text-red-600">{errors.institution.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Last Result %</label>
                <input type="number" {...register('lastResult')} className="w-full rounded-lg border-none bg-slate-100 p-3 focus:ring-2 focus:ring-[#C0272D]" placeholder="e.g. 85" />
                {errors.lastResult ? <p className="mt-1 text-xs text-red-600">{errors.lastResult.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Monthly Family Income</label>
                <input {...register('monthlyIncome')} className="w-full rounded-lg border-none bg-slate-100 p-3 focus:ring-2 focus:ring-[#C0272D]" placeholder="PKR" />
                {errors.monthlyIncome ? <p className="mt-1 text-xs text-red-600">{errors.monthlyIncome.message}</p> : null}
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Contact Number</label>
                <input type="tel" {...register('phone')} className="w-full rounded-lg border-none bg-slate-100 p-3 focus:ring-2 focus:ring-[#C0272D]" placeholder="+92 3XX XXXXXXX" />
                {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
              </div>
              <div className="mt-4 md:col-span-2">
                <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[#C0272D] py-4 text-lg font-black text-white shadow-lg shadow-[#C0272D]/20 transition-colors hover:bg-[#9B1B20] disabled:opacity-70">
                  {isSubmitting ? 'Submitting...' : 'Submit Scholarship Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
