"use client";

import { useEffect, useState } from "react";
import { IoRestaurant } from "react-icons/io5";
import { Card } from "@/app/components/ui/card";
import type { CategoryDto } from "@yellows/contract";
import { fetchJson, mockData } from "@/app/lib/api";

export default function CategoryGrid() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  useEffect(() => {
    fetchJson<{ data: CategoryDto[] }>("/api/category", undefined, mockData.categoryList)
      .then((res) => setCategories(res.data ?? []))
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  return (
    <section className="py-16 bg-zinc-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-8">Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((c) => {
            return (
              <Card
                key={c.id}
                className="p-6 flex flex-col items-center gap-3 cursor-pointer hover:shadow-lg transition"
              >
                <IoRestaurant className="h-10 w-10" />
                <span className="font-medium text-zinc-700">{c.name}</span>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
