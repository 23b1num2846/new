import Image from "next/image";
import Link from "next/link";
import { Card } from "@/app/components/ui/card";
import type { ReviewWithMeta } from "@/app/types/review";

export default function ReviewCard({ review }: { review: ReviewWithMeta }) {
  const userName = review.user?.name ?? "Нэргүй";
  const businessName = review.business?.name ?? "Бизнес рүү очих";
  const photos = review.photos ?? [];

  return (
    <Card className="p-4 hover:shadow-lg transition bg-white">
      {/* Header */}
      <div className="flex items-center mb-3">
        <div className="ml-3">
          <p className="font-semibold">{userName}</p>
          {review.createdAt && (
            <p className="text-xs text-zinc-500">
              {new Date(review.createdAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Business Title */}
      <Link
        href={`/business/${review.businessId}`}
        className="font-bold text-lg hover:underline"
      >
        {businessName}
      </Link>

      {/* Photo */}
      {photos.length > 0 && photos[0]?.url && (
        <div className="mt-3">
          <Image
            src={photos[0].url}
            width={400}
            height={250}
            alt="Review photo"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Text */}
      {review.text && <p className="mt-3 text-zinc-700 line-clamp-3">{review.text}</p>}

      <div className="flex gap-5 mt-3 text-sm text-zinc-600">
        <span>Тустай {review.useful ?? 0}</span>
        <span>Хошигнол {review.funny ?? 0}</span>
        <span>Дуртай {review.cool ?? 0}</span>
      </div>
    </Card>
  );
}
