import { MapPin } from 'lucide-react';
import { IEvent } from '@ycdo/shared';
import { formatDate } from '@/utils/helpers';

interface EventCardProps {
  event: IEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('en-PK', { month: 'short' });

  return (
    <article className="flex overflow-hidden rounded-xl bg-white shadow-md">
      <div className="flex min-w-[80px] flex-col items-center justify-center rounded-l-xl bg-primary p-4 text-center text-white">
        <span className="text-2xl font-bold leading-none">{day}</span>
        <span className="mt-1 text-xs uppercase tracking-wide">{month}</span>
      </div>

      <div className="flex-1 p-4">
        <h3 className="text-lg font-bold text-secondary">{event.title}</h3>
        <p className="mt-1 text-xs text-gray-400">{formatDate(event.date)}</p>

        <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </p>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">{event.description}</p>
        <button className="mt-3 text-sm font-medium text-primary">Learn More ?</button>
      </div>
    </article>
  );
}

