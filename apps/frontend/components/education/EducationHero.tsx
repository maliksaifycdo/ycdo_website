'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/utils/motion';

export default function EducationHero() {
  return (
    <section className="hero-gradient relative flex h-[614px] items-center overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSuSpclvB6IbF8qehlROElBBAVP42l1aohnIDceiusKiIk05mBNjbHXzUkAH6WGDLMYiL4ciWak3BP4j0MrfNz77INtDmVFV1mTd33cVf4D2ICd77mwSDPrER77DBxp6ALCujyDjZs02a5mUjjzqOqq57wur8Bt5FWo_mT7D7IgYU5lLZYFRblyfpEWwW5AeAwHz7oNpMr-FduLTHygK-nBxdlWErwY9H0sAqNzkbsjApNK15PmIvl18Hl6Up3bTgq_iuP7rqIie9B"
          alt="wide shot of a sunlit classroom in a rural village with children smiling and holding books"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="container relative z-10 mx-auto px-12">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.span
            variants={staggerItem}
            className="mb-6 inline-block rounded-full bg-[#C0272D] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white"
          >
            Empowering Generations
          </motion.span>
          <motion.h1 variants={staggerItem} className="mb-6 text-6xl font-black leading-tight tracking-tighter text-white">
            Education & Youth <br /> Empowerment
          </motion.h1>
          <motion.p variants={staggerItem} className="max-w-xl text-xl leading-relaxed text-[#dce1ff] opacity-90">
            Breaking the cycle of poverty through dignity, literacy, and skill-based vocational training for the next generation of leaders.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
