/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
// import MapIsland from "@/components/maps/MapIsland";
import ReviewCard from "../home/ReviewCard";
import Image from "next/image";

export default function BusinessDetails({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3333/business/${id}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10">
        <div className="animate-pulse h-10 bg-zinc-200 w-1/3 mb-4"></div>
        <div className="animate-pulse h-64 bg-zinc-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-3">{data.name}</h1>

      <div className="rounded-lg overflow-hidden mb-6">
        <Image src={data.logoUrl} width={1200} height={600} alt={data.name} />
      </div>

      <p className="text-zinc-700 mb-6">{data.description}</p>

      {/* Map
      <div className="mt-10 mb-6">
        <MapIsland location={data.location} />
      </div> */}

      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {data.reviews.map((r: any) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
}
