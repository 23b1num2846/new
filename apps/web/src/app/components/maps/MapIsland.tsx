/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon bug
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

type Props = {
  location?: string;
  businesses?: {
    id: string;
    name: string;
    location: string;
  }[];
};

function parseLocation(raw?: string): [number, number] | null {
  if (!raw) return null;
  const parts = raw.split(",").map((p) => Number(p.trim()));
  if (parts.length !== 2 || parts.some((n) => Number.isNaN(n))) return null;
  return [parts[0], parts[1]];
}

export default function MapIsland({ location, businesses }: Props) {
  // If single business page:
  if (location && typeof location === "string") {
    const center = parseLocation(location);
    if (!center) return <p>No map data.</p>;

    return (
      <div className="w-full h-[350px] mt-6 rounded-lg overflow-hidden">
        <MapContainer center={center} zoom={15} className="h-full w-full">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>Your Business Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }

  // If search results page:
  if (businesses && businesses.length > 0) {
    const center = parseLocation(businesses[0].location);
    if (!center) return <p>No map data.</p>;

    return (
      <div className="w-full h-[400px] rounded-lg overflow-hidden my-6">
        <MapContainer center={center} zoom={13} className="h-full w-full">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {businesses.map((b) => {
            const coords = parseLocation(b.location);
            if (!coords) return null;
            return (
              <Marker key={b.id} position={coords}>
                <Popup>{b.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    );
  }

  return <p>No map data.</p>;
}
