"use client";

import Image from "next/image";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import Link from "next/link";

type BusinessCardProps = {
  business: {
    id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    timetable: string;
    logoUrl?: string | null;
    avgRating?: number;
    reviewCount?: number;
    category?: { name: string } | null;
  };
};

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link
      href={`/business/${business.id}`}
      className="block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all border border-zinc-100"
    >
      <div className="relative h-56 w-full">
        <Image
          src={business.logoUrl || "/placeholder.jpg"}
          alt={business.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          ҮНЭ
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-zinc-900">
            {business.name}
          </h3>

          {business.category?.name && (
            <span className="text-xs bg-zinc-100 px-3 py-1 rounded-full text-zinc-600">
              {business.category.name}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(business.avgRating || 0)
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-300"
              }`}
            />
          ))}
          <span className="ml-1 text-sm font-medium">
            {business.avgRating?.toFixed(1) || "0.0"}
          </span>
          <span className="text-xs text-zinc-500">
            ({business.reviewCount ?? 0} сэтгэгдэл)
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-600 mt-2 line-clamp-2">
          {business.description}
        </p>

        {/* Info */}
        <div className="mt-4 space-y-2 text-sm text-zinc-700">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-zinc-500" />
            {business.address}
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-zinc-500" />
            {business.phone}
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-zinc-500" />
            {business.timetable}
          </div>
        </div>
      </div>
    </Link>
  );
}
