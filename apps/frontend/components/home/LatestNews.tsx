'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { staggerContainer, staggerItem } from '@/utils/motion';

interface NewsItem {
  dateKey: 'n1date' | 'n2date' | 'n3date';
  titleKey: 'n1title' | 'n2title' | 'n3title';
  slug: string;
  image: string;
}

const news: NewsItem[] = [
  {
    dateKey: 'n1date',
    titleKey: 'n1title',
    slug: 'pediatric-surgical-center-multan',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBs4CNto2bxKsYT7vSxO-I1rTOak6jNZAo5LdvF3v70nm6qJF-JQEMGKy17j0okZlnCjFlqdmZJbIvm8s8yMGyhmdTBEuJi64NxKy3MhUenvDOoC4Ph8Ix1F3PpQxZEXFJSqHpXdoJ_bgt6DGrtEHioTjX-JFf0DLmGy3wnf2gFuaQc6PIj--qvqKQo-Os9M6qVj9lA9AeUGVG5MaPXjn5mOPR0qeA-Qpc_vsFRyovfLn-RhaPzaDcvC3285O3gWCWPlCTKjlp6YxOz',
  },
  {
    dateKey: 'n2date',
    titleKey: 'n2title',
    slug: 'youth-leadership-summit',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_6EJDJu2mqvFU9NdnJMMP0rBAwn5PQbvEYqn_A-_I_mz8tQNL0lBPGs64CGlNMcA13QF-NApGWQtBpSTxjo00MzyAPeL5MteEiQ4aypEYBGSs8hy8DLoHljliWR3P1oXVNH7aAJJZ61LjfbTHZmvf0filwIdGVw3_9kK9QoWywnnTec18-xGoqt-A-CyrT0h6zjEsBqMcFfd0nOynYzBrkMm58KQycCg9HaCejy9I0a5MtyIfz3JbRtbEokk5vt9P36eSWEYGz2NV',
  },
  {
    dateKey: 'n3date',
    titleKey: 'n3title',
    slug: 'filtration-plants-functional',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8zrRqsJrrls5OW8-x17PdA38_sDItlIggAyclPqjC64pUPT-K2IdlieglGDjozyxPbdPJfjTPnwPtrPmGDw8vBY7CCX_RHvrwpLtjbhHodGT700lVIhEBRDJJ7lhLgl6JORC7HZHq1Va0_K0qF7vtGbeQHa_RHkv9GK78x8ooPAGsTZm9PtFi7oUEmfI0HTS1rUyxbNBp_a0jkkvYYz9hNt-HLa3PYoJtHGMrmbCHNXf7gh8V0Kmw4f7485Robh99s-xAw4YFKbNM',
  },
];

export default function LatestNews() {
  const { t, locale } = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <h2 className="mb-2 text-4xl font-black text-[#1A3A8F]">{t('home.latestNews.title')}</h2>
          <p className="text-lg text-slate-600">{t('home.latestNews.subtitle')}</p>
        </div>
        <Link href={ROUTES.NEWS} className="hidden rounded-lg bg-[#1A3A8F] px-8 py-3 font-bold text-white transition-all hover:bg-[#0F1F5C] md:block">
          {t('home.latestNews.viewAll')}
        </Link>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mb-12 grid gap-8 md:grid-cols-3"
      >
        {news.map((item) => {
          const title = t(`home.latestNews.${item.titleKey}`);
          return (
            <motion.article key={item.slug} variants={staggerItem} className="group cursor-pointer">
              <Link href={`${ROUTES.NEWS}/${item.slug}`}>
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <div className="relative h-64 w-full">
                    <Image
                      src={item.image}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={85}
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <span className={`text-sm font-bold tracking-widest text-[#C0272D] ${locale === 'en' ? 'uppercase' : ''}`}>
                  {t(`home.latestNews.${item.dateKey}`)}
                </span>
                <h3 className="mt-2 text-2xl font-black leading-tight text-[#1A3A8F] transition-colors group-hover:text-[#C0272D]">
                  {title}
                </h3>
              </Link>
            </motion.article>
          );
        })}
      </motion.div>

      <Link href={ROUTES.NEWS} className="block w-full rounded-lg bg-[#1A3A8F] py-4 text-center font-bold text-white md:hidden">
        {t('home.latestNews.viewAll')}
      </Link>
    </section>
  );
}
