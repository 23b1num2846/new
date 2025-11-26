import { FastifyInstance } from "fastify";
import businessListRoutes from "./business.list";
import businessSingleRoutes from "./business.single";
import businessCreateRoutes from "./business.create";

export default async function businessRoutes(app: FastifyInstance) {
  await app.register(businessListRoutes);
  await app.register(businessSingleRoutes);
  await app.register(businessCreateRoutes);
}
