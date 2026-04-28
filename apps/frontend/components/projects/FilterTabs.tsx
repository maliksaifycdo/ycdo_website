'use client';

import { useLocale } from '@/contexts/LocaleContext';

export type FilterType =
  | 'all'
  | 'healthcare'
  | 'education'
  | 'foodServices';

const filterValues: FilterType[] = ['all', 'healthcare', 'education', 'foodServices'];

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  const { t } = useLocale();

  return (
    <div className="sticky top-[72px] z-40 border-none bg-white/80 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-8 py-6">
        <div className="no-scrollbar flex items-center gap-3 overflow-x-auto pb-2">
          {filterValues.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onFilterChange(value)}
              className={`shrink-0 rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeFilter === value
                  ? 'bg-[#1A3A8F] text-white shadow-md shadow-[#1A3A8F]/20'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {t(`projects.filters.${value}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
