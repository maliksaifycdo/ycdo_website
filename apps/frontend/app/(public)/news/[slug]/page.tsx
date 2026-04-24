import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { INews } from '@ycdo/shared';
import { getServerApiBaseUrl } from '@/lib/server-api';
import { ROUTES } from '@/constants/routes';
import { formatDate } from '@/utils/helpers';

type Props = { params: { slug: string } };

async function fetchArticle(slug: string): Promise<INews | null> {
  const base = getServerApiBaseUrl();
  try {
    const res = await fetch(`${base}/news/${encodeURIComponent(slug)}`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return null;
    return (await res.json()) as INews;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await fetchArticle(params.slug);
  if (!article) {
    return { title: { absolute: 'Article not found | YCDO' } };
  }
  return {
    title: article.title,
    description: article.body.slice(0, 160).replace(/\s+/g, ' ').trim(),
    openGraph: article.thumbnail
      ? { images: [{ url: article.thumbnail, alt: article.title }] }
      : undefined,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const article = await fetchArticle(params.slug);
  if (!article) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 md:px-8">
        <p className="text-lg font-semibold text-[#1A3A8F]">Article not found</p>
        <p className="mt-2 text-gray-500">This story may have been removed or the link is incorrect.</p>
        <Link href={ROUTES.NEWS} className="mt-8 inline-block font-semibold text-[#C0272D] hover:underline">
          ← Back to News
        </Link>
      </main>
    );
  }

  const dateLabel = formatDate(article.publishedAt || article.createdAt);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-12 md:px-8 md:pt-16">
      <Link href={ROUTES.NEWS} className="mb-8 inline-block text-sm font-semibold text-[#1A3A8F] hover:text-[#C0272D]">
        ← Back to News
      </Link>

      <header className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-wide text-[#C0272D]">{article.category}</p>
        <h1 className="text-3xl font-black leading-tight text-[#1A3A8F] md:text-4xl">{article.title}</h1>
        <p className="text-sm text-gray-500">
          By <span className="font-medium text-gray-700">{article.author}</span>
          <span className="mx-2">·</span>
          {dateLabel}
        </p>
      </header>

      {article.thumbnail ? (
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
            priority
            unoptimized
          />
        </div>
      ) : null}

      <div className="mt-10 max-w-none space-y-4 text-base leading-relaxed text-slate-700">
        <p className="whitespace-pre-wrap">{article.body}</p>
      </div>
    </main>
  );
}
