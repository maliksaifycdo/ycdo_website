'use client';

import { motion } from '@/components/common/MotionDiv';
import {
  Accessibility,
  Baby,
  Building,
  Gift,
  Heart,
  Scale,
  Snowflake,
  Star,
  UtensilsCrossed,
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@/utils/motion';

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bgColor: string;
}

const services: ServiceItem[] = [
  { icon: UtensilsCrossed, title: 'Food & Kitchen', description: 'Nutritious hot meals and grocery support for food insecure families daily.', bgColor: 'bg-[#1A3A8F]' },
  { icon: Star, title: 'Ramadan', description: 'Iftar and Suhoor distribution throughout the blessed month.', bgColor: 'bg-[#C0272D]' },
  { icon: Heart, title: 'Qurbani', description: 'Religious animal sacrifice with equitable meat distribution to those in need.', bgColor: 'bg-[#1A7A3C]' },
  { icon: Snowflake, title: 'Winter Clothes', description: 'Blankets, coats, warm essentials for communities in harsh weather.', bgColor: 'bg-[#1A3A8F]' },
  { icon: Gift, title: 'Shadi Boxes', description: 'Essential household items and financial aid for weddings.', bgColor: 'bg-[#C0272D]' },
  { icon: Accessibility, title: 'Wheelchairs', description: 'High-quality wheelchairs and assistive devices for the disabled.', bgColor: 'bg-[#1A7A3C]' },
  { icon: Scale, title: 'Prisoner Welfare', description: 'Legal aid, hygiene kits, and rehabilitation for incarcerated individuals.', bgColor: 'bg-[#1A3A8F]' },
  { icon: Baby, title: 'Orphan Care', description: 'Education, health, emotional support for children who lost parents.', bgColor: 'bg-[#C0272D]' },
  { icon: Building, title: 'Masjid Construction', description: 'Community hubs as spiritual sanctuaries and local learning centers.', bgColor: 'bg-[#1A7A3C]' },
];

export default function ServicesIconGrid() {
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
            return (
              <motion.article
                key={service.title}
                variants={staggerItem}
                className="group flex flex-col items-center rounded-xl bg-white p-10 text-center shadow-2xl shadow-[#0b1c30]/5 transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-full ${service.bgColor} transition-transform group-hover:scale-110`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-[#1A3A8F]">{service.title}</h3>
                <p className="leading-relaxed text-slate-600">{service.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
