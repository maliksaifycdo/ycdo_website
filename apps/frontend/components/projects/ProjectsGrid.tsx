'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/components/common/MotionDiv';
import { ChevronDown } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { cardHover, staggerContainer, staggerItem } from '@/utils/motion';
import type { FilterType } from './FilterTabs';

export interface Project {
  id: string;
  title: string;
  category: 'healthcare' | 'education' | 'food' | 'water' | 'community' | 'orphan';
  description: string;
  impactLabel: string;
  impactValue: string;
  image: string;
  badgeColor: string;
}

interface ProjectsGridProps {
  activeFilter: FilterType;
  onProjectClick: (project: Project) => void;
}

const projects: Project[] = [
  { id: '1', title: 'YCDO Health Complex', category: 'healthcare', description: 'Advanced diagnostic and treatment facilities providing free care to marginalized communities.', impactLabel: 'Impact Goal', impactValue: '12,000+ Patients Yearly', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlevQR3M_5Q9PM-YLbWpN9ZThZrmKB2lVZEGFK_Kcpm0Unq-VXvKuFVxBN1SHqQdcrcAFgcl_CAk0kVyQoCLB8TsGuw6g4-g1rKULO8gYNH3k4TYDyYTUQjWakvxFYv1L2C3fK81C8M5UWJUrrlozJnsPByVXLymbvA7SUJSHaCW32dZnEoliRSor90yLuewnt0iz-_bKKWGt3iG9nG2h6F_9xM27vdn8fId3fCjQE2fGwcPWZU9Kv0tcj51AOJPjRUvqiA_VIgcRm', badgeColor: 'bg-[#C0272D]' },
  { id: '2', title: 'Central Blood Bank', category: 'healthcare', description: 'A 24/7 lifeline providing screened blood products for emergency surgeries.', impactLabel: 'Total Donors', impactValue: '8,500 Registered', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiIGSzm6rlI87jE5IsFDKST2rQQOnu3uIhmCfZXyglIBLWVwqnpUuj75NOz7ZKB_XRkoxyeLOrMZaVCI8GaASgVm7VdyNvrF2BfwqkN4GD5_ANamSCdr5uRM5wD0fqb9NBlt7YoQef-TS2EJuxqGczDRG11yB3FWVGhxQwyfyBZ5HlL3fYn4Lid9jNOpmNFViUC6SQGq0of9eCKRzjAc7HGdIWV-Bbllk38ElpSTRKWm1z6xZIgN64n_FATt4oEu22N6kq9luXOefD', badgeColor: 'bg-[#C0272D]' },
  { id: '3', title: 'Bright Futures Scholarships', category: 'education', description: 'Full-tuition support for gifted students from low-income families.', impactLabel: 'Graduates', impactValue: '450+ Scholars', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARq4zZhqaVGEF0AjHE_gdyJnYN5KDH-a3uw6fS004LAwOHL4kAQuYmAJ53StRlzQOKnpryIcLupDVJSevBky1PXsLmZI1-M1z7LiK-Hp6ssDyBBjnLD7ZD-Fvj4S1q84AWAZBiDoBUKXM87YL8hqpBxMkQF0pecRdKoYQf0_LpxsislsAoY0toP6YyERqdZbZhkXb_ovjEblkBCOwB3DApgCU8YU8nzpOOmIfVf0aBX8yrdsaZ-qx5lcgMaefozRNrVuSw-rduN0FB', badgeColor: 'bg-[#1A3A8F]' },
  { id: '4', title: 'Community Kitchen Project', category: 'food', description: 'Providing daily nutritious hot meals to daily wage workers and street children.', impactLabel: 'Impact', impactValue: '50,000+ Meals Served', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK7jyUei3MKHsYGSR97xAYOKuRngwqgNmgKlCR9g3JkZ5I9tcGHCoXvZd7zREpLIk4ccnTANvR15b9EanTi5HxzUe2Ed5plQh8KntCHlojNE00tDRgIaE8cKfq2uv5rXTVCcLWwWAkNWMmAuNawl_Mskki_c7FViqMrgBj6M2s37hUvo_YLAFF33NFDbjZcly2m_-i3ewxoMd6h3oDg2Lk8HGtaTVxYcAuq0MIrCOPaK3N8nL2DAPzHMEsgErKxAAI9S5vcmLR_cYp', badgeColor: 'bg-[#1A7A3C]' },
  { id: '5', title: 'RO Water Filtration Units', category: 'water', description: 'Solar-powered reverse osmosis plants providing arsenic-free drinking water.', impactLabel: 'Coverage', impactValue: '15 Villages Active', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHP71lefp7Z0nJw_MAxxckCVUZm8olvaHhYIfi-RP36U99BIvqWfFcYIY2ASLDfODgGWOV2sgTeZuRztcMQ9IhlXowxYmIjxpF5xPjPqS58Rwq73rnm8-bzcviFTpUP3IB-CbyADLCADQO86a1rar303zfaryaOvuqLkMzNiOLgnULatfk--VgIWywYkIZren0W9P-IqyJnOMHCpTC3Q4rS5h5lCY7Epx9SD_mJkHGS9xXoX_Hyet3qzbF8mZroLy08HNNO5y3kS4_', badgeColor: 'bg-[#1A7A3C]' },
  { id: '6', title: 'House of Hope Orphanage', category: 'orphan', description: 'Comprehensive residential care and premium education for orphaned children.', impactLabel: 'Residency', impactValue: '85 Children Enrolled', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA0F85qvWllT5v8riNbeHT7LIKl9JBpii9Nr7roP_GRI2Tfs5lq43JAb9pXADlnuOUy3WjukDUFlkaA-R2eiCqDRmvNlWN5gvVnsZvcULwHWomkMo-Crd9hKiiy_EG95dIky8KoHZQ0ouOEn0vc4PqXipota0ArtroUQjjzPuhQaeZrnCc2BtfbA6m88D1dayW7aNEN8ZJIyDrRfIxe6S76E-MGnPgL6NmexRrH7q8Pr9cya1vfUEwfF03EUbXJyRncwXjk1KYJB1C', badgeColor: 'bg-[#1A3A8F]' },
  { id: '7', title: 'Skills & Vocational Center', category: 'education', description: 'IT training, tailoring, electrical workshops for sustainable livelihoods.', impactLabel: 'Trainees', impactValue: '1,200 Certified Yearly', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXWDVk36AtIYS7WOumico1wIEnjpC54PD6a6E0m8d9p9eopGmyV5QRAzjhUpLsMJsKseHlO4lU1IcDYuSNPGDDxNiTFsV83g6H8PnfuiiSGcphscbGpSZlGx2TQqekC3exXgLBUoOIa11cQl5C9iiID8hs1FLTzrUTR3bZ5eZYQDoUVSEeqzSjuP27_lyX5sUhFnlUd3PbuOBpPesyrrB0yY7ZddgsLhJKZoZoYiQGb1adH8CPhukmJMXmx9lb22AFCa1KmBjEBwfi', badgeColor: 'bg-[#1A3A8F]' },
  { id: '8', title: 'Mobile Health Units', category: 'healthcare', description: 'Equipped vans reaching remote areas with primary consultations and medications.', impactLabel: 'Reach', impactValue: '35 Villages Monthly', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-Q7Jy1tNNgsgBqhxGNV3kGQhk0AteSU8enaGrg9Mvway9O_fxc5SA3tuoRCb1Xc96CptqzHHElFNqpxuXjXO5E1OPKt2SiIJeu94MvxvAM6MBMKy11zdFTcuqensQC8cJBddcfKpRvV9Ik6Ye7hdNFAPIObzaWXSHW7dWrkDuGfXdEpmX-LUH59r9P8LmVv7NWZ5ukf3xZnp_EKs92j78mvbZaDuKBHWIvP9U9q6AjkuIfQILidT9i5PPB1THInNvpwvFOMZnD2Cq', badgeColor: 'bg-[#C0272D]' },
  { id: '9', title: 'Shadi Boxes (Marriage Support)', category: 'community', description: 'Essential household kits and financial aid for underprivileged families.', impactLabel: 'Beneficiaries', impactValue: '200 Families/Year', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4_hOHiJMQZuqpGi0Obew_nardS_-cPGgFXMFm2SUWcNmS47RuDmMSb2Tm3QzJRa156h-3dqSN6U0pf42q2jF3p9BmtSFIzGABd9qmlDC_J60tbrKMLCSrIxAHdpwdIIAweSBE-lvD_XM2GTwFd_B2BGIVFTEZjwbz7dOZVftDqv1JGqHyjkKN4_mGu9ziuD1LPJayR2zvz_0VPemgAiw4jAjhU-9UrXnz5xELDz1slYShAVAikomEZdwcDJWtw7dj2ZHjXwAL8w6I', badgeColor: 'bg-[#1A7A3C]' },
  { id: '10', title: 'Child Protection Advocacy', category: 'education', description: 'Workshops and legal aid preventing child labor and promoting school safety.', impactLabel: 'Impact', impactValue: 'Advocacy across 5 Districts', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1TVok-fNUJs4UjYQpNcOlTAplGKuo6_2_S363DdfmMPoHAELRRPLkymHWoDDvC_zofOwLP6QXHWToDVi4mx3YQM8_QBUpNlGCn05ZIiY1SHhRoJTDx4awDabQ262Lqe7p1GeVKI-DUYDjczTAzh8kAaEG19jY-cJbdahwRpsK1dgEveNExz1Z32SyhTImjTexvFfO2U37HX1_SxTOUHwDELSVVVjVPL0wuaxERqovx3_ZXWUrM8lXBj1jSUiedeimIRTj4xI-NNv7', badgeColor: 'bg-[#1A3A8F]' },
  { id: '11', title: 'TB Detection Camps', category: 'healthcare', description: 'Free screening and medication management for TB patients in high-risk zones.', impactLabel: 'Success Rate', impactValue: '92% Recovery Rate', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_QajHSJUXvxD5ApM234y0VDtK2NwDD2o_IoSt0LAGyFPll0qjomRUPDvhWdx8NZJhAp9sfG-lwb4bqC_5qld86rJfNoqSeYmhvTvgbxYPKitBfxq7qB-4i0aD3mt9qPF65mGKmin0va3klHAyTBR9CSe-6Wp_n7Acn7U-npkBcHRPcpylw5bGalYrEdpWDCu8v8CSxRMvC0zYTamfo8G24trcPLMNOQoRH7a6qH36O1SjRlMKtINE4BzKqCVFJHliTUZJDiVtHyhw', badgeColor: 'bg-[#C0272D]' },
  { id: '12', title: 'Ramadan & Qurbani Drive', category: 'food', description: 'Annual distribution of ration bags and meat to vulnerable families.', impactLabel: 'Volume', impactValue: '5,000+ Ration Packs', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFTk4sqo6a0DrGzs9YNEQjjiTqvWLXiS1kLi7nclkwAHog7xGScpEgLFxcQ-qJgNMK0l_hwluDYAOvZDTfyWhVmOJ_N2x5JWgJPevUYAZvN2l8Onth4XJMvS4DCYOCB4Qu6zb_k-gWOI7Br_RfgMgHWtGKjCiDs8uhrZTaKdIOxUv080VZy7xFjvAMffzXx4uoYGuzEkA9ht_Uzt3FEhfzj2HEMTlnBqUZdfxjgtDYoaKfT6M2-VALSP0m0S_KZaqyghrbLJzx65um', badgeColor: 'bg-[#1A7A3C]' },
  { id: '13', title: 'Masjid Construction', category: 'community', description: 'Building community hubs as places of worship and neighborhood learning centers.', impactLabel: 'Status', impactValue: '12 Masjids Completed', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK14mXMj-8d6XDa0lrbdxY4smQgNpbiiS79FJi6RvjF5JRlole7x31hbJ5uIOuGmCtGHYIe41VL-LUURb37pxNWNuaspP6tQ6UAYhrSvgaIlydlMstLagWeLfXCZ7j3EXF_TCmfitO0HiaYLkc7XC2JssOosSKC4T1zhkEueIk4WoXHdLQGWgCtVCw5hh2LWBtUBo2thPiJWXF7_rysbteh5prux8sJe2LzXYrkUXQzDlJ3azxLjIGHlnHY9YYgwy8AldZJCQlpmZC', badgeColor: 'bg-[#1A7A3C]' },
  { id: '14', title: 'Wheelchair Distribution', category: 'community', description: 'High-quality wheelchairs and assistive devices for the disabled.', impactLabel: 'Impact', impactValue: '3,200 Mobility Aids', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlDXBXcIyrvueoKYkFD-bHL8qAvos3rLQ1ZQfe0Aqu6BGxJ_zUjFUfvnQkgP4uc7PfQHGG9xVCwR7ni1tTiLti9ni67Oe_owH8EUDyCBFacPvOVaF0AlHoBRaG7Z8I-OK4lTF_YVkQOwgn_wXC_GwC7xa9bCVw2T0L6jNpUXBfiS_BnBInHan_kFdUqSelovKLPYOdKLinVjEk5ihfDTsXh4rR3fduvYG_Z4Nmc5xpZ6qJoxe8qbtqpGIQ8W6JFzPnSMB1HXkRYuyN', badgeColor: 'bg-[#C0272D]' },
  { id: '15', title: 'Prisoner Welfare Program', category: 'community', description: 'Legal aid and rehabilitation support for financially detained individuals.', impactLabel: 'Released', impactValue: '150+ Reunited Families', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVVHzDKVp7wsd4i66aW3JIQo0aOfzxEJc04HV9_ucPIyeg146HtzaqgxsQ_e4mf0ooNeZZXgR-X1pXBEzTz8Xu9fcL_NnLu-3boEHLZiJ4VaNJzEHwjT3tpzCgqUYRbtu--T2JAuv7Ps0rSEHCXHNaoGAD4RsN2b_YH_lVVLWNKg24-WJQHhhC32Ebl-ATZsslDdlsxGCTcH9kE2-HPEwcYXR33xELhhCsLgXCDTRvbX-Ishsb4gdkMluYUwSwex5R7v69AJr0tgNV', badgeColor: 'bg-[#1A7A3C]' },
];

export function getFilteredProjects(activeFilter: FilterType): Project[] {
  return activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);
}

export default function ProjectsGrid({ activeFilter, onProjectClick }: ProjectsGridProps) {
  const filtered = getFilteredProjects(activeFilter);

  return (
    <main className="mx-auto max-w-7xl px-8 py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project) => (
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
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white ${project.badgeColor}`}>
                  {project.category === 'food' ? 'Food & Kitchen' : project.category === 'orphan' ? 'Orphan Care' : project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </div>
              </div>

              <div className="flex flex-grow flex-col p-8">
                <h3 className="mb-3 text-xl font-bold text-slate-900">{project.title}</h3>
                <p className="mb-6 flex-grow text-sm leading-relaxed text-slate-600">{project.description}</p>
                <div className="mb-6 rounded-lg bg-slate-100 p-4">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{project.impactLabel}</div>
                  <div className="text-lg font-bold text-[#1A3A8F]">{project.impactValue}</div>
                </div>
                <Link
                  href={ROUTES.PROJECTS}
                  onClick={(e) => {
                    e.preventDefault();
                    onProjectClick(project);
                  }}
                  className="flex items-center text-sm font-bold text-[#1A3A8F] transition-transform group-hover:text-[#C0272D] hover:translate-x-1"
                >
                  View Details <span className="ml-2">→</span>
                </Link>
              </div>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-20 flex justify-center">
        <button className="flex items-center rounded-lg bg-[#1A3A8F] px-10 py-4 font-bold text-white shadow-lg shadow-[#1A3A8F]/20 transition-all hover:bg-[#0F1F5C]">
          Load More Projects
          <ChevronDown className="ml-3 h-5 w-5" />
        </button>
      </div>
    </main>
  );
}
