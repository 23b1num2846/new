import CategoryDetails from "../../components/category/CategoryDetails";

export default function CategoryPage({ params }: { params: { id: string } }) {
  return <CategoryDetails id={params.id} />;
}
