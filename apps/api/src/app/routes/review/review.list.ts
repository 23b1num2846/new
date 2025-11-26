/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function reviewListRoutes(app: FastifyInstance) {
  app.get("/business/:businessId", async (req) => {
    const { businessId } = (req as any).params;

    const reviews = await prisma.review.findMany({
      where: { businessId },
      include: {
        user: true,
        photos: true,
        ratings: { include: { category: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return { data: reviews };
  });
}
