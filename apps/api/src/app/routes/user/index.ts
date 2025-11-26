import { FastifyInstance } from "fastify";
import userListRoutes from "./user.list";
import userSingleRoutes from "./user.single";
import userCreateRoutes from "./user.create";

export default async function userRoutes(app: FastifyInstance) {
  await app.register(userListRoutes);
  await app.register(userSingleRoutes);
  await app.register(userCreateRoutes);
}
