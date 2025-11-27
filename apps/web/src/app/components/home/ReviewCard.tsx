/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/app/components/ui/card";

export default function ReviewCard({ review }: { review: any }) {
  return (
    <Card className="p-4 hover:shadow-lg transition bg-white">
      {/* Header */}
      <div className="flex items-center mb-3">
        
        <div className="ml-3">
          <p className="font-semibold">{review.user.name}</p>
          <p className="text-xs text-zinc-500">{new Date(review.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Business Title */}
      <Link href={`/business/${review.businessId}`} className="font-bold text-lg hover:underline">
        {review.business.name}
      </Link>

      {/* Photo */}
      {review.photos.length > 0 && (
        <div className="mt-3">
          <Image
            src={review.photos[0].url}
            width={400}
            height={250}
            alt="Review photo"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Text */}
      <p className="mt-3 text-zinc-700 line-clamp-3">{review.text}</p>

      <div className="flex gap-5 mt-3 text-sm text-zinc-600">
        <span>👍 {review.useful}</span>
        <span>😂 {review.funny}</span>
        <span>😎 {review.cool}</span>
      </div>
    </Card>
  );
}
