/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import SearchBar from "@/app/components/layout/SearchBar";
import BusinessGrid from "@/app/components/business/BusinessGrid";
import MapIsland from "@/app/components/maps/MapIsland";

export const dynamic = "force-dynamic"; 

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = searchParams?.q ?? "";

  const res = await fetch(
    `http://localhost:3333/api/business/search?q=${q}`,
    { cache: "no-store" }
  );

  const { data } = await res.json();
  const hasResults = Array.isArray(data) && data.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <SearchBar defaultValue={q} />

      {!hasResults ? (
        <p className="text-center text-sm text-zinc-600">Илэрц олдсонгүй.</p>
      ) : (
        <>
          <Suspense fallback={<p>Ачаалж байна...</p>}>
            <BusinessGrid businesses={data} />
          </Suspense>
          <MapIsland businesses={data} />
        </>
      )}
    </div>
  );
}
