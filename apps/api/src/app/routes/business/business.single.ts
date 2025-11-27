import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../plugins/prisma";

export default async function single(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as any;

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
    ratings.length === 0 ? null : ratings.reduce((s, v) => s + v, 0) / ratings.length;

  reply.send({
    ...business,
    avgRating: avg,
    reviewCount: ratings.length,
  });
}
