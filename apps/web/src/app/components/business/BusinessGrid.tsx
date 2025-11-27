/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import BusinessCard from "./BusinessCard";

export default function BusinessGrid() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("http://127.0.0.1:3333/api/business");
      const json = await res.json();
      console.log("Loaded businesses: ", json);

      setBusinesses(json.data ?? []);
    } catch (err) {
      console.error("Failed to load businesses", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Top Businesses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {businesses.map((b) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </div>
    </section>
  );
}
