import type { ReviewDto } from "@yellows/contract";

export type ReviewWithMeta = ReviewDto & {
  business?: { name?: string } | null;
  user?: { name?: string; avatarUrl?: string | null } | null;
  photos?: { id?: string; url: string }[];
};
