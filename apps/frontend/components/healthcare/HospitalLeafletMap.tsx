'use client';

import { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import type * as Leaflet from 'leaflet';
import { hospitals } from '@/components/healthcare/data';
import 'leaflet/dist/leaflet.css';

export default function HospitalLeafletMap({ search }: { search: string }) {
  const filteredHospitals = useMemo(
    () => hospitals.filter((h) => h.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const markerIcon = useMemo(() => {
    const L: typeof Leaflet = require('leaflet');
    return L.divIcon({
      className: 'custom-marker',
      html: '<div style="width:18px;height:18px;background:#C0272D;border:3px solid white;border-radius:9999px;box-shadow:0 0 0 2px #C0272D;"></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  }, []);

  return (
    <MapContainer center={[30.1575, 71.5249]} zoom={12} className="z-10 h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {filteredHospitals.map((hospital) => (
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
  );
}
