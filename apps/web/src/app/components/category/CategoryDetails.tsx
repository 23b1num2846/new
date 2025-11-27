/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import BusinessCard from "../business/BusinessCard";

export default function CategoryDetails({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3333/category/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="animate-pulse h-6 w-1/3 bg-zinc-200 mx-auto mt-10" />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">{data.name}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {data.businesses.map((b: any) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </div>
    </div>
  );
}
