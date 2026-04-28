'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { fadeIn, fadeUp } from '@/utils/motion';

export default function AboutHero() {
  const { t, locale } = useLocale();

  return (
    <section className="relative flex h-[400px] items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A8F] via-[#1A3A8F] to-[#C0272D] opacity-95" />
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <Image
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"
          alt="dramatic wide shot of sunset over a community medical center with silhouettes of trees and a clear horizon"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="container relative z-10 mx-auto px-12">
        <motion.nav
          variants={fadeIn as object}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className={`mb-4 flex text-sm font-medium tracking-wide text-white/70 ${locale === 'en' ? 'uppercase' : ''}`}
        >
          <Link href={ROUTES.HOME} className="transition-colors hover:text-white">
            {t('about.hero.breadcrumbHome')}
          </Link>
          <span className="mx-2 text-white/30">/</span>
          <span className="text-white">{t('about.hero.breadcrumbCurrent')}</span>
        </motion.nav>

        <motion.h1
          variants={fadeUp as object}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="max-w-4xl text-6xl font-black tracking-tighter text-white md:text-7xl"
        >
          {t('about.hero.title')}
        </motion.h1>

        <motion.p
          variants={fadeUp as object}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl text-xl font-light leading-relaxed text-[#dce1ff]"
        >
          {t('about.hero.subtitle')}
        </motion.p>
      </div>
    </section>
  );
}
