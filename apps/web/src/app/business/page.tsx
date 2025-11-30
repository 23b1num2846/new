import { Suspense } from "react";
import BusinessGrid from "../components/business/BusinessGrid";
import { fetchJson, mockData } from "../lib/api";
import type { BusinessDto } from "@yellows/contract";

export const revalidate = 60;

async function getBusinesses() {
  return fetchJson<{ data: BusinessDto[] }>(
    "/api/business",
    { next: { revalidate: 60, tags: ["business-list"] } },
    mockData.businessList
  );
}

async function BusinessSection() {
  const { data } = await getBusinesses();
  return <BusinessGrid businesses={data} title="Featured businesses" />;
}

export default function BusinessPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Business directory</h1>
      <Suspense fallback={<p>Loading businesses...</p>}>
        <BusinessSection />
      </Suspense>
    </div>
  );
}
