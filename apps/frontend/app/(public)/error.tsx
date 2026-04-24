'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-3xl font-black text-[#1A3A8F]">Something went wrong</h2>
        <p className="mb-8 text-gray-500">An error occurred. Please try again.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button type="button" onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-outline">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
