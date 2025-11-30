/* eslint-disable @typescript-eslint/no-explicit-any */
import BusinessGrid from "@/app/components/business/BusinessGrid";
import CategoryDetails from "@/app/components/category/CategoryDetails";
import { fetchJson, mockData } from "@/app/lib/api";
import type { BusinessDto, CategoryDto } from "@/app/types/contract";

export const revalidate = 120;

async function getCategory(id: string) {
  const res = await fetchJson<CategoryDto & { businesses?: BusinessDto[] }>(
    `/api/category/${id}`,
    { next: { revalidate: 120 } },
    {
      ...mockData.categories[0],
      businesses: mockData.businesses,
    }
  );
  return { ...res, businesses: res.businesses ?? [] };
}

export default async function CategorySingle({ params }: any) {
  const data = await getCategory(params.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <CategoryDetails category={data} />
      <BusinessGrid businesses={data.businesses} title="Businesses in this category" />
    </div>
  );
}
