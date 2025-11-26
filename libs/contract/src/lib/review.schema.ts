import { z } from "zod";

export const ReviewCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().optional(),
  order: z.number(),
});

export type ReviewCategoryDto = z.infer<typeof ReviewCategorySchema>;


export const ReviewRatingSchema = z.object({
  id: z.string(),
  reviewId: z.string(),
  categoryId: z.string(),
  score: z.number().min(1).max(5),
  category: ReviewCategorySchema.optional(), // expand when included
});

export type ReviewRatingDto = z.infer<typeof ReviewRatingSchema>;

export const ReviewPhotoSchema = z.object({
  id: z.string(),
  url: z.string(),
});

export type ReviewPhotoDto = z.infer<typeof ReviewPhotoSchema>;

export const ReviewSchema = z.object({
  id: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string().nullable().optional(),
  useful: z.number(),
  funny: z.number(),
  cool: z.number(),
  createdAt: z.string(),

  userId: z.string(),
  businessId: z.string(),

  photos: z.array(ReviewPhotoSchema).default([]),
  ratings: z.array(ReviewRatingSchema).default([]),
});

export type ReviewDto = z.infer<typeof ReviewSchema>;


export const CreateReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z.string().nullish(),

  userId: z.string(),
  businessId: z.string(),

  photos: z.array(z.string()).default([]), // only URL strings from FE
  ratings: z.array(
    z.object({
      categoryId: z.string(),
      score: z.number().min(1).max(5),
    })
  ),
});

export type CreateReviewRequest = z.infer<typeof CreateReviewSchema>;

