import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { HeroSection } from '../types';

export default function HeroSectionEditor({
  value,
  onChange,
}: {
  value: HeroSection;
  onChange: (next: HeroSection) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Title *</label>
        <Input value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Subtitle</label>
        <Input value={value.subtitle} onChange={(e) => onChange({ ...value, subtitle: e.target.value })} />
      </div>

      <div className="md:col-span-2 space-y-2">
        <label className="text-xs font-bold text-slate-700">Body</label>
        <Textarea value={value.body} onChange={(e) => onChange({ ...value, body: e.target.value })} />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Image URL</label>
        <Input value={value.imageUrl} onChange={(e) => onChange({ ...value, imageUrl: e.target.value })} />
        {value.imageUrl ? (
          <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value.imageUrl} alt="Preview" className="h-40 w-full object-cover" />
          </div>
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">CTA Label</label>
          <Input
            value={value.cta.label}
            onChange={(e) => onChange({ ...value, cta: { ...value.cta, label: e.target.value } })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">CTA Link</label>
          <Input
            value={value.cta.href}
            onChange={(e) => onChange({ ...value, cta: { ...value.cta, href: e.target.value } })}
          />
        </div>
      </div>
    </div>
  );
}

