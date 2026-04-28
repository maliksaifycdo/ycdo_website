'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import { useLocale } from '@/contexts/LocaleContext';
import { slideInLeft, slideInRight } from '@/utils/motion';

export default function MissionSection() {
  const { t } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="grid items-center gap-20 md:grid-cols-2">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-6"
        >
          <span className="text-sm font-black uppercase tracking-[0.2em] text-[#1A7A3C]">{t('home.mission.kicker')}</span>
          <h2 className="text-5xl font-black leading-tight tracking-tight text-[#1A3A8F]">{t('home.mission.title')}</h2>
          <div className="space-y-4 text-lg leading-relaxed text-slate-600">
            <p>{t('home.mission.p1')}</p>
            <p>{t('home.mission.p2')}</p>
          </div>
          <div className="pt-6">
            <button type="button" className="rounded-lg bg-[#C0272D] px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-[2px] hover:bg-[#9B1B20]">
              {t('home.mission.cta')}
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative"
        >
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-lg border-l-8 border-t-8 border-[#C0272D]" />
          <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_40px_rgba(11,28,48,0.06)]">
            <div className="relative h-[500px] w-full">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyjEcEAaT03Ap_fOuC76DAQQxo1mnvO-JJGuJlxf9iHCdMLqBwI8144tT_6Qp0PXP70Z5UNhoVPml15G2-fiQsYCKffzLlHc3hfr7NFEPgRERaCgSWa-ErSmejBqtqmerNQvzYgEMoXOXuefWaWG8WlBtE11F08ebtf96UYs_j_EGGmV0JtWbAN8aGdaL_sCiy72bFypouQEFVJ6EulFshx3oefjWVrxlKfpenIt1RguLM5yK2loIfqI5BDrh87mqPgXUJ1-JorYGS"
                alt="Distinguished leader Zaheer Babar Rana speaking at a community forum with passion and gravity"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
              <blockquote className="mb-4 text-xl italic font-medium">{t('home.mission.quote')}</blockquote>
              <p className="font-bold">{t('home.mission.attribution')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
