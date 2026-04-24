'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { scaleIn, slideInRight, staggerContainer, staggerItem } from '@/utils/motion';

export default function HeroSection() {
  return (
    <header className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz31CcbQEX6wQd-U0ioNMcR4Zx9Y5jy4wKGydA8WRu8I_11KSWxaGIgBv1K_4Jw7CSYotzMYr1VLtcPvDAvSu6oMbxSCrSE1nEsojpZuzhrOj4ETRxsAlXcpq2d02QeJEKTzz-Aq1SZSu0j60QLldZ8KMV7M2r5tMbZ6wttQBLzbyZ6yaZpLIxwxfWxtWA7Kpx65LLyRl5yKuAVGlCahvt6fDXqGVestAc_E5-5jcFhj3icOSe3_qlepU0zCSRDWk5xnJR804UwdRv"
          alt="Humanitarian aid worker in rural Pakistan providing healthcare support to local children in soft natural daylight"
          fill
          sizes="100vw"
          quality={85}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,58,143,0.9)_0%,rgba(192,39,45,0.7)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-8 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.h1
            variants={staggerItem}
            className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Serving Humanity.
            <br />
            Empowering Youth.
          </motion.h1>
          <motion.p variants={staggerItem} className="max-w-xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl lg:text-2xl">
            30+ years of compassionate healthcare, education & community service across Pakistan.
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-wrap gap-4 pt-4">
            <Link href={ROUTES.DONATE}>
              <Button className="bg-[#C0272D] px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-[#9B1B20]">
                Donate Now
              </Button>
            </Link>
            <Link href={ROUTES.PROJECTS}>
              <Button variant="outline" className="border-2 border-white px-10 py-4 text-lg font-bold text-white hover:bg-white/10 hover:text-white">
                Our Work
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="relative hidden md:block"
        >
          <div className="group relative ml-auto max-w-md overflow-hidden rounded-2xl bg-white/85 p-4 shadow-[0_20px_40px_rgba(11,28,48,0.06)] backdrop-blur-2xl">
            <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRE3tZiwhauBriQ2PrDPq88-P0gQ-IgjNwW_emGke447k1K0wMR8Pb5Lyo_skZ_EZzUCd9IrklSv9yayZ3TzzWrONkaLiCcQ6NV387vGqygmPIUiYqzIoq1aq4g7MvXh1aosp3lBiWwYzae_gEH2B9R45OrsM8bq4ZZ1cYJPH_rUXYeUWC69LRozYuyeeXjK0Eo7K9kgD5oc5wcjWr4qOqL0Q7Y2_qXLqMdGr6vcy92hUVrCqfNUqGFO9GzE3l2RDAr1wbEAgIl6JV"
                alt="Professional doctor in white coat consulting with a senior patient in a clean modern hospital setting"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                loading="lazy"
                className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
            </div>
            <motion.div variants={scaleIn} initial="hidden" animate="visible" transition={{ delay: 0.25 }} className="absolute right-8 top-8 rounded-lg bg-[#C0272D] px-4 py-2 text-xl font-black text-white shadow-xl">
              16+ Hospitals
            </motion.div>
            <p className="px-2 text-lg font-bold text-[#1A3A8F]">Quality Care for All</p>
            <p className="px-2 pb-2 text-slate-600">Dedicated medical teams serving 24/7 across the network.</p>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
