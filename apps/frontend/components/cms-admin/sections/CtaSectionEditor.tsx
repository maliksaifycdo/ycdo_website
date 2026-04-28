import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { CtaSection } from '../types';

export default function CtaSectionEditor({
  value,
  onChange,
}: {
  value: CtaSection;
  onChange: (next: CtaSection) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2 space-y-2">
        <label className="text-xs font-bold text-slate-700">Heading *</label>
        <Input value={value.heading} onChange={(e) => onChange({ ...value, heading: e.target.value })} />
      </div>

      <div className="md:col-span-2 space-y-2">
        <label className="text-xs font-bold text-slate-700">Text</label>
        <Textarea value={value.text} onChange={(e) => onChange({ ...value, text: e.target.value })} />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Button label</label>
        <Input
          value={value.button.label}
          onChange={(e) => onChange({ ...value, button: { ...value.button, label: e.target.value } })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Button link</label>
        <Input
          value={value.button.href}
          onChange={(e) => onChange({ ...value, button: { ...value.button, href: e.target.value } })}
        />
      </div>
    </div>
  );
}

