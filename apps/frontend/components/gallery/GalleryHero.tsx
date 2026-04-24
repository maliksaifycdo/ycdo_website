'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import { fadeIn, fadeUp } from '@/utils/motion';

export default function GalleryHero() {
  return (
    <section className="relative flex h-[409px] min-h-[300px] items-center justify-center overflow-hidden bg-[#1A3A8F]">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDffp3IzePL1fk5SzPU6OG161cm2EjwZmPHgvs6S9oW-l62JTQEEZjEuXHPdSWGphPmYOPbhljrcPmukvmLBTmjJ2vAbk8RpegO66ymfWoiBcI9PG_MloR9pGRW-yPpaOM6CDrKeKyByKkIQLREPLnL7zd0VS55BHh7fRAgN6cO3cvyLjqc_SDpb2lYE_8_7FmT5x9HKhsO4_fSRRAj57HIrC71vlS5zU--kUTxjWXaUW2Xepd_uRNid6bxKqnAlgGmfbLdKbbEnnBS"
          alt="cinematic wide shot of diverse children smiling in a bright community center"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A3A8F]/60 to-[#1A3A8F]" />
      </div>
      <div className="relative z-10 text-center">
        <motion.h1 variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-4 text-6xl font-black tracking-tighter text-white md:text-8xl">
          Gallery
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-xl text-lg font-medium text-[#dce1ff] opacity-90">
          Witness the stories of resilience and the direct impact of your support across our global missions.
        </motion.p>
      </div>
    </section>
  );
}

