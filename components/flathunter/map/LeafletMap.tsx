"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

const pinIcon = L.divIcon({
  className: "",
  html: `<svg width="36" height="42" viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 3px 4px rgba(11,18,32,0.35))">
    <path d="M24 2C13.5 2 5 10.5 5 21c0 14.5 19 31 19 31s19-16.5 19-31C43 10.5 34.5 2 24 2z" fill="#1E4DD8"/>
    <path d="M24 12L35 22H13L24 12Z" fill="#FFFFFF"/>
    <rect x="16" y="22" width="16" height="11" fill="#FFFFFF"/>
    <rect x="21" y="26" width="6" height="7" fill="#1E4DD8"/>
  </svg>`,
  iconSize: [36, 42],
  iconAnchor: [18, 40],
});

interface LeafletMapProps {
  initialCenter: [number, number];
  zoom: number;
  pin: [number, number];
  radiusKm: number;
  onPinMove: (lat: number, lng: number) => void;
  flyTo: [number, number] | null;
}

/** Imperatively pans the map when `position` changes; MapContainer's own
 *  `center` prop only applies once, at mount. */
function FlyToController({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, Math.max(map.getZoom(), 14), { duration: 0.8 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);
  return null;
}

function ClickToMove({ onPinMove }: { onPinMove: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPinMove(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LeafletMap({
  initialCenter,
  zoom,
  pin,
  radiusKm,
  onPinMove,
  flyTo,
}: LeafletMapProps) {
  const markerRef = useRef<L.Marker | null>(null);

  return (
    <MapContainer
      center={initialCenter}
      zoom={zoom}
      scrollWheelZoom
      className="h-full w-full"
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={pin}
        radius={radiusKm * 1000}
        pathOptions={{ color: "#1E4DD8", weight: 1.5, fillColor: "#1E4DD8", fillOpacity: 0.14 }}
      />
      <Marker
        position={pin}
        icon={pinIcon}
        draggable
        ref={markerRef}
        eventHandlers={{
          dragend: () => {
            const marker = markerRef.current;
            if (!marker) return;
            const pos = marker.getLatLng();
            onPinMove(pos.lat, pos.lng);
          },
        }}
      />
      <ClickToMove onPinMove={onPinMove} />
      <FlyToController position={flyTo} />
    </MapContainer>
  );
}
