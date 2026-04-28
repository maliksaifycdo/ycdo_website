'use client';

import { motion } from '@/components/common/MotionDiv';
import { Bus, Flag, Hospital, Rocket } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { fadeUp, scaleIn, slideInLeft, slideInRight } from '@/utils/motion';

interface TimelineItem {
  year: string;
  tk: 'y1991' | 'y2005' | 'y2018' | 'y2024';
  icon: React.ComponentType<{ className?: string }>;
  side: 'left' | 'right';
  cardStyle: string;
  yearMutedClass: string;
  yearHoverClass: string;
  titleClass: string;
  mobileYearClass: string;
  dotClass: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: '1991',
    tk: 'y1991',
    icon: Flag,
    side: 'left',
    cardStyle: 'border-l-4 border-[#1A3A8F]',
    yearMutedClass: 'text-[#1A3A8F]/10',
    yearHoverClass: 'group-hover:text-[#1A3A8F]/20',
    titleClass: 'text-[#1A3A8F]',
    mobileYearClass: 'text-[#1A3A8F]',
    dotClass: 'bg-[#1A3A8F]',
  },
  {
    year: '2005',
    tk: 'y2005',
    icon: Hospital,
    side: 'right',
    cardStyle: 'border-r-4 border-[#C0272D]',
    yearMutedClass: 'text-[#C0272D]/10',
    yearHoverClass: 'group-hover:text-[#C0272D]/20',
    titleClass: 'text-[#C0272D]',
    mobileYearClass: 'text-[#C0272D]',
    dotClass: 'bg-[#C0272D]',
  },
  {
    year: '2018',
    tk: 'y2018',
    icon: Bus,
    side: 'left',
    cardStyle: 'border-l-4 border-[#1A7A3C]',
    yearMutedClass: 'text-[#1A7A3C]/10',
    yearHoverClass: 'group-hover:text-[#1A7A3C]/20',
    titleClass: 'text-[#1A7A3C]',
    mobileYearClass: 'text-[#1A7A3C]',
    dotClass: 'bg-[#1A7A3C]',
  },
  {
    year: '2024',
    tk: 'y2024',
    icon: Rocket,
    side: 'right',
    cardStyle: 'bg-[#1A3A8F] text-white',
    yearMutedClass: 'text-[#1A3A8F]/10',
    yearHoverClass: 'group-hover:text-[#1A3A8F]/20',
    titleClass: 'text-[#1A3A8F]',
    mobileYearClass: 'text-[#1A3A8F]',
    dotClass: 'bg-[#1A3A8F]',
  },
];

export default function Timeline() {
  const { t, locale } = useLocale();

  return (
    <section className="bg-slate-100 py-24">
      <div className="container mx-auto px-12">
        <div className="mb-20 text-center">
          <h2 className={`mb-4 text-4xl font-black tracking-tighter text-[#1A3A8F] ${locale === 'en' ? 'uppercase' : ''}`}>{t('about.timeline.sectionTitle')}</h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-[#C0272D]" />
        </div>

        <div className="relative">
          <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 transform bg-slate-300/50 md:block" />

          <div className="space-y-24">
            {timelineItems.map((item, index) => {
              const Icon = item.icon;
              const isLeft = item.side === 'left';
              const title = t(`about.timeline.${item.tk}Title`);
              const description = t(`about.timeline.${item.tk}Desc`);
              const quote = t(`about.timeline.${item.tk}Quote`);

              return (
                <motion.div
                  key={item.year}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.2 }}
                  className={`group flex w-full flex-col items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`hidden md:block md:w-1/2 ${isLeft ? 'text-right md:pr-16' : 'text-left md:pl-16'}`}>
                    <h3 className={`text-5xl font-black transition-colors ${item.yearMutedClass} ${item.yearHoverClass}`}>
                      {item.year}
                    </h3>
                    <p className={`mt-2 text-xl font-bold ${item.titleClass}`}>{title}</p>
                    <p className={`mt-2 max-w-xs text-slate-600 ${isLeft ? 'ml-auto' : ''}`}>{description}</p>
                  </div>

                  <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`z-10 flex h-12 w-12 items-center justify-center rounded-full ${item.dotClass} text-white shadow-lg ring-8 ring-white`}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>

                  <motion.div
                    variants={isLeft ? slideInRight : slideInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`mt-4 md:mt-0 md:w-1/2 ${isLeft ? 'md:pl-16' : 'text-right md:pr-16'}`}
                  >
                    <span className={`text-3xl font-black md:hidden ${item.mobileYearClass}`}>{item.year}</span>
                    <h4 className={`text-xl font-bold md:hidden ${item.mobileYearClass}`}>{title}</h4>
                    <div className={`rounded-2xl p-8 shadow-sm ${item.cardStyle} ${item.year !== '2024' ? 'bg-white' : ''}`}>
                      {item.year === '2024' ? (
                        <>
                          <p className="text-lg font-bold">{quote}</p>
                          <p className="mt-2 text-sm opacity-80">{t('about.timeline.y2024Sub')}</p>
                        </>
                      ) : (
                        <p className={`text-slate-600 ${item.year === '1991' ? 'italic' : ''}`}>{quote}</p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
