import BusinessDetails from "@/app/components/business/BusinessDetails";

export default function BusinessPage({ params }: { params: { id: string } }) {
  return <BusinessDetails id={params.id} />;
}
