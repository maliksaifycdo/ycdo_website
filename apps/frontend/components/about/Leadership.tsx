'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Link2, Mail, Share2 } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { scaleIn, slideInLeft, slideInRight } from '@/utils/motion';

export default function Leadership() {
  return (
    <section className="bg-slate-200 py-24">
      <div className="container mx-auto px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[40px] shadow-2xl transition-transform duration-500 hover:rotate-0 rotate-2">
                <div className="relative h-full w-full">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmlHsM2GYtYffmNZQNwWQXku40jLS7-Gtpyb7jeX-nPRKgGEyMDIueSR4zmgdsOKDShigwwOTN2LAQPooULeKB1LjvnAXQQfWlcXbB6IST5bJz_tyoTW9LvUrsC3XmHOlm8eyuCv3to-DyETf9MWdCR333siPUB2zhBX_tL_3Z3yNen2Jn9sqUfoXvOu24N20n91UUZ1THb8MX34_ewmDQwHAfl9_knM5QGnAGsMGfOFZ6VbK9691TK91-yr8xJKXTDhOsrE3H4xUD"
                    alt="professional male CEO in formal business attire looking confidently into the camera with a bright modern office background"
                    fill
                    className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
                </div>
              </div>

              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-10 -right-10 flex h-48 w-48 animate-pulse items-center justify-center rounded-full bg-[#C0272D] p-8 text-center text-white"
              >
                <p className="text-sm font-bold uppercase tracking-tighter">Leading with Compassion</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-[#1A3A8F]">Executive Leadership</span>
              <h2 className="mb-2 text-5xl font-black text-[#1A3A8F]">Zaheer Babar Rana</h2>
              <p className="mb-8 text-xl font-bold text-[#C0272D]">Chief Executive Officer</p>

              <div className="mb-8 space-y-4 text-lg leading-relaxed text-slate-600">
                <p>
                  With over two decades of experience in social development, Zaheer Babar Rana has been the cornerstone of YCDO&apos;s strategic expansion.
                </p>
                <p>
                  His vision of &quot;Empowerment through Health&quot; has transformed YCDO from a local NGO into a powerhouse of humanitarian relief in the region.
                </p>
              </div>

              <div className="flex space-x-6">
                <Link href={ROUTES.CONTACT} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1A3A8F]/20 text-[#1A3A8F] transition-all hover:bg-[#1A3A8F] hover:text-white">
                  <Share2 className="h-5 w-5" />
                </Link>
                <Link href={ROUTES.CONTACT} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1A3A8F]/20 text-[#1A3A8F] transition-all hover:bg-[#1A3A8F] hover:text-white">
                  <Mail className="h-5 w-5" />
                </Link>
                <Link href={ROUTES.CONTACT} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1A3A8F]/20 text-[#1A3A8F] transition-all hover:bg-[#1A3A8F] hover:text-white">
                  <Link2 className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
