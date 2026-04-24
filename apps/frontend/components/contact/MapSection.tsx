'use client';

import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
const LeafletMap = dynamic(() => import('./ContactLeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-full animate-pulse items-center justify-center bg-gray-100">
      <div className="text-center text-gray-400">
        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-[#1A3A8F] border-t-[#C0272D]" />
        <p className="text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

const CENTER: [number, number] = [30.165, 71.485];

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${CENTER[0]},${CENTER[1]}`;

export default function MapSection() {
  return (
    <section className="relative h-[500px] w-full bg-[#e5eeff]">
      <div className="absolute inset-0 z-[400]">
        <LeafletMap />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1000] flex items-center justify-center">
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-4 rounded-2xl border-2 border-[#00236f] bg-white p-6 shadow-2xl transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00236f] text-white">
            <MapPin className="h-6 w-6" aria-hidden />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-[#00236f]">YCDO Head Office</h4>
            <p className="text-xs text-slate-600">Click for directions</p>
          </div>
        </a>
      </div>
    </section>
  );
}
