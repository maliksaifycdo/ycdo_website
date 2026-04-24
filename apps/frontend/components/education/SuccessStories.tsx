'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState } from 'react';
import { staggerContainer, staggerItem } from '@/utils/motion';

interface Story {
  name: string;
  role: string;
  quote: string;
  image: string;
  quoteColor: string;
}

const stories: Story[] = [
  {
    name: 'Fatima Kamal',
    role: 'Engineering Student',
    quote: 'YCDO gave me a vision. Now studying engineering at NUST.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_hJiXKQDNmaqqBGEBcMsDlUZujlr2L3pMRmUi3VvhISRcEsbw8WMRxRULqoqpD7oJSwAsGfH1vlrfr9c1HyLEXeN7t111NWL7Zu-ZD460xCQmo_sFg-ui3DFmrvNBYSTh55Nrf4E-LK2CMuxWtxNSUpTEbppDfO8Fk5VmjbSGRRNDZgJUVVfJkxXLLziDNQ1DX_e4JIRU0C3YYaTLkBDabONgmbqBJQdd9Z1Z6CeaBzzi7eb49igxhqg7o5wR26FaV6IEZV5k7HP9',
    quoteColor: 'text-[#C0272D]',
  },
  {
    name: 'Ahmed Raza',
    role: 'Small Business Owner',
    quote: 'Skills program helped me launch my own mobile repair shop.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8N_BvJ9qKgR1nYdH4Se4b9aoMbwTdCgltd3MwM9bX-b17uppBVQHDFAT__dMI3RAc55LYCLq9ovDOIUA1URofiIy4sE97_EGqzFucw73j_rSqiMoUJULZFK08vLb1MqPld1jNr4KTD1uV0OQPyLtBcI1ZXfUOVnZUpWAM_IwLUirJfNOO-b2yP8ByupRQJQeORVxOkhjL1j8sEv1zSmHVj-58BBaQHtXwgXxLmXntckOYtNEOOPZBLXLMZX4bCdZ3TawP33PMXaHc',
    quoteColor: 'text-[#1A3A8F]',
  },
  {
    name: 'Sana Gul',
    role: 'Grade 8 Student',
    quote: 'Going to school was a dream. Now it is my daily reality.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASCy9R69nVfBwc8oOGjE63Pc9Xr5eTm372ExVocgIrEP7QU6Vw3JQukKBb9wuwpczlvxeZbEyeb6keb8PZlcmbBHy4UJSr063P-nMAVsQC2zrPgEoKg80tFjQIdC7Yx0z39KeehLKxi_8u1jPwMW8r_UprVG8czKWSa2M5Q_xs0G3aLdGkJAUKGpbloAbjqcQ6Len5BIbx0PWzV499F9eAvlvYVNQ2yEwwjKAjZhSu8YhoCfNnCnqScbhzHp6iAllpLZwHFhVZyhwm',
    quoteColor: 'text-[#1A7A3C]',
  },
];

export default function SuccessStories() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section id="success-stories" className="bg-white py-24">
      <div className="container mx-auto px-12">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-4xl font-black tracking-tighter text-slate-900">Voices of Impact</h2>
            <p className="max-w-md text-slate-600">Real stories from the individuals whose lives were transformed by your support.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setCurrentPage((p) => Math.max(0, p - 1))} className="rounded-full bg-slate-100 p-3 transition-all hover:bg-[#1A3A8F] hover:text-white" aria-label="Previous stories">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setCurrentPage((p) => p + 1)} className="rounded-full bg-slate-100 p-3 transition-all hover:bg-[#1A3A8F] hover:text-white" aria-label="Next stories">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-10 md:grid-cols-3"
        >
          {stories.map((story) => (
            <motion.article key={story.name} variants={staggerItem} className="group relative rounded-3xl bg-slate-100 p-8">
              <div className="absolute -top-10 left-8 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <Image src={story.image} alt={story.name} fill sizes="80px" quality={85} loading="lazy" className="object-cover" />
              </div>
              <div className="pt-8">
                <Quote className={`mb-4 h-10 w-10 ${story.quoteColor}`} />
                <p className="mb-6 italic leading-relaxed text-slate-900">&quot;{story.quote}&quot;</p>
                <h4 className="text-lg font-bold text-[#1A3A8F]">{story.name}</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{story.role}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
