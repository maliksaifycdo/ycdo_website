'use client';

import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { scaleIn } from '@/utils/motion';

export default function VolunteerCTA() {
  const { t } = useLocale();

  return (
    <section className="mx-8 mb-24">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#C0272D] p-12 text-center md:p-24"
      >
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="mb-8 text-5xl font-black leading-tight text-white md:text-6xl">
            {t('home.volunteerCta.title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href={ROUTES.CONTACT} className="rounded-xl bg-white px-12 py-5 text-xl font-black text-[#C0272D] shadow-2xl transition-all hover:bg-slate-100">
              {t('home.volunteerCta.volunteerBtn')}
            </Link>
            <Link href={ROUTES.DONATE} className="rounded-xl border-2 border-white px-12 py-5 text-xl font-black text-white transition-all hover:bg-white/10">
              {t('home.volunteerCta.donationBtn')}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
