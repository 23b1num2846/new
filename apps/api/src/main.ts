import Fastify from "fastify";
import buildApp from "./app/app";

async function main() {
  const app = Fastify({ logger: true });

  await buildApp(app);

  const port = Number(process.env.PORT ?? 3333);

  await app.listen({ port, host: "0.0.0.0" });
  console.log(`🚀 API running on http://localhost:${port}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
