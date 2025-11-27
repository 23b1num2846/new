import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import prisma from "../../plugins/prisma";

export default async function search(req: FastifyRequest, reply: FastifyReply) {
  const { q = "", limit } = (req.query as { q?: string; limit?: string }) || {};
  const take = limit ? Math.min(Math.max(Number(limit) || 0, 1), 50) : undefined;
  const query = q?.toString().trim();

  const where: Prisma.BusinessWhereInput | undefined =
    query && query.length > 0
      ? {
          OR: [
            { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { description: { contains: query, mode: Prisma.QueryMode.insensitive } },
            { address: { contains: query, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : undefined;

  const biz = await prisma.business.findMany({
    where,
    include: {
      category: true,
      reviews: { select: { rating: true } },
    },
    orderBy: { name: "asc" },
    take,
  });

  const data = biz.map((b) => {
    const ratings = (b.reviews ?? []).map((r) => r.rating);
    const avg =
      ratings.length === 0 ? null : ratings.reduce((s: number, v: number) => s + v, 0) / ratings.length;

    return {
      ...b,
      avgRating: avg,
      reviewCount: ratings.length,
    };
  });

  reply.send({ data });
}
