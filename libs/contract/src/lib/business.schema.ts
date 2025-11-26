import { z } from "zod";
import { ReviewSchema } from "../lib/review.schema.js";

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  website: z.string(),
  location: z.string(),
  facebookUrl: z.string(),
  instagramUrl: z.string(),
  timetable: z.string(),
  logoUrl: z.string().nullable().optional(),

  categoryId: z.string(),

  reviews: z.array(ReviewSchema).optional(),
});

export type BusinessDto = z.infer<typeof BusinessSchema>;

export const CreateBusinessSchema = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  website: z.string(),
  location: z.string(),
  facebookUrl: z.string(),
  instagramUrl: z.string(),
  timetable: z.string(),
  logoUrl: z.string().nullish(),
  categoryId: z.string(),
});

export type CreateBusinessRequest = z.infer<typeof CreateBusinessSchema>;

