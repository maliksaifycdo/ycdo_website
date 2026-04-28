'use client';

import { motion } from '@/components/common/MotionDiv';
import {
  Accessibility,
  Building,
  Gift,
  Heart,
  Scale,
  Snowflake,
  Star,
  UtensilsCrossed,
} from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { staggerContainer, staggerItem } from '@/utils/motion';

interface ServiceDef {
  icon: React.ComponentType<{ className?: string }>;
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9;
  bgColor: string;
}

const services: ServiceDef[] = [
  { icon: UtensilsCrossed, id: 1, bgColor: 'bg-[#1A3A8F]' },
  { icon: Star, id: 2, bgColor: 'bg-[#C0272D]' },
  { icon: Heart, id: 3, bgColor: 'bg-[#1A7A3C]' },
  { icon: Snowflake, id: 4, bgColor: 'bg-[#1A3A8F]' },
  { icon: Gift, id: 5, bgColor: 'bg-[#C0272D]' },
  { icon: Accessibility, id: 6, bgColor: 'bg-[#1A7A3C]' },
  { icon: Scale, id: 7, bgColor: 'bg-[#1A3A8F]' },
  { icon: Building, id: 9, bgColor: 'bg-[#1A7A3C]' },
];

export default function ServicesIconGrid() {
  const { t } = useLocale();

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const title = t(`community.svc${service.id}t` as 'community.svc1t');
            const description = t(`community.svc${service.id}d` as 'community.svc1d');
            return (
              <motion.article
                key={service.id}
                variants={staggerItem}
                className="rounded-[32px] bg-white p-8 shadow-[0_10px_40px_-10px_rgba(26,58,143,0.1)] transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`mb-6 inline-flex rounded-2xl p-4 text-white shadow-lg ${service.bgColor}`}>
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="mb-4 text-2xl font-black text-[#1A3A8F]">{title}</h3>
                <p className="leading-relaxed text-slate-600">{description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
