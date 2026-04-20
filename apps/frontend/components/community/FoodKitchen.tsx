'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '@/utils/motion';

interface KitchenStep {
  num: string;
  title: string;
  desc: string;
}

const steps: KitchenStep[] = [
  { num: '01', title: 'Daily Nutrition', desc: 'Serving 1,500 hot meals every afternoon to daily-wage laborers and homeless.' },
  { num: '02', title: 'Zero-Waste Chain', desc: 'Partnering with local markets to repurpose surplus fresh produce.' },
  { num: '03', title: 'Hygienic Standards', desc: 'ISO-certified prep environments with regular health inspections.' },
];

export default function FoodKitchen() {
  return (
    <section className="overflow-hidden bg-slate-100 py-24">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-1 items-center gap-24 md:grid-cols-2">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="mb-4 block text-xs font-black uppercase tracking-[0.3em] text-[#C0272D]">Operation Impact</span>
            <h2 className="mb-12 text-6xl font-black leading-[0.95] text-[#1A3A8F]">
              The Living <br />
              Food Kitchen
            </h2>
            <div className="space-y-12">
              {steps.map((step) => (
                <div key={step.num} className="flex items-start gap-8">
                  <div className="text-5xl font-black text-[#C0272D]/30">{step.num}</div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-[#1A3A8F]">{step.title}</h4>
                    <p className="leading-relaxed text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group relative">
            <div className="absolute -inset-4 rotate-3 scale-95 rounded-[2rem] bg-[#1A3A8F] transition-transform duration-700 group-hover:rotate-0" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdeJezp2M2a697rlpeOuoFg5eeMV1DjFC0Rp545Bm1nPO0b2BH7ixVvnJmh2UWzwhzSPnYXDowspBsiEy4aK2JsDpzuoLamvB9ez2CyZVzsSa3vOHKy8yaMpWO2PRphR4w33ylNU9T6p_5YtwwvFsbxfZ69B3kCEFtdBZcp9q72CvI6iBIym3GA50QEpsDo4CqHWZfeFvc2HeyOiRMsiyifuSzwT0N0a5R_u7eBvcFdrn6ybzIx3GIBe7ziEQLndjSz4og6XXrQVTR"
                alt="dedicated volunteers preparing large pots of steaming stew in a clean community kitchen"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A3A8F] to-transparent p-12">
                <div className="flex gap-12">
                  <div>
                    <div className="text-4xl font-black text-white">500k+</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#dce1ff]">Meals Served</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white">12</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#dce1ff]">Active Sites</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
