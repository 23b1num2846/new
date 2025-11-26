import { z } from "zod";

export const ReviewSchema = z.object({
  post: z.string().min(1),
  score: z.number().int().min(1).max(5),
  userId: z.string().min(1),
  businessId: z.string().min(1),
});

export type ReviewDTO = z.infer<typeof ReviewSchema>;
