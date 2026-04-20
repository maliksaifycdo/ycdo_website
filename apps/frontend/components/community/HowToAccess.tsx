'use client';

import { motion } from 'framer-motion';
import { ClipboardCheck, ClipboardList, Heart, Phone, PhoneCall } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/utils/motion';

interface AccessStep {
  step: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const accessSteps: AccessStep[] = [
  { step: '01', icon: PhoneCall, title: 'Initial Contact', desc: 'Visit our local center or call our helpline to share your situation.' },
  { step: '02', icon: ClipboardCheck, title: 'Eligibility Review', desc: 'Brief, dignified assessment to match your needs with available programs.' },
  { step: '03', icon: ClipboardList, title: 'Registration', desc: 'Simple registration process to get your community beneficiary card.' },
  { step: '04', icon: Heart, title: 'Receive Support', desc: 'Access services immediately or get scheduled for next distribution cycle.' },
];

export default function HowToAccess() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-12">
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-black tracking-tight text-[#1A3A8F]">Accessing Support</h2>
          <div className="mx-auto mt-6 h-1 w-24 bg-[#C0272D]" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative flex flex-col justify-between gap-8 md:flex-row"
        >
          <div className="absolute left-24 right-24 top-12 z-0 hidden h-[2px] bg-slate-300 md:block" />
          {accessSteps.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.step} variants={staggerItem} className="group relative z-10 flex-1 text-center md:text-left">
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl shadow-[#1A3A8F]/10 transition-colors duration-500 group-hover:bg-[#1A3A8F] md:mx-0">
                  <Icon className="h-10 w-10 text-[#1A3A8F] transition-colors group-hover:text-white" />
                </div>
                <span className="mb-2 inline-block text-sm font-black uppercase tracking-widest text-[#C0272D]">Step {item.step}</span>
                <h4 className="mb-4 text-xl font-bold text-[#1A3A8F]">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mx-auto mt-20 max-w-4xl rounded-[2rem] bg-[#1A3A8F] p-12 text-center">
          <h3 className="mb-6 text-3xl font-bold text-white">Need Immediate Assistance?</h3>
          <p className="mb-8 text-[#dce1ff]">Our 24/7 helpline is available for emergency food or medical mobility requests.</p>
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            <div className="flex items-center gap-4 text-white">
              <Phone className="h-5 w-5 text-[#ffdad7]" />
              <span className="text-2xl font-black">0800-HELP-YCDO</span>
            </div>
            <button className="rounded-lg bg-[#C0272D] px-8 py-3 font-bold text-white transition-all hover:bg-[#9B1B20]">Download Welfare Form</button>
          </div>
        </div>
      </div>
    </section>
  );
}
