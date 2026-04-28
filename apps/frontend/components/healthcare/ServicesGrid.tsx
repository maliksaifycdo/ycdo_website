'use client';

import { motion } from '@/components/common/MotionDiv';
import { Bus, Droplets, Eye, FlaskConical, Stethoscope, Wind } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { staggerContainer, staggerItem } from '@/utils/motion';

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  labelKey: 'svcOpd' | 'svcBlood' | 'svcLabs' | 'svcMobile' | 'svcEye' | 'svcTb';
}

const services: ServiceItem[] = [
  { icon: Stethoscope, labelKey: 'svcOpd' },
  { icon: Droplets, labelKey: 'svcBlood' },
  { icon: FlaskConical, labelKey: 'svcLabs' },
  { icon: Bus, labelKey: 'svcMobile' },
  { icon: Eye, labelKey: 'svcEye' },
  { icon: Wind, labelKey: 'svcTb' },
];

export default function ServicesGrid() {
  const { t } = useLocale();

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1A3A8F]">{t('healthcare.servicesTitle')}</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-[#C0272D]" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const label = t(`healthcare.${service.labelKey}`);
            return (
              <motion.div
                key={service.labelKey}
                variants={staggerItem}
                className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C0272D]/10 transition-colors group-hover:bg-[#C0272D] group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </div>
                <span className="font-bold text-slate-900">{label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
