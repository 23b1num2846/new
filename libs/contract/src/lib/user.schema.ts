import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type UserDto = z.infer<typeof UserSchema>;
