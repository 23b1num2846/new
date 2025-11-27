import prisma from "../../plugins/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

export default async function list(req: FastifyRequest, reply: FastifyReply) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  
  reply.send({ data: categories });
}
