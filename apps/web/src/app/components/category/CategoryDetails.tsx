"use client";

import { useEffect, useState } from "react";
import BusinessCard from "../business/BusinessCard";
import type { BusinessDto, CategoryDto } from "@yellows/contract";
import { fetchJson, mockData } from "@/app/lib/api";

type Props =
  | { id: string; category?: never }
  | { id?: never; category: CategoryDto & { businesses: BusinessDto[] } };

export default function CategoryDetails(props: Props) {
  const [data, setData] = useState<(CategoryDto & { businesses: BusinessDto[] }) | null>(
    props.category ?? null
  );
  const [loading, setLoading] = useState(!props.category);

  useEffect(() => {
    if (props.category) return;
    const categoryId = props.id;
    if (!categoryId) return;

    fetchJson<CategoryDto & { businesses: BusinessDto[] }>(
      `/api/category/${categoryId}`,
      undefined,
      { ...mockData.categories[0], businesses: mockData.businesses }
    )
      .then((d) => setData(d))
      .finally(() => setLoading(false));
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
