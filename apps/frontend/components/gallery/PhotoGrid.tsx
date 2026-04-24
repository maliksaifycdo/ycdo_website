'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import 'yet-another-react-lightbox/styles.css';
import { motion } from '@/components/common/MotionDiv';

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
  ssr: false,
  loading: () => null,
});
import { ZoomIn } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/utils/motion';
import type { GalleryFilterType } from './GalleryFilter';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  date: string;
  location: string;
  category: GalleryFilterType;
  tall?: boolean;
}

interface PhotoGridProps {
  activeFilter: GalleryFilterType;
  lightboxIndex: number;
  setLightboxIndex: (index: number) => void;
}

const photos: GalleryPhoto[] = [
  { id: '1', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrveAlfWIYfWeeLpSHt1-V6yOxoPQN8Um3Ur1g47qCNmpvyARI6d_qjDcrUI0edWfs26_gWX0-Q570Xw2eqltR3FRs1-erfu4LYdX3U5v7_qdlSucpJHcJrOT_d0aLmSjOawLYjAXwlOCBJihRsxRZ1FSL8eW3M__9PrLfhrKZiR39UFhUMGRCzMRpvXTBenLjEzl1U9x5XV88VUpd3glwZGTXGtKuwC0KDPtTOQLyYSUM3IrlwS6YASd_FSW_spvxBKfLh-yOHTaG', title: 'Clean Water Access', date: 'March 2024', location: 'Sindh Regional Hub', category: 'community', tall: false },
  { id: '2', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3kLuZRxGfBk-cSA68Goj_AVHQfZmNu7oX-1w10QbxqW_6msFtnbSpxG7ZLvU5jmqu7qSwVKfncjMAEPF1ijYgLZah9AJZpITQqtiLlTSJXZED7MBxZnTCreTocL-UbmZ8gnTSh81IS_DUKeeBWqWLrv5_N9IoxQWb34o9Fg3YDX4TGkDRu5RikFl-5WmZ6caMI1BqvE9zWcIH-RK67QhlkP8HSC-odLwWbx3mvgvW5qXN3EK9Dg7lGlyba30X-PXDfkAIewh4WWqH', title: 'Education First', date: 'January 2024', location: 'Primary Center', category: 'education', tall: false },
  { id: '3', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEl3j01yqAqMa5_cm_ebj1mVFW9h9MzvwvYKzmEXSQpeZhXPOZ736jQZxOKrh841Efzo9ROboxXSfv4tuFK55_QoZSBv3nV6Ft1ugp4bxIcEf-PHcf8lSAH8rOGDId8RoX-w6l4s13Z-HskJ02fPiidoKALnXxo0nG7Q3WsDR24eZtgLz_9dEoKuF80rWWFqvRh2T_M1yCynEA-W7NKSlD16_x4gpdTZ-6X8ejueFf_EQdT4xD3GijIDKjXulHmxjyA0rjWq-OUHN1', title: 'Healthcare Outreach', date: 'February 2024', location: 'Mobile Clinic', category: 'healthcare', tall: true },
  { id: '4', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqwC7azPUacD6crKj8nzk0eYPTXkuQQSiCHKhmWuDqPUtpbxhvE9Yw5PW0eLr8CKNFvs5h_YvaMxgtcjSSqYhvZgGLaS409uEWfHkg-oen6b_LMfc2vlWWLNo5gpyrUS0tTgtSqteockmdXJ6WOZ6wVAuM5n00LxkeA_kaqD-_CYGZrlLUR7Wx-DANS_VhOmncwoD03wmz5Ksm8khUC01Q6kTC-aXEGjHytAPOAJzo9r6BaTG-6Vs860IH5gexogAWNTOPBQmFhI2P', title: 'Food Security Program', date: 'December 2023', location: 'Community Hall', category: 'food', tall: false },
  { id: '5', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD552f6ugTzSe0n-gKPm6AtBnmhxUKKPP5fDiJXli_lT6lgMlqGniRc7k3inmxsZ4L67H7t1aXSV1H1GWaVw0PlcYA8-J2O6c0E8FolWUwVH6rcRv_TKMyZMCxJc7edFhqKrrIVJk_8oDxU1VRtQWxJ-tjEA3_nb1s-CiwgANZ1sRWm08iu7dzOucGH6imWT0jgD4678Ua_cHppgIIhoSnd8Am-pfkr0qMcnQvXZ64N0wpJX62XzyRbqzm9XcQeDK-cP6cuEK20Nr-6', title: 'Annual Convention 2023', date: 'November 2023', location: 'Karachi Center', category: 'convention', tall: false },
  { id: '6', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSCgVagd5r1VxgG12rB-uOjds8R9vTO-3PEYyYy1H6hqC4eu80_FVCI0fXePSg_buqV1XRx5OmphQqnWSVuY6-K9POAO-MjbZp9fe0FRvHaj5xa2a7TXTD0LF3FFGiQQjWYITz-uVb7N9gSgDNk17X-5DfevUh7zy1g855LQUPfooGVdR9ZLwegzsTwEKgOCZflAe3-xWAnMndY9mFX7nKFyPSMtjW1E-1Csdaz3hPj6IKe5qXuEBqngx5u5kNoOCvNuNBBonVFsud', title: 'Immunization Drive', date: 'October 2023', location: 'Health Wing', category: 'healthcare', tall: false },
];

export default function PhotoGrid({ activeFilter, lightboxIndex, setLightboxIndex }: PhotoGridProps) {
  const filtered = activeFilter === 'all' ? photos : photos.filter((p) => p.category === activeFilter);
  const slides = filtered.map((p) => ({ src: p.src }));

  const col1 = filtered.filter((_, idx) => idx % 3 === 0);
  const col2 = filtered.filter((_, idx) => idx % 3 === 1);
  const col3 = filtered.filter((_, idx) => idx % 3 === 2);

  const renderCard = (photo: GalleryPhoto) => {
    const idx = filtered.findIndex((p) => p.id === photo.id);
    return (
      <motion.button
        key={photo.id}
        variants={staggerItem}
        onClick={() => setLightboxIndex(idx)}
        className="group relative w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm text-left"
      >
        <div className={`relative w-full ${photo.tall ? 'h-[320px] sm:h-[400px] md:h-[500px]' : 'h-56 sm:h-64 md:h-80'}`}>
          <Image
            src={photo.src}
            alt={photo.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={85}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end bg-[#1A3A8F]/80 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ZoomIn className="mb-4 h-8 w-8 text-white" />
          <h3 className="text-xl font-bold text-white">{photo.title}</h3>
          <p className="text-sm text-white/70">{photo.date} • {photo.location}</p>
        </div>
      </motion.button>
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-8 py-16">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-8">{col1.map(renderCard)}</div>
        <div className="space-y-8 lg:mt-12">{col2.map(renderCard)}</div>
        <div className="space-y-8">{col3.map(renderCard)}</div>
      </motion.div>
      <Lightbox open={lightboxIndex >= 0} index={lightboxIndex} slides={slides} close={() => setLightboxIndex(-1)} />
    </section>
  );
}

