'use client';

import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import {
  Stethoscope,
  GraduationCap,
  UtensilsCrossed,
  Droplets,
  Users,
  ArrowRight,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { cardHover, staggerContainer, staggerItem } from '@/utils/motion';

interface ProgramDef {
  icon: React.ComponentType<{ className?: string }>;
  msgKey: 'healthcare' | 'education' | 'foodSecurity' | 'cleanWater' | 'community';
  href: string;
}

const programs: ProgramDef[] = [
  { icon: Stethoscope, msgKey: 'healthcare', href: ROUTES.HEALTHCARE },
  { icon: GraduationCap, msgKey: 'education', href: ROUTES.EDUCATION },
  { icon: UtensilsCrossed, msgKey: 'foodSecurity', href: ROUTES.COMMUNITY },
  { icon: Droplets, msgKey: 'cleanWater', href: ROUTES.PROJECTS },
  { icon: Users, msgKey: 'community', href: ROUTES.COMMUNITY },
];

export default function ProgramsGrid() {
  const { t } = useLocale();

  return (
    <section className="bg-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-black text-[#1A3A8F]">{t('home.programs.sectionTitle')}</h2>
          <p className="text-xl text-slate-600">{t('home.programs.sectionSubtitle')}</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {programs.map((program) => {
            const Icon = program.icon;
            const title = t(`home.programs.${program.msgKey}.title`);
            return (
              <motion.article
                key={program.msgKey}
                variants={staggerItem}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <motion.div variants={cardHover} className="contents">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#C0272D]">
                    <Icon className="h-8 w-8 text-[#1A3A8F] group-hover:text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-black text-[#1A3A8F]">{title}</h3>
                  <p className="mb-6 leading-relaxed text-slate-600">{t(`home.programs.${program.msgKey}.description`)}</p>
                  <Link href={program.href} className="inline-flex items-center gap-2 font-bold text-[#1A7A3C] transition-all group-hover:gap-4">
                    {t('common.learnMore')} <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
