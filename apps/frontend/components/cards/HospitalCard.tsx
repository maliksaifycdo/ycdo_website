import { Building2, Clock, MapPin, Phone } from 'lucide-react';
import { IHospital } from '@ycdo/shared';
import { Button } from '@/components/ui/button';

interface HospitalCardProps {
  hospital: IHospital;
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-6">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-full bg-red-100 p-2 text-primary">
          <Building2 className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-secondary">{hospital.name}</h3>
      </div>

      <div className="space-y-2">
        <p className="flex items-start gap-2 text-sm text-gray-500">
          <MapPin className="mt-0.5 h-4 w-4" />
          <span>{hospital.address}</span>
        </p>
        <a href={`tel:${hospital.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary">
          <Phone className="h-4 w-4" />
          <span>{hospital.phone}</span>
        </a>
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{hospital.timings}</span>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1">
        {hospital.services.map((service) => (
          <span
            key={`${hospital._id}-${service}`}
            className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-secondary"
          >
            {service}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm">Get Directions</Button>
        <Button variant="default" size="sm">Book Appointment</Button>
      </div>
    </article>
  );
}

