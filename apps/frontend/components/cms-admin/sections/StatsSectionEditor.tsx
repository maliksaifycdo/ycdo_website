import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import type { StatsSection } from '../types';

export default function StatsSectionEditor({
  value,
  onChange,
}: {
  value: StatsSection;
  onChange: (next: StatsSection) => void;
}) {
  const updateItem = (index: number, patch: Partial<(typeof value.items)[number]>) => {
    const next = [...value.items];
    next[index] = { ...next[index], ...patch };
    onChange({ ...value, items: next });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Heading</label>
        <Input value={value.heading} onChange={(e) => onChange({ ...value, heading: e.target.value })} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700">Stats</label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange({ ...value, items: [...value.items, { label: '', value: '' }] })}
          >
            <Plus className="mr-2 size-4" />
            Add stat
          </Button>
        </div>
        <div className="space-y-2">
          {value.items.map((item, idx) => (
            <div key={idx} className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-[1fr_180px_auto]">
              <Input
                placeholder="Label"
                value={item.label}
                onChange={(e) => updateItem(idx, { label: e.target.value })}
              />
              <Input
                placeholder="Value"
                value={item.value}
                onChange={(e) => updateItem(idx, { value: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => onChange({ ...value, items: value.items.filter((_, i) => i !== idx) })}
                disabled={value.items.length <= 1}
                aria-label="Remove stat"
              >
                <Trash2 className="size-4 text-slate-600" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

