'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from '@/utils/motion';

export default function CommunityHero() {
  return (
    <section className="relative flex h-[450px] items-center overflow-hidden bg-[#1A3A8F]">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxQm8qNCLraF6uhxSCODO54QZSGrBxTL9r_lxIa72zDWk_u2pDH420wgrlDoDVqPIG1-Ywl2xDm4gi7tWlMVF0gTuIomO55Q0ud-VkcFD9lpCzWhTYPXYmk-9na-SxnOdNNSPX3YoW34Yh6aAWOEc5cgNAsQGxQ5Xj6YT7c5MrkQV9pZBlhNS5DiRHdUceVpkwBf9oBRwVAIYVsdeg_xvHSMGLWgz5nSyjWXHcAopnE4na7Q3KvoIKPKWKI0v_8Dc1Nfs1QLPeSkHr"
          alt="diverse group of community members standing together in a sunlit outdoor urban environment"
          fill
          className="object-cover opacity-30 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1A3A8F] via-[#1A3A8F]/80 to-transparent" />
      </div>
      <div className="container relative z-10 mx-auto px-12">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl">
          <span className="mb-6 inline-block rounded-full bg-[#C0272D]/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#ffdad7]">
            Our Commitment
          </span>
          <h1 className="mb-8 text-7xl font-black leading-[0.95] tracking-tight text-white">
            Community <br />
            Services
          </h1>
          <p className="max-w-xl text-xl leading-relaxed text-[#dce1ff]">
            Dignified support systems built to empower every individual. From immediate relief to long-term welfare, we serve as the backbone of community resilience.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
