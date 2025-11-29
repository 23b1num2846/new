/* eslint-disable @typescript-eslint/no-explicit-any */
import BusinessDetails from "@/app/components/business/BusinessDetails";
import ReviewsSection from "@/app/components/home/RecentReviews";
import MapIsland from "@/app/components/maps/MapIsland";
import { Suspense } from "react";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:3333/api/business", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const { data } = await res.json();
    return data.map((b: any) => ({ id: b.id }));
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
  let biz: any;

  try {
    const res = await fetch(`http://localhost:3333/api/business/${id}`, {
      next: { tags: [`business-${id}`] },
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    biz = await res.json();
  } catch (error) {
    console.error(`Failed to load business ${id}`, error);
  }

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

      <Suspense fallback={<p>Сэтгэгдэл ачаалж байна...</p>}>
      
        <ReviewsSection businessId={biz.id} initialReviews={biz.reviews ?? []} />
      </Suspense>

      <MapIsland location={biz.location} />
    </div>
  );
}
