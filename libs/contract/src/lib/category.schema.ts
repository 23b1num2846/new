import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().optional(), 
});

export type CategoryDto = z.infer<typeof CategorySchema>;



export const CreateCategorySchema = z.object({
  name: z.string(),
});

export type CreateCategoryRequest = z.infer<typeof CreateCategorySchema>;
