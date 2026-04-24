'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA590e3cAjBZ6TSc00NY5vrcXoYYDWvxYPsXHuJHVByHNcMrezyskg9RwLXS1zGp7MvQRQDv3FHHc5txuoAhlRTAtOt08a2KcZMBPxh0Jn2Bj3XtdzbJESPTWgSuuWHT7UF-2-XfIlkLWh2rafepsh0pdP3xQ7Tdcz4g4r5QlstTTU-4iZ3m7JF-z7G_4xYWy8czg76t31DGzmEKBtFyvaMz7WYmqpXnPUREHuasJgbf9VNmc5drjjrFphcNrriWmRReamY2spGlsOo';

export default function ContactHero() {
  return (
    <header className="relative overflow-hidden pb-24 pt-40">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#00236f] to-[#1a3a8f] opacity-95" />
        <Image
          src={HERO_IMAGE}
          alt="Modern office building with glass facade"
          fill
          priority
          className="object-cover mix-blend-overlay"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-12">
        <div className="max-w-3xl">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-6 inline-block rounded-full bg-[#fe5553]/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#fe5553]"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-8 text-5xl font-black leading-tight tracking-tight text-white md:text-6xl"
          >
            Contact Us
          </motion.h1>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-2xl text-lg leading-relaxed text-[#e5eeff]/80 md:text-xl"
          >
            Whether you have questions about our humanitarian projects, wish to volunteer, or need support from our
            healthcare centers, our dedicated team is here to help.
          </motion.p>
        </div>
      </div>
    </header>
  );
}
