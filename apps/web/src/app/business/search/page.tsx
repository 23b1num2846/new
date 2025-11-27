/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/app/components/layout/SearchBar";
import BusinessGrid from "@/app/components/business/BusinessGrid";
import MapIsland from "@/app/components/maps/MapIsland";

export const dynamic = "force-dynamic"; // SSR

export default async function SearchPage({ searchParams }: any) {
  const q = searchParams.q ?? "";

  const res = await fetch(
    `http://localhost:3333/api/business/search?q=${q}`,
    { cache: "no-store" }
  );

  const { data } = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <SearchBar defaultValue={q} onSearch={() => {}} />
      <BusinessGrid businesses={data} />
      <MapIsland businesses={data} />
    </div>
  );
}
