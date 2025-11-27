import { FastifyInstance } from "fastify";
import list from "./review.list";
import create from "./review.create";
import stats from "./review.stats";

export default async function reviewRoutes(app: FastifyInstance) {
  app.get("/list", list);
  app.post("/", create);
  app.get("/stats/:businessId", stats);
}
