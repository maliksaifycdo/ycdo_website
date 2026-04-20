'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/utils/motion';

const articles = [
  {
    slug: 'clean-water-5000-families',
    date: 'March 12, 2024',
    category: 'Health',
    title: 'Clean Water Access Reaches 5,000 More Families',
    excerpt: 'Our latest water filtration project in Lahore has reached completion.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ijX-L7Qe8ptab4UQmpfDoEcTYwjJDgmDyD8NfO8aWweKOEaHORtW5iIp21pZzgDwL5u6ikamlVcgkBPJ005OUAN8r1meI3Sh-Ksb7Dnb5ZecOa7YvpOQmZO-nVP-IJaWvtSd55OIl29bxvGgspG3hKNDWG5_DCR9-QzOVyBrPOtge18CX1pSdKQWcPeMX13SSstbISljetjWT8DcJTbfhUG-JU8ylO8OUdHUrKqWFBBWoj4svQbH8YfWWmlA784l92UWgdIeS9Tt',
  },
  {
    slug: 'mobile-health-clinics-north',
    date: 'February 28, 2024',
    category: 'Medical',
    title: 'Mobile Health Clinics Expanding to Northern Regions',
    excerpt: 'YCDO fleet of mobile medical units is doubling in size.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA5IcR_SyL9RmPTermWqKCouLSr5YKEK0EtG2o1LwrGAz3b2Av_3-V1-c4ZgnYZSt0tO667MzKMfLhOFX_5c9KiKEnGrRgGNkY6KjEJUCcxmtBRYlPR-Iu0djvNXEIKn0XBxRWfSPBpA0A5_-9ExrggcXK2s7o_cqb9oyox1K0UIbdFGN88D6imhAKeXnBj0t-N-cSiuuuhDRvzFwBy5BYfonqK7N4UQQPKlPj4RRXhdTdaBWJ1iGPfDU89nEGuZiv9t92sWKSlEzkD',
  },
  {
    slug: 'green-initiative-10000-trees',
    date: 'February 15, 2024',
    category: 'Environment',
    title: 'Green Initiative: 10,000 Trees Planted',
    excerpt: 'Our reforestation drive has surpassed its quarterly target.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvc074eOZ8RKfveY39m-Agrge_DjqzON63fpOsutpRpYN3AvySDWqF4MH_STZJxuCDrAXEI5F9oNC52YfxOrBiIPYfdHVKvZI5UL2rJll_zA-BW4cGk9mx68moBj6Kov5t4sFr9sdYFo0g9gWnLAWVmHL6C9D6qZ0ag-640DKg8CJBmbkuoNwOAzuapezYRN7vEpHrn-nz9xcDGDhFnAZTj8oHSoIqXW_ZYlAHdPapBLaX-n3pXFBDrKTSl8k21dz5ejNR6H7VGyw2',
  },
  {
    slug: 'youth-leadership-summit',
    date: 'January 20, 2024',
    category: 'Youth',
    title: 'Youth Leadership Summit: Nurturing Future Leaders',
    excerpt: '200+ participants in a week-long community leadership immersion.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZLmc4kUS2k9UPm9bF325OeMk9toc_qXPlWcszoP6vwEBhmdQuFSqCnG0MGMflr6yZIw4qvbKJnMvjvWHR6lx1XqxAoSuyfvCt9afC2GJ-8e8pGFkvswMT5Ge4SOJ9zW6AYMbaG5p3lUIzpiSRGYzlgp2Jj7KfwK6nLjrsDi42LUbRr_BE7hOEI3fcaX-mWqfxj2BUqf9p8J7l2QR_FKtWo-oPYB8pebu-xujAXuYZDYOOkpc3_BprHEpPzGkythPpm8tzasPRYX8m',
  },
];

export default function ArticlesGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      {articles.map((article) => (
        <motion.article key={article.slug} variants={staggerItem} className="group overflow-hidden rounded-xl bg-white">
          <div className="h-48 overflow-hidden">
            <Image src={article.image} alt={article.title} width={640} height={384} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-[#C0272D]">{article.date}</span>
              <span className="text-xs font-bold uppercase tracking-tighter text-[#1A3A8F]">{article.category}</span>
            </div>
            <h3 className="mb-3 text-xl font-bold leading-snug text-slate-900">{article.title}</h3>
            <p className="mb-6 line-clamp-3 text-sm text-slate-600">{article.excerpt}</p>
            <Link href={`/news/${article.slug}`} className="inline-flex items-center text-sm font-bold text-[#1A3A8F] transition-transform hover:translate-x-1">
              Learn More <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

