/**
 * Testa a conexão com o Supabase. Uso: npm run db:check
 *
 * Verifica, sem alterar nada:
 *  1. se o .env.local está preenchido;
 *  2. se a API do Supabase responde com a URL e a chave pública;
 *  3. se o banco aceita conexão pelas duas URLs (app e migrações).
 */
import { existsSync } from "node:fs";
import postgres from "postgres";

if (!existsSync(".env.local")) {
  console.error("✗ Arquivo .env.local não encontrado. Copie .env.example para .env.local e preencha.");
  process.exit(1);
}
process.loadEnvFile(".env.local");

const nomes = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "DATABASE_URL",
  "DATABASE_URL_MIGRATIONS",
] as const;

let ok = true;
for (const nome of nomes) {
  const valor = process.env[nome];
  if (!valor || valor.includes("COLE_AQUI") || valor.includes("[YOUR-PASSWORD]")) {
    console.error(`✗ ${nome} não preenchida`);
    ok = false;
  }
}
if (!ok) process.exit(1);

const env = process.env as unknown as Record<(typeof nomes)[number], string>;

async function checarApi() {
  const res = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`, {
    headers: { apikey: env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} — confira a URL e a chave pública`);
  console.log("✓ API do Supabase respondeu (URL e chave pública corretas)");
}

async function checarBanco(nome: "DATABASE_URL" | "DATABASE_URL_MIGRATIONS") {
  const sql = postgres(env[nome], { prepare: false, max: 1, connect_timeout: 15 });
  try {
    const [linha] = await sql`select current_database() as banco, version() as versao`;
    console.log(`✓ ${nome}: conectado ao banco "${linha.banco}" (${String(linha.versao).split(" ").slice(0, 2).join(" ")})`);
  } finally {
    await sql.end();
  }
}

let falhou = false;
for (const [rotulo, teste] of [
  ["API", checarApi],
  ["DATABASE_URL", () => checarBanco("DATABASE_URL")],
  ["DATABASE_URL_MIGRATIONS", () => checarBanco("DATABASE_URL_MIGRATIONS")],
] as const) {
  try {
    await teste();
  } catch (e) {
    falhou = true;
    console.error(`✗ ${rotulo}: ${e instanceof Error ? e.message : String(e)}`);
  }
}
process.exit(falhou ? 1 : 0);
