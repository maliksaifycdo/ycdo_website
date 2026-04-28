'use client';

import { useLocale } from '@/contexts/LocaleContext';

export type GalleryFilterType = 'all' | 'healthcare' | 'education' | 'food' | 'community' | 'convention';

const values: GalleryFilterType[] = ['all', 'healthcare', 'education', 'food', 'community', 'convention'];

interface GalleryFilterProps {
  activeFilter: GalleryFilterType;
  onFilterChange: (filter: GalleryFilterType) => void;
}

export default function GalleryFilter({ activeFilter, onFilterChange }: GalleryFilterProps) {
  const { t } = useLocale();

  return (
    <section className="sticky top-[72px] z-40 border-b border-slate-200/60 bg-white px-8 py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
        {values.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            className={`rounded-full px-6 py-2 text-sm font-bold tracking-tight transition-all ${
              activeFilter === value
                ? 'bg-[#C0272D] text-white shadow-md'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            {t(`gallery.filters.${value}`)}
          </button>
        ))}
      </div>
    </section>
  );
}
