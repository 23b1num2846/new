/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import prisma from "../../plugins/prisma";
import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string(),
  password: z.string().min(4),
});

export default async function userCreateRoutes(app: FastifyInstance) {
  app.post("/", async (req, reply) => {
    const body = CreateUserSchema.parse((req as any).body);

    const created = await prisma.user.create({ data: body });

    reply.code(201).send(created);
  });
}
