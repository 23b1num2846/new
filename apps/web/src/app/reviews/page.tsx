import RecentReviews from "@/app/components/home/RecentReviews";

export const dynamic = "force-dynamic";

export default function ReviewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">All Reviews</h1>
      <RecentReviews />
    </div>
  );
}
