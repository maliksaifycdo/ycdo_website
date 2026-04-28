import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus } from 'lucide-react';
import type { RichTextSection } from '../types';

export default function RichTextSectionEditor({
  value,
  onChange,
}: {
  value: RichTextSection;
  onChange: (next: RichTextSection) => void;
}) {
  const updateParagraph = (index: number, text: string) => {
    const next = [...value.paragraphs];
    next[index] = text;
    onChange({ ...value, paragraphs: next });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Heading *</label>
        <Input value={value.heading} onChange={(e) => onChange({ ...value, heading: e.target.value })} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700">Paragraphs</label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange({ ...value, paragraphs: [...value.paragraphs, ''] })}
          >
            <Plus className="mr-2 size-4" />
            Add paragraph
          </Button>
        </div>
        <div className="space-y-3">
          {value.paragraphs.map((p, idx) => (
            <div key={idx} className="flex gap-2">
              <Textarea value={p} onChange={(e) => updateParagraph(idx, e.target.value)} />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => onChange({ ...value, paragraphs: value.paragraphs.filter((_, i) => i !== idx) })}
                disabled={value.paragraphs.length <= 1}
                aria-label="Remove paragraph"
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

