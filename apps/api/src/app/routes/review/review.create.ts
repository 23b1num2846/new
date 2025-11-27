import { FastifyRequest, FastifyReply } from "fastify";
import { CreateReviewSchema } from "@yellows/contract";
import prisma from "../../plugins/prisma";

export default async function create(req: FastifyRequest, reply: FastifyReply) {
  const body = CreateReviewSchema.parse(req.body);

  const created = await prisma.review.create({
    data: {
      rating: body.rating,
      text: body.text ?? undefined,
      userId: body.userId,
      businessId: body.businessId,
      photos: { create: body.photos.map((url) => ({ url })) },
      ratings: {
        create: body.ratings.map((r) => ({
          categoryId: r.categoryId,
          score: r.score,
        })),
      },
    },
    include: {
      photos: true,
      ratings: { include: { category: true } },
    },
  });

  reply.code(201).send(created);
}
