/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import prisma from "../../plugins/prisma";

export default async function userSingleRoutes(app: FastifyInstance) {
  app.get("/:id", async (req, reply) => {
    const { id } = (req as any).params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { reviews: true },
    });

    if (!user) return reply.code(404).send({ message: "User not found" });

    reply.send(user);
  });
}
