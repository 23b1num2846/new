import { FastifyInstance } from "fastify";
import categoryListRoutes from "./category.list";
import categoryCreateRoutes from "./category.create";

export default async function categoryRoutes(app: FastifyInstance) {
  await app.register(categoryListRoutes);
  await app.register(categoryCreateRoutes);
}
