import { FastifyInstance } from "fastify";
import list from "./business.list";
import single from "./business.single";
import create from "./business.create";

export default async function businessRoutes(app: FastifyInstance) {
  app.get("/", list);           // GET /api/business
  app.get("/:id", single);      // GET /api/business/:id
  app.post("/", create);        // POST /api/business
}
