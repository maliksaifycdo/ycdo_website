'use client';

import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import {
  Stethoscope,
  GraduationCap,
  UtensilsCrossed,
  Droplets,
  Baby,
  Users,
  ArrowRight,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { cardHover, staggerContainer, staggerItem } from '@/utils/motion';

interface ProgramItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
}

const programs: ProgramItem[] = [
  { icon: Stethoscope, title: 'Healthcare', description: 'Comprehensive medical facilities providing specialized treatments and emergency care.', href: ROUTES.HEALTHCARE },
  { icon: GraduationCap, title: 'Education', description: 'Empowering the youth with modern skills, vocational training, and primary education access.', href: ROUTES.EDUCATION },
  { icon: UtensilsCrossed, title: 'Food Security', description: 'Feeding the hungry through daily community kitchens and monthly ration distributions.', href: ROUTES.COMMUNITY },
  { icon: Droplets, title: 'Clean Water', description: 'Installing filtration plants and solar pumps in remote arid regions for sustainable access.', href: ROUTES.PROJECTS },
  { icon: Baby, title: 'Orphan Care', description: 'Providing a loving home, education, and a bright future for children without guardians.', href: ROUTES.PROJECTS },
  { icon: Users, title: 'Community', description: 'Developing infrastructure and supporting local enterprises for regional economic growth.', href: ROUTES.COMMUNITY },
];

export default function ProgramsGrid() {
  return (
    <section className="bg-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-black text-[#1A3A8F]">Pillars of Impact</h2>
          <p className="text-xl text-slate-600">Integrated solutions addressing the fundamental needs of our communities.</p>
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
            return (
              <motion.article
                key={program.title}
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
                  <h3 className="mb-4 text-2xl font-black text-[#1A3A8F]">{program.title}</h3>
                  <p className="mb-6 leading-relaxed text-slate-600">{program.description}</p>
                  <Link href={program.href} className="inline-flex items-center gap-2 font-bold text-[#1A7A3C] transition-all group-hover:gap-4">
                    Learn More <ArrowRight className="h-4 w-4" />
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
