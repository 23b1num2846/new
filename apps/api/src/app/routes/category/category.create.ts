import { CreateCategorySchema } from "@yellows/contract";
import prisma from "../../plugins/prisma";
import { FastifyRequest, FastifyReply } from "fastify";

export default async function create(req: FastifyRequest, reply: FastifyReply) {
  const data = CreateCategorySchema.parse(req.body);

  const created = await prisma.category.create({ data });

  reply.code(201).send(created);
}
