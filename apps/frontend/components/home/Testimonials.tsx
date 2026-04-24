'use client';

import Image from 'next/image';
import { motion } from '@/components/common/MotionDiv';
import { Star } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/utils/motion';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'YCDO provided my daughter with the heart surgery we could never afford. They did not just save her life; they saved our whole family.',
    name: 'Fatima Zahra',
    role: 'Beneficiary, Punjab',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBhqUI6eRXouT1qgX7-BanGCjs0-rNgp7_tkvTjZ1S_8HgggNc6WdM3iAq7RvuQDj6jdmXlwxq0YKS6nNzKaoed21F1GL9nqENXLUiPaUxQ8BTajrnvSpqxZukNIpwhRBNLmAldofmH8wuw2aShXbjo0wdd_zzanNxXxoexzK3HOZMJZMRosO-iXBT04R2fnwYoe49RhmeGOhETRbDvKUbb4Rzfm-FTs4UQzKlfrZo-MXmhJ9B7UD7x9cZTIAzsQWTJUb6j09sepTf',
  },
  {
    quote: 'Volunteering here changed my perspective on youth leadership. YCDO empowers us to be the hands and feet of change.',
    name: 'Ahmed Khan',
    role: 'Medical Volunteer',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLlUk0a8O2p1UYWnkl55doerZzArSD0_4-l14smjxG3aKAHNpOJNmawenNdzk017a1jwunaVb64H0vG1Tk7bihsupqLUsOa2eEqxLog_WPxQEh5yJJ3YEuzoYm27cfEaZ643FUgX-klEPZH2Wt87c3cDBesYqFOHfri0KNIIUCzxjAT-pYh6rFc_5wK7lTIevFS75IR4rq8-mayt8NjPWdAouls9Wri7sM7pIYcTkR5_wdblWYyYgD01Tm93RUQ-oc-m4r9XnJhet2',
  },
  {
    quote: 'Transparency and impact are why we chose YCDO as our primary CSR partner. Their results in rural healthcare are unmatched.',
    name: 'Malik Arshad',
    role: 'Corporate Partner',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATCt2vl3eRZUAh4Wzjgx9ghZrtrjApZgLAJrA4MUhqOajYtuOO9NBm4qCy9zhb5ccXbf0_0YZSVlih9oIka48a-B5vXGaRe6o8_V5L27XVDI3114PQWuCjHoTvsJPZKbnSqgsht-IEtaAeQURvp3-mnLAS1qNcea3UcWcPYlD1ay1W1Z7No25N6xwGXX216PivIe5b1DFPkT-vBPdNIN9izGxkNDKz-yeCgRfADS6Gjf2QtAljyPQivO-HR3fsKsTagDQaNtsHlVGQ',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-100/70 py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-black text-[#1A3A8F]">Voices of Gratitude</h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((item) => (
            <motion.article key={item.name} variants={staggerItem} className="rounded-2xl bg-white p-8 shadow-[0_20px_40px_rgba(11,28,48,0.06)]">
              <div className="mb-4 flex gap-1 text-[#C0272D]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={`${item.name}-star-${idx}`} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="mb-8 text-lg italic text-slate-600">"{item.quote}"</blockquote>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={item.image} alt={item.name} fill sizes="48px" quality={85} loading="lazy" className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-[#1A3A8F]">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
