'use client';

import { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import type * as Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CENTER: [number, number] = [30.165, 71.485];
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${CENTER[0]},${CENTER[1]}`;

export default function ContactLeafletMap() {
  const markerIcon = useMemo(() => {
    const L: typeof Leaflet = require('leaflet');
    return L.divIcon({
      className: 'contact-hq-marker',
      html: '<div style="width:20px;height:20px;background:#1A7A3C;border:3px solid white;border-radius:9999px;box-shadow:0 0 0 2px #1A7A3C;"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  }, []);

  return (
    <MapContainer center={CENTER} zoom={14} className="z-[400] h-full w-full" scrollWheelZoom>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={CENTER} icon={markerIcon}>
        <Popup>
          <div className="min-w-[200px] rounded-lg bg-white p-3 text-center shadow-lg">
            <p className="font-bold text-[#00236f]">YCDO Head Office</p>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-xs font-semibold text-[#1A3A8F] underline"
            >
              Open in Google Maps
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
