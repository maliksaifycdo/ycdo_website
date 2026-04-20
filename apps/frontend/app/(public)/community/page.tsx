import type { Metadata } from 'next';
import CommunityHero from '@/components/community/CommunityHero';
import ServicesIconGrid from '@/components/community/ServicesIconGrid';
import SeasonalBanner from '@/components/community/SeasonalBanner';
import FoodKitchen from '@/components/community/FoodKitchen';
import HowToAccess from '@/components/community/HowToAccess';

export const metadata: Metadata = {
  title: 'Community Services | YCDO – Serve Humanity',
  description: 'YCDO provides food, Ramadan packages, wheelchairs, orphan care and 9 community services across Pakistan.',
};

export default function CommunityPage() {
  return (
    <main>
      <CommunityHero />
      <ServicesIconGrid />
      <SeasonalBanner />
      <FoodKitchen />
      <HowToAccess />
    </main>
  );
}
