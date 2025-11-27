"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";


type Review = {
  id: string;
  createdAt: string;
  text?: string | null;
  useful: number;
  funny: number;
  cool: number;
  businessId: string;
  business: { name: string };
  user: { name: string; avatarUrl?: string | null };
  photos: { url: string }[];
};

export default function RecentReviews() {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false); 

  const fetchReviews = async () => {
    if (loading || isEnd) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3333/api/reviews/list?page=${page}&limit=12`
      );

      const data = await res.json();

      const newReviews = data?.data ?? [];

      if (newReviews.length === 0) {
        setIsEnd(true);
      } else {
        setReviews((prev) => [...prev, ...newReviews]);
      }
    } catch (err) {
      console.error("Failed to load reviews", err);
    }

    setLoading(false);
  };

  // Fetch on page change
  useEffect(() => {
    fetchReviews();
  }, [page]);

  return (
    <section className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-2xl text-center font-semibold mb-6">
        Recent Activity
      </h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <ReviewCard key={rev.id} review={rev} />
        ))}

        {/* Skeleton Loading */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-xl">
              <Skeleton className="h-4 w-32 mb-3" />
              <Skeleton className="h-4 w-24 mb-5" />
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
      </div>

      {/* Load More Button */}
      {!isEnd && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
            className="px-6"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* No More Reviews */}
      {isEnd && (
        <p className="text-center text-sm text-gray-500 mt-6">
          🎉 You’ve reached the end!
        </p>
      )}
    </section>
  );
}
