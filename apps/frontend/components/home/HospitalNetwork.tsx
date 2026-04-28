'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import { MapPin } from 'lucide-react';
import { useMemo } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { slideInLeft, staggerContainer, staggerItem } from '@/utils/motion';

interface LocationPin {
  key: 'islamabad' | 'lahore' | 'multan';
  top?: string;
  left?: string;
  right?: string;
}

const locations: LocationPin[] = [
  { key: 'islamabad', top: '25%', left: '50%' },
  { key: 'lahore', top: '66%', left: '33%' },
  { key: 'multan', top: '75%', right: '50%' },
];

export default function HospitalNetwork() {
  const { t } = useLocale();

  const regions = useMemo(
    () => [
      { title: t('home.hospitalNetwork.region1Title'), desc: t('home.hospitalNetwork.region1Desc') },
      { title: t('home.hospitalNetwork.region2Title'), desc: t('home.hospitalNetwork.region2Desc') },
      { title: t('home.hospitalNetwork.region3Title'), desc: t('home.hospitalNetwork.region3Desc') },
    ],
    [t],
  );

  const pinLabel = (key: LocationPin['key']) => {
    if (key === 'islamabad') return t('home.hospitalNetwork.pinIslamabad');
    if (key === 'lahore') return t('home.hospitalNetwork.pinLahore');
    return t('home.hospitalNetwork.pinMultan');
  };

  return (
    <section className="grid min-h-[600px] md:grid-cols-2">
      <motion.div
        variants={slideInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col justify-center bg-[#1A3A8F] p-12 text-white md:p-24"
      >
        <h2 className="mb-8 text-5xl font-black">{t('home.hospitalNetwork.title')}</h2>
        <p className="mb-12 text-xl leading-relaxed text-white/85">{t('home.hospitalNetwork.subtitle')}</p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {regions.map((item) => (
            <motion.div key={item.title} variants={staggerItem} className="flex items-start gap-4">
              <MapPin className="pt-1 text-[#C0272D]" />
              <div>
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-white/80">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative h-[400px] md:h-auto">
        <div className="absolute inset-0 overflow-hidden bg-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1526778545894-62d46c29bd11?q=80&w=2070&auto=format&fit=crop"
            alt="Satellite map view of Pakistan's geography showing diverse terrain from mountains to plains"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={80}
            loading="lazy"
            className="object-cover grayscale opacity-30"
          />

          {locations.map((pin) => (
            <div
              key={pin.key}
              className="group absolute flex -translate-y-1/2 flex-col items-center"
              style={{ top: pin.top, left: pin.left, right: pin.right }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[#C0272D]"
              >
                <MapPin className="h-10 w-10 fill-current" />
              </motion.div>
              <span className="rounded bg-white px-2 py-1 text-xs font-black text-[#1A3A8F] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {pinLabel(pin.key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
