'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';

const partners = ['WHO', 'UNICEF', 'RED CROSS', 'PPHI', 'BILL & MELINDA', 'UK AID'];

export default function Partners() {
  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border-t border-slate-300/30 bg-slate-100 py-16"
    >
      <div className="container mx-auto px-12">
        <p className="mb-12 text-center text-sm font-bold uppercase tracking-widest text-slate-600">
          Our Strategic Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-16 grayscale opacity-50 transition-all duration-500 hover:grayscale-0 hover:opacity-100">
          {partners.map((partner) => (
            <div key={partner} className="text-2xl font-black text-[#1A3A8F]">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
