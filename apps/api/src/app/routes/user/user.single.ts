/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function userSingleRoutes(app: FastifyInstance) {
  app.get("/:id", async (req, reply) => {
    const { id } = (req as any).params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { reviews: true },
    });

    if (!user) return reply.code(404).send({ message: "User not found" });

    return user;
  });
}
