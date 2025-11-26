import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  password: z.string().min(6),
});

export type UserDTO = z.infer<typeof UserSchema>;
