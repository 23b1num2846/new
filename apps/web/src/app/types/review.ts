import type { ReviewDto } from "@/app/types/contract";

export type ReviewWithMeta = ReviewDto & {
  business?: { name?: string } | null;
  user?: { name?: string; avatarUrl?: string | null } | null;
  photos?: { id?: string; url: string }[];
};
