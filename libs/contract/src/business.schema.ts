import { z } from "zod";

export const BusinessSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  website: z.string().url(),
  location: z.string(),
  facebookUrl: z.string().url().optional(),
  instagramUrl: z.string().url().optional(),
  timetable: z.string().optional(),
  logoUrl: z.string().url().optional(),
  categoryId: z.string(),
});

export type BusinessDTO = z.infer<typeof BusinessSchema>;
