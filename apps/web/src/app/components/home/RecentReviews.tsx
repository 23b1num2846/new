"use client";

import { useCallback, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { fetchJson, mockData } from "@/app/lib/api";

type Review = {
  id: string;
  createdAt: string;
  text?: string | null;
  useful: number;
  funny: number;
  cool: number;
  businessId: string;
  business?: { name: string } | null;
  user?: { name: string; avatarUrl?: string | null } | null;
  photos?: { id?: string; url: string }[];
};

type Props = {
  businessId?: string;
  initialReviews?: Review[];
};

export default function RecentReviews({ businessId, initialReviews = [] }: Props) {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (loading || isEnd) return;

    setLoading(true);

    try {
      const url = businessId
        ? `/api/review/business/${businessId}?page=${page}&limit=12`
        : `/api/reviews/list?page=${page}&limit=12`;

      const res = await fetchJson<{ data: Review[] }>(url, undefined, { data: mockData.reviews });
      const newReviews = res?.data ?? [];

      if (newReviews.length === 0) {
        setIsEnd(true);
      } else {
        setReviews((prev) => {
          const combined = [...prev, ...newReviews];
          const seen = new Set<string>();
          return combined.filter((r) => {
            if (!r?.id) return false;
            if (seen.has(r.id)) return false;
            seen.add(r.id);
            return true;
          });
        });
      }
    } catch (err) {
      console.error("Failed to load reviews", err);
    }

    setLoading(false);
  }, [businessId, page, isEnd, loading]);

  useEffect(() => {
    setReviews(initialReviews);
    setPage(1);
    setIsEnd(false);
    setLoading(false);
  }, [businessId, initialReviews]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <section className="max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-2xl text-center font-semibold mb-6">Recent reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <ReviewCard key={rev.id} review={rev} />
        ))}

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

      {!isEnd && (
        <div className="flex justify-center mt-8">
          <Button onClick={() => setPage((p) => p + 1)} disabled={loading} className="px-6">
            {loading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}

      {isEnd && (
        <p className="text-center text-sm text-gray-500 mt-6">No more reviews.</p>
      )}
    </section>
  );
}
