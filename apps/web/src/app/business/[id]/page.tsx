import BusinessDetails from "@/app/components/business/BusinessDetails";
import ReviewsSection from "@/app/components/home/RecentReviews";
import MapIsland from "@/app/components/maps/MapIsland";
import { Suspense } from "react";
import { fetchJson, mockData, pickBusiness } from "@/app/lib/api";
import type { BusinessDto } from "@/app/types/contract";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const { data } = await fetchJson<{ data: BusinessDto[] }>(
      "/api/business",
      { next: { revalidate: 3600 } },
      mockData.businessList
    );
    return data.map((b) => ({ id: b.id }));
  } catch (err) {
    console.warn("Failed to pre-render business detail paths", err);
    return [];
  }
}

export default async function BusinessSingle({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = await Promise.resolve(params);
  const fallback = pickBusiness(id);
  const biz = await fetchJson<BusinessDto | null>(
    `/api/business/${id}`,
    { next: { tags: [`business-${id}`] } },
    fallback ?? null
  );

  if (!biz || !biz.id) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-red-500">Business not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <BusinessDetails business={biz} />

      <Suspense fallback={<p>Loading reviews...</p>}>
        <ReviewsSection businessId={biz.id} initialReviews={biz.reviews ?? []} />
      </Suspense>

      <MapIsland location={biz.location} />
    </div>
  );
}
