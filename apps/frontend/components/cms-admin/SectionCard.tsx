import { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';

export default function SectionCard({
  title,
  dragHandleProps,
  onDelete,
  children,
}: PropsWithChildren<{
  title: string;
  dragHandleProps?: Record<string, unknown>;
  onDelete: () => void;
}>) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex cursor-grab items-center rounded-lg bg-slate-50 px-2 py-1 text-slate-600"
            {...(dragHandleProps as object)}
            title="Drag to reorder"
          >
            <GripVertical className="size-4" />
          </span>
          <p className="text-sm font-extrabold text-slate-900">{title}</p>
        </div>
        <Button type="button" variant="ghost" size="icon-sm" onClick={onDelete} aria-label="Delete section">
          <Trash2 className="size-4 text-[#C0272D]" />
        </Button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

