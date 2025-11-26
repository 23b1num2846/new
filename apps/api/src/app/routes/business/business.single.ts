/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function businessSingleRoutes(app: FastifyInstance) {
  app.get("/:id", async (req, reply) => {
    const { id } = (req as any).params;

    const business = await prisma.business.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          include: {
            user: true,
            photos: true,
            ratings: { include: { category: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!business) return reply.code(404).send({ message: "Business not found" });

    const ratings = business.reviews.map((r) => r.rating);
    const avg =
      ratings.length === 0
        ? null
        : ratings.reduce((s, v) => s + v, 0) / ratings.length;

    return {
      ...business,
      avgRating: avg,
      reviewCount: ratings.length,
    };
  });
}
