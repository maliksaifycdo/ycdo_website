import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import type { CardsSection } from '../types';

export default function CardsSectionEditor({
  value,
  onChange,
}: {
  value: CardsSection;
  onChange: (next: CardsSection) => void;
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
          <label className="text-xs font-bold text-slate-700">Cards</label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...value,
                items: [...value.items, { title: '', description: '', imageUrl: '' }],
              })
            }
          >
            <Plus className="mr-2 size-4" />
            Add card
          </Button>
        </div>

        <div className="space-y-3">
          {value.items.map((card, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-bold text-slate-700">Card {idx + 1}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onChange({ ...value, items: value.items.filter((_, i) => i !== idx) })}
                  disabled={value.items.length <= 1}
                  aria-label="Remove card"
                >
                  <Trash2 className="size-4 text-slate-600" />
                </Button>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Title *</label>
                  <Input value={card.title} onChange={(e) => updateItem(idx, { title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Image URL</label>
                  <Input value={card.imageUrl} onChange={(e) => updateItem(idx, { imageUrl: e.target.value })} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-700">Description</label>
                  <Textarea
                    value={card.description}
                    onChange={(e) => updateItem(idx, { description: e.target.value })}
                  />
                </div>
              </div>

              {card.imageUrl ? (
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.imageUrl} alt="Card preview" className="h-40 w-full object-cover" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

