'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import { ChevronDown } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { cardHover, staggerContainer, staggerItem } from '@/utils/motion';
import type { FilterType } from './FilterTabs';

export interface Project {
  id: string;
  category: 'healthcare' | 'education' | 'foodServices';
  image: string;
  badgeColor: string;
}

interface ProjectsGridProps {
  activeFilter: FilterType;
  onProjectClick: (project: Project) => void;
}

const projects: Project[] = [
  { id: '1', category: 'healthcare', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlevQR3M_5Q9PM-YLbWpN9ZThZrmKB2lVZEGFK_Kcpm0Unq-VXvKuFVxBN1SHqQdcrcAFgcl_CAk0kVyQoCLB8TsGuw6g4-g1rKULO8gYNH3k4TYDyYTUQjWakvxFYv1L2C3fK81C8M5UWJUrrlozJnsPByVXLymbvA7SUJSHaCW32dZnEoliRSor90yLuewnt0iz-_bKKWGt3iG9nG2h6F_9xM27vdn8fId3fCjQE2fGwcPWZU9Kv0tcj51AOJPjRUvqiA_VIgcRm', badgeColor: 'bg-[#C0272D]' },
  { id: '2', category: 'healthcare', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiIGSzm6rlI87jE5IsFDKST2rQQOnu3uIhmCfZXyglIBLWVwqnpUuj75NOz7ZKB_XRkoxyeLOrMZaVCI8GaASgVm7VdyNvrF2BfwqkN4GD5_ANamSCdr5uRM5wD0fqb9NBlt7YoQef-TS2EJuxqGczDRG11yB3FWVGhxQwyfyBZ5HlL3fYn4Lid9jNOpmNFViUC6SQGq0of9eCKRzjAc7HGdIWV-Bbllk38ElpSTRKWm1z6xZIgN64n_FATt4oEu22N6kq9luXOefD', badgeColor: 'bg-[#C0272D]' },
  { id: '3', category: 'education', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARq4zZhqaVGEF0AjHE_gdyJnYN5KDH-a3uw6fS004LAwOHL4kAQuYmAJ53StRlzQOKnpryIcLupDVJSevBky1PXsLmZI1-M1z7LiK-Hp6ssDyBBjnLD7ZD-Fvj4S1q84AWAZBiDoBUKXM87YL8hqpBxMkQF0pecRdKoYQf0_LpxsislsAoY0toP6YyERqdZbZhkXb_ovjEblkBCOwB3DApgCU8YU8nzpOOmIfVf0aBX8yrdsaZ-qx5lcgMaefozRNrVuSw-rduN0FB', badgeColor: 'bg-[#1A3A8F]' },
  { id: '4', category: 'foodServices', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK7jyUei3MKHsYGSR97xAYOKuRngwqgNmgKlCR9g3JkZ5I9tcGHCoXvZd7zREpLIk4ccnTANvR15b9EanTi5HxzUe2Ed5plQh8KntCHlojNE00tDRgIaE8cKfq2uv5rXTVCcLWwWAkNWMmAuNawl_Mskki_c7FViqMrgBj6M2s37hUvo_YLAFF33NFDbjZcly2m_-i3ewxoMd6h3oDg2Lk8HGtaTVxYcAuq0MIrCOPaK3N8nL2DAPzHMEsgErKxAAI9S5vcmLR_cYp', badgeColor: 'bg-[#1A7A3C]' },
  { id: '5', category: 'foodServices', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHP71lefp7Z0nJw_MAxxckCVUZm8olvaHhYIfi-RP36U99BIvqWfFcYIY2ASLDfODgGWOV2sgTeZuRztcMQ9IhlXowxYmIjxpF5xPjPqS58Rwq73rnm8-bzcviFTpUP3IB-CbyADLCADQO86a1rar303zfaryaOvuqLkMzNiOLgnULatfk--VgIWywYkIZren0W9P-IqyJnOMHCpTC3Q4rS5h5lCY7Epx9SD_mJkHGS9xXoX_Hyet3qzbF8mZroLy08HNNO5y3kS4_', badgeColor: 'bg-[#1A7A3C]' },
  { id: '7', category: 'education', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXWDVk36AtIYS7WOumico1wIEnjpC54PD6a6E0m8d9p9eopGmyV5QRAzjhUpLsMJsKseHlO4lU1IcDYuSNPGDDxNiTFsV83g6H8PnfuiiSGcphscbGpSZlGx2TQqekC3exXgLBUoOIa11cQl5C9iiID8hs1FLTzrUTR3bZ5eZYQDoUVSEeqzSjuP27_lyX5sUhFnlUd3PbuOBpPesyrrB0yY7ZddgsLhJKZoZoYiQGb1adH8CPhukmJMXmx9lb22AFCa1KmBjEBwfi', badgeColor: 'bg-[#1A3A8F]' },
  { id: '8', category: 'healthcare', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-Q7Jy1tNNgsgBqhxGNV3kGQhk0AteSU8enaGrg9Mvway9O_fxc5SA3tuoRCb1Xc96CptqzHHElFNqpxuXjXO5E1OPKt2SiIJeu94MvxvAM6MBMKy11zdFTcuqensQC8cJBddcfKpRvV9Ik6Ye7hdNFAPIObzaWXSHW7dWrkDuGfXdEpmX-LUH59r9P8LmVv7NWZ5ukf3xZnp_EKs92j78mvbZaDuKBHWIvP9U9q6AjkuIfQILidT9i5PPB1THInNvpwvFOMZnD2Cq', badgeColor: 'bg-[#C0272D]' },
  { id: '10', category: 'education', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1TVok-fNUJs4UjYQpNcOlTAplGKuo6_2_S363DdfmMPoHAELRRPLkymHWoDDvC_zofOwLP6QXHWToDVi4mx3YQM8_QBUpNlGCn05ZIiY1SHhRoJTDx4awDabQ262Lqe7p1GeVKI-DUYDjczTAzh8kAaEG19jY-cJbdahwRpsK1dgEveNExz1Z32SyhTImjTexvFfO2U37HX1_SxTOUHwDELSVVVjVPL0wuaxERqovx3_ZXWUrM8lXBj1jSUiedeimIRTj4xI-NNv7', badgeColor: 'bg-[#1A3A8F]' },
  { id: '11', category: 'healthcare', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_QajHSJUXvxD5ApM234y0VDtK2NwDD2o_IoSt0LAGyFPll0qjomRUPDvhWdx8NZJhAp9sfG-lwb4bqC_5qld86rJfNoqSeYmhvTvgbxYPKitBfxq7qB-4i0aD3mt9qPF65mGKmin0va3klHAyTBR9CSe-6Wp_n7Acn7U-npkBcHRPcpylw5bGalYrEdpWDCu8v8CSxRMvC0zYTamfo8G24trcPLMNOQoRH7a6qH36O1SjRlMKtINE4BzKqCVFJHliTUZJDiVtHyhw', badgeColor: 'bg-[#C0272D]' },
  { id: '12', category: 'foodServices', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFTk4sqo6a0DrGzs9YNEQjjiTqvWLXiS1kLi7nclkwAHog7xGScpEgLFxcQ-qJgNMK0l_hwluDYAOvZDTfyWhVmOJ_N2x5JWgJPevUYAZvN2l8Onth4XJMvS4DCYOCB4Qu6zb_k-gWOI7Br_RfgMgHWtGKjCiDs8uhrZTaKdIOxUv080VZy7xFjvAMffzXx4uoYGuzEkA9ht_Uzt3FEhfzj2HEMTlnBqUZdfxjgtDYoaKfT6M2-VALSP0m0S_KZaqyghrbLJzx65um', badgeColor: 'bg-[#1A7A3C]' },
];

export function getFilteredProjects(activeFilter: FilterType): Project[] {
  return activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);
}

export default function ProjectsGrid({ activeFilter, onProjectClick }: ProjectsGridProps) {
  const { t, locale } = useLocale();
  const filtered = getFilteredProjects(activeFilter);

  const categoryLabel = (c: Project['category']) => t(`projects.categories.${c}`);

  return (
    <main className="mx-auto max-w-7xl px-8 py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project) => {
          const title = t(`projects.items.${project.id}.title`);
          const description = t(`projects.items.${project.id}.description`);
          const impactLabel = t(`projects.items.${project.id}.impactLabel`);
          const impactValue = t(`projects.items.${project.id}.impactValue`);
          return (
            <motion.article
              key={project.id}
              variants={staggerItem}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group flex flex-col overflow-hidden rounded-xl bg-white transition-all duration-500 hover:shadow-[0_20px_40px_rgba(11,28,48,0.06)]"
            >
              <motion.div variants={cardHover} className="contents">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-white ${locale === 'en' ? 'uppercase' : ''} ${project.badgeColor}`}>
                    {categoryLabel(project.category)}
                  </div>
                </div>

                <div className="flex flex-grow flex-col p-8">
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
                  <p className="mb-6 flex-grow text-sm leading-relaxed text-slate-600">{description}</p>
                  <div className="mb-6 rounded-lg bg-slate-100 p-4">
                    <div className={`mb-1 text-[10px] font-bold tracking-wider text-slate-500 ${locale === 'en' ? 'uppercase' : ''}`}>{impactLabel}</div>
                    <div className="text-lg font-bold text-[#1A3A8F]">{impactValue}</div>
                  </div>
                  <Link
                    href={ROUTES.PROJECTS}
                    onClick={(e) => {
                      e.preventDefault();
                      onProjectClick(project);
                    }}
                    className="flex items-center text-sm font-bold text-[#1A3A8F] transition-transform group-hover:text-[#C0272D] hover:translate-x-1"
                  >
                    {t('common.viewDetails')} <span className="ml-2">→</span>
                  </Link>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </motion.div>

      <div className="mt-20 flex justify-center">
        <button type="button" className="flex items-center rounded-lg bg-[#1A3A8F] px-10 py-4 font-bold text-white shadow-lg shadow-[#1A3A8F]/20 transition-all hover:bg-[#0F1F5C]">
          {t('projects.grid.loadMore')}
          <ChevronDown className="ml-3 h-5 w-5" />
        </button>
      </div>
    </main>
  );
}
