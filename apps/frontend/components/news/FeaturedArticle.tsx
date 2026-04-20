'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { slideInLeft, slideInRight } from '@/utils/motion';

const featured = {
  slug: 'empowering-rural-education-sindh',
  category: 'Community Impact',
  date: 'May 24, 2024',
  title: 'Empowering Rural Education: A New Chapter in Sindh',
  excerpt:
    'Through the collaborative efforts of local leaders and international donors, we have successfully launched five new vocational training centers designed to bridge the digital divide.',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDDHQYm8bPeflk3HPzygzQ_oUS6isL-DUJ4sHv8CRnfY6p3cKN35NRc9F63k2jZTZTGnDSj8xTRez-fsCV468WNQy6oSX22z2obMuviPTGGOCH8Y-RYtKaCRUYN0GrhuOIAT_wjIpHMY8j-QdH-tVPsroIIGwSEgY0wMdmzJO4WlmMA9RnaRAi23X7vlPZ9oMSw90I7lZ8vgeRisO_CbyHOmENa54EICIGjIlbMcIyjhe17cnmv3AjJ3zieI_8BqcdRBPEzDk_WJymU',
};

export default function FeaturedArticle() {
  return (
    <section className="mb-16">
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="grid md:grid-cols-2">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative h-64 overflow-hidden md:h-full"
          >
            <Image src={featured.image} alt="Featured news" fill className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center p-8 md:p-12"
          >
            <div className="mb-4 flex items-center space-x-4">
              <span className="rounded-full bg-[#1A3A8F] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#dce1ff]">{featured.category}</span>
              <span className="text-sm font-medium text-slate-500">{featured.date}</span>
            </div>
            <h1 className="mb-6 text-3xl font-black leading-tight text-slate-900 md:text-5xl">{featured.title}</h1>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">{featured.excerpt}</p>
            <Link href={`/news/${featured.slug}`} className="flex w-fit items-center justify-center space-x-2 rounded-lg bg-[#1A3A8F] px-8 py-4 font-bold text-white transition-all hover:bg-[#0F1F5C]">
              <span>Read Full Article</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

