'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Globe, Share2, Users, HeartHandshake, HandHeart } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface NewsletterForm {
  email: string;
}

export default function Footer() {
  const { register, handleSubmit, reset } = useForm<NewsletterForm>();

  const onSubmit = (values: NewsletterForm) => {
    toast.success(`Subscribed: ${values.email}`);
    reset();
  };

  return (
    <footer className="w-full bg-[#001a4d] pb-8 pt-16 dark:bg-[#000d26]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-12 md:grid-cols-4">
        <div className="col-span-1 md:col-span-1">
          <span className="mb-4 block text-xl font-bold text-white">YCDO</span>
          <p className="mb-6 text-base leading-relaxed text-[#e5eeff]/60">
            Serving the underserved with dignity and professional excellence for over three decades.
          </p>
          <div className="flex gap-4">
            <Link href={ROUTES.HOME} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#C0272D]">
              <Globe className="h-5 w-5" />
            </Link>
            <Link href={ROUTES.HOME} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#C0272D]">
              <Share2 className="h-5 w-5" />
            </Link>
            <Link href={ROUTES.HOME} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#C0272D]">
              <Users className="h-5 w-5" />
            </Link>
            <Link href={ROUTES.HOME} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#C0272D]">
              <HeartHandshake className="h-5 w-5" />
            </Link>
            <Link href={ROUTES.HOME} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#C0272D]">
              <HandHeart className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-6 font-bold text-white">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link className="block text-[#e5eeff]/60 transition-transform duration-200 hover:translate-x-1 hover:text-white" href={ROUTES.NEWS}>Impact Reports</Link></li>
            <li><Link className="block text-[#e5eeff]/60 transition-transform duration-200 hover:translate-x-1 hover:text-white" href={ROUTES.ABOUT}>Privacy Policy</Link></li>
            <li><Link className="block text-[#e5eeff]/60 transition-transform duration-200 hover:translate-x-1 hover:text-white" href={ROUTES.ABOUT}>Terms of Service</Link></li>
            <li><Link className="block text-[#e5eeff]/60 transition-transform duration-200 hover:translate-x-1 hover:text-white" href={ROUTES.CONTACT}>Volunteer Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-bold text-white">Programs</h4>
          <ul className="space-y-4">
            <li><Link className="block text-[#e5eeff]/60 transition-transform duration-200 hover:translate-x-1 hover:text-white" href={ROUTES.HEALTHCARE}>Healthcare Relief</Link></li>
            <li><Link className="block text-[#e5eeff]/60 transition-transform duration-200 hover:translate-x-1 hover:text-white" href={ROUTES.EDUCATION}>Education Fund</Link></li>
            <li><Link className="block text-[#e5eeff]/60 transition-transform duration-200 hover:translate-x-1 hover:text-white" href={ROUTES.PROJECTS}>Safe Water Initiative</Link></li>
            <li><Link className="block text-[#e5eeff]/60 transition-transform duration-200 hover:translate-x-1 hover:text-white" href={ROUTES.DONATE}>Zakat Programs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-bold text-white">Newsletter</h4>
          <p className="mb-4 text-sm text-[#e5eeff]/60">Stay updated with our latest impact stories.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="rounded-lg border-none bg-white/5 p-3 text-white focus:ring-2 focus:ring-[#C0272D]"
              {...register('email', { required: true })}
            />
            <button type="submit" className="rounded-lg bg-[#C0272D] p-3 font-bold text-white transition-colors hover:bg-[#9B1B20]">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 px-12 pt-8 md:flex-row">
        <p className="text-sm text-[#e5eeff]/40">© 2024 YCDO. All rights reserved.</p>
        <div className="flex gap-8 text-sm text-[#e5eeff]/40">
          <Link className="hover:text-white" href={ROUTES.CONTACT}>Head Office: Lahore, Pakistan</Link>
          <Link className="hover:text-white" href={ROUTES.CONTACT}>+92 (0) 42 111 222 333</Link>
        </div>
      </div>
    </footer>
  );
}
