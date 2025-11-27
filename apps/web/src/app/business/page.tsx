import BusinessGrid from "../components/business/BusinessGrid";

export const dynamic = "force-dynamic";

async function getBusinesses() {
  try {
    const res = await fetch("http://localhost:3333/api/business", {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.warn("Failed to fetch businesses during build/runtime", err);
    return { data: [] };
  }
}

export default async function BusinessPage() {
  const { data } = await getBusinesses();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Бизнесүүд</h1>
      <BusinessGrid businesses={data} title="Бизнесүүд" />
    </div>
  );
}
