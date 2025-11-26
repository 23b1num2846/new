import { FastifyInstance } from "fastify";
import reviewCreateRoutes from "./review.create";
import reviewListRoutes from "./review.list";
import reviewStatsRoutes from "./review.stats";

export default async function reviewRoutes(app: FastifyInstance) {
  await app.register(reviewCreateRoutes);
  await app.register(reviewListRoutes);
  await app.register(reviewStatsRoutes);
}
