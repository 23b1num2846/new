import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export type CategoryDTO = z.infer<typeof CategorySchema>;
