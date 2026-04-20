'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Scale } from 'lucide-react';
import { fadeUp } from '@/utils/motion';

interface LegalInfoItem {
  label: string;
  value: string;
}

const legalInfo: LegalInfoItem[] = [
  { label: 'Registration Year', value: '1991 (Social Welfare Department)' },
  { label: 'Tax Status', value: 'FBR Registered (100% Tax Exempt)' },
  { label: 'License Number', value: 'SW/MD-742-91-V' },
  { label: 'Headquarters', value: 'YCDO Complex, Multan Road, Pakistan' },
];

export default function LegalStatus() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative flex flex-col items-center justify-between overflow-hidden rounded-[2rem] bg-[#1A3A8F] p-12 text-white shadow-2xl md:flex-row"
        >
          <div className="absolute -mr-32 -mt-32 right-0 top-0 h-64 w-64 rounded-full bg-white/5" />

          <div className="md:max-w-2xl">
            <h2 className="mb-8 flex items-center gap-4 text-3xl font-black">
              <Scale className="h-10 w-10 text-[#fe5553]" />
              Legal & Registration Status
            </h2>

            <div className="grid grid-cols-1 gap-8 text-[#dce1ff] md:grid-cols-2">
              {legalInfo.map((item) => (
                <div key={item.label}>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest opacity-60">{item.label}</p>
                  <p className="text-xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md md:mt-0">
            <BadgeCheck className="mb-4 h-12 w-12 text-[#fe5553]" />
            <p className="text-lg font-bold">PCP Certified NGO</p>
            <p className="text-sm opacity-70">Evaluated for internal governance & transparency.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
