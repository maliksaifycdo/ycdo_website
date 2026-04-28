'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import { ChevronDown, PlayCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLocale } from '@/contexts/LocaleContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCXbITOeglG0nS6GD-0BviNNG7GcP6LbhqydlFUWmTzxb1FrlScCRxFi826mVo5Ov2VuWP10UizZCMg9AnOeMfb11rWKfpfL0dYDRg-qr8LN1MqXl32A6F-1drS1JLD2lrIou0ZB_nDy9PhJbyjXC6VJHkLq-spY3ADw__miKaRWTabk4WxjAEIDH4N1p_eEyMRJVUIkp5U2ZRW9dlHrUMxdwJz99a_6qBxwRqdVfbl0hzVRAxzJNA8ElwoJE_SNdN-eiOMoEJKYHrF';

export default function DonateHero() {
  const { t, locale } = useLocale();

  return (
    <header className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#00236f]/90 to-[#1a3a8f]/40" />
        <Image
          src={HERO_IMAGE}
          alt="Children in a community school smiling together"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative z-20 max-w-4xl px-6 text-center">
        <motion.span
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className={`mb-6 inline-block rounded-full bg-[#fe5553]/20 px-4 py-1 text-sm font-bold tracking-widest text-[#fe5553] backdrop-blur-sm ${locale === 'en' ? 'uppercase' : ''}`}
        >
          {t('pages.donate.kicker')}
        </motion.span>
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8 text-5xl font-black leading-[0.9] tracking-tighter text-white md:text-7xl lg:text-8xl"
        >
          {t('pages.donate.h1a')} <br />
          <span className="text-[#fe5553]">{t('pages.donate.h1b')}</span>
        </motion.h1>
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-[#e5eeff] md:text-2xl"
        >
          {t('pages.donate.subtitle')}
        </motion.p>
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col items-center justify-center gap-6 md:flex-row"
        >
          <motion.a
            href="#donation-form"
            className="inline-block rounded-xl bg-[#fe5553] px-10 py-5 text-lg font-extrabold text-white shadow-lg shadow-[#fe5553]/40 transition-transform hover:shadow-2xl"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 0 0 rgba(254,85,83,0.7)',
                '0 0 0 15px rgba(254,85,83,0)',
                '0 0 0 0 rgba(254,85,83,0)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {t('pages.donate.donateBtn')}
          </motion.a>
          <button
            type="button"
            onClick={() => toast(t('pages.donate.videoToast'), { icon: 'ℹ️' })}
            className="flex items-center gap-2 rounded-xl px-6 py-5 font-semibold text-white transition-all hover:bg-white/10"
          >
            <PlayCircle className="h-6 w-6 shrink-0" aria-hidden />
            {t('pages.donate.watchBtn')}
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-10 w-10 text-white" aria-hidden />
      </div>
    </header>
  );
}
