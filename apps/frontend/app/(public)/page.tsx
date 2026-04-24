import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
export const metadata: Metadata = {
  title: { absolute: 'Home | YCDO – Serve Humanity' },
  description:
    'YCDO provides free healthcare, education, food security and community services across Multan, Pakistan. 30+ years of serving humanity.',
};
import StatsBar from '@/components/home/StatsBar';

const MissionSection = dynamic(() => import('@/components/home/MissionSection'));
const ProgramsGrid = dynamic(() => import('@/components/home/ProgramsGrid'));
const HospitalNetwork = dynamic(() => import('@/components/home/HospitalNetwork'));
const Testimonials = dynamic(() => import('@/components/home/Testimonials'));
const LatestNews = dynamic(() => import('@/components/home/LatestNews'));
const VolunteerCTA = dynamic(() => import('@/components/home/VolunteerCTA'));
const PartnersStrip = dynamic(() => import('@/components/home/PartnersStrip'));

function SectionSkeleton() {
  return (
    <div className="w-full px-8 py-24">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="h-10 w-1/3 animate-pulse rounded-xl bg-gray-200" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <Suspense fallback={<SectionSkeleton />}>
        <MissionSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProgramsGrid />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <HospitalNetwork />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <LatestNews />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <VolunteerCTA />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <PartnersStrip />
      </Suspense>
    </main>
  );
}
