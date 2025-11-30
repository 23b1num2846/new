"use client";

import { useEffect, useState } from "react";
import ReviewCard from "../home/ReviewCard";
import Image from "next/image";
import type { BusinessDto, ReviewDto } from "@yellows/contract";
import { fetchJson, pickBusiness } from "@/app/lib/api";

type Props =
  | { id: string; business?: never }
  | { id?: never; business: BusinessDto };

export default function BusinessDetails(props: Props) {
  const [data, setData] = useState<(BusinessDto & { reviews?: ReviewDto[] }) | null>(
    props.business ?? null
  );
  const [loading, setLoading] = useState(!props.business);

  useEffect(() => {
    if (props.business) return;
    const bizId = props.id;
    if (!bizId) return;

    fetchJson<BusinessDto | null>(`/api/business/${bizId}`, undefined, pickBusiness(bizId) ?? null)
      .then((biz) => setData(biz))
      .catch((err) => {
        console.error("Failed to load business", err);
      })
      .finally(() => setLoading(false));
  }, [props.business, props.id]);

  if (loading || !data) {
    return (
      <div className="max-w-6xl mx-auto mt-10">
        <div className="animate-pulse h-10 bg-zinc-200 w-1/3 mb-4"></div>
        <div className="animate-pulse h-64 bg-zinc-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-3">{data.name}</h1>

      <div className="rounded-lg overflow-hidden mb-6">
        <Image
          src={data.logoUrl || "/placeholder.jpg"}
          width={1200}
          height={600}
          alt={data.name}
        />
      </div>

      <p className="text-zinc-700 mb-6">{data.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Recent reviews</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {(data.reviews ?? []).map((r) => (
          <ReviewCard key={r.id} review={r as any} />
        ))}
      </div>
    </div>
  );
}
