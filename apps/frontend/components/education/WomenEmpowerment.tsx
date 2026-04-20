'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '@/utils/motion';

export default function WomenEmpowerment() {
  const scrollToStories = () => {
    document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="overflow-hidden bg-[#1A3A8F] py-24 text-white">
      <div className="container mx-auto px-12">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:w-1/2">
            <span className="mb-4 block font-black uppercase tracking-widest text-[#C0272D]">Vocational Excellence</span>
            <h2 className="mb-8 text-5xl font-black leading-tight">Women&apos;s Economic Empowerment</h2>
            <div className="space-y-6 text-lg leading-relaxed text-[#dce1ff] opacity-90">
              <p>
                Our vocational training centers provide women with the tools to become financially independent. From traditional crafts to modern enterprise management, we foster leadership.
              </p>
              <div className="rounded-2xl border-l-4 border-[#C0272D] bg-white/5 p-6">
                <p className="italic text-white">
                  &quot;Before YCDO, I had the skill but no market access. Today, I lead a collective of 15 women producing sustainable textiles for national retailers.&quot;
                </p>
                <span className="mt-4 block font-bold">— Zainab, Vocational Graduate</span>
              </div>
            </div>
            <button onClick={scrollToStories} className="mt-10 rounded-lg bg-[#C0272D] px-8 py-4 font-bold text-white shadow-lg shadow-[#C0272D]/20 transition-transform hover:scale-105">
              Read Success Stories
            </button>
          </motion.div>

          <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative lg:w-1/2">
            <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqPhZhEwtEy_9KYvqg9Bo57DH_rFlYgbywp9wqs2kdI9m0L5ehfOzLNP3gwbwCxoJ_qE93AGQCk9H9PekdQsMG3bWeaWmiOO84uBf7WXDFOa4LszaqihEHLvhXY_tuhvYDQ2zwt2bD8gTXM_9n83LUwcEeo745f2AD1EeWj0Hof6fxVF6_j8jTrma8ESfyqavkiOly9R47zoMOWMI2W120o_7bGaFKZ7ajtglZtAaIHPw8c6p40tRN47UlTUVXGxamWCI-kHhOiNSz"
                alt="close up of a woman focused on sewing a vibrant patterned fabric at a vocational center"
                width={800}
                height={560}
                className="h-auto w-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-0 h-64 w-64 rounded-full bg-[#C0272D] opacity-20 blur-3xl" />
            <div className="absolute -left-6 -top-6 -z-0 h-48 w-48 rounded-full bg-[#1A3A8F] opacity-30 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
