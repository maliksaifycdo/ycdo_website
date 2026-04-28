'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import { useLocale } from '@/contexts/LocaleContext';
import { staggerContainer, staggerItem } from '@/utils/motion';

export default function EducationHero() {
  const { t, locale } = useLocale();

  return (
    <section className="hero-gradient relative flex h-[614px] items-center overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSuSpclvB6IbF8qehlROElBBAVP42aohnIDceiusKiIk05mBNjbHXzUkAH6WGDLMYiL4ciWak3BP4j0MrfNz77INtDmVFV1mTd33cVf4D2ICd77mwSDPrER77DBxp6ALCujyDjZs02a5mUjjzqOqq57wur8Bt5FWo_mT7D7IgYU5lLZYFRblyfpEWwW5AeAwHz7oNpMr-FduLTHygK-nBxdlWErwY9H0sAqNzkbsjApNK15PmIvl18Hl6Up3bTgq_iuP7rqIie9B"
          alt="wide shot of a sunlit classroom in a rural village with children smiling and holding books"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
          priority
        />
      </div>
      <div className="container relative z-10 mx-auto px-12">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.span
            variants={staggerItem}
            className={`mb-6 inline-block rounded-full bg-[#C0272D] px-4 py-1 text-xs font-bold tracking-widest text-white ${locale === 'en' ? 'uppercase' : ''}`}
          >
            {t('pages.education.kicker')}
          </motion.span>
          <motion.h1 variants={staggerItem} className="mb-6 text-6xl font-black leading-tight tracking-tighter text-white">
            {t('pages.education.h1a')} <br /> {t('pages.education.h1b')}
          </motion.h1>
          <motion.p variants={staggerItem} className="max-w-xl text-xl leading-relaxed text-[#dce1ff] opacity-90">
            {t('pages.education.subtitle')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
