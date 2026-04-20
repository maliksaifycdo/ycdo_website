'use client';

export type FilterType =
  | 'all'
  | 'healthcare'
  | 'education'
  | 'food'
  | 'water'
  | 'community'
  | 'orphan';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { label: string; value: FilterType }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Education', value: 'education' },
  { label: 'Food & Kitchen', value: 'food' },
  { label: 'Water', value: 'water' },
  { label: 'Community', value: 'community' },
  { label: 'Orphan Care', value: 'orphan' },
];

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="sticky top-[72px] z-40 border-none bg-white/80 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-8 py-6">
        <div className="no-scrollbar flex items-center gap-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`shrink-0 rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeFilter === filter.value
                  ? 'bg-[#1A3A8F] text-white shadow-md shadow-[#1A3A8F]/20'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
