/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import SearchBar from "@/app/components/layout/SearchBar";
import BusinessGrid from "@/app/components/business/BusinessGrid";
import MapIsland from "@/app/components/maps/MapIsland";
import { fetchJson, mockData } from "@/app/lib/api";
import type { BusinessDto } from "@yellows/contract";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = searchParams?.q ?? "";

  const { data } = await fetchJson<{ data: BusinessDto[] }>(
    `/api/business/search?q=${q}`,
    { cache: "no-store" },
    {
      data: mockData.businesses.filter((biz) =>
        biz.name.toLowerCase().includes(q.toLowerCase())
      ),
    }
  );
  const hasResults = Array.isArray(data) && data.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <SearchBar defaultValue={q} />

      {!hasResults ? (
        <p className="text-center text-sm text-zinc-600">No matching businesses found.</p>
      ) : (
        <>
          <Suspense fallback={<p>Loading results...</p>}>
            <BusinessGrid businesses={data} />
          </Suspense>
          <MapIsland businesses={data} />
        </>
      )}
    </div>
  );
}
