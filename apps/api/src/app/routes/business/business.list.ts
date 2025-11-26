/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function businessListRoutes(app: FastifyInstance) {
  app.get("/", async (req) => {
    const biz = await prisma.business.findMany({
      include: {
        category: true,
        reviews: { select: { rating: true } },
      },
      orderBy: { name: "asc" },
    });

    const data = biz.map((b) => {
      const ratings = b.reviews.map((r) => r.rating);
      const avg =
        ratings.length === 0
          ? null
          : ratings.reduce((s, v) => s + v, 0) / ratings.length;

      return {
        ...b,
        avgRating: avg,
        reviewCount: ratings.length,
      };
    });

    return { data };
  });
}
