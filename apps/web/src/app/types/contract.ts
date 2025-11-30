export type ReviewDto = {
  id: string;
  rating: number;
  text?: string | null;
  useful: number;
  funny: number;
  cool: number;
  createdAt: string;
  userId: string;
  businessId: string;
  photos: { id?: string; url: string }[];
  ratings: {
    id?: string;
    reviewId?: string;
    categoryId?: string;
    score: number;
    category?: { name?: string } | null;
  }[];
};

export type BusinessDto = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  location: string;
  facebookUrl?: string;
  instagramUrl?: string;
  timetable: string;
  logoUrl?: string | null;
  categoryId: string;
  reviews?: ReviewDto[];
  avgRating?: number;
  reviewCount?: number;
  category?: { name: string } | null;
};

export type CategoryDto = {
  id: string;
  name: string;
  icon?: string;
};
