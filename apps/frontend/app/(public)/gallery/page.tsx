'use client';

import { useState } from 'react';
import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryFilter, { type GalleryFilterType } from '@/components/gallery/GalleryFilter';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import VideoSection from '@/components/gallery/VideoSection';
import GalleryNewsletter from '@/components/gallery/GalleryNewsletter';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterType>('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <main className="pt-0">
      <GalleryHero />
      <GalleryFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <PhotoGrid activeFilter={activeFilter} lightboxIndex={lightboxIndex} setLightboxIndex={setLightboxIndex} />
      <VideoSection />
      <GalleryNewsletter />
    </main>
  );
}
