import type { Metadata } from 'next';
import FeaturedArticle from '@/components/news/FeaturedArticle';
import ArticlesGrid from '@/components/news/ArticlesGrid';
import NewsSidebar from '@/components/news/NewsSidebar';
import EventsSection from '@/components/news/EventsSection';

export const metadata: Metadata = {
  title: 'News & Events | YCDO – Serve Humanity',
  description:
    'Latest news, field updates, and upcoming events from YCDO humanitarian missions across Pakistan.',
};

export default function NewsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-24 pb-20 md:px-12">
      <FeaturedArticle />
      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-10">
        <div className="lg:col-span-7">
          <ArticlesGrid />
        </div>
        <aside className="lg:col-span-3">
          <NewsSidebar />
        </aside>
      </div>
      <EventsSection />
    </main>
  );
}
