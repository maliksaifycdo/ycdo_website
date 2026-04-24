'use client';

import Image from 'next/image';
import { motion, useInView } from '@/components/common/MotionDiv';
import { useRef } from 'react';
import { DonationCampaign } from '@ycdo/shared';

export type CampaignCardData = {
  title: string;
  category: string;
  categoryBg: string;
  raised: string;
  percentage: number;
  image: string;
  campaign: DonationCampaign;
};

const campaigns: CampaignCardData[] = [
  {
    title: 'Emergency Medical Fund',
    category: 'Healthcare',
    categoryBg: 'bg-[#1A3A8F]',
    raised: 'PKR 850k',
    percentage: 75,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3UBjwBSWdX8u99cTlDt6VJV_B_Q_Z9q2eWtl7ek9aUB292Ryn7GcGLB-uwMGu4W4GheuLriW_R_nDqVvSN6gmYaAPN_GNFk4PlvLeTChUcanltZxx33NasI1fvrxX41JyK9iZlX4Wjp2ol2h5DL0TVjChGc3m9hSPBHbXPZPaKYEx2FPEMMSDPHRnVR4DAyZqIS77-6dtFrJ94G5yJeEfThs6r23_IzCQluGW6JoQemtJvFYnhOjYh0W5Ec8qD_bAeHNTkKKMtFbf',
    campaign: DonationCampaign.HEALTHCARE,
  },
  {
    title: 'School Supplies Drive',
    category: 'Education',
    categoryBg: 'bg-[#1A7A3C]',
    raised: 'PKR 420k',
    percentage: 42,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgS97i_d_XV_zYShEfoc1z-_41PgG2k9PY88ZYTmCfN71IppcnbwXqz4cgIIGWA6NwnWP87N9slniTIBtl5vtUHT5mKIAwUBbvqat1vaGa--D5K-0I8r4WcoQXV_es9Q3oLGVFu06Wp75Xke_DmvdNuTBHT4QactTqIX7dEAr9G3JMBWskT-Rae8R_771pJwO-EshOxWCfn_DOzD8KfTrZcztN_alWDf7QZPRvnlWI9lZUZcyUzbc2MSGxXLQ9s0S7mRMLVuk_sTBN',
    campaign: DonationCampaign.EDUCATION,
  },
  {
    title: 'Monthly Ration Kits',
    category: 'Food Security',
    categoryBg: 'bg-[#C0272D]',
    raised: 'PKR 1.2M',
    percentage: 90,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCe-V98FqeHPsIuPgY39kcqLZIE9wS8d3NBMo6pOaCRFHp2wXUFcGY0HPLjW2Het4cc4MlI9BF9IkWxYMIomiLbTQN8WnhVpDQHWCCWAbKjnpzQbxY7G6hncI104hYv1Mrz2hXh3bf0_G7gBMvbL4VjSANzssk_cm-84NY-F0aq6otpPmHrvTdXyNOGHo_GMDIL0SkEUv4c2GqNP80uV-1UVnP94jJdgm4Kx3WeioHxkvmRWkbIzcQWRjB5RcmGcIBQzqts1EHIyvvG',
    campaign: DonationCampaign.FOOD,
  },
  {
    title: 'Solar Water Pumps',
    category: 'Clean Water',
    categoryBg: 'bg-[#1A3A8F]',
    raised: 'PKR 300k',
    percentage: 15,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCN6tqijh-rXxghNnvxjr0Ru5U1-gr358IlUdTZP1_DYqWkyGWAEixT-w9L1_rzrRAfdeXHcURqbEe8zZNMX_GxH1M3Xm7S4AxNsQp-t0xwBB7EKDASRrGKohTqKRcXNLpwubpqpfFxnpuyxPH-jIXRxa15I43-WpVIIwF3pYQgPdyDkFDGlLpMFMbJC7RMw6ODpMFBYCuAevTXeznnqWXI6Ms0zwD7WBz6ecCzXibpznJAZ9CQvN0BzMdO0Wf2cX1Dp-5ZgplZBWzW',
    campaign: DonationCampaign.WATER,
  },
];

function ProgressBar({ percentage }: { percentage: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="mb-6 h-2 w-full overflow-hidden rounded-full bg-[#e5eeff]">
      <motion.div
        className="h-full rounded-full bg-[#fe5553]"
        initial={{ width: 0 }}
        animate={inView ? { width: `${percentage}%` } : { width: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

type Props = {
  onSelectCampaign: (campaign: DonationCampaign) => void;
};

export default function CampaignCards({ onSelectCampaign }: Props) {
  const scrollToForm = (campaign: DonationCampaign) => {
    onSelectCampaign(campaign);
    document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-16 flex items-end justify-between">
        <div className="max-w-xl">
          <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter text-[#00236f] md:text-5xl">
            Urgent Campaigns
          </h2>
          <div className="h-1.5 w-24 rounded-full bg-[#fe5553]" />
        </div>
        <p className="hidden font-medium text-slate-600 md:block">Every Rupee counts towards a better future.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {campaigns.map((c) => (
          <div
            key={c.title}
            className="group overflow-hidden rounded-2xl bg-white shadow-xl shadow-[#00236f]/5 transition-all hover:-translate-y-2"
          >
            <div className="relative h-48">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white backdrop-blur-md ${c.categoryBg}`}
              >
                {c.category}
              </span>
            </div>
            <div className="p-6">
              <h3 className="mb-4 text-xl font-extrabold leading-tight text-[#00236f]">{c.title}</h3>
              <div className="mb-2 flex justify-between text-sm font-semibold">
                <span className="text-slate-600">Raised: {c.raised}</span>
                <span className="text-[#b72028]">{c.percentage}%</span>
              </div>
              <ProgressBar percentage={c.percentage} />
              <button
                type="button"
                onClick={() => scrollToForm(c.campaign)}
                className="w-full rounded-lg bg-[#00236f] py-3 font-bold text-white transition-colors hover:bg-[#b72028]"
              >
                Donate to This
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
