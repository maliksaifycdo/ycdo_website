'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-3xl font-black text-[#1A3A8F]">{t('error.title')}</h2>
        <p className="mb-8 text-gray-500">{t('error.description')}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button type="button" onClick={reset} className="btn-primary">
            {t('error.tryAgain')}
          </button>
          <Link href="/" className="btn-outline">
            {t('error.goHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
