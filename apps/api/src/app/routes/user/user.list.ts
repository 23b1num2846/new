import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function userListRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return { data: await prisma.user.findMany() };
  });
}
