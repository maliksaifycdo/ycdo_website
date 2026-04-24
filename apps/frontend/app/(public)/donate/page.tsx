'use client';

import { useState } from 'react';
import { DonationCampaign } from '@ycdo/shared';
import DonateHero from '@/components/donate/DonateHero';
import CampaignCards from '@/components/donate/CampaignCards';
import DonationForm from '@/components/donate/DonationForm';
import BankDetails from '@/components/donate/BankDetails';
import Transparency from '@/components/donate/Transparency';

export default function DonatePage() {
  const [selectedCampaign, setSelectedCampaign] = useState<DonationCampaign | null>(null);

  return (
    <main className="scroll-smooth">
      <DonateHero />
      <CampaignCards onSelectCampaign={setSelectedCampaign} />
      <DonationForm selectedCampaign={selectedCampaign} />
      <BankDetails />
      <Transparency />
    </main>
  );
}
