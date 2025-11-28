
"use client";

import { useEffect, useState } from "react";
import BusinessCard from "./BusinessCard";

type Business = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  timetable: string;
  logoUrl?: string | null;
  avgRating?: number;
  reviewCount?: number;
  category?: { name: string } | null;
};

type Props = {
  businesses?: Business[];
  title?: string;
  emptyMessage?: string;
};

export default function BusinessGrid({
  businesses: initial,
  title = "Шилдэг бизнесүүд",
  emptyMessage = "Бизнес олдсонгүй.",
}: Props) {
  const [businesses, setBusinesses] = useState<Business[]>(initial ?? []);
  const [loading, setLoading] = useState(!initial);

  useEffect(() => {
    if (initial && initial.length > 0) return;

    async function load() {
      try {
        const res = await fetch("http://127.0.0.1:3333/api/business");
        const json = await res.json();
        setBusinesses(json.data ?? []);
      } catch (err) {
        console.error("Failed to load businesses", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [initial]);

  if (loading) return <div>Уншиж байна...</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {businesses.length === 0 ? (
        <p className="text-sm text-zinc-600">{emptyMessage}</p>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {businesses.map((b) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </div>
      )}
    </section>
  );
}
