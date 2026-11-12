import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { serverEnv } from "@/lib/env";
import * as schema from "./schema";

/**
 * Conexão com o banco (Supabase Postgres) via Drizzle — somente no servidor.
 *
 * Usa o "Transaction pooler" do Supabase (porta 6543), recomendado para a Vercel,
 * onde cada requisição pode rodar numa instância diferente. Nesse modo, prepared
 * statements precisam ficar desligados (prepare: false).
 */
const client = postgres(serverEnv().databaseUrl, { prepare: false });

export const db = drizzle(client, { schema });
