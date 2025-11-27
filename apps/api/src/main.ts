import Fastify from "fastify";
import cors from "@fastify/cors";
import rootRoutes from "./app/routes/root";

const server = Fastify({ logger: true });

async function start() {
  await server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  await server.register(rootRoutes, { prefix: "/api" });

  server.listen({ port: 3333, host: "0.0.0.0" }, (err) => {
    if (err) throw err;
    console.log("API running at http://localhost:3333");
  });
}

start();
