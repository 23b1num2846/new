"use client";

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
  const coords = location ? parseLocation(location) : null;

  if (coords) {
    return (
      <div className="w-full rounded-lg border p-4 text-sm text-zinc-700">
        Map placeholder: [{coords[0]}, {coords[1]}]
      </div>
    );
  }

  if (businesses && businesses.length > 0) {
    return (
      <div className="w-full rounded-lg border p-4 text-sm text-zinc-700 space-y-2">
        <div className="font-semibold">Locations</div>
        {businesses.map((b) => (
          <div key={b.id}>{b.name}: {b.location || "N/A"}</div>
        ))}
      </div>
    );
  }

  return <p>No map data.</p>;
}
