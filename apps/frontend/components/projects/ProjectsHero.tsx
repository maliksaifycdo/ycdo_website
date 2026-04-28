'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import { useLocale } from '@/contexts/LocaleContext';
import { fadeUp, staggerContainer } from '@/utils/motion';

export default function ProjectsHero() {
  const { t, locale } = useLocale();

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#1A3A8F] via-[#1A3A8F] to-[#1A3A8F] pb-24 pt-32 md:pb-32 md:pt-48">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPEguyQNtuZWkwYciq0nBO_Xls7cge04TSaCtLIlJboKS6xOdcSfwrBUmpMS_7Sx09k7hBuSwaEiRvBf0k0xBfcr324_4VbIdMgS5Bpwn3d3lipNkastnHY_u6IiQwhtEfAkONnIdEFGcSj9V1xgJ7Vt3wLCRnbrltLuDC8tg4yXYq1PhHJVoRfUTrefnxFHYdzkMZjxgAA7bTk08Wx1MtZ3K3k2-HE9943w39DoRHlrU3TMz6jBj5QOPnStZf7gKIa3srzo5DQJR8"
          alt="close up of children hands reaching out in sunlight against a soft blurred background, cinematic lighting and high-end humanitarian aesthetic"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover mix-blend-overlay"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.span variants={fadeUp} className={`mb-4 block text-xs font-bold tracking-[0.2em] text-[#fe5553] ${locale === 'en' ? 'uppercase' : ''}`}>
            {t('pages.projects.kicker')}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mb-6 text-5xl font-black leading-tight tracking-tighter text-white md:text-7xl"
          >
            {t('pages.projects.h1a')}
            <br />
            <span className="text-[#dce1ff]">{t('pages.projects.h1b')}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-xl text-lg leading-relaxed text-[#e5eeff]/80">
            {t('pages.projects.subtitle')}
          </motion.p>
        </motion.div>
      </div>
    </header>
  );
}
