'use client';

import { motion } from '@/components/common/MotionDiv';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useMemo } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { fadeUp } from '@/utils/motion';

export default function StatsBar() {
  const { t, locale } = useLocale();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = useMemo(
    () => [
      { value: 16, suffix: '+', label: t('home.stats.hospitals') },
      { value: 30, suffix: '+', label: t('home.stats.years') },
      { value: 50000, suffix: '+', label: t('home.stats.lives') },
      { value: 22, suffix: '+', label: t('home.stats.programs') },
    ],
    [t],
  );

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      ref={ref}
      className="relative z-20 mx-8 -mt-12 max-w-6xl rounded-2xl bg-[#1A3A8F] py-12 shadow-2xl shadow-[#1A3A8F]/30 md:mx-auto md:-mt-16"
    >
      <div className="grid grid-cols-2 gap-8 divide-x divide-white/10 px-8 md:grid-cols-4">
        {stats.map((stat, idx) => (
          <div key={stat.label} className={`text-center ${idx === 0 ? 'border-none' : 'md:border-l md:border-white/10'}`}>
            <span className="mb-2 block text-4xl font-black text-white">
              <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} start={inView ? undefined : 0} separator="," />
            </span>
            <span className={`text-sm font-bold text-white/80 ${locale === 'en' ? 'uppercase tracking-widest' : ''}`}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
