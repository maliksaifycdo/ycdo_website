'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Meh, Navigation, UserX } from 'lucide-react';
import { slideInLeft, staggerContainer, staggerItem } from '@/utils/motion';

interface CrisisStat {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: string;
  color: string;
  label: string;
}

const crisisStats: CrisisStat[] = [
  { icon: UserX, value: '22M', color: '#C0272D', label: 'Children out of school' },
  { icon: Meh, value: '13M', color: '#1A3A8F', label: 'Girls facing barriers' },
  { icon: GraduationCap, value: '40%', color: '#1A7A3C', label: 'Dropout before primary' },
  { icon: Navigation, value: '15km', color: '#C0272D', label: 'Avg distance to school' },
];

export default function CrisisStats() {
  return (
    <section className="bg-[#ffdad7] py-24">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex flex-col items-center rounded-[2rem] bg-white p-12 text-center shadow-2xl shadow-slate-900/5">
              <div className="relative mb-8 flex h-64 w-64 items-center justify-center">
                <svg className="h-full w-full -rotate-90">
                  <circle cx="128" cy="128" r="110" fill="transparent" stroke="currentColor" strokeWidth="20" className="text-slate-200" />
                  <circle cx="128" cy="128" r="110" fill="transparent" stroke="currentColor" strokeWidth="20" strokeDasharray="691" strokeDashoffset="304" className="text-[#C0272D]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-slate-900">56%</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Literacy Rate</span>
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900">The Education Crisis</h3>
              <p className="leading-relaxed text-slate-600">
                Despite progress, millions remain underserved. We bridge the gap between systemic failure and individual potential.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {crisisStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.article key={stat.label} variants={staggerItem} className="rounded-2xl border-l-4 bg-white p-8 shadow-sm" style={{ borderLeftColor: stat.color }}>
                  <Icon className="mb-4 h-10 w-10" style={{ color: stat.color }} />
                  <h4 className="mb-2 text-4xl font-black text-slate-900">{stat.value}</h4>
                  <p className="font-medium text-slate-600">{stat.label}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
