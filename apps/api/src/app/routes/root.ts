import { FastifyInstance } from "fastify";

import businessRoutes from "./business";
import categoryRoutes from "./category";
import reviewRoutes from "./review";
import userRoutes from "./user";

export default async function rootRoutes(app: FastifyInstance) {
  app.register(businessRoutes, { prefix: "/business" });
  app.register(categoryRoutes, { prefix: "/category" });
  app.register(reviewRoutes, { prefix: "/reviews" });
  app.register(userRoutes, { prefix: "/users" });
}
