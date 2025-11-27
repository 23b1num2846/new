import { FastifyInstance } from "fastify";
import list from "./category.list";
import create from "./category.create";

export default async function categoryRoutes(app: FastifyInstance) {
  app.get("/", list);
  app.post("/", create);
}
