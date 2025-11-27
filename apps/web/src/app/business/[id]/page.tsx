/* eslint-disable @typescript-eslint/no-explicit-any */
import BusinessDetails from "@/app/components/business/BusinessDetails";
import ReviewsSection from "@/app/components/home/RecentReviews";
import MapIsland from "@/app/components/maps/MapIsland";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0; 

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:3333/api/business", {
      next: { revalidate: 3600 },
    });
    const { data } = await res.json();
    return data.map((b: any) => ({ id: b.id }));
  } catch (err) {
    console.warn("generateStaticParams failed, skipping prerender", err);
    return [];
  }
}

export default async function BusinessSingle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const biz = await fetch(`http://localhost:3333/api/business/${id}`, {
    cache: "no-store",
  }).then((r) => r.json());

  if (!biz || !biz.id) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-red-500">Бизнес олдсонгүй.</p>
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
