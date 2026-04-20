'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { Heart } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
}

const targetDate = new Date('2025-03-01');

function computeCountdown(): CountdownState {
  const now = new Date();
  const safeNow = now > targetDate ? targetDate : now;
  const days = Math.max(0, differenceInDays(targetDate, safeNow));
  const hours = Math.max(0, differenceInHours(targetDate, safeNow) % 24);
  const minutes = Math.max(0, differenceInMinutes(targetDate, safeNow) % 60);
  return { days, hours, minutes };
}

export default function SeasonalBanner() {
  const [countdown, setCountdown] = useState<CountdownState>(() => computeCountdown());

  useEffect(() => {
    const timer = setInterval(() => setCountdown(computeCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto mb-24 px-12">
      <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-[2rem] bg-[#C0272D] p-12 shadow-2xl shadow-[#C0272D]/20 md:flex-row">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
          <svg className="absolute -right-24 -top-24 h-[480px] w-[480px] text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="m12 2 2.4 6.5L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.5L12 2z" />
          </svg>
        </div>

        <div className="relative z-10 md:w-3/5">
          <h2 className="mb-6 text-5xl font-black leading-tight tracking-tight text-white">Ramadan Food Program</h2>
          <p className="mb-8 max-w-lg text-lg text-[#ffdad7]">
            Join our effort to provide 50,000 Iftar meals to families in remote villages this coming month. Every contribution feeds a neighbor.
          </p>
          <div className="mb-8 flex gap-6">
            <div className="min-w-[100px] rounded-xl bg-white/10 px-6 py-4 text-center backdrop-blur-md">
              <div className="text-3xl font-bold text-white">{countdown.days}</div>
              <div className="text-[10px] uppercase tracking-widest text-[#ffdad7]">Days Left</div>
            </div>
            <div className="min-w-[100px] rounded-xl bg-white/10 px-6 py-4 text-center backdrop-blur-md">
              <div className="text-3xl font-bold text-white">{countdown.hours}</div>
              <div className="text-[10px] uppercase tracking-widest text-[#ffdad7]">Hours</div>
            </div>
            <div className="min-w-[100px] rounded-xl bg-white/10 px-6 py-4 text-center backdrop-blur-md">
              <div className="text-3xl font-bold text-white">{countdown.minutes}</div>
              <div className="text-[10px] uppercase tracking-widest text-[#ffdad7]">Min</div>
            </div>
          </div>
          <Link href={ROUTES.DONATE} className="inline-block rounded-lg bg-white px-10 py-5 text-sm font-black uppercase tracking-widest text-[#C0272D] transition-all hover:scale-105 active:scale-95">
            Donate To Feed
          </Link>
        </div>

        <div className="relative z-10 mt-12 md:mt-0 md:w-1/3">
          <div className="glass-card rounded-2xl border border-white/20 p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-widest text-[#1A3A8F]">Goal Reached</span>
              <span className="font-black text-[#C0272D]">65%</span>
            </div>
            <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-white/30">
              <div className="h-full w-[65%] bg-[#1A3A8F]" />
            </div>
            <div className="flex items-center gap-3 text-sm text-[#1A3A8F]/70">
              <Heart className="h-4 w-4" />
              <span>4,280 Donors participated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
