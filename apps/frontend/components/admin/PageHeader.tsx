'use client';

import type { LucideIcon } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: LucideIcon;
};

export default function PageHeader({ title, subtitle, actionLabel, onAction, actionIcon: ActionIcon }: Props) {
  const Icon = ActionIcon ?? Plus;
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-[#1A3A8F]">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-gray-500">{subtitle}</p> : null}
      </div>
      {actionLabel && onAction ? (
        <Button
          type="button"
          onClick={onAction}
          className="shrink-0 gap-2 bg-[#C0272D] font-semibold text-white hover:bg-[#9B1B20]"
        >
          <Icon className="size-4" />
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
