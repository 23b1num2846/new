/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../plugins/prisma";

export default async function stats(
  req: FastifyRequest<{ Params: { businessId: string } }>,
  reply: FastifyReply
) {
  const { businessId } = req.params;

  // Overall rating + count
  const overall = await prisma.review.aggregate({
    where: { businessId },
    _avg: { rating: true },
    _count: { _all: true },
  });

  // Group by rating categories
  const ratingGroups = await prisma.reviewRating.groupBy({
    by: ["categoryId"],
    where: { review: { businessId } },
    _avg: { score: true },
    _count: { _all: true },
  });

  const categories = await prisma.reviewCategory.findMany({
    where: { id: { in: ratingGroups.map((g) => g.categoryId) } },
  });

  reply.send({
    avgRating: overall._avg.rating,
    reviewCount: overall._count._all,
    perCategory: ratingGroups.map((g) => ({
      categoryId: g.categoryId,
      categoryName: categories.find((c) => c.id === g.categoryId)?.name,
      avgScore: g._avg.score,
      count: g._count._all,
    })),
  });
}
