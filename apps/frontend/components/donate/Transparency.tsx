'use client';

import dynamic from 'next/dynamic';
import { Heart, Megaphone, Settings } from 'lucide-react';

const DonationChart = dynamic(() => import('./DonationChart'), {
  ssr: false,
  loading: () => <div className="h-[300px] rounded-xl bg-gray-100 animate-pulse" />,
});

export default function Transparency() {
  return (
    <section className="border-t border-[#e5eeff] bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter text-[#00236f] md:text-5xl">
            100% Transparency
          </h2>
          <p className="mx-auto max-w-2xl font-medium text-slate-600">
            We ensure that every penny you donate goes exactly where it&apos;s needed most.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="relative flex justify-center">
            <div className="relative h-[300px] w-full max-w-md">
              <DonationChart />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-4xl font-black text-[#00236f]">85%</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Field Impact</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00236f]">
                <Heart className="h-6 w-6 text-white" aria-hidden />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-[#00236f]">Direct Aid (85%)</h3>
                <p className="leading-relaxed text-slate-600">
                  Allocated directly to hospital bills, school fees, ration kits, and development projects in rural
                  communities.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fe5553]">
                <Megaphone className="h-6 w-6 text-white" aria-hidden />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-[#00236f]">Awareness & Mobilization (10%)</h3>
                <p className="leading-relaxed text-slate-600">
                  Supporting grassroots campaigns and community health awareness programs across 50+ villages.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#d3e4fe]">
                <Settings className="h-6 w-6 text-[#00236f]" aria-hidden />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-[#00236f]">Operations (5%)</h3>
                <p className="leading-relaxed text-slate-600">
                  Minimal administrative costs to keep our mission sustainable and digital infrastructure secure.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-12 border-t border-[#e5eeff] pt-20 opacity-40 grayscale">
          <span className="text-2xl font-black tracking-tighter">PCP CERTIFIED</span>
          <span className="text-2xl font-black tracking-tighter">UN GLOBAL COMPACT</span>
          <span className="text-2xl font-black tracking-tighter">TRUST SEAL</span>
          <span className="text-2xl font-black tracking-tighter">IATA VERIFIED</span>
        </div>
      </div>
    </section>
  );
}
