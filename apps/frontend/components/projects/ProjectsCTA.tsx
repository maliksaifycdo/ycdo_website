'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';
import { scaleIn } from '@/utils/motion';

export default function ProjectsCTA() {
  return (
    <section className="bg-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-[#1A3A8F]"
        >
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjmljoRyr2pVlu3Zko2G8BgrOMDtjMAnaHTfHgtqn0uhEomtdwzLIYRzLehsnG5Pj63CbI4-5NgFXHKm0xyyW6oehXY_v7w5LAazBVC1A_N3wNXv7F9PDSpaYOMa0-bFmXHNk7tbVNtCNCiueOWSP2aTiTMLVvuZc2sQ5xTZ2cqcLRPNoGT4w4RQbmQcfU5-wqdQLv8chQEeGwWDpPebn8H8VOyfHN_xKUpw8MB4SSRTqE-u0o_TGn1AvesUbX44BmMwXsiHvnyDi5"
              alt="abstract pattern of interconnected lines and dots representing community and network"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl px-12 py-16 text-center">
            <h2 className="mb-6 text-3xl font-black text-white md:text-5xl">Be the catalyst for change.</h2>
            <p className="mb-10 text-lg leading-relaxed text-[#dce1ff]">
              Your support enables us to continue these vital programs. Every contribution directly impacts a life on the ground.
            </p>
            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <Link href={ROUTES.DONATE} className="rounded-xl bg-[#C0272D] px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-105">
                Start a Fundraiser
              </Link>
              <Link href={ROUTES.CONTACT} className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#1A3A8F] transition-transform hover:scale-105">
                Become a Volunteer
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
