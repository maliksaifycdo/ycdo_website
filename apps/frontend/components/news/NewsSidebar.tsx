'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

const events = [
  { month: 'Jun', day: '12', title: 'Digital Literacy Workshop', location: 'Islamabad • 10:00 AM' },
  { month: 'Jun', day: '18', title: 'Annual Fundraising Gala', location: 'Karachi • 07:00 PM' },
  { month: 'Jul', day: '05', title: 'Health Screening Drive', location: 'Multan • 08:00 AM' },
];

const categories = [
  { label: 'Education', count: 12 },
  { label: 'Humanitarian Aid', count: 8 },
  { label: 'Project Updates', count: 24 },
  { label: 'Volunteer Stories', count: 5 },
];

const tags = ['#SDG2030', '#RuralGrowth', '#WomenEmpowerment', '#NGO', '#DigitalPakistan'];

export default function NewsSidebar() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-12">
      <div className="rounded-xl bg-slate-100 p-8 shadow-sm">
        <h4 className="mb-4 text-lg font-black">Search News</h4>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Keywords..."
            className="w-full rounded-lg border-none bg-white py-3 px-4 focus:ring-2 focus:ring-[#1A3A8F]"
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-slate-500" />
        </div>
      </div>

      <div className="rounded-xl bg-slate-100 p-8 shadow-sm">
        <h4 className="mb-6 text-lg font-black">Quick Schedule</h4>
        <div className="space-y-6">
          {events.map((event) => (
            <div key={`${event.month}-${event.day}-${event.title}`} className="group flex cursor-pointer items-center">
              <div className="mr-4 flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-[#C0272D] font-bold text-white">
                <span className="text-[10px] uppercase leading-none">{event.month}</span>
                <span className="text-lg leading-none">{event.day}</span>
              </div>
              <div>
                <h5 className="text-sm font-bold transition-colors group-hover:text-[#1A3A8F]">{event.title}</h5>
                <p className="text-xs text-slate-500">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-slate-100 p-8 shadow-sm">
        <h4 className="mb-6 text-lg font-black">Categories</h4>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat.label} className="flex cursor-pointer items-center justify-between text-sm font-medium text-slate-600 transition-colors hover:text-[#1A3A8F]">
              <span>{cat.label}</span>
              <span className="rounded bg-slate-200 px-2 py-1 text-[10px]">{cat.count.toString().padStart(2, '0')}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-slate-100 p-8 shadow-sm">
        <h4 className="mb-6 text-lg font-black">Topic Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 transition-all hover:bg-[#1A3A8F] hover:text-white">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

