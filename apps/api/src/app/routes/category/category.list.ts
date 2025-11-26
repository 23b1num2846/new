import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function categoryListRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return { data: await prisma.category.findMany() };
  });
}
