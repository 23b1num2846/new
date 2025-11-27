
"use client";

import { useEffect, useState } from "react";
import BusinessCard from "../business/BusinessCard";

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

type Category = {
  id: string;
  name: string;
  businesses: Business[];
};

type Props =
  | { id: string; category?: never }
  | { id?: never; category: Category };

export default function CategoryDetails(props: Props) {
  const [data, setData] = useState<Category | null>(props.category ?? null);
  const [loading, setLoading] = useState(!props.category);

  useEffect(() => {
    if (props.category) return;
    const categoryId = props.id;
    if (!categoryId) return;

    fetch(`http://localhost:3333/category/${categoryId}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [props.category, props.id]);

  if (loading || !data) {
    return <div className="animate-pulse h-6 w-1/3 bg-zinc-200 mx-auto mt-10" />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">{data.name}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {data.businesses.map((b) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </div>
    </div>
  );
}
