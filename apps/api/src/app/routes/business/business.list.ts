import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../plugins/prisma";

export default async function list(req: FastifyRequest, reply: FastifyReply) {
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
      ratings.length === 0 ? null : ratings.reduce((s, v) => s + v, 0) / ratings.length;

    return {
      ...b,
      avgRating: avg,
      reviewCount: ratings.length,
    };
  });

  reply.send({ data });
}
