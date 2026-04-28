'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import toast from 'react-hot-toast';
import { useLocale } from '@/contexts/LocaleContext';
import { fadeUp, slideInRight, staggerContainer } from '@/utils/motion';

export default function HealthcareHero() {
  const { t } = useLocale();

  const scrollToList = () => {
    document.getElementById('hospital-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex h-[600px] items-center overflow-hidden">
      <div className="absolute inset-0 z-10 bg-[#1A3A8F]/60" />
      <Image
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrB-lFHHgOmsXXZVTSm7IDVIYaz5LU-sa-tiBVRPjpGmWs5q6b04yAqa2qpCSMvQ6latsdWaw4Ze3SqtP-TfalqiKbWKNXgKq_0iguofJGjjpTcGxDh_EytIWBZUQTod9LD_FeYKI9iLe-hPXDYu_yk_kTGcKBcQzUuHosd-dkFTWRhBIeyGmui_pbnXIeI5lzvsuVopxP9FKhoYeENZAShsbkLdxtnd2M8hWYjb1bw-rHjeW3m0kRV83JYl825j1UzuqQZ832eNfS"
        alt="modern clean hospital exterior at dusk with glowing windows and professional medical staff walking in the distance"
        fill
        sizes="100vw"
        quality={85}
        className="object-cover"
        priority
      />

      <div className="container relative z-20 mx-auto px-12">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.h1 variants={fadeUp} className="mb-6 text-6xl font-extrabold leading-tight tracking-tight text-white">
            {t('pages.healthcare.title')}
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-2xl text-xl font-light leading-relaxed text-[#dce1ff]">
            {t('pages.healthcare.subtitle')}
          </motion.p>
          <motion.div variants={slideInRight} className="mt-10 flex space-x-4">
            <button type="button" onClick={scrollToList} className="rounded-lg bg-[#C0272D] px-8 py-4 text-lg font-bold text-white shadow-2xl transition-colors hover:bg-[#9B1B20]">
              {t('pages.healthcare.findClinic')}
            </button>
            <button
              type="button"
              onClick={() => toast(t('pages.healthcare.emergencyToast'), { icon: 'ℹ️' })}
              className="rounded-lg border border-white/30 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              {t('pages.healthcare.emergencyInfo')}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
