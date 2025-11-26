import { FastifyInstance } from "fastify";
import sensible from "./plugins/sensible";
import rootRoutes from "./routes/root";
import categoryRoutes from "./routes/category";
import businessRoutes from "./routes/business";
import reviewRoutes from "./routes/review";
import userRoutes from "./routes/user";

export default async function buildApp(app: FastifyInstance) {
  await app.register(sensible);

  await app.register(rootRoutes, { prefix: "/" });
  await app.register(categoryRoutes, { prefix: "/category" });
  await app.register(businessRoutes, { prefix: "/business" });
  await app.register(reviewRoutes, { prefix: "/review" });
  await app.register(userRoutes, { prefix: "/user" });

  return app;
}
