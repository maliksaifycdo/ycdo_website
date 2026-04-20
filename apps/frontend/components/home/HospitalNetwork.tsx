'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { slideInLeft, staggerContainer, staggerItem } from '@/utils/motion';

interface LocationPin {
  label: string;
  top?: string;
  left?: string;
  right?: string;
}

const locations: LocationPin[] = [
  { label: 'ISLAMABAD HUB', top: '25%', left: '50%' },
  { label: 'LAHORE UNIT', top: '66%', left: '33%' },
  { label: 'MULTAN CARE', top: '75%', right: '50%' },
];

export default function HospitalNetwork() {
  return (
    <section className="grid min-h-[600px] md:grid-cols-2">
      <motion.div
        variants={slideInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col justify-center bg-[#1A3A8F] p-12 text-white md:p-24"
      >
        <h2 className="mb-8 text-5xl font-black">16+ Specialized Hospitals</h2>
        <p className="mb-12 text-xl leading-relaxed text-white/85">Our medical footprint covers critical zones across Pakistan, ensuring expert care is never out of reach.</p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {[{
            title: 'Central Regional Hub', desc: '3 High-capacity multi-specialty trauma centers.'
          }, { title: 'Southern Network', desc: '5 Maternity and child healthcare clinics.' }, { title: 'Northern Outreach', desc: '8 Primary care units in mountainous districts.' }].map((item) => (
            <motion.div key={item.title} variants={staggerItem} className="flex items-start gap-4">
              <MapPin className="pt-1 text-[#C0272D]" />
              <div>
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-white/80">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative h-[400px] md:h-auto">
        <div className="absolute inset-0 overflow-hidden bg-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1526778545894-62d46c29bd11?q=80&w=2070&auto=format&fit=crop"
            alt="Satellite map view of Pakistan's geography showing diverse terrain from mountains to plains"
            fill
            className="object-cover grayscale opacity-30"
          />

          {locations.map((pin) => (
            <div
              key={pin.label}
              className="group absolute flex -translate-y-1/2 flex-col items-center"
              style={{ top: pin.top, left: pin.left, right: pin.right }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[#C0272D]"
              >
                <MapPin className="h-10 w-10 fill-current" />
              </motion.div>
              <span className="rounded bg-white px-2 py-1 text-xs font-black text-[#1A3A8F] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {pin.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
