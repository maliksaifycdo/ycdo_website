import Link from 'next/link';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

const upcomingEvents = [
  {
    day: '22',
    month: 'Jun',
    title: 'Community Resilience Seminar',
    location: 'Serena Hotel, Islamabad',
    time: '09:00 AM - 04:00 PM',
    cta: 'Register Now',
    ctaStyle: 'filled',
  },
  {
    day: '05',
    month: 'Jul',
    title: 'Youth Vocational Workshop',
    location: 'YCDO Training Hub, Lahore',
    time: '11:00 AM - 03:00 PM',
    cta: 'Learn More',
    ctaStyle: 'outlined',
  },
  {
    day: '14',
    month: 'Aug',
    title: 'Independence Day Charity Run',
    location: 'F-9 Park, Islamabad',
    time: '06:00 AM onwards',
    cta: 'Register Now',
    ctaStyle: 'filled',
  },
];

export default function EventsSection() {
  return (
    <section className="mt-24 border-t-2 border-slate-200/60 pt-24">
      <div className="mb-12 flex flex-col items-end justify-between md:flex-row">
        <div>
          <h2 className="mb-2 text-4xl font-black tracking-tight text-slate-900">Upcoming Events</h2>
          <p className="max-w-md text-slate-600">Join us in the field or online. Your presence helps amplify our mission&apos;s reach across the country.</p>
        </div>
        <Link href={ROUTES.NEWS} className="hidden items-center space-x-2 text-sm font-black uppercase tracking-widest text-[#1A3A8F] hover:underline md:flex">
          <span>View Calendar</span>
          <CalendarDays className="h-5 w-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {upcomingEvents.map((event) => (
          <article key={event.title} className="group relative rounded-xl bg-white p-6 pt-12 shadow-sm">
            <div className="absolute -top-6 left-6 rounded-lg bg-[#C0272D] px-4 py-3 text-center text-white shadow-lg transition-transform group-hover:-translate-y-1">
              <span className="block text-2xl font-black leading-none">{event.day}</span>
              <span className="block text-xs font-bold uppercase">{event.month}</span>
            </div>
            <div className="mt-4">
              <h4 className="mb-4 text-xl font-bold">{event.title}</h4>
              <div className="mb-8 space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="mr-2 h-[18px] w-[18px]" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="mr-2 h-[18px] w-[18px]" />
                  <span>{event.time}</span>
                </div>
              </div>
              <button
                className={`w-full rounded-lg px-6 py-3 font-bold transition-all ${
                  event.ctaStyle === 'filled'
                    ? 'bg-[#1A3A8F] text-white hover:bg-[#0F1F5C]'
                    : 'border-2 border-[#1A3A8F] text-[#1A3A8F] hover:bg-[#1A3A8F] hover:text-white'
                }`}
              >
                {event.cta}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

