import Image from 'next/image';
import { INews } from '@ycdo/shared';
import { Badge } from '@/components/ui/badge';
import { formatDate, truncateText } from '@/utils/helpers';

interface NewsCardProps {
  news: INews;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 w-full">
        {news.thumbnail ? (
          <Image
            src={news.thumbnail}
            alt={news.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={80}
            loading="lazy"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-secondary to-primary" />
        )}

        <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
          {formatDate(news.publishedAt)}
        </div>
      </div>

      <div className="p-5">
        <Badge className="mb-3 bg-blue-100 capitalize text-blue-700">
          {news.category}
        </Badge>
        <h3 className="line-clamp-2 text-lg font-bold text-secondary">{news.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-gray-500">{truncateText(news.body, 140)}</p>
        <button className="mt-4 text-sm font-medium text-primary">Read More ?</button>
      </div>
    </article>
  );
}

