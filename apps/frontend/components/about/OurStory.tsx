'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import { scaleIn, slideInLeft, slideInRight } from '@/utils/motion';

export default function OurStory() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-12">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="md:col-span-7"
          >
            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-[#C0272D]">The Genesis</span>
            <h2 className="mb-8 text-4xl font-extrabold leading-tight tracking-tight text-[#1A3A8F] md:text-5xl">
              From a School Student&apos;s Dream to 16+ Hospitals
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-slate-600">
              <p>
                In 1991, amidst the vibrant but underserved streets of Qasimpur Colony, a visionary spark ignited. What began as a heartfelt initiative by a dedicated student evolved into a regional movement for health equity.
              </p>
              <p>
                Young Citizens Development Organization (YCDO) was born out of the necessity to bridge the gap between quality medical care and those who needed it most. We did not just build buildings; we built trust, one patient at a time.
              </p>
              <p>
                Today, our network spans over 16 specialized hospitals and mobile health units, ensuring that no one is left behind in the journey towards a healthier future.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative md:col-span-5"
          >
            <div className="absolute -left-8 -top-8 h-64 w-64 rounded-full bg-[#C0272D]/5 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:rotate-0 rotate-2">
              <div className="relative h-[540px] w-full">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBahCDQvDzRn9AWWWqULM3sd3mxtRmaO2EmYd8R2HjeMyXvU3YaaO5jWrrBXNQreKc5Od28GmlEHBUl9ctQqYQkafQcGpoRa5KM2548cy5A1Isl4gtsleW0FgahwfxHn23YGYhK2izWq2vLOBegj0tM9WvA9RomE2lwZY-7bUq217rHLQRmeiBdtLYsp0sTdGKRkLNPlgfCc2L6inwH22lwEDG2LDk_mn823C8pTB0yo0Tkb7mrvt8WLsQxgboEno74S_3nflsT0H1o"
                  alt="dignified portrait of a visionary leader in traditional attire against a soft neutral background with warm professional lighting"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  quality={85}
                  loading="lazy"
                  className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
            </div>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 rounded-xl border-l-4 border-[#C0272D] bg-white p-6 shadow-xl"
            >
              <p className="text-lg font-bold text-[#1A3A8F]">Established 1991</p>
              <p className="text-sm text-slate-600">Qasimpur Colony Roots</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
