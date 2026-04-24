'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { ContactSubject } from '@ycdo/shared';
import { Check, Send } from 'lucide-react';
import { contactsService } from '@/services/contacts.service';

const SUBJECT_OPTIONS = ['General Inquiry', 'Donation Support', 'Volunteer Program', 'Media & PR'] as const;

const contactSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z
    .string()
    .refine((v) => v.trim() === '' || v.trim().length >= 10, { message: 'At least 10 digits if provided' }),
  subject: z.enum(SUBJECT_OPTIONS),
  message: z.string().min(10, 'Min 10 characters'),
});

export type ContactFormValues = z.output<typeof contactSchema>;

const SUBJECT_TO_API: Record<(typeof SUBJECT_OPTIONS)[number], ContactSubject> = {
  'General Inquiry': ContactSubject.GENERAL,
  'Donation Support': ContactSubject.DONATION,
  'Volunteer Program': ContactSubject.VOLUNTEER,
  'Media & PR': ContactSubject.MEDIA,
};

const inputClass =
  'w-full rounded-t-lg border-b-2 border-slate-300 bg-[#f8f9ff] px-4 py-4 transition-all focus:border-[#00236f] focus:ring-0 focus:outline-none';

export default function ContactForm() {
  const [showSuccessCheck, setShowSuccessCheck] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const phoneTrim = data.phone.trim();
      await contactsService.create({
        name: data.name,
        email: data.email,
        ...(phoneTrim ? { phone: phoneTrim } : {}),
        subject: SUBJECT_TO_API[data.subject],
        message: data.message,
      });
      setShowSuccessCheck(true);
      toast.success('Message sent. We will get back to you soon.');
      reset({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
      window.setTimeout(() => setShowSuccessCheck(false), 2200);
    } catch {
      toast.error('Could not send message. Please try again.');
    }
  };

  return (
    <section className="w-full rounded-2xl border border-slate-200/80 bg-white p-12 shadow-2xl shadow-[#00236f]/5 md:w-[55%]">
      <div className="relative mb-8 flex items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-[#00236f]">Send a Message</h2>
        <AnimatePresence>
          {showSuccessCheck ? (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -40 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 16 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A7A3C] text-white shadow-lg"
              aria-hidden
            >
              <motion.div
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08, duration: 0.25 }}
              >
                <Check className="h-7 w-7" strokeWidth={3} />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-tighter text-slate-600">
              Full Name
            </label>
            <input {...register('name')} className={inputClass} placeholder="John Doe" type="text" />
            {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-tighter text-slate-600">
              Email Address
            </label>
            <input {...register('email')} className={inputClass} placeholder="john@example.com" type="email" />
            {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-tighter text-slate-600">
              Phone Number
            </label>
            <input {...register('phone')} className={inputClass} placeholder="+92 300 1234567" type="tel" />
            {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold uppercase tracking-tighter text-slate-600">
              Subject
            </label>
            <select {...register('subject')} className={inputClass}>
              {SUBJECT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.subject ? <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p> : null}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold uppercase tracking-tighter text-slate-600">
            Your Message
          </label>
          <textarea
            {...register('message')}
            rows={6}
            className={inputClass}
            placeholder="How can we assist you today?"
          />
          {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message.message}</p> : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#b72028] py-5 text-lg font-bold uppercase tracking-widest text-white shadow-xl shadow-[#b72028]/20 transition-all hover:bg-[#fe5553] disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : 'Send Message'}
          <Send className="h-5 w-5" aria-hidden />
        </button>
      </form>
    </section>
  );
}
