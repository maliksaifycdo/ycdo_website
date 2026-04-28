import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { CmsSectionType } from './types';

const OPTIONS: Array<{ value: CmsSectionType; label: string }> = [
  { value: 'hero', label: 'Hero' },
  { value: 'richText', label: 'Rich Text' },
  { value: 'stats', label: 'Stats' },
  { value: 'cards', label: 'Cards' },
  { value: 'cta', label: 'CTA' },
];

export default function AddSectionBar({ onAdd }: { onAdd: (type: CmsSectionType) => void }) {
  const [type, setType] = useState<CmsSectionType>('richText');

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="min-w-[220px]">
        <p className="text-sm font-extrabold text-slate-900">Sections</p>
        <p className="text-xs text-slate-600">Add, remove, and reorder sections visually.</p>
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as CmsSectionType)}
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Button type="button" onClick={() => onAdd(type)}>
          <Plus className="mr-2 size-4" />
          Add Section
        </Button>
      </div>
    </div>
  );
}

