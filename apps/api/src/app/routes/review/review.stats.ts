/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function reviewStatsRoutes(app: FastifyInstance) {
  app.get("/stats/:businessId", async (req) => {
    const { businessId } = (req as any).params;

    const [overall, ratingGroups] = await Promise.all([
      prisma.review.aggregate({
        where: { businessId },
        _avg: { rating: true },
        _count: { _all: true },
      }),
      prisma.reviewRating.groupBy({
        by: ["categoryId"],
        where: { review: { businessId } },
        _avg: { score: true },
        _count: { _all: true },
      }),
    ]);

    const categories = await prisma.reviewCategory.findMany({
      where: {
        id: {
          in: ratingGroups.map((g) => g.categoryId),
        },
      },
    });

    return {
      avgRating: overall._avg.rating,
      reviewCount: overall._count._all,
      perCategory: ratingGroups.map((g) => ({
        categoryId: g.categoryId,
        categoryName: categories.find((c) => c.id === g.categoryId)?.name,
        avgScore: g._avg.score,
        count: g._count._all,
      })),
    };
  });
}
