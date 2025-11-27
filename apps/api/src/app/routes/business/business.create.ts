import { FastifyRequest, FastifyReply } from "fastify";
import { CreateBusinessSchema } from "@yellows/contract";
import prisma from "../../plugins/prisma";

export default async function create(req: FastifyRequest, reply: FastifyReply) {
  const data = CreateBusinessSchema.parse(req.body);

  const created = await prisma.business.create({
    data,
  });

  reply.code(201).send(created);
}
