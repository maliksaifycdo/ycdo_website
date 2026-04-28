'use client';

import { useLocale } from '@/contexts/LocaleContext';

export default function Loading() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-[#1A3A8F] border-t-[#C0272D]"
          aria-hidden
        />
        <p className="text-sm text-gray-500">{t('common.loading')}</p>
      </div>
    </div>
  );
}
