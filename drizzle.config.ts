import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

// drizzle-kit roda fora do Next.js, então carregamos o .env.local manualmente.
if (existsSync(".env.local")) process.loadEnvFile(".env.local");

const url = process.env.DATABASE_URL_MIGRATIONS;
if (!url) {
  throw new Error("DATABASE_URL_MIGRATIONS ausente no .env.local");
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url },
});
