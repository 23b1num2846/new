/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../plugins/prisma";

export default async function list(req: FastifyRequest, reply: FastifyReply) {
  const { page = 1, limit = 12 } = req.query as any;
  const skip = (page - 1) * limit;

  const reviews = await prisma.review.findMany({
    skip,
    take: Number(limit),
    include: {
      user: true,
      business: true,
      photos: true,
    },
    orderBy: { createdAt: "desc" },
  });

  reply.send({ data: reviews });
}
