'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Info, Search } from 'lucide-react';
const HospitalLeafletMap = dynamic(() => import('./HospitalLeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-full items-center justify-center rounded-3xl bg-gray-100 animate-pulse">
      <p className="text-gray-400">Loading hospital map...</p>
    </div>
  ),
});

export default function HospitalMap() {
  const [search, setSearch] = useState('');

  return (
    <section className="bg-slate-100 py-24">
      <div className="container mx-auto px-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-4xl font-bold text-[#1A3A8F]">Find a Hospital Near You</h2>
            <p className="mb-8 text-lg text-slate-600">
              Our network spans multiple locations across the city, ensuring that quality healthcare is never more than a few kilometers away.
            </p>
            <div className="mb-8 flex items-center rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
              <Search className="ml-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by area or hospital name..."
                className="w-full border-none bg-transparent px-4 py-3 text-slate-900 focus:ring-0"
              />
              <button className="rounded-lg bg-[#1A3A8F] px-6 py-3 font-bold text-white">Search</button>
            </div>

            <div className="rounded-2xl border-l-8 border-[#1A3A8F] bg-slate-200 p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Info className="h-8 w-8 text-[#1A3A8F]" />
                <div>
                  <h4 className="mb-2 text-xl font-bold text-[#1A3A8F]">Hospital Accessibility</h4>
                  <p className="text-slate-600">
                    All hospitals in our network offer subsidized fees for those in need. Emergency departments operate 24/7 with specialized trauma teams ready to assist at all hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl lg:w-1/2">
            <HospitalLeafletMap search={search} />
          </div>
        </div>
      </div>
    </section>
  );
}
