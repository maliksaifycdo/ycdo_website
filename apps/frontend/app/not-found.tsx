'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="text-center"
      >
        <p className="text-8xl font-black tracking-tighter text-[#1A3A8F] md:text-9xl" aria-hidden>
          404
        </p>
        <h1 className="mt-4 text-2xl font-black text-[#1A3A8F] md:text-3xl">Page Not Found</h1>
        <p className="mx-auto mt-3 max-w-md text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild className="mt-10 bg-[#C0272D] px-8 py-6 text-base font-bold text-white hover:bg-[#9B1B20]">
          <Link href={ROUTES.HOME}>Go Back Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
