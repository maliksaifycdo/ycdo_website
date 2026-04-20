'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface NewsletterForm {
  email: string;
}

export default function GalleryNewsletter() {
  const { register, handleSubmit, reset } = useForm<NewsletterForm>();

  const onSubmit = ({ email }: NewsletterForm) => {
    toast.success(`Subscribed: ${email}`);
    reset();
  };

  return (
    <section className="relative overflow-hidden bg-[#1A3A8F] py-20">
      <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-4xl px-8 text-center">
        <h2 className="mb-6 text-3xl font-black tracking-tighter text-white md:text-5xl">Get Impact Stories Delivered</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex max-w-2xl flex-col gap-4 md:flex-row">
          <input
            type="email"
            placeholder="Your Email Address"
            {...register('email', { required: true })}
            className="flex-1 rounded-xl border-transparent bg-white/10 px-8 py-4 text-white placeholder:text-white/50 outline-none transition-all focus:bg-white/20 focus:ring-2 focus:ring-[#C0272D]"
          />
          <button type="submit" className="rounded-xl bg-[#C0272D] px-10 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

