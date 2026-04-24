'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import { MoveRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/utils/motion';

/** Slugs align with backend `NewsService` seed data when DB is empty. */
const articles = [
  {
    slug: 'scholarship-distribution-ceremony-held',
    date: 'Education',
    category: 'Education',
    title: 'Scholarship Distribution Ceremony Held',
    excerpt: 'Scholarships were distributed to deserving students under the YCDO education program.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ijX-L7Qe8ptab4UQmpfDoEcTYwjJDgmDyD8NfO8aWweKOEaHORtW5iIp21pZzgDwL5u6ikamlVcgkBPJ005OUAN8r1meI3Sh-Ksb7Dnb5ZecOa7YvpOQmZO-nVP-IJaWvtSd55OIl29bxvGgspG3hKNDWG5_DCR9-QzOVyBrPOtge18CX1pSdKQWcPeMX13SSstbISljetjWT8DcJTbfhUG-JU8ylO8OUdHUrKqWFBBWoj4svQbH8YfWWmlA784l92UWgdIeS9Tt',
  },
  {
    slug: 'new-water-filtration-plant-inaugurated',
    date: 'Water',
    category: 'Community',
    title: 'New Water Filtration Plant Inaugurated',
    excerpt: 'A new RO plant was inaugurated to provide clean water to local residents.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA5IcR_SyL9RmPTermWqKCouLSr5YKEK0EtG2o1LwrGAz3b2Av_3-V1-c4ZgnYZSt0tO667MzKMfLhOFX_5c9KiKEnGrRgGNkY6KjEJUCcxmtBRYlPR-Iu0djvNXEIKn0XBxRWfSPBpA0A5_-9ExrggcXK2s7o_cqb9oyox1K0UIbdFGN88D6imhAKeXnBj0t-N-cSiuuuhDRvzFwBy5BYfonqK7N4UQQPKlPj4RRXhdTdaBWJ1iGPfDU89nEGuZiv9t92sWKSlEzkD',
  },
  {
    slug: 'ycdo-launches-free-medical-camp',
    date: 'Healthcare',
    category: 'Healthcare',
    title: 'YCDO Launches Free Medical Camp',
    excerpt: 'YCDO organized a free medical camp in Multan for underserved families.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvc074eOZ8RKfveY39m-Agrge_DjqzON63fpOsutpRpYN3AvySDWqF4MH_STZJxuCDrAXEI5F9oNC52YfxOrBiIPYfdHVKvZI5UL2rJll_zA-BW4cGk9mx68moBj6Kov5t4sFr9sdYFo0g9gWnLAWVmHL6C9D6qZ0ag-640DKg8CJBmbkuoNwOAzuapezYRN7vEpHrn-nz9xcDGDhFnAZTj8oHSoIqXW_ZYlAHdPapBLaX-n3pXFBDrKTSl8k21dz5ejNR6H7VGyw2',
  },
];

export default function ArticlesGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      {articles.map((article) => (
        <motion.article key={article.slug} variants={staggerItem} className="group overflow-hidden rounded-xl bg-white">
          <div className="h-48 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              width={640}
              height={384}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={85}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-[#C0272D]">{article.date}</span>
              <span className="text-xs font-bold uppercase tracking-tighter text-[#1A3A8F]">{article.category}</span>
            </div>
            <h3 className="mb-3 text-xl font-bold leading-snug text-slate-900">{article.title}</h3>
            <p className="mb-6 line-clamp-3 text-sm text-slate-600">{article.excerpt}</p>
            <Link
              href={`/news/${article.slug}`}
              className="inline-flex items-center text-sm font-bold text-[#1A3A8F] transition-transform hover:translate-x-1"
            >
              Learn More <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
