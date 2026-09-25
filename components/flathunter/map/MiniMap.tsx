"use client";

import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L from "leaflet";

const pinIcon = L.divIcon({
  className: "",
  html: `<svg width="26" height="30" viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 2px 3px rgba(11,18,32,0.35))">
    <path d="M24 2C13.5 2 5 10.5 5 21c0 14.5 19 31 19 31s19-16.5 19-31C43 10.5 34.5 2 24 2z" fill="#1E4DD8"/>
    <path d="M24 12L35 22H13L24 12Z" fill="#FFFFFF"/>
    <rect x="16" y="22" width="16" height="11" fill="#FFFFFF"/>
    <rect x="21" y="26" width="6" height="7" fill="#1E4DD8"/>
  </svg>`,
  iconSize: [26, 30],
  iconAnchor: [13, 29],
});

interface MiniMapProps {
  center: [number, number];
  radiusKm: number;
}

/** Read-only preview map — no drag/zoom/click, just shows the pin + radius. */
export default function MiniMap({ center, radiusKm }: MiniMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={12}
      className="h-full w-full"
      dragging={false}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle
        center={center}
        radius={radiusKm * 1000}
        pathOptions={{ color: "#1E4DD8", weight: 1.5, fillColor: "#1E4DD8", fillOpacity: 0.14 }}
      />
      <Marker position={center} icon={pinIcon} />
    </MapContainer>
  );
}
