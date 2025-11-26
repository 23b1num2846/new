/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import { CreateReviewSchema } from "@yellows/contract";


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function reviewCreateRoutes(app: FastifyInstance) {
  app.post("/", async (req, reply) => {
    const body = CreateReviewSchema.parse((req as any).body);

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
  });
}
