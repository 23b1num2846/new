import { FastifyInstance } from "fastify";

export default async function rootRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return { status: "ok", message: "YellowBook API running 🎉" };
  });
}
