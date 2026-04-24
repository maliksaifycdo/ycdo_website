'use client';

import { motion } from '@/components/common/MotionDiv';
import { Building2, Clock, Mail, MapPin, Phone } from 'lucide-react';

const slideIn = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInDelayed = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ContactInfo() {
  return (
    <section className="flex w-full flex-col gap-8 md:w-[45%]">
      <motion.div
        className="rounded-2xl bg-[#00236f] p-10 text-white shadow-xl shadow-[#00236f]/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={slideIn}
      >
        <h3 className="mb-8 flex items-center gap-4 text-2xl font-bold">
          <Building2 className="h-8 w-8 shrink-0 text-[#fe5553]" aria-hidden />
          Head Office
        </h3>
        <div className="space-y-8">
          <div className="flex gap-6">
            <MapPin className="h-6 w-6 shrink-0 text-[#91a9ff]" aria-hidden />
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#91a9ff]">Address</p>
              <p className="text-lg leading-relaxed">
                YCDO Complex, Qasimpur Colony,
                <br />
                Multan, Punjab, Pakistan
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <Phone className="h-6 w-6 shrink-0 text-[#91a9ff]" aria-hidden />
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#91a9ff]">Phone</p>
              <p className="text-xl font-bold">0300 2022008</p>
              <p className="text-sm text-[#e5eeff]/60">Mon-Sat, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div className="flex gap-6">
            <Mail className="h-6 w-6 shrink-0 text-[#91a9ff]" aria-hidden />
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#91a9ff]">Email</p>
              <p className="text-lg">info@ycdo.org.pk</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="rounded-2xl bg-[#d3e4fe] p-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={slideInDelayed}
      >
        <h3 className="mb-6 flex items-center gap-4 text-xl font-bold text-[#00236f]">
          <Clock className="h-7 w-7 shrink-0 text-[#00236f]" aria-hidden />
          Working Hours
        </h3>
        <ul className="space-y-4">
          <li className="flex justify-between border-b border-slate-400/30 pb-3">
            <span className="font-medium text-[#0b1c30]">Monday - Friday</span>
            <span className="text-slate-600">09:00 - 18:00</span>
          </li>
          <li className="flex justify-between border-b border-slate-400/30 pb-3">
            <span className="font-medium text-[#0b1c30]">Saturday</span>
            <span className="text-slate-600">09:00 - 14:00</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-[#0b1c30]">Sunday</span>
            <span className="font-bold text-[#b72028]">Emergency Only</span>
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
