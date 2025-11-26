/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import { CreateCategorySchema } from "@yellows/contract";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function categoryCreateRoutes(app: FastifyInstance) {
  app.post("/", async (req, reply) => {
    const body = CreateCategorySchema.parse((req as any).body);

    const created = await prisma.category.create({ data: body });

    reply.code(201).send(created);
  });
}
