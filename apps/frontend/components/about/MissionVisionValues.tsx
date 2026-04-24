'use client';

import { motion } from '@/components/common/MotionDiv';
import { Eye, Heart, Target } from 'lucide-react';
import { cardHover, staggerContainer, staggerItem } from '@/utils/motion';

interface ValueCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  hoverBg: string;
  iconColor: string;
  titleColor: string;
}

const cards: ValueCard[] = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To provide accessible, high-quality, and compassionate healthcare to underserved communities through sustainable medical institutions and outreach programs.',
    hoverBg: 'hover:bg-[#1A3A8F]',
    iconColor: 'text-[#1A3A8F]',
    titleColor: 'text-[#1A3A8F]',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'A society where every individual has the right and access to the best medical facilities, regardless of their socio-economic status.',
    hoverBg: 'hover:bg-[#C0272D]',
    iconColor: 'text-[#C0272D]',
    titleColor: 'text-[#C0272D]',
  },
  {
    icon: Heart,
    title: 'Core Values',
    description:
      'Integrity in action, empathy in care, excellence in service, and transparency in every donation received.',
    hoverBg: 'hover:bg-[#1A7A3C]',
    iconColor: 'text-[#1A7A3C]',
    titleColor: 'text-[#1A7A3C]',
  },
];

export default function MissionVisionValues() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-12 md:grid-cols-3"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                variants={staggerItem}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className={`group rounded-3xl bg-slate-100 p-12 transition-all duration-500 ${card.hoverBg}`}
              >
                <motion.div variants={cardHover} className="contents">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-black/5 transition-colors group-hover:bg-white/20">
                    <Icon className={`h-8 w-8 ${card.iconColor} transition-colors duration-500 group-hover:text-white`} />
                  </div>
                  <h3 className={`mb-4 text-2xl font-black ${card.titleColor} transition-colors duration-500 group-hover:text-white`}>
                    {card.title}
                  </h3>
                  <p className="leading-relaxed text-slate-600 transition-colors duration-500 group-hover:text-white/80">
                    {card.description}
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
