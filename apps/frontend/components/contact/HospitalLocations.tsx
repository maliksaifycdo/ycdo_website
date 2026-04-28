'use client';

import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';

const locations = [
  { name: 'Masoom Shah Road Clinic', address: 'Masoom Shah Road, Multan', phone: '03002022008' },
  { name: 'Surajkund Road Hospital', address: 'Surajkund Road, Multan', phone: '03002022008' },
  { name: 'Budhla Sant Center', address: 'Budhla Sant, Multan', phone: '03002022008' },
  { name: 'Qasimpur Colony (HQ)', address: 'Qasimpur Colony, Multan', phone: '03002022008' },
  { name: 'Delhi Gate Unit', address: 'Delhi Gate, Multan', phone: '03002022008' },
  { name: 'Basti Nagina Abad', address: 'Basti Nagina Abad, Multan', phone: '03002022008' },
  { name: 'Hasanabad Eye Hospital', address: 'Hasanabad Gate No.2, Multan', phone: '03002022008' },
  { name: 'Executive Hospital', address: 'Near YCDO Complex, Multan', phone: '03002022008' },
] as const;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function formatPhone(p: string) {
  if (p.length === 11) return `${p.slice(0, 4)} ${p.slice(4)}`;
  return p;
}

export default function HospitalLocations() {
  const { t } = useLocale();

  return (
    <section className="bg-[#f8f9ff] py-24">
      <div className="mx-auto max-w-7xl px-12">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <h2 className="mb-4 text-4xl font-black tracking-tight text-[#00236f]">{t('hospitalLocations.title')}</h2>
            <p className="text-lg text-slate-600">
              {t('hospitalLocations.subtitle')}
            </p>
          </div>
          <div className="hidden md:block">
            <Link
              href="/healthcare"
              className="flex items-center gap-2 font-bold text-[#00236f] transition-transform hover:translate-x-2"
            >
              {t('hospitalLocations.viewAll')}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {locations.map((loc) => (
            <motion.div
              key={loc.name}
              variants={item}
              className="group rounded-xl border-l-4 border-[#1A7A3C] bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
            >
              <h4 className="mb-4 text-xl font-bold text-[#00236f] transition-colors group-hover:text-[#1A7A3C]">
                {loc.name}
              </h4>
              <div className="space-y-4 text-sm text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1A7A3C]" aria-hidden />
                  {loc.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-[#1A7A3C]" aria-hidden />
                  {formatPhone(loc.phone)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
