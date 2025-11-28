import { Suspense } from "react";
import BusinessGrid from "../components/business/BusinessGrid";

export const revalidate = 60;

async function getBusinesses() {
  try {
    const res = await fetch("http://localhost:3333/api/business", {
      next: { revalidate: 60, tags: ["business-list"] },
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Failed to load businesses", error);
    return { data: [] };
  }
}

async function BusinessSection() {
  const { data } = await getBusinesses();
  return <BusinessGrid businesses={data} title="Бизнесүүд" />;
}

export default function BusinessPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Бизнесүүд</h1>
      <Suspense fallback={<p>Ачаалж байна...</p>}>
        <BusinessSection />
      </Suspense>
    </div>
  );
}
