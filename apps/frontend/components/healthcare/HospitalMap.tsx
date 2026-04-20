'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Info, Search } from 'lucide-react';
import { hospitals } from '@/components/healthcare/data';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false }) as any;
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false }) as any;
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false }) as any;
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false }) as any;

export default function HospitalMap() {
  const [search, setSearch] = useState('');

  const filteredHospitals = useMemo(
    () => hospitals.filter((h) => h.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const markerIcon = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const L: typeof import('leaflet') = require('leaflet');
    return L.divIcon({
      className: 'custom-marker',
      html: '<div style="width:18px;height:18px;background:#C0272D;border:3px solid white;border-radius:9999px;box-shadow:0 0 0 2px #C0272D;"></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  }, []);

  return (
    <section className="bg-slate-100 py-24">
      <div className="container mx-auto px-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-4xl font-bold text-[#1A3A8F]">Find a Hospital Near You</h2>
            <p className="mb-8 text-lg text-slate-600">
              Our network spans multiple locations across the city, ensuring that quality healthcare is never more than a few kilometers away.
            </p>
            <div className="mb-8 flex items-center rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
              <Search className="ml-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by area or hospital name..."
                className="w-full border-none bg-transparent px-4 py-3 text-slate-900 focus:ring-0"
              />
              <button className="rounded-lg bg-[#1A3A8F] px-6 py-3 font-bold text-white">Search</button>
            </div>

            <div className="rounded-2xl border-l-8 border-[#1A3A8F] bg-slate-200 p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Info className="h-8 w-8 text-[#1A3A8F]" />
                <div>
                  <h4 className="mb-2 text-xl font-bold text-[#1A3A8F]">Hospital Accessibility</h4>
                  <p className="text-slate-600">
                    All hospitals in our network offer subsidized fees for those in need. Emergency departments operate 24/7 with specialized trauma teams ready to assist at all hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl lg:w-1/2">
            <MapContainer center={[30.1575, 71.5249]} zoom={12} className="h-full w-full z-10">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
              {markerIcon &&
                filteredHospitals.map((hospital) => (
                  <Marker key={hospital.name} position={[hospital.lat, hospital.lng]} icon={markerIcon}>
                    <Popup>
                      <div className="space-y-2">
                        <p className="font-bold text-[#1A3A8F]">{hospital.name}</p>
                        <div className="flex flex-wrap gap-1">
                          {hospital.services.map((service) => (
                            <span key={service} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
