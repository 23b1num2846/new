/* eslint-disable @typescript-eslint/no-explicit-any */
import BusinessGrid from "@/app/components/business/BusinessGrid";
import CategoryDetails from "@/app/components/category/CategoryDetails";

export const revalidate = 120;

async function getCategory(id: string) {
  return fetch(`http://localhost:3333/api/category/${id}`, {
    next: { revalidate: 120 },
  }).then((r) => r.json());
}

export default async function CategorySingle({ params }: any) {
  const data = await getCategory(params.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <CategoryDetails category={data} />
      <BusinessGrid businesses={data.businesses} title="Энэ ангиллын бизнесүүд" />
    </div>
  );
}
